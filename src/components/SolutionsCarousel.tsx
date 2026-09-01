import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Layers, CheckCircle2, ShieldCheck } from 'lucide-react';

export interface SolutionItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  features: string[];
  imageUrl: string;
}

export const SOLUTIONS_LIST: SolutionItem[] = [
  {
    id: 'sol-greenhouse',
    title: 'Greenhouse Solutions',
    category: 'Commercial & Institutional',
    tagline: 'Gothic & Sawtooth Climatic Frameworks',
    description: 'Precision engineered greenhouse structures designed to withstand local wind loads while providing maximum light transmission and climate control.',
    features: [
      'Gothic / Sawtooth roof ventilation arches',
      'Hot-dip galvanized steel tubular frame',
      '200 Micron 5-layer UV cladding film',
      'Automated roll-up side curtains'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'sol-polyhouse',
    title: 'Poly House',
    category: 'Protected Farming',
    tagline: 'Naturally & Forcefully Ventilated Polyhouses',
    description: 'High performance polyhouse structures designed for high-value vegetable and flower cultivation with microclimate control.',
    features: [
      'Top ridge continuous ventilation gap',
      'Anti-drip & anti-fog inner poly lining',
      '40-Mesh insect net side screening',
      'Trellising wire support framework'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'sol-nethouse',
    title: 'Net House',
    category: 'Shade & Pest Protection',
    tagline: 'Flat Roof & Dome Type Shade Net Houses',
    description: 'Economical and effective shade net house structures offering protection against harsh solar radiation, hail, wind, and pests.',
    features: [
      '35% to 75% UV stabilized HDPE shade net',
      'Galvanized steel pipe structural support',
      'Anti-hail & anti-bird protective netting',
      'Suitable for nursery & leafy green crops'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'sol-fanpad',
    title: 'Fan & Pad Cooling Systems',
    category: 'Climate Automation',
    tagline: 'Evaporative Cooling & Temperature Control',
    description: 'Evaporative cellulose cooling pads and heavy-duty axial exhaust fans that maintain optimal temperature and humidity inside polyhouses.',
    features: [
      'Cross-fluted cellulose evaporative cooling pads',
      'Heavy-duty stainless steel exhaust fan units',
      'Automated thermostat & sensor controls',
      'Uniform temperature reduction across bays'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb1626f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'sol-irrigation',
    title: 'Drip Irrigation & Fertigation',
    category: 'Micro-Irrigation',
    tagline: 'Precision Water & Nutrient Delivery Systems',
    description: 'Pressure-compensating drip irrigation lines, venture injectors, sand/disc filters, and automated fertigation units.',
    features: [
      'Pressure-compensating inline drip tubing',
      'Multi-channel automated fertilizer dosing unit',
      'Primary disc filtration & media sand filters',
      'Targeted root-zone nutrient absorption'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'sol-materials',
    title: 'Protected Cultivation Materials',
    category: 'Agricultural Supplies',
    tagline: 'Pan-India Supply of Premium Farm Materials',
    description: 'Pan-India supply of UV poly film, shade nets, insect nets, mulching film, weed mat, grow bags, and geo-membrane pond liners.',
    features: [
      '200 Micron multi-layer UV poly film rolls',
      '35% - 75% Mono x Tape HDPE shade netting',
      'Silver-black mulching film & weed barrier mats',
      'Geo-membrane HDPE liners for farm ponds'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
  }
];

interface SolutionsCarouselProps {
  onSelectSolution: (title: string) => void;
}

export const SolutionsCarousel: React.FC<SolutionsCarouselProps> = ({ onSelectSolution }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="solutions" className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-emerald-700" />
              <span>Explore Our Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-sans">
              Protected Cultivation Infrastructure & Systems
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Tailored greenhouse, polyhouse, shade net, and irrigation solutions for commercial growers, progressive farmers, and agricultural institutions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleScroll('left')}
              className="p-3 rounded-2xl bg-white hover:bg-emerald-700 text-slate-800 hover:text-white border border-slate-200 shadow-xs transition-all active:scale-95"
              aria-label="Previous solutions"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-3 rounded-2xl bg-white hover:bg-emerald-700 text-slate-800 hover:text-white border border-slate-200 shadow-xs transition-all active:scale-95"
              aria-label="Next solutions"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Cards */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory pt-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {SOLUTIONS_LIST.map((sol) => (
            <motion.div
              key={sol.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="snap-start flex-shrink-0 w-80 sm:w-96 bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Header */}
                <div className="relative h-52 overflow-hidden bg-slate-900">
                  <img
                    src={sol.imageUrl}
                    alt={sol.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  <span className="absolute top-4 left-4 bg-emerald-700 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    {sol.category}
                  </span>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold font-sans text-white leading-tight">
                      {sol.title}
                    </h3>
                    <p className="text-[11px] text-emerald-300 font-medium mt-0.5">
                      {sol.tagline}
                    </p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {sol.description}
                  </p>

                  <div className="space-y-2 pt-1 border-t border-slate-100">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Highlights:</p>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {sol.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-4 bg-slate-50/80 border-t border-slate-100">
                <button
                  onClick={() => onSelectSolution(sol.title)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-emerald-700 text-slate-800 hover:text-white border border-slate-200 hover:border-emerald-700 text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 group shadow-xs"
                >
                  <span>Request Solution Specs</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-600 group-hover:text-white transition-colors" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
