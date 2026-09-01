import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Store,
  ArrowRight
} from 'lucide-react';
import { PujyaLogo } from './PujyaLogo';
import { useAdmin } from '../context/AdminContext';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenConsultationModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onOpenConsultationModal,
}) => {
  const { contactInfo } = useAdmin();

  const handleNavClick = (id: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'products', label: 'Products', path: '/products' },
    { id: 'projects', label: 'Projects', path: '/projects' },
    { id: 'gallery', label: 'Gallery / Video', path: '/gallery' },
    { id: 'blog', label: 'Blog', path: '/blog' },
    { id: 'about', label: 'About Us', path: '/about' },
    { id: 'contact', label: 'Contact Us', path: '/contact' },
  ];

  const solutions = [
    'Green Houses',
    'Poly Houses',
    'Shade Net Houses',
    'Poly Tunnels',
    'Protected Cultivation Structures',
    'Green House Materials',
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/pujyasales/',
      icon: Instagram,
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/pujyasales',
      icon: Facebook,
    },
    {
      name: 'IndiaMART',
      url: 'https://www.indiamart.com/pujyasalescorporation/photos.html',
      icon: Store,
    },
  ];

  return (
    <footer className="bg-[#004F6A] text-white font-sans">
      
      {/* MAIN FOOTER CONTAINER */}
      <div className="max-w-[1280px] w-[92%] mx-auto pt-16 pb-12">
        
        {/* TOP AREA: BRAND + 3 COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          
          {/* BRAND COLUMN (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <a href="/" onClick={(e) => handleNavClick('home', e)} className="cursor-pointer inline-block">
              <PujyaLogo variant="dark" height={42} />
            </a>

            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#AEE583]">
                Protected Cultivation Infrastructure
              </h3>
              <p className="text-sm text-[#E2F1F8] leading-relaxed max-w-sm font-normal">
                Complete greenhouse, poly house, shade net, irrigation and climate-control solutions for modern agriculture.
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="pt-2 flex items-center gap-2.5">
              {socialLinks.map((s) => {
                const IconComp = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-md bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/25 text-[#E2F1F8] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label={s.name}
                    title={s.name}
                  >
                    <IconComp className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* COLUMN 1: QUICK LINKS (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold font-mono tracking-widest text-[#AEE583] uppercase">
              QUICK LINKS
            </h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.path}
                    onClick={(e) => handleNavClick(link.id, e)}
                    className="text-[#E2F1F8] hover:text-white transition-colors cursor-pointer text-left block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 2: OUR SOLUTIONS (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold font-mono tracking-widest text-[#AEE583] uppercase">
              OUR SOLUTIONS
            </h4>
            <ul className="space-y-2 text-sm">
              {solutions.map((item) => (
                <li key={item}>
                  <a
                    href="/products"
                    onClick={(e) => handleNavClick('products', e)}
                    className="text-[#E2F1F8] hover:text-white transition-colors cursor-pointer text-left block py-0.5"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: CONTACT (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold font-mono tracking-widest text-[#AEE583] uppercase">
              CONTACT
            </h4>
            
            <div className="space-y-3 text-sm text-[#E2F1F8]">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#AEE583] shrink-0 mt-1" />
                <div className="space-y-0.5">
                  <a href={`tel:${contactInfo?.mobile || '+919974431960'}`} className="hover:text-white transition-colors block">
                    +91 99744 31960
                  </a>
                  <a href={`tel:${contactInfo?.phone2 || '+919081412412'}`} className="hover:text-white transition-colors block">
                    +91 90814 12412
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#AEE583] shrink-0" />
                <a href={`mailto:${contactInfo?.email || 'contact@pujyasales.com'}`} className="hover:text-white transition-colors truncate">
                  contact@pujyasales.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#AEE583] shrink-0 mt-1" />
                <span>
                  {contactInfo?.location || 'Ahmedabad, Gujarat'}
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    if (onOpenConsultationModal) {
                      onOpenConsultationModal();
                    } else {
                      handleNavClick('contact');
                    }
                  }}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#AEE583] hover:text-white transition-colors cursor-pointer group"
                >
                  <span>Contact / CTA</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* CONSULTATION HORIZONTAL LINE SECTION */}
        <div className="pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-base font-medium text-white text-center sm:text-left">
            Ready to discuss your project?
          </p>
          <button
            onClick={() => {
              if (onOpenConsultationModal) {
                onOpenConsultationModal();
              } else {
                handleNavClick('contact');
              }
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#AEE583] hover:bg-[#9ED872] text-[#003347] font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer shadow-sm shrink-0"
          >
            <span>GET PROJECT CONSULTATION</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="bg-[#003B50] border-t border-white/10 py-5 text-xs text-[#E2F1F8]/80">
        <div className="max-w-[1280px] w-[92%] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          
          <p>
            © 2026 Pujya Agritech. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="text-white/20">|</span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Terms & Conditions
            </span>
            <span className="text-white/20">|</span>
            <button
              onClick={() => handleNavClick('admin')}
              className="text-white/40 hover:text-white transition-colors font-mono text-[10px] uppercase tracking-wider cursor-pointer"
            >
              CMS ADMIN PORTAL
            </button>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;
