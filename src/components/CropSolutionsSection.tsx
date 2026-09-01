import React from 'react';
import { CROP_SOLUTIONS } from '../data/products';
import { Sprout, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

interface CropSolutionsSectionProps {
  onOpenQuote: (cropName?: string) => void;
}

export const CropSolutionsSection: React.FC<CropSolutionsSectionProps> = ({ onOpenQuote }) => {
  return (
    <section className="py-14 bg-emerald-50/50 text-slate-900 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sprout className="w-3.5 h-3.5 text-emerald-600" />
            <span>Turnkey Protected Cultivation Packages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
            Tailored Solutions by Crop Type
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Custom-designed greenhouse structural geometry, specialized light spectrum covers, and irrigation formulations tailored to maximize yield for high-value commercial crops.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CROP_SOLUTIONS.map((crop) => (
            <div
              key={crop.id}
              className="bg-white rounded-2xl border border-emerald-200 shadow-sm overflow-hidden hover:border-emerald-400 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={crop.imageUrl}
                  alt={crop.cropName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                
                <div className="absolute top-4 left-4 bg-emerald-600 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{crop.yieldBoost}</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-black text-white font-sans">{crop.cropName}</h3>
                  <p className="text-xs text-emerald-300 font-semibold mt-0.5">Recommended Structure: {crop.recommendedStructure}</p>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <p className="text-xs text-slate-600 leading-relaxed">{crop.description}</p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">Recommended Auxiliary Equipment:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {crop.recommendedSystems.map((sys, idx) => (
                        <span key={idx} className="bg-emerald-50 text-emerald-900 text-[11px] font-semibold px-2.5 py-1 rounded-md border border-emerald-200">
                          {sys}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1 pt-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Agronomic Highlights:</span>
                    {crop.keyFeatures.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Turnkey agronomy support included</span>
                  <button
                    onClick={() => onOpenQuote(`${crop.cropName} Greenhouse Solution`)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Get Crop Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
