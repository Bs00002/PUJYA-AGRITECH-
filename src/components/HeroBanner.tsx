import React from 'react';
import { motion } from 'motion/react';

interface HeroBannerProps {
  onOpenConsultationModal?: () => void;
  onViewProducts?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenConsultationModal,
  onViewProducts,
}) => {
  return (
    <section className="relative w-full h-[75vh] min-h-[500px] max-h-[760px] sm:h-[80vh] md:h-[82vh] flex items-center justify-center bg-[#071317] overflow-hidden">
      {/* Full-width Greenhouse Background Video (No Controls, Autoplay, Muted, Loop) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/who-we-are-bg.jpeg"
          className="w-full h-full object-cover object-center scale-[1.02]"
        >
          <source src="/hero-banner.mp4" type="video/mp4" />
          <source src="/Initial_Scene_-_2026-08-14_202608141046.mp4" type="video/mp4" />
        </video>

        {/* Subtle Dark/Green Cinematic Overlay for Pristine Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#071317]/50 via-[#071317]/35 to-[#071317]/60" />
        <div className="absolute inset-0 bg-[#071317]/25 backdrop-brightness-[0.95]" />
      </div>

      {/* Centered Hero Content */}
      <div className="relative z-10 max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 sm:space-y-6 max-w-4xl mx-auto"
        >
          {/* Sub-tag: SINCE 2017 */}
          <span className="block text-xs sm:text-sm font-mono font-medium tracking-[0.25em] text-[#34D399] uppercase">
            SINCE 2017
          </span>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.15]">
            Building protected cultivation <br />
            <span className="text-[#34D399] font-bold">for better farming.</span>
          </h1>

          {/* Paragraph Statement */}
          <p className="text-sm sm:text-base md:text-lg text-emerald-100/90 font-normal leading-relaxed max-w-2xl mx-auto pt-2">
            Pujya Agritech has been working in protected cultivation and agricultural infrastructure since 2017, delivering practical greenhouse, polyhouse, shade-net and other protected cultivation solutions designed around real farming requirements.
          </p>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto max-w-sm sm:max-w-none mx-auto">
            {onOpenConsultationModal && (
              <button
                onClick={onOpenConsultationModal}
                className="inline-flex items-center justify-center gap-2.5 bg-[#34D399] hover:bg-[#25b882] text-[#071317] font-bold text-xs sm:text-sm px-6 sm:px-7 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all uppercase tracking-wider cursor-pointer text-center"
              >
                <span>GET PROJECT CONSULTATION</span>
              </button>
            )}
            {onViewProducts && (
              <button
                onClick={onViewProducts}
                className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-6 sm:px-7 py-3.5 rounded-xl border border-white/30 transition-all uppercase tracking-wider cursor-pointer text-center"
              >
                <span>VIEW PRODUCTS</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

