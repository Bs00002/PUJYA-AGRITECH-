import React, { useState } from 'react';
import { MapPin, Phone, Mail, CheckCircle2, Loader2, ArrowRight, ExternalLink, Instagram, Facebook, Store, Clock } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface ContactViewProps {
  onSubmitSuccess?: (msg: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onSubmitSuccess }) => {
  const { contactInfo, addEnquiry } = useAdmin();

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    projectRequirement: 'Greenhouse Structure',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phoneNumber) {
      alert('Please fill in required fields: Full Name and Phone Number.');
      return;
    }

    setIsSubmitting(true);

    addEnquiry({
      name: formData.fullName,
      mobile: formData.phoneNumber,
      email: formData.email,
      interestedProduct: formData.projectRequirement,
      message: formData.message,
      company: 'Individual Grower / Agribusiness',
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      if (onSubmitSuccess) {
        onSubmitSuccess('Thank you for contacting Pujya Agritech. Our engineering team will get back to you shortly.');
      }

      setFormData({
        fullName: '',
        phoneNumber: '',
        email: '',
        projectRequirement: 'Greenhouse Structure',
        message: '',
      });
    }, 600);
  };

  const googleMapsUrl = "https://maps.google.com/?q=Mahavir+Estate+Near+Kothari+Char+Rasta+Santej+Kalol+Gandhinagar+Gujarat+382721";

  return (
    <div className="bg-white min-h-screen text-[#10232B] font-sans pb-20">
      
      {/* 9. CONTACT HERO */}
      <section className="bg-[#10232B] text-white py-16 sm:py-20 border-b border-[#E4EAE5]">
        <div className="max-w-[1280px] w-[94%] mx-auto">
          <div className="max-w-3xl space-y-3">
            <span className="inline-block px-3 py-1 bg-[#2F7445]/20 border border-[#2F7445]/40 text-[#93D9A5] text-[11px] font-mono tracking-widest uppercase rounded">
              DIRECT INQUIRIES & SUPPORT
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Let's Build Your Next Agricultural Project
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl pt-1">
              Reach out to our technical team for site planning, structure recommendations, quote estimations, or product supply enquiries across India.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] w-[94%] mx-auto py-16 space-y-16">
        
        {/* 10. CONTACT INFORMATION - Clean Minimal 3-Card Layout in #006B8F */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          
          {/* Card 1: Call Us */}
          <div className="bg-[#006B8F] border border-white/20 rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-4 shadow-md hover:shadow-lg transition-all group text-white">
            <div className="space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#AEE583] group-hover:bg-[#AEE583] group-hover:text-[#006B8F] transition-colors shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold tracking-widest text-[#AEE583] uppercase block">
                    CALL US
                  </span>
                </div>
              </div>

              <div className="pt-1 space-y-1.5 text-sm sm:text-base font-semibold text-white">
                <div>
                  <a
                    href="tel:+919974431960"
                    className="inline-flex items-center gap-1.5 text-white hover:text-[#AEE583] transition-colors py-0.5"
                  >
                    <span>+91 99744 31960</span>
                  </a>
                </div>
                <div>
                  <a
                    href="tel:+919081412412"
                    className="inline-flex items-center gap-1.5 text-white hover:text-[#AEE583] transition-colors py-0.5"
                  >
                    <span>+91 90814 12412</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Email */}
          <div className="bg-[#006B8F] border border-white/20 rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-4 shadow-md hover:shadow-lg transition-all group text-white">
            <div className="space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#AEE583] group-hover:bg-[#AEE583] group-hover:text-[#006B8F] transition-colors shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold tracking-widest text-[#AEE583] uppercase block">
                    EMAIL
                  </span>
                </div>
              </div>

              <div className="pt-1 text-sm sm:text-base font-semibold text-white">
                <a
                  href="mailto:info@pujyaagritech.com"
                  className="inline-flex items-center gap-1.5 text-white hover:text-[#AEE583] transition-colors py-0.5 break-all"
                >
                  <span>info@pujyaagritech.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Card 3: Address */}
          <div className="bg-[#006B8F] border border-white/20 rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-4 shadow-md hover:shadow-lg transition-all group text-white">
            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#AEE583] group-hover:bg-[#AEE583] group-hover:text-[#006B8F] transition-colors shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-sm sm:text-base text-white font-medium leading-relaxed space-y-0.5">
                  <p className="font-semibold">Mahavir Estate,</p>
                  <p>Near Kothari Char Rasta,</p>
                  <p>Santej, Kalol-Gandhinagar,</p>
                  <p className="text-white/90">Gujarat - 382721</p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/15">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#AEE583] hover:text-white transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#AEE583]" />
                </a>
              </div>
            </div>
          </div>

        </section>

        {/* 11. CONTACT FORM SECTION */}
        <section className="bg-white border border-[#E4EAE5] rounded-lg p-8 sm:p-12 space-y-8">
          <div className="max-w-xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#2F7445] font-bold">
              PROJECT ENQUIRY FORM
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#10232B]">
              Send Us Your Inquiry
            </h2>
            <p className="text-base text-[#4A5D68] leading-relaxed">
              Fill in your details below and our protected cultivation team will respond promptly.
            </p>
          </div>

          {submitted && (
            <div className="p-4 bg-[#EAF2EB] border border-[#2F7445]/30 rounded text-sm text-[#2F7445] font-medium flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-[#2F7445]" />
              <span>Thank you! Your enquiry has been received. Our team will contact you shortly.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-[#10232B] mb-2">
                  FULL NAME <span className="text-[#2F7445]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F8FAF7] border border-[#E4EAE5] rounded text-base text-[#10232B] placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-[#2F7445] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-[#10232B] mb-2">
                  PHONE NUMBER <span className="text-[#2F7445]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 Phone number"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F8FAF7] border border-[#E4EAE5] rounded text-base text-[#10232B] placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-[#2F7445] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-[#10232B] mb-2">
                  EMAIL
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F8FAF7] border border-[#E4EAE5] rounded text-base text-[#10232B] placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-[#2F7445] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-[#10232B] mb-2">
                  PROJECT / REQUIREMENT
                </label>
                <select
                  value={formData.projectRequirement}
                  onChange={(e) => setFormData({ ...formData, projectRequirement: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F8FAF7] border border-[#E4EAE5] rounded text-base text-[#10232B] focus:bg-white focus:outline-none focus:border-[#2F7445] transition-colors"
                >
                  <option value="Greenhouse Structure">Green House Structure</option>
                  <option value="Shade Net House">Shade Net House</option>
                  <option value="Poly Tunnel">Poly Tunnel</option>
                  <option value="Hydroponics System">Hydroponics System</option>
                  <option value="Greenhouse Materials & Supply">Greenhouse Materials & Supply</option>
                  <option value="Cattle Shelter / Poultry Farm">Cattle Shelter / Poultry Farm</option>
                  <option value="Other Project Advisory">Other Project Advisory</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-wider text-[#10232B] mb-2">
                MESSAGE
              </label>
              <textarea
                rows={4}
                placeholder="Specify your land size (e.g. acres/sqm), project location, crop type, or required materials..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-[#F8FAF7] border border-[#E4EAE5] rounded text-base text-[#10232B] placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-[#2F7445] transition-colors"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#2F7445] hover:bg-[#255d37] text-white font-semibold text-sm uppercase tracking-wider rounded transition-all shadow-sm btn-hover-trigger disabled:opacity-75 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>SENDING ENQUIRY...</span>
                  </>
                ) : (
                  <>
                    <span>SEND ENQUIRY</span>
                    <ArrowRight className="w-4 h-4 btn-arrow-icon" />
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        {/* 13. SOCIAL MEDIA SECTION - Exact #006B8F Pujya Teal/Blue Cards */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#006B8F] font-bold">
              DIGITAL PRESENCE
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-[#10232B]">
              Connect With Pujya
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
            
            {/* INSTAGRAM */}
            <div className="bg-[#006B8F] border border-white/20 rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-4 shadow-md hover:shadow-lg transition-all group text-white">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#AEE583]">
                    INSTAGRAM
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#AEE583] group-hover:bg-[#AEE583] group-hover:text-[#006B8F] transition-colors shrink-0">
                    <Instagram className="w-4.5 h-4.5 text-[#AEE583] group-hover:text-[#006B8F]" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-extrabold text-white">@pujyaagritech</h3>
                  <p className="text-xs text-white/85 leading-relaxed font-normal">
                    Follow our latest projects & agricultural solutions
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-white/15">
                <a
                  href="https://www.instagram.com/pujyaagritech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#AEE583] hover:text-white transition-colors"
                >
                  <span>VIEW INSTAGRAM</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#AEE583]" />
                </a>
              </div>
            </div>

            {/* FACEBOOK */}
            <div className="bg-[#006B8F] border border-white/20 rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-4 shadow-md hover:shadow-lg transition-all group text-white">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#AEE583]">
                    FACEBOOK
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#AEE583] group-hover:bg-[#AEE583] group-hover:text-[#006B8F] transition-colors shrink-0">
                    <Facebook className="w-4.5 h-4.5 text-[#AEE583] group-hover:text-[#006B8F]" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-extrabold text-white">Pujya Agritech</h3>
                  <p className="text-xs text-white/85 leading-relaxed font-normal">
                    Company updates & project information
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-white/15">
                <a
                  href="https://www.facebook.com/pujyasales?utm_source=chatgpt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#AEE583] hover:text-white transition-colors"
                >
                  <span>VIEW FACEBOOK</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#AEE583]" />
                </a>
              </div>
            </div>

            {/* INDIAMART */}
            <div className="bg-[#006B8F] border border-white/20 rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-4 shadow-md hover:shadow-lg transition-all group text-white">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#AEE583]">
                    INDIAMART
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#AEE583] group-hover:bg-[#AEE583] group-hover:text-[#006B8F] transition-colors shrink-0">
                    <Store className="w-4.5 h-4.5 text-[#AEE583] group-hover:text-[#006B8F]" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-extrabold text-white">Pujya Agritech</h3>
                  <p className="text-xs text-white/85 leading-relaxed font-normal">
                    Products & business enquiries
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-white/15">
                <a
                  href="https://www.indiamart.com/pujyasalescorporation/photos.html?utm_source=chatgpt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#AEE583] hover:text-white transition-colors"
                >
                  <span>VIEW INDIAMART</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#AEE583]" />
                </a>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};


