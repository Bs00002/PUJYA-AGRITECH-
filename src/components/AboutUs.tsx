import React from 'react';
import { ShieldCheck, ArrowRight, Award, PhoneCall, Quote } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { WhoWeAreMission } from './WhoWeAreMission';

interface AboutUsProps {
  onOpenConsultationModal?: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onOpenConsultationModal }) => {
  const { aboutUs } = useAdmin();

  const beliefPoints = [
    {
      title: 'Good Quality',
      desc: 'Heavy-duty hot-dip galvanized steel framing and UV-stabilized materials built for multi-season field durability.',
    },
    {
      title: 'Practical Solutions',
      desc: 'Simple, effective structure designs engineered specifically for Indian climate & farm conditions.',
    },
    {
      title: 'Reliable Work',
      desc: 'Honest engineering and dependable installation support from site planning to final handover.',
    },
    {
      title: 'Farmer Needs First',
      desc: 'Every farm structure is customized around real crop protection, ROI, and growing realities.',
    },
  ];

  return (
    <div className="bg-[#FBF9F5] text-[#10232B] font-sans selection:bg-[#006B8F] selection:text-white min-h-screen">
      
      {/* ========================================================================= */}
      {/* 1. EDITORIAL HERO SECTION (Cream / Off-White #FBF9F5) */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-[#E2DFD7] relative overflow-hidden">
        <div className="max-w-[1240px] w-[90%] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#10232B] leading-[1.1]">
                {aboutUs?.mainHeading || 'Built for Better Farming.'}
              </h1>

              <p className="text-base sm:text-lg text-[#4A5D68] leading-relaxed font-normal max-w-xl">
                Pujya Agritech designs, manufactures, and supplies reliable greenhouses, polyhouses, shade net houses, and turnkey protected farming infrastructure across India.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                {onOpenConsultationModal && (
                  <button
                    onClick={onOpenConsultationModal}
                    className="inline-flex items-center gap-2.5 bg-[#006B8F] hover:bg-[#005775] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4 text-[#AEE583]" />
                    <span>GET IN TOUCH WITH OUR TEAM</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Hero Image Card (Turnkey Commercial Polyhouse & Water Harvesting Complex) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-[#EBF5F8] group">
                <img
                  src="/about-hero-greenhouse.png"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/who-we-are-greenhouse.png';
                  }}
                  alt="Pujya Agritech Commercial Polyhouse and Water Harvesting Project"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#006B8F]/15 rounded-3xl -z-10 hidden sm:block"></div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. WHO WE ARE & OUR MISSION — EXACT PUJYA TEAL DESIGN WITH GREENHOUSE IMAGE */}
      {/* ========================================================================= */}
      <WhoWeAreMission
        onLearnMoreAboutClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onViewProductsClick={onOpenConsultationModal}
      />

      {/* ========================================================================= */}
      {/* 3. FOUNDER & LEADERSHIP SECTION (Premium Editorial Asymmetric Layout) */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#FAFBF9] border-b border-[#E2DFD7]">
        <div className="max-w-[1240px] w-[90%] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Column: Large Framed Founder Photograph */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[460px] aspect-[4/5] sm:h-[540px] lg:h-[580px] rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-xl group">
                
                {/* Real Photograph: Sunil Joshi */}
                <img
                  src="/sunil-joshi-founder.png"
                  alt="Sunil Joshi — Founder & Director, Pujya Agritech"
                  className="w-full h-full object-cover object-[center_top] group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/sunil-joshi.jpeg';
                  }}
                />

                {/* Subtle Image Overlay Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Elegant Bottom-Left Pill Badge */}
                <div className="absolute bottom-5 left-5 z-10 bg-white/95 backdrop-blur-md px-4 py-2 rounded-lg border border-gray-200/90 shadow-md flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#006B8F]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#10232B]">
                    FOUNDER — PUJYA AGRITECH
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Founder Information & Editorial Vision */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Eyebrow & Name Header */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#EBF5F8] border border-[#006B8F]/20 text-[#006B8F] text-xs font-mono font-bold uppercase tracking-widest">
                  <Award className="w-4 h-4 text-[#006B8F]" />
                  <span>LEADERSHIP</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#10232B] tracking-tight leading-tight">
                  Sunil Joshi
                </h2>

                <p className="text-sm font-mono font-bold text-[#006B8F] uppercase tracking-wider">
                  Founder & Director, Pujya Agritech
                </p>
              </div>

              {/* Professional Introduction */}
              <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
                <p>
                  Sunil Joshi established Pujya Agritech with a clear commitment: to provide Indian growers and farming enterprises with reliable, high-quality greenhouse structures and honest technical guidance.
                </p>
              </div>

              {/* Founder's Vision Editorial Quote Box */}
              <div className="p-6 sm:p-7 bg-white rounded-xl border-l-4 border-[#006B8F] border-y border-r border-gray-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#006B8F] uppercase tracking-widest">
                  <Quote className="w-4 h-4 text-[#006B8F]" />
                  <span>FOUNDER'S VISION</span>
                </div>

                <blockquote className="text-sm sm:text-base text-[#10232B] font-medium leading-relaxed italic">
                  "Under his leadership, Pujya Agritech has grown into a trusted partner for commercial growers across Gujarat and neighboring states. His approach remains straightforward—focus on practical field realities, heavy-duty hot-dip galvanized steel construction, and standing behind every structure we build."
                </blockquote>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. COMPANY JOURNEY & HIGHLIGHTS (Very Light Blue #EEF7FA) */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-[#EEF7FA] border-b border-[#E2DFD7]">
        <div className="max-w-[1240px] w-[90%] mx-auto space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Big Label Block */}
            <div className="lg:col-span-4 space-y-2 sticky top-28">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#006B8F] font-bold block">
                03 / OUR JOURNEY & CAPABILITIES
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#10232B]">
                Engineered for Indian Climate
              </h2>
              <div className="w-12 h-1 bg-[#006B8F] rounded-full mt-2"></div>
            </div>

            {/* Right Story Paragraphs */}
            <div className="lg:col-span-8 space-y-6 text-sm sm:text-base text-[#4A5D68] leading-relaxed">
              <p className="text-base sm:text-lg font-medium text-[#10232B] leading-relaxed">
                Pujya Agritech began in 2017 after observing the everyday climate challenges facing growers in India—unpredictable rain, scorching summer heat, and intense pest cycles that ruin healthy harvests.
              </p>
              <p>
                Instead of offering standard, off-the-shelf kits, we engineered robust, field-tested structures. From our manufacturing facility in Gandhinagar and headquarters in Ahmedabad, we fabricate high-grade hot-dip galvanized steel framing paired with multi-layer UV poly films and precision shade nets.
              </p>
              <p>
                Today, we execute complete turnkey projects—handling structural design, component manufacturing, material supply, and site erection with total engineering integrity.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. WHAT WE BELIEVE (Warm Cream #FBF9F5) */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-[#FBF9F5]">
        <div className="max-w-[1240px] w-[90%] mx-auto space-y-10">
          
          <div className="space-y-2 max-w-xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#006B8F] font-bold block">
              04 / OUR VALUES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#10232B]">
              What We Believe
            </h2>
            <p className="text-xs sm:text-sm text-[#526673]">
              Four core principles that guide every structure we build across India.
            </p>
          </div>

          {/* Compact 4-Point Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {beliefPoints.map((pt, idx) => (
              <div
                key={pt.title}
                className="p-6 bg-white border border-[#E2DFD7] rounded-2xl space-y-3 hover:border-[#006B8F] transition-all shadow-sm hover:shadow-md group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#EBF5F8] text-[#006B8F] font-mono font-bold text-xs flex items-center justify-center group-hover:bg-[#006B8F] group-hover:text-white transition-colors">
                  0{idx + 1}
                </div>
                <h3 className="text-sm font-bold font-mono tracking-wider uppercase text-[#10232B]">
                  {pt.title}
                </h3>
                <p className="text-xs text-[#526673] leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CALL TO ACTION BANNER (#006B8F PUJYA BLUE) */}
      {/* ========================================================================= */}
      <section className="bg-[#006B8F] text-white py-14 sm:py-16">
        <div className="max-w-[1240px] w-[90%] mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
            Ready to Plan Your Greenhouse or Polyhouse Project?
          </h2>
          <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto font-normal">
            Talk to our engineering experts in Ahmedabad & Gandhinagar for customized structure quotes and technical guidance.
          </p>
          {onOpenConsultationModal && (
            <div className="pt-2">
              <button
                onClick={onOpenConsultationModal}
                className="inline-flex items-center gap-2.5 bg-white text-[#006B8F] hover:bg-slate-100 font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all uppercase tracking-wider cursor-pointer"
              >
                <span>BOOK TECHNICAL CONSULTATION</span>
                <ArrowRight className="w-4 h-4 text-[#006B8F]" />
              </button>
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
