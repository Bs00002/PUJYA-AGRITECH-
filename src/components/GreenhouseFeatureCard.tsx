import React from 'react';
import { CheckCircle2, Sprout, ShieldCheck, Sun, Layers, ArrowRight } from 'lucide-react';

interface GreenhouseFeatureCardProps {
  onOpenConsultationModal?: (subject?: string) => void;
  onViewProductDetails?: (productSlug: string) => void;
}

export const GreenhouseFeatureCard: React.FC<GreenhouseFeatureCardProps> = ({
  onOpenConsultationModal,
  onViewProductDetails
}) => {
  const keyBenefits = [
    'Year-round crop production',
    'Higher yield and superior produce quality',
    'Protection from rain, wind, hail, and extreme temperatures',
    'Reduced pest and disease incidence',
    'Efficient use of water and fertilizers',
    'Better control over crop growth and harvest timing',
    'Increased profitability and return on investment',
    'Suitable for high-value vegetables, flowers, herbs, and nursery crops',
  ];

  const applications = [
    { title: 'Vegetables', items: 'Capsicum, Cucumber, Tomato, etc.' },
    { title: 'Flowers', items: 'Rose, Gerbera, Carnation, Orchid, etc.' },
    { title: 'Exotic & High-Value Crops', items: 'Leafy greens, berries, herbs' },
    { title: 'Nursery & Seedling Production', items: 'High-density sapling propagation' },
    { title: 'Medicinal & Aromatic Plants', items: 'Controlled active ingredient crops' },
    { title: 'Research & Commercial Farming', items: 'Agronomy trial & export facilities' },
  ];

  return (
    <section className="py-16 md:py-20 bg-white text-[#0B2533] font-sans border-b border-[#E4EAE5]">
      <div className="max-w-[1240px] w-[92%] mx-auto bg-gradient-to-br from-[#F4FAF5] via-[#EBF5ED] to-[#F2F8F3] border border-[#D6E6DA] rounded-[24px] md:rounded-[32px] shadow-[0_10px_35px_rgba(11,37,51,0.05)] p-7 sm:p-10 md:p-14 space-y-10">
        
        {/* Header & Main Introduction */}
        <div className="space-y-4 max-w-4xl">
          <div className="flex items-center gap-2">
            <Sprout className="w-5 h-5 text-[#267A4B]" />
            <span className="text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-[#267A4B]">
              PROTECTED CULTIVATION SOLUTIONS
            </span>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl md:text-[38px] font-extrabold tracking-tight text-[#0B2533] leading-tight">
              Greenhouse <span className="text-[#267A4B] font-semibold">— The Future of Agriculture</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#2C4250] leading-relaxed font-normal">
              A Greenhouse is a scientifically engineered protected cultivation structure designed to create an ideal environment for plant growth. Covered with high-quality UV-stabilized films or glass, a greenhouse allows precise control over critical growing conditions such as temperature, humidity, light intensity, ventilation, and irrigation.
            </p>
          </div>
        </div>

        {/* Two Column Grid: Benefits vs Applications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-2 items-start">
          
          {/* LEFT COLUMN: Key Benefits */}
          <div className="lg:col-span-7 bg-white/90 backdrop-blur-xs border border-[#D6E6DA] rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E4EAE5]">
              <ShieldCheck className="w-5 h-5 text-[#267A4B]" />
              <h3 className="text-lg font-bold text-[#0B2533] tracking-wide">
                Key Benefits Of Greenhouse Cultivation
              </h3>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#2C4250] font-medium">
              {keyBenefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#267A4B] shrink-0 mt-0.5" />
                  <span className="leading-snug">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT COLUMN: Applications */}
          <div className="lg:col-span-5 bg-white/90 backdrop-blur-xs border border-[#D6E6DA] rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E4EAE5]">
              <Sun className="w-5 h-5 text-[#267A4B]" />
              <h3 className="text-lg font-bold text-[#0B2533] tracking-wide">
                Applications
              </h3>
            </div>

            <p className="text-xs text-[#5A6E78] font-medium">
              Greenhouses are widely used for the cultivation of:
            </p>

            <div className="space-y-3">
              {applications.map((app, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#F5FAF6] border border-[#D6E6DA]/70">
                  <Layers className="w-4 h-4 text-[#267A4B] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#0B2533]">{app.title}</h4>
                    <p className="text-[11px] text-[#5A6E78]">{app.items}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom CTA Action Bar */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#D6E6DA]">
          <p className="text-xs sm:text-sm text-[#5A6E78] font-medium">
            Looking for custom engineered Greenhouse infrastructure built around your crop needs?
          </p>
          <div className="flex items-center gap-3">
            {onOpenConsultationModal && (
              <button
                onClick={() => onOpenConsultationModal('Greenhouse Infrastructure Inquiry')}
                className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-white bg-[#267A4B] hover:bg-[#1f613a] px-5 py-2.5 rounded-lg shadow-xs transition-all uppercase cursor-pointer"
              >
                <span>GET PROJECT CONSULTATION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
            {onViewProductDetails && (
              <button
                onClick={() => onViewProductDetails('greenhouses-poly-houses')}
                className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#267A4B] bg-white border border-[#267A4B]/40 hover:bg-[#267A4B]/10 px-5 py-2.5 rounded-lg transition-all uppercase cursor-pointer"
              >
                <span>VIEW SPECIFICATIONS</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
