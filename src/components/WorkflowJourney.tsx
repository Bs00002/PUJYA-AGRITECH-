import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  FlaskConical,
  Compass,
  FileCheck2,
  Hammer,
  Droplets,
  Sprout,
  PackageCheck,
  ChevronRight,
  ChevronLeft,
  X,
  CheckCircle2,
  ArrowRight,
  Play,
  Pause,
  Sparkles,
  ShieldCheck,
  Activity,
  Layers,
} from 'lucide-react';

export interface WorkflowStage {
  id: number;
  stepNumber: string;
  category: string;
  journeyTag: string;
  title: string;
  description: string;
  summary: string;
  highlights: string[];
  outcome: string;
  imageUrl: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    id: 1,
    stepNumber: '01',
    category: 'FIELD ASSESSMENT',
    journeyTag: 'LAND',
    title: 'Site Visit & Land Assessment',
    description: 'Understand the land, location, available area and project requirements through on-site evaluation.',
    summary: 'Pujya Agritech first visits the proposed project location to thoroughly inspect and evaluate the available land, site conditions, accessibility, orientation, and practical client requirements. The assessment provides the technical information required to plan a suitable protected cultivation project.',
    highlights: [
      'Site inspection and topographical land assessment',
      'Understanding available area, access roads & water points',
      'Checking site suitability for protected cultivation',
      'Understanding farmer/client operational requirements',
      'Collecting data for precision engineering planning',
    ],
    outcome: 'A clear understanding of the site before designing the project.',
    imageUrl: '/workflow/step-01.jpeg',
    icon: MapPin,
    accentColor: '#006B8F',
  },
  {
    id: 2,
    stepNumber: '02',
    category: 'SCIENTIFIC TESTING',
    journeyTag: 'ANALYSIS',
    title: 'Climate & Soil Analysis',
    description: 'Study climate, soil and growing conditions to plan the right cultivation approach for optimum yield.',
    summary: 'Project site conditions are scientifically studied to understand the micro-environment in which cultivation will take place. This evaluation ensures that structure design, shade density, and cooling systems match local weather patterns.',
    highlights: [
      'Climate and local environmental conditions evaluation',
      'Soil chemical composition and drainage assessment',
      'Micro-climate and seasonal solar trajectory analysis',
      'Crop-specific environmental requirement mapping',
      'Science-backed blueprint for protected climate control',
    ],
    outcome: 'Better technical understanding of the growing environment before implementation.',
    imageUrl: '/workflow/step-02.jpeg',
    icon: FlaskConical,
    accentColor: '#0E7490',
  },
  {
    id: 3,
    stepNumber: '03',
    category: 'ENGINEERING DESIGN',
    journeyTag: 'DESIGN',
    title: 'Project Planning & Designing',
    description: 'Prepare the project design, structure specifications and technical requirements for construction.',
    summary: 'Collected site and crop information is converted into a comprehensive engineering project design. Our structural team prepares layout drawings, structural specifications, and material requirements customized for your site.',
    highlights: [
      'Comprehensive project planning & master layout CAD',
      'Structure load calculation and engineering specs',
      'Layout planning for optimal space and sunlight utilization',
      'Selection of climate screens, vents and automation gear',
      'Customized architectural design aligned with client targets',
    ],
    outcome: 'A planned and technically suitable project design ready for execution.',
    imageUrl: '/workflow/step-03.png',
    icon: Compass,
    accentColor: '#2563EB',
  },
  {
    id: 4,
    stepNumber: '04',
    category: 'FINANCIAL FACILITATION',
    journeyTag: 'FINANCE',
    title: 'Loan & Subsidy Assistance',
    description: 'Guide customers through applicable NHB, MIDH and state government subsidy and financing processes.',
    summary: 'Pujya Agritech supports customers in understanding applicable central (NHB/MIDH) and state government subsidy schemes, as well as banking financing possibilities for protected farming infrastructure.',
    highlights: [
      'Guidance regarding applicable central & state subsidies',
      'Assistance in Bankable Detailed Project Report (DPR)',
      'Support throughout bank sanction and subsidy inspection stages',
      'Clarification of subsidy eligibility criteria and documents',
      'Navigating fast-track agricultural credit facilities',
    ],
    outcome: 'Customers receive seamless guidance for financing and government subsidies.',
    imageUrl: '/workflow/step-04.jfif',
    icon: FileCheck2,
    accentColor: '#7C3AED',
  },
  {
    id: 5,
    stepNumber: '05',
    category: 'STRUCTURAL EXECUTION',
    journeyTag: 'BUILD',
    title: 'Polyhouse / Net House Setup',
    description: 'Execute the protected cultivation structure using GI steel frames according to project specifications.',
    summary: 'The physical execution stage where our specialized installation team constructs the polyhouse or net house structure on site using heavy-duty GI steel components and high-grade UV cladding material.',
    highlights: [
      'Concrete foundation anchors and civil site works',
      'Hot-dip galvanized (GI) steel framework assembly',
      'High-grade UV stabilized 200-micron poly film & insect netting',
      'Automated top and side ventilation mechanisms',
      'Strict engineering inspection and stress durability check',
    ],
    outcome: 'The protected cultivation structure is physically established and durable.',
    imageUrl: '/workflow/step-05.jpeg',
    icon: Hammer,
    accentColor: '#059669',
  },
  {
    id: 6,
    stepNumber: '06',
    category: 'IRRIGATION INFRASTRUCTURE',
    journeyTag: 'IRRIGATION',
    title: 'Drip Irrigation & Fertigation System',
    description: 'Install precision drip irrigation and fertigation systems for controlled water and nutrient delivery.',
    summary: 'Installation of automated or semi-automated drip irrigation and fertigation systems tailored to crop water requirements, ensuring precise nutrient dosing directly to crop root zones.',
    highlights: [
      'Pressure-compensating drip lateral line deployment',
      'Venturi & automated fertigation dosing injector setup',
      'Multi-stage gravel and disc filtration arrays',
      'Automated zone valves and moisture sensor integration',
      'Optimal nutrient distribution directly to root zones',
    ],
    outcome: 'Controlled and highly efficient delivery of water and crop nutrients.',
    imageUrl: '/workflow/step-06.png',
    icon: Droplets,
    accentColor: '#0284C7',
  },
  {
    id: 7,
    stepNumber: '07',
    category: 'CROP CULTIVATION',
    journeyTag: 'GROW',
    title: 'Agronomy Support',
    description: 'Provide practical agronomy guidance and continuous technical support for successful crop cultivation.',
    summary: 'Our support does not end after structure installation. We provide ongoing agronomic guidance, crop management protocols, and technical consulting to ensure optimal plant health and high yield.',
    highlights: [
      'Crop selection and planting schedule formulation',
      'Custom fertigation recipes and nutritional dosage planning',
      'Integrated pest & disease management protocols',
      'Microclimate humidity and temperature regulation advice',
      'Continuous agronomic site check-ins and expert backing',
    ],
    outcome: 'Farmers receive practical agronomic support for high yields and healthy crops.',
    imageUrl: '/workflow/step-07.jpg',
    icon: Sprout,
    accentColor: '#16A34A',
  },
  {
    id: 8,
    stepNumber: '08',
    category: 'HARVEST & MARKET',
    journeyTag: 'HARVEST',
    title: 'Post-Harvest Management',
    description: 'Support grading, handling, packaging, storage guidance and buyer market linkage after harvest.',
    summary: 'The final stage after crop production focusing on harvesting techniques, produce handling, sorting, packaging, and storage guidance to maintain peak fresh quality for market movement.',
    highlights: [
      'Standard operating procedures for morning harvest picking',
      'Sorting, grading, and uniform packaging standards',
      'Cold-chain and pre-cooling storage recommendations',
      'Direct buyer and wholesale market linkage guidance',
      'Maximizing premium farm-gate realizations and shelf life',
    ],
    outcome: 'Superior produce preservation and improved readiness for market movement.',
    imageUrl: '/workflow/step-08.jpeg',
    icon: PackageCheck,
    accentColor: '#D97706',
  },
];

interface WorkflowJourneyProps {
  onOpenConsultationModal?: (itemName?: string) => void;
}

export const WorkflowJourney: React.FC<WorkflowJourneyProps> = ({ onOpenConsultationModal }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [selectedStep, setSelectedStep] = useState<WorkflowStage | null>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const activeStage = WORKFLOW_STAGES[activeIndex] || WORKFLOW_STAGES[0];
  const totalStages = WORKFLOW_STAGES.length;

  // Auto-cycle through stages when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalStages);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, totalStages]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalStages);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalStages) % totalStages);
  };

  return (
    <section
      className="relative bg-gradient-to-b from-[#F4FAF5] via-white to-[#F0F7F2] text-[#10232B] font-sans py-20 px-4 sm:px-6 lg:px-12 overflow-hidden border-y border-[#E4EAE5]"
      id="project-workflow"
    >
      {/* Background Decorative Tech Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
        <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-[#006B8F]/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/10 w-[450px] h-[450px] rounded-full bg-[#2F7445]/6 blur-3xl" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(#10232B 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Clean Section Header (No Pill Badge) */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#10232B] uppercase">
            OUR PROJECT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#006B8F] to-[#2F7445]">PROCESS HUB</span>
          </h2>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            From site assessment to final harvest — explore each stage of our scientific agricultural lifecycle.
          </p>

          {/* Quick Step Indicators (Compact Track for All Screens) */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {WORKFLOW_STAGES.map((s, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsPlaying(false);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-bold font-mono transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#006B8F] text-white shadow-md scale-105'
                      : 'bg-white/80 hover:bg-white text-gray-600 border border-gray-200/80 hover:border-gray-300'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#AEE583]' : 'bg-gray-400'}`} />
                  <span>{s.stepNumber}</span>
                  <span className="hidden sm:inline font-sans font-semibold text-[11px]">{s.journeyTag}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ===================== ORBIT TECH HUB + LIVE SPOTLIGHT GRID ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ================= LEFT: CENTRAL ORBIT TECH HUB ================= */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            
            <div className="relative w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] flex items-center justify-center select-none">
              
              {/* Outer Decorative Glow Rings */}
              <div className="absolute inset-0 rounded-full border border-[#006B8F]/15 animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-6 rounded-full border border-dashed border-[#2F7445]/20 animate-[spin_40s_linear_infinite_reverse]" />
              <div className="absolute inset-14 rounded-full border border-[#006B8F]/10" />

              {/* Pulsing Radar Sweep Wave */}
              <div className="absolute w-[280px] h-[280px] sm:w-[370px] sm:h-[370px] rounded-full bg-gradient-to-tr from-[#006B8F]/5 via-transparent to-[#2F7445]/10 animate-pulse pointer-events-none" />

              {/* Connecting Laser Beams from Center to Orbit Nodes */}
              <svg viewBox="0 0 440 440" className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <defs>
                  <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#006B8F" floodOpacity="0.6"/>
                  </filter>
                </defs>
                {WORKFLOW_STAGES.map((_, idx) => {
                  const angle = (idx * (360 / totalStages) - 90) * (Math.PI / 180);
                  const r = 180;
                  const x = 220 + r * Math.cos(angle);
                  const y = 220 + r * Math.sin(angle);
                  const isActive = idx === activeIndex;

                  return (
                    <line
                      key={idx}
                      x1={220}
                      y1={220}
                      x2={x}
                      y2={y}
                      stroke={isActive ? '#006B8F' : '#E2E8F0'}
                      strokeWidth={isActive ? 2.5 : 1}
                      strokeDasharray={isActive ? 'none' : '4 4'}
                      filter={isActive ? 'url(#laserGlow)' : undefined}
                      className="transition-all duration-500"
                    />
                  );
                })}
              </svg>

              {/* Center Core HUD Radar */}
              <div className="relative z-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white shadow-2xl border-4 border-white flex flex-col items-center justify-center p-3 text-center group cursor-pointer overflow-hidden transition-all duration-300">
                {/* Background active image subtle blur */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-15 scale-110 transition-all duration-700"
                  style={{ backgroundImage: `url(${activeStage.imageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/95" />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#006B8F]/10 border border-[#006B8F]/30 flex items-center justify-center text-[#006B8F] mb-1 shadow-inner">
                    {React.createElement(activeStage.icon, { className: 'w-5 h-5 sm:w-6 sm:h-6' })}
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#006B8F] uppercase">
                    STAGE {activeStage.stepNumber} / 08
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-[#10232B] uppercase tracking-wide line-clamp-1">
                    {activeStage.journeyTag}
                  </span>
                </div>

                {/* Circular Active Progress Ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="47%"
                    fill="transparent"
                    stroke="#E2E8F0"
                    strokeWidth="3"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="47%"
                    fill="transparent"
                    stroke="#006B8F"
                    strokeWidth="3"
                    strokeDasharray={290}
                    strokeDashoffset={290 - (290 * (activeIndex + 1)) / totalStages}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
              </div>

              {/* 8 Radial Orbit Nodes */}
              {WORKFLOW_STAGES.map((stage, idx) => {
                const angleDeg = idx * (360 / totalStages) - 90;
                const angleRad = angleDeg * (Math.PI / 180);
                const isActive = idx === activeIndex;
                const isHovered = hoveredNode === idx;
                const StageIcon = stage.icon;

                // Center is 50%, offset using cos/sin as percentage
                const xOffset = Math.cos(angleRad) * 41; // radius in percentage
                const yOffset = Math.sin(angleRad) * 41;

                return (
                  <div
                    key={stage.id}
                    style={{
                      left: `calc(50% + ${xOffset}%)`,
                      top: `calc(50% + ${yOffset}%)`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className="absolute z-20"
                    onMouseEnter={() => setHoveredNode(idx)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <button
                      onClick={() => {
                        setActiveIndex(idx);
                        setIsPlaying(false);
                      }}
                      className={`relative w-11 h-11 sm:w-14 sm:h-14 rounded-full flex flex-col items-center justify-center transition-all duration-300 cursor-pointer shadow-md focus:outline-none ${
                        isActive
                          ? 'bg-[#006B8F] text-white ring-4 ring-[#006B8F]/25 scale-120 shadow-xl'
                          : 'bg-white text-gray-700 hover:text-[#006B8F] border border-gray-200 hover:border-[#006B8F]/50 hover:scale-110'
                      }`}
                      title={`${stage.stepNumber}: ${stage.title}`}
                    >
                      {/* Active Beacon Ping */}
                      {isActive && (
                        <span className="absolute -inset-1 rounded-full bg-[#006B8F] opacity-40 animate-ping pointer-events-none" />
                      )}

                      <StageIcon className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${isActive ? 'scale-110 text-white' : 'text-gray-600'}`} />
                      <span className={`text-[9px] sm:text-[10px] font-mono font-bold leading-none mt-0.5 ${isActive ? 'text-[#AEE583]' : 'text-gray-500'}`}>
                        {stage.stepNumber}
                      </span>
                    </button>

                    {/* Hover Floating Tooltip */}
                    <AnimatePresence>
                      {isHovered && !isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 5, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.95 }}
                          className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#10232B] text-white text-xs font-semibold rounded-lg shadow-xl whitespace-nowrap pointer-events-none border border-white/10"
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="text-[#AEE583] font-mono font-bold">#{stage.stepNumber}</span>
                            <span>{stage.title}</span>
                          </div>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#10232B]" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

            </div>

            {/* Orbit Controls (Play/Pause & Steppers) */}
            <div className="mt-8 flex items-center justify-center gap-3 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-gray-200/90 shadow-sm">
              <button
                onClick={() => {
                  handlePrev();
                  setIsPlaying(false);
                }}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-700 transition-colors cursor-pointer"
                title="Previous Stage"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#006B8F]/10 hover:bg-[#006B8F]/20 text-[#006B8F] text-xs font-bold transition-all cursor-pointer"
                title={isPlaying ? 'Pause Auto-cycle' : 'Play Auto-cycle'}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>AUTO-CYCLING</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>PAUSED</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  handleNext();
                  setIsPlaying(false);
                }}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-700 transition-colors cursor-pointer"
                title="Next Stage"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* ================= RIGHT: SYNCHRONIZED LIVE SPOTLIGHT CONSOLE ================= */}
          <div className="lg:col-span-7">
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl border border-gray-200/90 shadow-xl overflow-hidden transition-all duration-300">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="p-6 sm:p-8 space-y-6"
                >
                  {/* Top Bar: Tag & Indicator */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-md bg-[#006B8F] text-white font-mono font-bold text-xs uppercase tracking-wider">
                        STAGE {activeStage.stepNumber}
                      </span>
                      <span className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">
                        {activeStage.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
                      <Activity className="w-3.5 h-3.5 animate-pulse" />
                      <span>Live Stage Active</span>
                    </div>
                  </div>

                  {/* Stage Headline & Image Card */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                    
                    {/* Visual Media with Glass Tech Badge */}
                    <div className="sm:col-span-6 relative aspect-[16/11] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200/80 shadow-md group">
                      <img
                        src={activeStage.imageUrl}
                        alt={activeStage.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                        <span className="font-mono bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20">
                          PHASE 0{activeStage.id}
                        </span>
                        <span className="font-semibold text-emerald-300 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> Quality Assured
                        </span>
                      </div>
                    </div>

                    {/* Stage Overview Description */}
                    <div className="sm:col-span-6 space-y-3">
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#10232B] leading-tight">
                        {activeStage.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed font-normal">
                        {activeStage.description}
                      </p>

                      <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-[#F0FAF5] border border-emerald-200/80 text-xs text-[#10232B] font-medium space-y-1">
                        <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Key Deliverable / Outcome:</span>
                        </div>
                        <p className="text-gray-700 italic">"{activeStage.outcome}"</p>
                      </div>
                    </div>

                  </div>

                  {/* Highlights Grid */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#006B8F]" />
                        <span>Execution Scope & Specifications</span>
                      </p>
                      <span className="text-[11px] text-gray-500 font-mono">
                        {activeStage.highlights.length} Points
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeStage.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#F8FAF9] hover:bg-white border border-gray-200/80 hover:border-[#006B8F]/30 transition-all text-xs font-medium text-gray-700 shadow-2xs"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#006B8F] shrink-0 mt-0.5" />
                          <span className="leading-snug">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {onOpenConsultationModal && (
                        <button
                          onClick={() => onOpenConsultationModal(activeStage.title)}
                          className="px-5 py-2.5 rounded-xl bg-[#006B8F] hover:bg-[#005775] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2 uppercase tracking-wide"
                        >
                          <span>Consult On This Stage</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}

                      <button
                        onClick={() => setSelectedStep(activeStage)}
                        className="px-4 py-2.5 rounded-xl bg-white border border-gray-200 hover:border-[#006B8F] text-[#10232B] hover:text-[#006B8F] text-xs sm:text-sm font-bold transition-all cursor-pointer"
                      >
                        Full Technical Blueprint
                      </button>
                    </div>

                    {/* Step Navigation Pill */}
                    <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400">
                      <span>{activeStage.stepNumber}</span>
                      <span>/</span>
                      <span>08</span>
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>

      {/* ===================== FULL STAGE DETAIL MODAL ===================== */}
      <AnimatePresence>
        {selectedStep && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStep(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 text-[#10232B] my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="p-6 bg-[#006B8F] text-white flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#AEE583] uppercase tracking-wider font-bold">
                    <span>STEP {selectedStep.stepNumber}</span>
                    <span>•</span>
                    <span>{selectedStep.category}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                    {selectedStep.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedStep(null)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                  <img
                    src={selectedStep.imageUrl}
                    alt={selectedStep.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold font-mono text-[#006B8F] uppercase tracking-wider">
                    TECHNICAL OVERVIEW & SUMMARY
                  </h4>
                  <p className="text-base text-gray-700 leading-relaxed font-normal">
                    {selectedStep.summary}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold font-mono text-[#006B8F] uppercase tracking-wider">
                    EXECUTION SCOPE & DELIVERABLES
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedStep.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200/80">
                        <CheckCircle2 className="w-4 h-4 text-[#006B8F] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm font-medium">
                  <strong className="font-bold text-emerald-800">STAGE OUTCOME:</strong> {selectedStep.outcome}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedStep(null)}
                  className="px-5 py-2.5 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 text-sm font-bold text-gray-700 transition-colors"
                >
                  Close Window
                </button>

                {onOpenConsultationModal && (
                  <button
                    onClick={() => {
                      setSelectedStep(null);
                      onOpenConsultationModal(selectedStep.title);
                    }}
                    className="px-6 py-2.5 rounded-lg bg-[#006B8F] hover:bg-[#005775] text-white text-sm font-bold shadow-md transition-colors uppercase tracking-wide"
                  >
                    Consult On This Stage →
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WorkflowJourney;
