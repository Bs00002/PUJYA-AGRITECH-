import React, { useState } from 'react';
import { ANATOMY_COMPONENTS } from '../data/anatomy';
import { ComponentAnatomy } from '../types';
import { ShieldCheck, Sun, Fan, Droplets, ShieldAlert, Sliders, CheckCircle2, ChevronRight, Layers } from 'lucide-react';

export const AnatomyExplorer: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<ComponentAnatomy>(ANATOMY_COMPONENTS[0]);

  const getIcon = (id: string) => {
    switch (id) {
      case 'gi_steel': return ShieldCheck;
      case 'uv_polyfilm': return Sun;
      case 'fan_pad': return Fan;
      case 'farm_pond': return Droplets;
      case 'insect_net': return ShieldAlert;
      case 'thermal_screen': return Sliders;
      default: return Layers;
    }
  };

  return (
    <section className="py-12 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive Structural Blueprint</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Anatomy of a Pujya Agritech Hi-Tech Greenhouse
          </h2>
          <p className="text-slate-300 text-sm">
            Select any structural component to inspect engineering specifications, raw material standards, and operational longevity parameters.
          </p>
        </div>

        {/* Explorer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Component Selection Sidebar */}
          <div className="lg:col-span-5 space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1 mb-2">
              Select Structural Layer:
            </p>

            {ANATOMY_COMPONENTS.map((comp) => {
              const IconComp = getIcon(comp.id);
              const isActive = activeComponent.id === comp.id;

              return (
                <div
                  key={comp.id}
                  onClick={() => setActiveComponent(comp)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between group ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-900/80 to-teal-900/60 border-emerald-500 shadow-lg text-white'
                      : 'bg-slate-800/80 border-slate-700/80 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg ${isActive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-emerald-400'}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold">{comp.name}</h3>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{comp.shortDesc}</p>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:translate-x-1'} transition-transform`} />
                </div>
              );
            })}
          </div>

          {/* Detailed Component View Card */}
          <div className="lg:col-span-7 bg-slate-800/90 rounded-2xl border border-slate-700 p-6 sm:p-8 space-y-6 shadow-2xl">
            
            {/* Visual Box */}
            <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
              <img
                src={activeComponent.imageFallbackUrl}
                alt={activeComponent.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <span className="bg-emerald-500 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded tracking-wider">
                    {activeComponent.category}
                  </span>
                  <h3 className="text-xl font-black text-white mt-1">{activeComponent.name}</h3>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Engineering Overview</p>
              <p className="text-sm text-slate-200 leading-relaxed font-normal">{activeComponent.fullDesc}</p>
            </div>

            {/* Technical Specifications Matrix */}
            <div className="space-y-3 pt-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Material & Quality Specs</p>
              
              <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-700/80 space-y-2.5 text-xs">
                {Object.entries(activeComponent.specs).map(([key, value], idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5 border-b border-slate-800/80 last:border-0 gap-1">
                    <span className="font-semibold text-slate-400">{key}:</span>
                    <span className="font-bold text-emerald-300 sm:text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pujya Quality Guarantee */}
            <div className="bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-700/40 flex items-center gap-2.5 text-xs text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>All Pujya Agritech materials are certified to meet National Horticulture Board (NHB) & BIS Standards.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
