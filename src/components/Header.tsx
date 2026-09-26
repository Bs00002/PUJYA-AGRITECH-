import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Lock, Download } from 'lucide-react';
import { PujyaLogo } from './PujyaLogo';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenConsultationModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenConsultationModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leftNavItems = [
    { id: 'home', label: 'HOME', path: '/' },
    { id: 'projects', label: 'PROJECTS', path: '/projects' },
    { id: 'products', label: 'PRODUCTS', path: '/products' },
    { id: 'gallery', label: 'GALLERY / VIDEO', path: '/gallery' },
  ];

  const rightNavItems = [
    { id: 'blog', label: 'BLOG', path: '/blog' },
    { id: 'about', label: 'ABOUT US', path: '/about' },
    { id: 'contact', label: 'CONTACT US', path: '/contact' },
  ];

  const allNavItems = [
    { id: 'home', label: 'HOME', path: '/' },
    { id: 'projects', label: 'PROJECTS', path: '/projects' },
    { id: 'products', label: 'PRODUCTS', path: '/products' },
    { id: 'gallery', label: 'GALLERY / VIDEO', path: '/gallery' },
    { id: 'blog', label: 'BLOG', path: '/blog' },
    { id: 'about', label: 'ABOUT US', path: '/about' },
    { id: 'contact', label: 'CONTACT US', path: '/contact' },
  ];

  const handleNavClick = (id: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setMobileMenuOpen(false);
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full relative transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#E4EAE5] shadow-xs py-2'
          : 'bg-white border-b border-[#E4EAE5] py-2.5'
      }`}
    >
      {/* 
        MATHEMATICALLY PERFECT 50% VIEWPORT CENTERED LOGO
        Positioned relative to full-width header (xl and above)
      */}
      <div className="hidden xl:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto items-center justify-center">
        <a
          href="/"
          onClick={(e) => handleNavClick('home', e)}
          className="cursor-pointer inline-block shrink-0 focus:outline-none px-2 hover:opacity-95 transition-opacity py-1"
          aria-label="Pujya Agritech Home"
        >
          <PujyaLogo variant="default" height={72} />
        </a>
      </div>

      <div className="max-w-[1440px] w-[95%] mx-auto relative">
        {/* DESKTOP CENTERED LOGO LAYOUT (xl and above, 1280px+) */}
        <div className="hidden xl:flex items-center justify-between h-20 sm:h-22">
          {/* LEFT NAV CONTAINER (Left half, aligned toward logo with padding) */}
          <div className="w-[calc(50%-85px)] flex items-center justify-end pr-6 2xl:pr-12 z-10">
            <nav className="flex items-center gap-4 2xl:gap-7" aria-label="Left Navigation">
              {leftNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.path}
                    onClick={(e) => handleNavClick(item.id, e)}
                    className={`text-[13px] 2xl:text-[14px] tracking-wide transition-colors whitespace-nowrap nav-link-item ${
                      isActive
                        ? 'text-[#2F7445] font-bold active-nav'
                        : 'text-[#10232B] font-semibold hover:text-[#2F7445]'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* RIGHT NAV CONTAINER (Right half, aligned from logo with padding) */}
          <div className="w-[calc(50%-85px)] flex items-center justify-start pl-6 2xl:pl-12 gap-3 2xl:gap-5 z-10">
            <nav className="flex items-center gap-4 2xl:gap-7" aria-label="Right Navigation">
              {rightNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.path}
                    onClick={(e) => handleNavClick(item.id, e)}
                    className={`text-[13px] 2xl:text-[14px] tracking-wide transition-colors whitespace-nowrap nav-link-item ${
                      isActive
                        ? 'text-[#2F7445] font-bold active-nav'
                        : 'text-[#10232B] font-semibold hover:text-[#2F7445]'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <button
              onClick={onOpenConsultationModal}
              className="group inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded text-xs 2xl:text-sm font-semibold text-white bg-[#2F7445] hover:bg-[#255d37] transition-all shadow-2xs btn-hover-trigger shrink-0 cursor-pointer"
            >
              <span>GET PROJECT CONSULTATION</span>
              <ArrowRight className="w-4 h-4 btn-arrow-icon" />
            </button>

            {/* Subtle Admin Portal Link */}
            <button
              onClick={() => handleNavClick('admin')}
              className="p-1.5 text-[#60717A] hover:text-[#10232B] transition-colors rounded cursor-pointer"
              title="CMS Admin Portal"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* MOBILE & TABLET & LAPTOP (<1280px) CLEAN HEADER */}
        <div className="flex xl:hidden items-center justify-between h-16 sm:h-20 px-1 sm:px-3">
          {/* Left-Aligned Logo: No collision possible on any screen */}
          <a
            href="/"
            onClick={(e) => handleNavClick('home', e)}
            className="cursor-pointer inline-flex items-center py-1"
            aria-label="Pujya Agritech Home"
          >
            <div className="sm:hidden">
              <PujyaLogo variant="default" height={42} />
            </div>
            <div className="hidden sm:block">
              <PujyaLogo variant="default" height={52} />
            </div>
          </a>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 z-10">
            {/* Show Consultation button on tablets & medium screens, hide on narrow phones */}
            <button
              onClick={onOpenConsultationModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded text-xs font-semibold text-white bg-[#2F7445] hover:bg-[#255d37] transition-colors shadow-2xs cursor-pointer"
            >
              <span>Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 sm:p-2.5 rounded-lg text-[#10232B] hover:bg-[#F5F8F5] transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#2F7445]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-[#E4EAE5] px-4 pt-3 pb-6 space-y-3 shadow-lg animate-fade-in">
          <div className="flex flex-col gap-1 pb-3 border-b border-[#E4EAE5]">
            {allNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <a
                  key={item.id}
                  href={item.path}
                  onClick={(e) => handleNavClick(item.id, e)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded text-xs tracking-wider transition-all ${
                    isActive
                      ? 'bg-[#F5F8F5] text-[#2F7445] font-semibold border-l-2 border-[#2F7445]'
                      : 'text-[#10232B] font-medium hover:bg-[#F5F8F5]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#60717A]" />
                </a>
              );
            })}
          </div>

          <div className="pt-2 space-y-2">
            <a
              href="/brochure.pdf"
              download="Pujya-Agritech-Company-Brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded text-xs font-bold text-[#004b93] bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD OFFICIAL BROCHURE (PDF)</span>
            </a>

            <button
              onClick={() => {
                onOpenConsultationModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded text-xs font-medium text-white bg-[#2F7445] hover:bg-[#255d37]"
            >
              <span>GET PROJECT CONSULTATION</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className="w-full text-center py-2 text-xs text-[#60717A] hover:text-[#10232B] flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin CMS Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

