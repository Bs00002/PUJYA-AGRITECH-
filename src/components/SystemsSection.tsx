import React from 'react';
import { GREENHOUSE_SYSTEMS } from '../data/products';
import { Check, ShieldCheck, Zap, Droplets, Sun, Wind, ArrowRight } from 'lucide-react';

interface SystemsSectionProps {
  onOpenQuote: (systemName?: string) => void;
}

export const SystemsSection: React.FC<SystemsSectionProps> = ({ onOpenQuote }) => {
  return (
    <section className="py-14 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span>Automated Climate & Fertigation Equipment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
            Greenhouse Auxiliary Systems & Automation
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Turnkey climate control, motor drive shading screens, cellulose cooling pads, axial exhaust fans, and micro-dosing fertigation loops for maximum farm productivity.
          </p>
        </div>

        {/* Systems Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {GREENHOUSE_SYSTEMS.map((system) => (
            <div
              key={system.id}
              className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden p-6 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <span className="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {system.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">IS-1239 Grade Standard</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 font-sans">{system.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{system.description}</p>

                {/* Key Specs */}
                <div className="space-y-1.5 pt-2 border-t border-slate-200/80">
                  <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">Key Technical Features:</span>
                  <div className="grid grid-cols-1 gap-1">
                    {system.keySpecs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">Agronomic Advantages:</span>
                  <div className="flex flex-wrap gap-2">
                    {system.benefits.map((ben, i) => (
                      <span key={i} className="bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                        {ben}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Available for individual or turnkey installation</span>
                <button
                  onClick={() => onOpenQuote(system.name)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                >
                  <span>Request System Quote</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
