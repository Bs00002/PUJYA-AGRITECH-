import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { X, Send, FileText, Loader2, AlertCircle } from 'lucide-react';

export const validateIndianMobile = (mobile: string): { isValid: boolean; normalized: string } => {
  const digits = mobile.replace(/\D/g, '');
  let clean10 = digits;
  if (digits.length === 12 && digits.startsWith('91')) {
    clean10 = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith('0')) {
    clean10 = digits.slice(1);
  }
  const isValid = clean10.length === 10 && /^[6-9]\d{9}$/.test(clean10);
  const normalized = isValid ? `+91 ${clean10.slice(0, 5)} ${clean10.slice(5)}` : mobile.trim();
  return { isValid, normalized };
};

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (msg: string) => void;
  initialItemName?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
  initialItemName,
}) => {
  const { addEnquiry } = useAdmin();

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    interestedProduct: initialItemName || 'Naturally Ventilated Poly House',
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialItemName) {
      setFormData((prev) => ({ ...prev, interestedProduct: initialItemName }));
    }
  }, [initialItemName]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setApiError(null);

    // 1. Validate required fields
    if (!formData.name.trim()) {
      setValidationError('Full Name is required.');
      return;
    }
    if (!formData.mobile.trim()) {
      setValidationError('Mobile Number is required.');
      return;
    }

    // 2. Validate Indian mobile number
    const mobileCheck = validateIndianMobile(formData.mobile);
    if (!mobileCheck.isValid) {
      setValidationError('Please enter a valid 10-digit Indian mobile number (e.g., +91 99744 31960 or 9974431960).');
      return;
    }

    // 3. Prevent duplicate submissions while processing
    setIsSubmitting(true);

    const customerName = formData.name.trim();
    const customerMobile = mobileCheck.normalized;
    const selectedProduct = formData.interestedProduct;
    const sourceTag = 'Project Consultation';
    const timestamp = new Date().toISOString();

    const payload = {
      name: customerName,
      mobile: customerMobile,
      phone: customerMobile,
      structureType: selectedProduct,
      source: sourceTag,
      timestamp,
    };

    try {
      // Save lead using existing backend API (/api/quotes)
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || (data && data.success === false)) {
        setIsSubmitting(false);
        setApiError('Something went wrong. Please try again.');
        return;
      }

      // Store in AdminContext for local admin storage integration
      addEnquiry({
        name: customerName,
        mobile: customerMobile,
        email: '',
        interestedProduct: selectedProduct,
        source: sourceTag,
        message: `Project Consultation Request for ${selectedProduct}`,
      });

      // 4. Construct WhatsApp Message and Open WhatsApp to +91 99744 31960
      const waMessage = `New Pujya Agritech Project Consultation Lead\n\nName: ${customerName}\nMobile: ${customerMobile}\nInterested Product / Project: ${selectedProduct}\n\nSource: Project Consultation`;
      const waUrl = `https://wa.me/919974431960?text=${encodeURIComponent(waMessage)}`;
      window.open(waUrl, '_blank');

      setIsSubmitting(false);
      onSubmitSuccess('Project Consultation Request Received! Opening WhatsApp...');
      onClose();

      setFormData({
        name: '',
        mobile: '',
        interestedProduct: 'Naturally Ventilated Poly House',
      });
    } catch (err) {
      setIsSubmitting(false);
      setApiError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative my-8 text-slate-900 transform transition-transform duration-300 scale-100">
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-6 right-6 p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors disabled:opacity-50 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase">
            <FileText className="w-4 h-4" />
            <span>Project Consultation Request</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Get Expert Engineering Quote</h2>
          <p className="text-sm text-slate-600">
            Pujya Agritech • Protected Cultivation Infrastructure
          </p>
        </div>

        {/* API Error Alert */}
        {apiError && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-700 flex items-center gap-2.5 animate-shake">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{apiError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Row 1: Name & Mobile Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 uppercase mb-1.5">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rajesh Patel"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (validationError) setValidationError(null);
                }}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-base text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 uppercase mb-1.5">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98250 12345"
                value={formData.mobile}
                onChange={(e) => {
                  setFormData({ ...formData, mobile: e.target.value });
                  if (validationError) setValidationError(null);
                }}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-base text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
              />
            </div>
          </div>

          {/* Validation Error Message */}
          {validationError && (
            <p className="text-xs text-red-600 font-semibold flex items-center gap-1.5 pt-0.5">
              <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
              <span>{validationError}</span>
            </p>
          )}

          {/* Row 2: Interested Product / Project */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 uppercase mb-1.5">
              Interested Product / Project
            </label>
            <select
              value={formData.interestedProduct}
              onChange={(e) => setFormData({ ...formData, interestedProduct: e.target.value })}
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-base text-slate-900 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 font-medium"
            >
              <option value="Naturally Ventilated Poly House">Naturally Ventilated Poly House</option>
              <option value="Fan & Pad Poly House">Fan & Pad Poly House</option>
              <option value="Greenhouse Structure">Greenhouse Structure</option>
              <option value="Net House">Net House</option>
              <option value="Turnkey Projects">Turnkey Commercial Project</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm btn-hover-arrow disabled:opacity-75 cursor-pointer disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting & Opening WhatsApp...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>SEND ENQUIRY</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
