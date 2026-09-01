import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Cpu, Ruler, Layers, Wrench, ThermometerSun, Headphones, ArrowRight } from 'lucide-react';

interface WhyChooseUsProps {
  onConsultationClick: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onConsultationClick }) => {
  const reasons = [
    {
      num: '01',
      title: 'Precision Engineering',
      desc: 'Structural stability calculations, wind load resistance, and optimal geometry engineered for maximum crop productivity.',
      icon: Cpu,
    },
    {
      num: '02',
      title: 'Custom Design',
      desc: 'Tailored greenhouse configurations based on your land topography, local microclimate, and crop selection.',
      icon: Ruler,
    },
    {
      num: '03',
      title: 'Quality Materials',
      desc: 'High-tensile hot-dip galvanized steel profiles, UV-stabilized 200 micron films, and premium anti-insect nets.',
      icon: Layers,
    },
    {
      num: '04',
      title: 'Expert Installation',
      desc: 'Skilled civil and structural project engineers ensuring precise, turnkey erection adhering to strict quality standards.',
      icon: Wrench,
    },
    {
      num: '05',
      title: 'Optimized Climate Control',
      desc: 'Automated fan & pad cooling, high-pressure foggers, thermal shading, and natural ventilation systems.',
      icon: ThermometerSun,
    },
    {
      num: '06',
      title: 'After-Sales Support',
      desc: 'Dedicated agronomy guidance, periodic structural audits, and prompt maintenance and spare material supply.',
      icon: Headphones,
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Proven Engineering Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-sans">
            Why Choose Pujya Agritech?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We deliver end-to-end protected cultivation infrastructure built on technical precision, premium raw materials, and complete agronomy support.
          </p>
        </div>

        {/* Content Layout: 6 Cards + High Quality Project Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Grid: 6 Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {reasons.map((item) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.num}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 hover:bg-white transition-all space-y-3 relative overflow-hidden group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-black text-slate-300 group-hover:text-emerald-600 transition-colors tracking-widest font-mono">
                      {item.num}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-sans">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Featured Greenhouse Visual Card */}
          <div className="lg:col-span-4 flex flex-col justify-between rounded-3xl overflow-hidden border border-slate-200 bg-slate-900 text-white relative shadow-md group">
            <img
              src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80"
              alt="Pujya Agritech Hi-Tech Commercial Greenhouse Project"
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            <div className="relative p-6 space-y-2 z-10">
              <span className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                Turnkey Execution
              </span>
              <h4 className="text-xl font-extrabold text-white leading-tight font-sans">
                Engineered for High-Yield Commercial Farming
              </h4>
            </div>

            <div className="relative p-6 space-y-4 z-10 bg-slate-950/80 backdrop-blur-md border-t border-slate-800">
              <p className="text-xs text-slate-300 leading-relaxed">
                From initial land assessment to bank loan subsidy guidance and crop production, Pujya Agritech manages every stage of your greenhouse investment.
              </p>
              <button
                onClick={onConsultationClick}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Request Project Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
