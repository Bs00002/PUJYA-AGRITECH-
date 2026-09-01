import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { X, Send, FileText, Loader2 } from 'lucide-react';

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
    message: '',
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) {
      alert('Please fill in required fields: Name and Mobile Number.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      addEnquiry({
        name: formData.name,
        mobile: formData.mobile,
        email: '',
        company: '',
        interestedProduct: formData.interestedProduct,
        message: formData.message,
      });
      setIsSubmitting(false);
      onSubmitSuccess('Project Consultation Enquiry Received! Saved into Admin Panel.');
      onClose();

      setFormData({
        name: '',
        mobile: '',
        interestedProduct: 'Naturally Ventilated Poly House',
        message: '',
      });
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative my-8 text-slate-900 transform transition-transform duration-300 scale-100">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
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
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-base text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
              />
            </div>
          </div>

          {/* Row 2: Interested Product / Project */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 uppercase mb-1.5">
              Interested Product / Project
            </label>
            <select
              value={formData.interestedProduct}
              onChange={(e) => setFormData({ ...formData, interestedProduct: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-base text-slate-900 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 font-medium"
            >
              <option value="Naturally Ventilated Poly House">Naturally Ventilated Poly House</option>
              <option value="Fan & Pad Poly House">Fan & Pad Poly House</option>
              <option value="Greenhouse Structure">Greenhouse Structure</option>
              <option value="Net House">Net House</option>
              <option value="Turnkey Projects">Turnkey Commercial Project</option>
            </select>
          </div>

          {/* Row 3: Message / Requirements */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 uppercase mb-1.5">
              Message / Requirements
            </label>
            <textarea
              rows={3}
              placeholder="Tell us about your land area, location, or crop requirements..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-base text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
            />
          </div>

          {/* Row 4: Send Enquiry Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm btn-hover-arrow disabled:opacity-75"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting Enquiry...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Enquiry</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

