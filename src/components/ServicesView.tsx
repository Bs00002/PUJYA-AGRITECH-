import React from 'react';
import { Compass, FileSpreadsheet, Layers, Droplets, ShieldCheck, HeartHandshake, CheckCircle2, ArrowRight } from 'lucide-react';

interface ServicesViewProps {
  onOpenQuote: (serviceName?: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onOpenQuote }) => {
  const servicesList = [
    {
      id: 'srv-cad',
      title: 'Land Survey & Structural CAD Design',
      icon: Compass,
      description: 'Comprehensive topographical land survey, soil load-bearing capacity testing, wind solar radiation profiling, and 3D CAD architectural modeling tailored to your crop.',
      deliverables: ['Topographical Contour Map', 'Structural Wind Load Calculation Sheet', '3D CAD Architectural Blueprints', 'Shading & Solar Angle Analysis']
    },
    {
      id: 'srv-subsidy',
      title: 'NHB & MIDH 50% Subsidy Assistance & DPR',
      icon: FileSpreadsheet,
      description: 'End-to-end guidance for securing National Horticulture Board (NHB) and MIDH state horticulture subsidies covering up to 50% of capital project cost.',
      deliverables: ['Bankable Detailed Project Report (DPR)', 'Horticulture Department Registration', 'Inspection Joint Committee Guidance', 'Subsidy Disbursement Documentation']
    },
    {
      id: 'srv-farmpond',
      title: 'HDPE Geo-Membrane Lined Farm Pond Construction',
      icon: Droplets,
      description: 'Design and excavation of rainwater harvesting reservoirs lined with 500-micron UV stabilized HDPE geo-membrane for 100% drought-proof irrigation.',
      deliverables: ['Laser Level Excavation Plan', '500-Micron Virgin HDPE Geo-Membrane', 'Double Wedge Hot-Air Seam Welding', 'Submersible Floating Intake Pumps']
    },
    {
      id: 'srv-fabrication',
      title: 'IS-1239 Structural Fabrication & On-Site Erection',
      icon: Layers,
      description: 'Hot-dip galvanized structural steel manufacturing and precision bolt-together site assembly by certified engineering teams.',
      deliverables: ['IS-1239 Grade GI Tubular Columns', 'CNC Gothic Arch & Truss Units', 'Aluminum Alloy Gutter Extrusions', 'Concrete Footing Anchor Foundations']
    },
    {
      id: 'srv-climate',
      title: 'Automated Fertigation & Climate Control Setup',
      icon: ShieldCheck,
      description: 'Installation of microprocessor EC/pH dosing skids, evaporative cooling pads, axial exhaust fans, motorized shading screens, and high-pressure foggers.',
      deliverables: ['4-Channel Venturi Dosing Machine', 'Cellulose Pad & Axial Fan Array', 'Rack & Pinion Motorized Shade Screens', 'Weather Station Sensor Integration']
    },
    {
      id: 'srv-agronomy',
      title: 'Turnkey Agronomy & Crop Advisory Support',
      icon: HeartHandshake,
      description: 'Ongoing agronomy guidance from planting to harvest, including nutrient recipe formulation, pest scouting, pruning schedules, and market grading.',
      deliverables: ['Crop Nutrient EC/pH Feeding Schedules', 'Integrated Pest Management (IPM)', 'Substrate EC Flushing Protocols', 'Direct Buyer Marketing Assistance']
    }
  ];

  return (
    <div className="bg-slate-50 py-12 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Turnkey Engineering & Agronomy Contracting</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
            End-to-End Greenhouse Services
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            From initial topographical soil surveys to subsidy DPR approval, structural erection, and ongoing agronomic crop support — Pujya Agritech handles every stage of your protected cultivation investment.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((srv) => {
            const IconComponent = srv.icon;
            return (
              <div
                key={srv.id}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <IconComponent className="w-6 h-6 text-emerald-700" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 font-sans">{srv.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{srv.description}</p>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">Key Deliverables:</span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {srv.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => onOpenQuote(srv.title)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#004b93] hover:bg-[#003870] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>Request Service Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
