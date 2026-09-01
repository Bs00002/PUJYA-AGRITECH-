import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ZoomIn, ZoomOut, RotateCcw, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface CertificationItem {
  id: string;
  title: string;
  subHeader: string;
  imagePreview: string;
}

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'iec-certificate',
    title: 'IEC Export License Certificate',
    subHeader: 'Directorate General of Foreign Trade, Govt. of India',
    imagePreview: '/certificates/iec-certificate.png',
  },
  {
    id: 'apeda-rcmc',
    title: 'APEDA RCMC Registration Certificate',
    subHeader: 'Agricultural & Processed Food Products Export Development Authority',
    imagePreview: '/certificates/apeda-rcmc.png',
  },
  {
    id: 'ina-membership',
    title: 'Indian Nurserymen Association Certificate',
    subHeader: 'Certificate of Lifetime Membership • Reg. No. 3764',
    imagePreview: '/certificates/nurseryman-association-certificate.png',
  },
];

export const CertificationsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeCert, setActiveCert] = useState<CertificationItem | null>(null);

  // GSAP Animation Refs
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  
  // Lightbox Zoom & Pan Controls state
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [panPos, setPanPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // GSAP ScrollTrigger Entrance Animations
  useEffect(() => {
    if (shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      // 1. Heading fades up
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          y: 35,
          opacity: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // 2. Card 1 (IEC Certificate) slides/fades in from LEFT
      if (card1Ref.current) {
        gsap.from(card1Ref.current, {
          x: -50,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // 3. Card 2 (APEDA Certificate) fades/scales up in CENTER
      if (card2Ref.current) {
        gsap.from(card2Ref.current, {
          y: 35,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // 4. Card 3 (Indian Nurserymen Association) slides/fades in from RIGHT
      if (card3Ref.current) {
        gsap.from(card3Ref.current, {
          x: 50,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          delay: 0.45,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  // Reset zoom & pan when opening a new certificate or closing
  useEffect(() => {
    setZoomScale(1);
    setPanPos({ x: 0, y: 0 });
  }, [activeCert]);

  // Handle keyboard events (ESC key closes lightbox)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCert(null);
      }
    };
    if (activeCert) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCert]);

  const handleZoomIn = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setZoomScale((prev) => Math.min(prev + 0.35, 3.5));
  };

  const handleZoomOut = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setZoomScale((prev) => {
      const nextScale = Math.max(prev - 0.35, 1);
      if (nextScale === 1) setPanPos({ x: 0, y: 0 });
      return nextScale;
    });
  };

  const handleResetZoom = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setZoomScale(1);
    setPanPos({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomScale > 1) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({ x: e.clientX - panPos.x, y: e.clientY - panPos.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomScale > 1) {
      setPanPos({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section ref={sectionRef} className="relative py-12 md:py-16 bg-white text-white font-sans overflow-hidden">
      
      {/* Organic Top Edge Divider */}
      <div className="w-full overflow-hidden leading-none z-10 relative -mb-1">
        <svg className="w-full h-8 md:h-12 text-[#006B8F] fill-current" viewBox="0 0 1440 48" preserveAspectRatio="none">
          <path d="M0,28 C120,40 240,14 360,26 C480,38 600,10 720,24 C840,38 960,12 1080,26 C1200,40 1320,16 1440,30 L1440,48 L0,48 Z" />
        </svg>
      </div>

      {/* Main Deep Pujya Teal (#006B8F) Section Body */}
      <div className="bg-[#006B8F] py-12 md:py-16 px-4 relative z-0">
        <div className="max-w-[1240px] w-[94%] mx-auto space-y-10">
          
          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto">
            <h2
              ref={headingRef}
              className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white uppercase"
            >
              OUR CERTIFICATIONS
            </h2>
          </div>

          {/* 3-Card Certificate Display with GSAP Entrance & Premium Hover */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
            {CERTIFICATIONS.map((cert, idx) => {
              const cardRef = idx === 0 ? card1Ref : idx === 1 ? card2Ref : card3Ref;
              return (
                <div
                  key={cert.id}
                  ref={cardRef}
                  onClick={() => setActiveCert(cert)}
                  className="group cursor-pointer rounded-2xl bg-white text-[#10232B] border border-white/20 hover:border-white/60 shadow-xl hover:shadow-[0_20px_45px_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] w-full bg-white p-4 border-b border-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={cert.imagePreview}
                      alt={cert.title}
                      className="w-full h-full object-contain rounded shadow-2xs group-hover:scale-[1.03] transition-transform duration-300 ease-out"
                      loading="lazy"
                    />

                    {/* Zoom Hover Overlay Indicator */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white font-bold text-xs">
                      <div className="px-3.5 py-2 rounded-full bg-black/70 backdrop-blur-xs flex items-center gap-1.5 shadow-md">
                        <ZoomIn className="w-4 h-4 text-[#AEE583]" />
                        <span>Click to Expand</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 space-y-1 bg-white text-center flex-1 flex flex-col justify-center">
                    <h3 className="text-base lg:text-lg font-bold text-[#10232B] group-hover:text-[#006B8F] transition-colors leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-[#006B8F] font-semibold">
                      {cert.subHeader}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Organic Bottom Edge Divider */}
      <div className="w-full overflow-hidden leading-none z-10 relative -mt-1">
        <svg className="w-full h-8 md:h-12 text-[#006B8F] fill-current" viewBox="0 0 1440 48" preserveAspectRatio="none">
          <path d="M0,0 L1440,0 L1440,16 C1320,32 1200,8 1080,22 C960,36 840,10 720,24 C600,38 480,6 360,20 C240,34 120,8 0,18 Z" />
        </svg>
      </div>

      {/* ===================== FULL-SCREEN LIGHTBOX MODAL ===================== */}
      <AnimatePresence>
        {activeCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Dark Semi-transparent Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCert(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
            />

            {/* Lightbox Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative z-10 w-full max-w-5xl h-[88vh] flex flex-col items-center justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox Top Bar Controls */}
              <div className="w-full flex items-center justify-between px-4 py-3 bg-black/40 backdrop-blur-md rounded-xl text-white border border-white/10 shrink-0 mb-3">
                <div className="text-left pr-4">
                  <h4 className="text-sm sm:text-base font-bold text-white leading-tight">
                    {activeCert.title}
                  </h4>
                  <p className="text-[11px] text-emerald-400 font-medium">
                    {activeCert.subHeader}
                  </p>
                </div>

                {/* Zoom & Close Toolbar */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleZoomIn}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleZoomOut}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>

                  {zoomScale > 1 && (
                    <button
                      onClick={handleResetZoom}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                      title="Reset Zoom"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}

                  <div className="w-[1px] h-5 bg-white/20 mx-1" />

                  <button
                    onClick={() => setActiveCert(null)}
                    className="p-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white transition-colors cursor-pointer"
                    title="Close (ESC)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Certificate Viewing Stage (Aspect-preserved, Zoomable & Draggable) */}
              <div
                className="w-full flex-1 relative overflow-hidden rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center cursor-grab active:cursor-grabbing select-none p-4"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <div
                  className="transition-transform duration-100 ease-out flex items-center justify-center max-h-full max-w-full"
                  style={{
                    transform: `translate(${panPos.x}px, ${panPos.y}px) scale(${zoomScale})`,
                  }}
                >
                  <img
                    src={activeCert.imagePreview}
                    alt={activeCert.title}
                    className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl pointer-events-none"
                  />
                </div>

                {zoomScale > 1 && (
                  <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-md bg-black/70 backdrop-blur-xs text-white text-[11px] font-semibold border border-white/15">
                    Drag to pan • Scale: {Math.round(zoomScale * 100)}%
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificationsSection;
