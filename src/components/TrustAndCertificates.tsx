import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  GraduationCap, 
  Briefcase, 
  Users, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ExternalLink,
  ArrowRight,
  Mail,
  FileCheck
} from 'lucide-react';

export const SERVED_SECTORS = [
  {
    title: 'Government Bodies',
    desc: 'Empanelled with Gujarat State Horticulture Department for subsidized greenhouse and net house projects.',
    icon: Building2,
    badge: 'Empanelled Supplier'
  },
  {
    title: 'Agricultural Institutions',
    desc: 'Supplying research greenhouses and nursery structures for state agricultural universities & ICAR institutes.',
    icon: GraduationCap,
    badge: 'Academic & R&D'
  },
  {
    title: 'Commercial Growers',
    desc: 'High-acreage polyhouse and fan-and-pad installations for corporate agribusinesses and export growers.',
    icon: Briefcase,
    badge: 'Commercial Agribusiness'
  },
  {
    title: 'Progressive Farmers',
    desc: 'Delivering end-to-end guidance, subsidy paperwork assistance, and structures to individual progressive farmers.',
    icon: Users,
    badge: 'Farmer Projects'
  }
];

interface TrustAndCertificatesProps {
  onOpenConsultation: () => void;
  onContactClick: () => void;
}

export const TrustAndCertificates: React.FC<TrustAndCertificatesProps> = ({ 
  onOpenConsultation, 
  onContactClick 
}) => {
  return (
    <div className="space-y-20 py-20 bg-white">
      
      {/* 1. Served Sectors / Trust Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Trusted Industry Presence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-sans">
            Serving Key Agricultural Sectors
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Pujya Agritech partners with state bodies, academic institutes, and growers to deliver reliable protected farming infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVED_SECTORS.map((sector, idx) => {
            const Icon = sector.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-50 p-6 rounded-3xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
                    {sector.badge}
                  </span>
                  <h3 className="font-bold text-slate-900 text-lg">{sector.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {sector.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </section>

      {/* 2. Certificates & Associations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Empanelment & Memberships</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Certifications & Industry Associations
              </h3>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Official empanelments and professional associations verified in company documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Directorate of Horticulture Gujarat */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex-shrink-0">
                <FileCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">
                  State Empanelment
                </span>
                <h4 className="font-bold text-white text-base">
                  Directorate of Horticulture, Gujarat State
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Empanelled supplier and manufacturer for construction of Green Houses and Net Houses under government subsidy and horticulture development programs in Gujarat State.
                </p>
              </div>
            </div>

            {/* IGMA */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex-shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">
                  Industry Association
                </span>
                <h4 className="font-bold text-white text-base">
                  Indian Green House Manufacturers Association (IGMA)
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Professional association supporting standard quality manufacturing practices, structural compliance, and technical excellence in greenhouse fabrication across India.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Final CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-8 sm:p-14 shadow-2xl border border-emerald-700/40">
          
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/30 text-emerald-200 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Project Consultation & Design</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Planning Your Greenhouse Project?
            </h2>

            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed font-normal">
              From site assessment and planning to protected cultivation infrastructure and ongoing support, let's build the right solution for your project.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenConsultation}
                className="px-8 py-4 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 font-black text-xs uppercase tracking-wider shadow-lg transition-all active:scale-95 flex items-center gap-2"
              >
                <span>GET PROJECT CONSULTATION</span>
                <ArrowRight className="w-4 h-4 text-emerald-700" />
              </button>

              <button
                onClick={onContactClick}
                className="px-8 py-4 rounded-xl bg-emerald-950/80 hover:bg-emerald-950 text-white font-bold text-xs uppercase tracking-wider border border-emerald-400/30 transition-all flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-emerald-300" />
                <span>CONTACT US</span>
              </button>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none p-8 hidden lg:block">
            <Award className="w-96 h-96 text-white" />
          </div>

        </div>
      </section>

    </div>
  );
};
