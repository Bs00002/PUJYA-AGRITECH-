import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { X, FileText, Download, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface BrochureLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  docTitle?: string;
  downloadUrl?: string;
  onSuccessMessage?: (msg: string) => void;
}

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

export const BrochureLeadModal: React.FC<BrochureLeadModalProps> = ({
  isOpen,
  onClose,
  docTitle = 'Pujya Agritech Official Company Brochure',
  downloadUrl = '/brochure.pdf',
  onSuccessMessage,
}) => {
  const { addEnquiry } = useAdmin();

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const triggerBrochureDownload = () => {
    const link = document.createElement('a');
    link.href = downloadUrl && downloadUrl !== '#' ? downloadUrl : '/brochure.pdf';
    link.target = '_blank';
    link.download = 'Pujya-Agritech-Company-Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
    const timestamp = new Date().toISOString();
    const sourceTag = 'Company Brochure Download';

    const payload = {
      name: customerName,
      mobile: customerMobile,
      phone: customerMobile,
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
        interestedProduct: sourceTag,
        source: sourceTag,
        message: `Brochure Lead Download: ${docTitle}`,
      });

      // 4. Construct WhatsApp Message and Open WhatsApp
      const waMessage = `New Pujya Agritech Brochure Lead\n\nName: ${customerName}\nMobile: ${customerMobile}\n\nSource: Company Brochure Download`;
      const waUrl = `https://wa.me/919974431960?text=${encodeURIComponent(waMessage)}`;
      window.open(waUrl, '_blank');

      setIsSubmitting(false);
      setSubmitSuccess(true);

      // 5. Trigger brochure PDF download after successful submission and WhatsApp open
      triggerBrochureDownload();

      if (onSuccessMessage) {
        onSuccessMessage('Thank you! Opening WhatsApp and downloading brochure...');
      }

      // Close modal after submission
      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
        setFormData({
          name: '',
          mobile: '',
        });
      }, 1500);
    } catch (err) {
      setIsSubmitting(false);
      setApiError('Something went wrong. Please try again.');
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
    >
      <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 md:p-8 space-y-6 shadow-2xl relative my-8 text-slate-900 transform transition-transform duration-300 scale-100">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors disabled:opacity-50 cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span>Official Specification</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
            Download Pujya Agritech Company Brochure
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
            Please share your details to receive our official company brochure.
          </p>
        </div>

        {/* API Submission Error */}
        {apiError && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-700 flex items-center gap-2.5 animate-shake">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{apiError}</span>
          </div>
        )}

        {/* Success Banner */}
        {submitSuccess ? (
          <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2 animate-fade-in">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="text-base font-bold text-emerald-900">Thank you! Opening WhatsApp and downloading brochure...</h4>
            <p className="text-xs text-emerald-700">If WhatsApp or the download did not start automatically, check your browser popup permissions.</p>
          </div>
        ) : (
          /* Lead Form with ONLY 2 fields */
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Field 1: Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name <span className="text-red-500">*</span>
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
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 transition-all font-sans"
              />
            </div>

            {/* Field 2: Mobile Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+91 99744 31960"
                value={formData.mobile}
                onChange={(e) => {
                  setFormData({ ...formData, mobile: e.target.value });
                  if (validationError) setValidationError(null);
                }}
                disabled={isSubmitting}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 transition-all font-sans"
              />
            </div>

            {/* Inline Validation Error */}
            {validationError && (
              <p className="text-xs text-red-600 font-semibold flex items-center gap-1.5 pt-0.5">
                <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                <span>{validationError}</span>
              </p>
            )}

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-[#004b93] hover:bg-[#003870] disabled:bg-slate-300 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting & Opening WhatsApp...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>SUBMIT & DOWNLOAD BROCHURE</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
