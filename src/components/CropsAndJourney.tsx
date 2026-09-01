import React from 'react';
import { motion } from 'motion/react';
import { 
  Sprout, 
  Flower2, 
  Apple, 
  Trees, 
  FlaskConical, 
  ShieldCheck, 
  ArrowRight,
  User,
  Compass,
  Ruler,
  Building2,
  Droplets,
  TrendingUp,
  PackageCheck
} from 'lucide-react';

export const CROP_CATEGORIES = [
  {
    title: 'High-Value Vegetables',
    crops: ['Color Capsicum (Red/Yellow Bell Peppers)', 'Dutch Cucumber', 'Exotic Tomatoes (Cherry/Plum)', 'Seedless Watermelon'],
    icon: Sprout,
    badge: 'Vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb1626f?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Commercial Cut Flowers',
    crops: ['Dutch Rose', 'Gerbera', 'Carnation', 'Orchids', 'Anthurium'],
    icon: Flower2,
    badge: 'Floriculture',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Exotic & Export Crops',
    crops: ['Broccoli', 'Zucchini', 'Lettuce & Leafy Greens', 'Strawberries'],
    icon: Apple,
    badge: 'Exotics',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Nursery & Seedling Production',
    crops: ['Vegetable Grafted Nursery', 'Tissue Culture Plants', 'Fruit Seedling Saplings'],
    icon: Trees,
    badge: 'Nursery',
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Medicinal & Aromatic Plants',
    crops: ['High-value Medicinal Herbs', 'Aromatic Extract Crops', 'Controlled Nursery Stock'],
    icon: FlaskConical,
    badge: 'Medicinal',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Research & Institutional Farming',
    crops: ['Agricultural University Trial Plots', 'Hybrid Seed Multiplication', 'R&D Breeding Trials'],
    icon: FlaskConical,
    badge: 'R&D Projects',
    imageUrl: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=800&q=80'
  }
];

export const JOURNEY_MILESTONES = [
  { step: '01', title: 'Grower / Farmer', icon: User, desc: 'Project vision & land allocation' },
  { step: '02', title: 'Land Assessment', icon: Compass, desc: 'Site, soil & water evaluation' },
  { step: '03', title: 'Project Planning', icon: Ruler, desc: 'Custom engineering & subsidy guidance' },
  { step: '04', title: 'Greenhouse Setup', icon: Building2, desc: 'Galvanized structure & UV film setup' },
  { step: '05', title: 'Irrigation & Cooling', icon: Droplets, desc: 'Drip lines & fan-pad installation' },
  { step: '06', title: 'Crop Plantation', icon: Sprout, desc: 'High-yield seedling planting' },
  { step: '07', title: 'Agronomy Support', icon: TrendingUp, desc: 'Fertigation & pest protocols' },
  { step: '08', title: 'Harvest & Returns', icon: PackageCheck, desc: 'Grading, market linkage & profits' },
];

export const CropsAndJourney: React.FC = () => {
  return (
    <div className="space-y-20 py-20 bg-slate-50 border-t border-slate-200">
      
      {/* 1. Crops Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <Sprout className="w-3.5 h-3.5 text-emerald-700" />
            <span>Built For High-Value Cultivation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-sans">
            Optimized Crop Applications
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Engineered greenhouse and polyhouse environments designed specifically for high-return vegetable, floriculture, exotic, and nursery crops.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CROP_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 bg-slate-900 overflow-hidden">
                    <img
                      src={cat.imageUrl}
                      alt={cat.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    <span className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-emerald-500/20">
                      {cat.badge}
                    </span>

                    <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-emerald-600 text-white">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-white text-base font-sans">{cat.title}</h3>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Key Crop Varieties:</p>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {cat.crops.map((crop, cIdx) => (
                        <li key={cIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 flex-shrink-0" />
                          <span className="font-medium">{crop}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 2. End-to-End Project Journey Visual */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
              Complete Partnership
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              "We don't just build a structure. We support the journey from project planning to cultivation and beyond."
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              Our continuous technical support ensures your greenhouse operates smoothly at every operational phase.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 pt-4">
            {JOURNEY_MILESTONES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="bg-slate-950/90 rounded-2xl p-4 border border-slate-800 text-center space-y-2 hover:border-emerald-500/50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center mx-auto text-xs font-bold font-mono group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 block font-mono">
                    STAGE {item.step}
                  </span>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{item.title}</h4>
                  <p className="text-[10px] text-slate-400 leading-tight line-clamp-2">{item.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
};
