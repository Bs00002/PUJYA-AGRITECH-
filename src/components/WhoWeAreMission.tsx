import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface WhoWeAreMissionProps {
  imageSrc?: string;
  onLearnMoreAboutClick?: () => void;
  onViewProductsClick?: () => void;
}

export const WhoWeAreMission: React.FC<WhoWeAreMissionProps> = ({ 
  imageSrc = '/about-hero-greenhouse.png',
  onLearnMoreAboutClick,
  onViewProductsClick
}) => {
  return (
    <section className="relative py-12 md:py-16 bg-white text-white font-sans overflow-hidden">
      
      {/* Organic Top Edge Divider */}
      <div className="w-full overflow-hidden leading-none z-10 relative -mb-1">
        <svg className="w-full h-8 md:h-12 text-[#006B8F] fill-current" viewBox="0 0 1440 48" preserveAspectRatio="none">
          <path d="M0,32 C140,44 260,14 380,30 C500,44 620,12 740,26 C860,40 980,12 1100,28 C1220,42 1340,16 1440,32 L1440,48 L0,48 Z" />
        </svg>
      </div>

      {/* Main Deep Pujya Teal (#006B8F) Section Body — Exact Color matching OUR CERTIFICATIONS */}
      <div className="bg-[#006B8F] py-12 md:py-16 px-4 relative z-0">
        <div className="max-w-[1280px] w-[94%] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* LEFT COLUMN: Modern Hi-Tech Greenhouse Facility Image */}
            <div className="lg:col-span-5 relative group">
              <div className="relative rounded-2xl overflow-hidden border-2 border-white/25 bg-white/10 shadow-2xl h-[280px] sm:h-[340px] lg:h-[380px]">
                <img
                  src={imageSrc}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.endsWith('/who-we-are-greenhouse.png')) {
                      target.src = '/who-we-are-greenhouse.png';
                    }
                  }}
                  alt="Pujya Agritech Commercial Greenhouse Facility"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="font-mono bg-black/50 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20 font-semibold">
                    Turnkey Agritech Projects
                  </span>
                  <span className="bg-[#AEE583]/90 text-[#10232B] font-bold px-2.5 py-1 rounded-md text-[11px] uppercase tracking-wider">
                    Across India
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Eyebrow + Headline + 3 Paragraphs + Actions */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-5 h-5 text-[#AEE583]" />
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-widest uppercase text-white">
                  WHO WE ARE
                </h2>
              </div>

              {/* EXACT 3 PARAGRAPHS IN CONTRASTING WHITE TEXT */}
              <div className="space-y-3.5 text-sm sm:text-base text-white/95 leading-[1.7] font-normal">
                <p>
                  Established in 2017 and headquartered in Ahmedabad, <strong className="text-white font-bold">Pujya Agritech</strong> is a professionally managed organization delivering advanced and reliable solutions in protected farming infrastructure across India.
                </p>
                <p>
                  With a strong foundation built on technical expertise, industry experience, and customer-centric values, we specialize in the design, supply, and execution of turnkey <strong className="text-white font-bold">Poly House, Greenhouse, Fan & Pad Cooling Systems</strong>, and <strong className="text-white font-bold">Shade Net House</strong> projects.
                </p>
                <p>
                  Over the years, we have successfully executed a diverse portfolio of Government, Institutional, and Farmer-based projects, establishing ourselves as a trusted partner in modern agriculture development.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                {onLearnMoreAboutClick && (
                  <button
                    onClick={onLearnMoreAboutClick}
                    className="inline-flex items-center gap-2 text-sm font-bold tracking-wider text-[#006B8F] bg-white hover:bg-slate-100 px-5 py-2.5 rounded-lg shadow-sm transition-all uppercase cursor-pointer"
                  >
                    <span>ABOUT PUJYA AGRITECH</span>
                    <ArrowRight className="w-4 h-4 text-[#006B8F]" />
                  </button>
                )}
                {onViewProductsClick && (
                  <button
                    onClick={onViewProductsClick}
                    className="inline-flex items-center gap-2 text-sm font-bold tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/30 px-5 py-2.5 rounded-lg transition-all uppercase cursor-pointer"
                  >
                    <span>OUR PRODUCTS</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Organic Bottom Edge Divider */}
      <div className="w-full overflow-hidden leading-none z-10 relative -mt-1">
        <svg className="w-full h-8 md:h-12 text-[#006B8F] fill-current" viewBox="0 0 1440 48" preserveAspectRatio="none">
          <path d="M0,0 L1440,0 L1440,16 C1320,32 1200,10 1080,24 C960,38 840,12 720,26 C600,40 480,8 360,22 C240,36 120,10 0,18 Z" />
        </svg>
      </div>

    </section>
  );
};

export default WhoWeAreMission;
