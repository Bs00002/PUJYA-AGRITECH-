import React, { useState, useEffect, useRef } from 'react';
import {
  MessageCircle,
  Phone,
  Mail,
  FileText,
  X,
  ChevronUp,
  Headset,
  Download,
} from 'lucide-react';

interface FloatingContactSidebarProps {
  onOpenInquiry: () => void;
  onOpenService: () => void;
  phoneNumber?: string;
  whatsappNumber?: string;
  emailAddress?: string;
}

export const FloatingContactSidebar: React.FC<FloatingContactSidebarProps> = ({
  onOpenInquiry,
  onOpenService,
  phoneNumber = '+919974431960',
  whatsappNumber = '919974431960',
  emailAddress = 'info@pujyaagritech.com',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <div ref={menuRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expandable Menu */}
      {isOpen && (
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-2xl space-y-1.5 min-w-[220px] animate-fade-in transform origin-bottom-right transition-all">
          <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
            <span className="text-[11px] font-black uppercase text-emerald-800 tracking-wider">
              Quick Contact
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <a
            href="/brochure.pdf"
            download="Pujya-Agritech-Company-Brochure.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-amber-50/70 hover:bg-amber-100/80 border border-amber-200/60 transition-colors text-left group"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-amber-900 group-hover:text-amber-950 transition-colors">
                Download Brochure
              </p>
              <p className="text-[10px] font-semibold text-amber-700">Official 2026 PDF Catalog</p>
            </div>
          </a>

          <button
            onClick={() => {
              onOpenInquiry();
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-800 text-white flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                Project Consultation
              </p>
              <p className="text-[10px] text-slate-500">Get Expert Engineering Quote</p>
            </div>
          </button>

          <a
            href={`https://wa.me/${whatsappNumber}?text=Hello%20Pujya%20Agritech,%20I%20would%20like%20to%20inquire%20about%20your%20Greenhouse%20Solutions.`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                WhatsApp Chat
              </p>
              <p className="text-[10px] text-slate-500">Direct Message Agronomist</p>
            </div>
          </a>

          <a
            href="tel:+919974431960"
            onClick={() => setIsOpen(false)}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-700 text-white flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                Call +91 99744 31960
              </p>
              <p className="text-[10px] text-slate-500">Sales & Projects Line</p>
            </div>
          </a>

          <a
            href="tel:+919081412412"
            onClick={() => setIsOpen(false)}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group"
          >
            <div className="w-9 h-9 rounded-lg bg-teal-700 text-white flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                Call +91 90814 12412
              </p>
              <p className="text-[10px] text-slate-500">Engineering Helpline</p>
            </div>
          </a>

          <a
            href={`mailto:${emailAddress}?subject=Greenhouse%20Inquiry%20-%20Pujya%20Agritech`}
            onClick={() => setIsOpen(false)}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 group-hover:text-slate-800 transition-colors">
                Email Inquiry
              </p>
              <p className="text-[10px] text-slate-500">{emailAddress}</p>
            </div>
          </a>

          <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between px-1">
            <button
              onClick={() => {
                onOpenService();
                setIsOpen(false);
              }}
              className="text-[11px] font-bold text-emerald-800 hover:underline flex items-center gap-1"
            >
              <Headset className="w-3.5 h-3.5" />
              <span>Agronomy Support</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100"
              title="Back to Top"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Single Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white shadow-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 group focus:outline-none ring-4 ring-emerald-800/20"
        aria-label="Toggle contact menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
        ) : (
          <Headset className="w-6 h-6 transition-transform group-hover:scale-110" />
        )}
      </button>
    </div>
  );
};
