import React from 'react';
import { Building2, Award, ShieldCheck, Factory, Globe2 } from 'lucide-react';

export const FactoryStrength: React.FC = () => {
  const capabilities = [
    {
      title: 'Manufacturing & Fabrication Base',
      desc: 'Equipped with CNC tube benders, profiling equipment, and polyfilm cutting machinery.',
      icon: Factory
    },
    {
      title: 'Galvanized Steel Protection',
      desc: 'Structural columns, purlins, and roof trusses utilize hot-dip galvanized steel framing to resist corrosion in humid farm environments.',
      icon: ShieldCheck
    },
    {
      title: 'Engineering & Field Support',
      desc: 'Turnkey structural execution with site installation guidance, foundation layouts, and localized structural planning.',
      icon: Globe2
    },
    {
      title: 'Quality Manufacturing Standards',
      desc: 'Fabrication processes adhering to quality engineering standards and greenhouse structural specifications.',
      icon: Award
    }
  ];

  return (
    <section className="py-14 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5 text-blue-700" />
            <span>Pujya Agritech / Manufacturing Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
            Factory Capabilities & Infrastructure
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            From raw steel processing to precision fabrication, we deliver commercial protected cultivation structures engineered for reliability.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-[#004b93] mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 font-sans mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Turnkey Process Timeline - Corporate Navy */}
        <div className="mt-14 bg-gradient-to-br from-slate-900 to-[#003870] text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-blue-300 font-bold text-xs uppercase tracking-widest block mb-1">Full Service Execution</span>
            <h3 className="text-2xl font-black font-sans">Turnkey Project Workflow</h3>
            <p className="text-xs text-slate-300 mt-1">From initial site evaluation to subsidy documentation support, installation, and initial crop setup.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-700/60">
              <span className="text-blue-300 font-black text-xs uppercase tracking-wider block mb-1">Step 01</span>
              <h4 className="font-bold text-sm text-white font-sans">Land Survey & CAD Design</h4>
              <p className="text-xs text-slate-300 mt-1">Topographical evaluation, soil assessment, wind load consideration, and custom CAD drawings.</p>
            </div>

            <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-700/60">
              <span className="text-blue-300 font-black text-xs uppercase tracking-wider block mb-1">Step 02</span>
              <h4 className="font-bold text-sm text-white font-sans">Precision Factory Fabrication</h4>
              <p className="text-xs text-slate-300 mt-1">Pipe bending, hot-dip zinc galvanizing, polyfilm & shade net preparation with quality inspection.</p>
            </div>

            <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-700/60">
              <span className="text-blue-300 font-black text-xs uppercase tracking-wider block mb-1">Step 03</span>
              <h4 className="font-bold text-sm text-white font-sans">On-Site Erection & Pond Lining</h4>
              <p className="text-xs text-slate-300 mt-1">Concrete footing placement, truss assembly, cladding tensioning, and HDPE farm pond installation.</p>
            </div>

            <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-700/60">
              <span className="text-blue-300 font-black text-xs uppercase tracking-wider block mb-1">Step 04</span>
              <h4 className="font-bold text-sm text-white font-sans">Subsidy & Agronomy Support</h4>
              <p className="text-xs text-slate-300 mt-1">Documentation guidance for government schemes, fertigation commissioning, and crop growing support.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
