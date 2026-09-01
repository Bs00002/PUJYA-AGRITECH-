import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
  Leaf,
  X,
  CheckCircle2,
  ArrowRight,
  Check,
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
      'Site inspection and land assessment',
      'Understanding available area and location',
      'Checking site suitability for protected cultivation',
      'Understanding farmer/client requirements',
      'Collecting the information required for further project planning',
    ],
    outcome: 'A clear understanding of the site before designing the project.',
    imageUrl: '/workflow/step-01.jpeg',
    icon: MapPin,
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
      'Soil-related quality and growing assessment',
      'Micro-climate growing conditions analysis',
      'Crop-specific environmental requirements',
      'Using the assessment to support suitable protected cultivation planning',
    ],
    outcome: 'Better technical understanding of the growing environment before implementation.',
    imageUrl: '/workflow/step-02.jpeg',
    icon: FlaskConical,
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
      'Comprehensive project planning & master layout',
      'Structure design and engineering specifications',
      'Layout planning for optimal space utilization',
      'Selection and planning of required protected cultivation infrastructure',
      'Designing according to the available site and client requirements',
    ],
    outcome: 'A planned and technically suitable project design ready for execution.',
    imageUrl: '/workflow/step-03.png',
    icon: Compass,
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
      'Guidance regarding applicable government subsidy schemes',
      'Assistance in understanding required documentation and project reports',
      'Support related to bank loan and subsidy approval processes',
      'Helping customers understand requirements for their specific project',
    ],
    outcome: 'Customers receive guidance for navigating applicable financing and subsidy opportunities.',
    imageUrl: '/workflow/step-04.jfif',
    icon: FileCheck2,
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
      'Protected cultivation structure setup and foundation civil work',
      'Polyhouse / Net House framework installation',
      'Structural implementation strictly according to the approved design',
      'Installation of cladding, insect nets, and vent mechanisms',
      'Focus on proper execution quality and long-term durability',
    ],
    outcome: 'The protected cultivation structure is physically established and prepared for cultivation.',
    imageUrl: '/workflow/step-05.jpeg',
    icon: Hammer,
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
      'Precision drip irrigation system installation',
      'Fertigation dosing system setup',
      'Efficient water distribution pipeline network',
      'Direct nutrient delivery through controlled irrigation loops',
      'Planning the system according to crop and project requirements',
    ],
    outcome: 'Controlled and efficient delivery of water and nutrients to the crop.',
    imageUrl: '/workflow/step-06.png',
    icon: Droplets,
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
      'Practical agronomy guidance for high-value crops',
      'Crop management support and fertigation scheduling',
      'Guidance related to protected cultivation practices and climate control',
      'Continuous technical assistance throughout crop growth cycles',
      'Helping farmers operate the protected cultivation system effectively',
    ],
    outcome: 'Farmers receive practical technical support for better project operation and crop management.',
    imageUrl: '/workflow/step-07.jpg',
    icon: Sprout,
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
      'Practical harvesting guidance for crop quality preservation',
      'Grading and handling best practices',
      'Produce packaging recommendations for market transport',
      'Storage-related environmental considerations',
      'Supporting better post-harvest management practices for market value',
    ],
    outcome: 'Better handling of produce after harvesting and improved readiness for storage/market movement.',
    imageUrl: '/workflow/step-08.jpeg',
    icon: PackageCheck,
  },
];

interface WorkflowJourneyProps {
  onOpenConsultationModal?: (itemName?: string) => void;
}

export const WorkflowJourney: React.FC<WorkflowJourneyProps> = ({ onOpenConsultationModal }) => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerInstanceRef = useRef<ScrollTrigger | null>(null);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedStep, setSelectedStep] = useState<WorkflowStage | null>(null);

  // GSAP ScrollTrigger Setup for Sticky Storytelling
  useEffect(() => {
    if (shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        id: 'workflow-scroll-trigger',
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${WORKFLOW_STAGES.length * 450}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const rawProgress = self.progress;
          // Calculate step index smoothly
          const index = Math.min(
            Math.floor(rawProgress * WORKFLOW_STAGES.length),
            WORKFLOW_STAGES.length - 1
          );
          setActiveIndex(index);
        },
      });

      triggerInstanceRef.current = st;
    }, sectionRef);

    return () => {
      ctx.revert();
      if (triggerInstanceRef.current) {
        triggerInstanceRef.current.kill();
      }
    };
  }, [shouldReduceMotion]);

  // Handle direct navigation to a step
  const handleStepSelect = (index: number) => {
    setActiveIndex(index);
    if (triggerInstanceRef.current) {
      const st = triggerInstanceRef.current;
      const stepRatio = index / (WORKFLOW_STAGES.length - 1);
      const targetScroll = st.start + stepRatio * (st.end - st.start);
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  const activeStage = WORKFLOW_STAGES[activeIndex] || WORKFLOW_STAGES[0];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F8FAF8] text-[#10232B] font-sans border-y border-[#E4EAE5] overflow-hidden"
      id="project-workflow"
    >
      {/* Background Accent Gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#006B8F]/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#2F7445]/5 blur-3xl" />
      </div>

      {/* ===================== DESKTOP STICKY SCROLL STORYTELLING ===================== */}
      <div className="hidden lg:flex min-h-screen flex-col justify-between py-10 px-6 lg:px-12 max-w-[1440px] w-full mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="text-center space-y-2 max-w-3xl mx-auto shrink-0 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#006B8F]/25 bg-white shadow-2xs">
            <Leaf className="w-3.5 h-3.5 text-[#006B8F]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#006B8F]">
              FROM CONCEPT TO COMPLETION
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#10232B] uppercase">
            OUR PROJECT PROCESS
          </h2>

          <p className="text-base text-gray-600 leading-relaxed font-normal max-w-xl mx-auto">
            From site assessment to final execution — every stage is planned with precision.
          </p>
        </div>

        {/* MAIN SPLIT STORYTELLING STAGE */}
        <div className="grid grid-cols-12 gap-10 items-center my-auto flex-1 max-h-[540px]">
          
          {/* LEFT COLUMN: Large Premium Image Container */}
          <div className="col-span-7 relative h-full min-h-[420px] max-h-[500px] rounded-2xl overflow-hidden shadow-xl border border-gray-200/80 bg-white group">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={activeStage.imageUrl}
                  alt={activeStage.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: Active Stage Technical Overview */}
          <div className="col-span-5 flex flex-col justify-between space-y-6 pl-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-5"
              >
                {/* Step Counter Eyebrow */}
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-extrabold font-mono text-[#006B8F]">
                    STEP {activeStage.stepNumber}
                  </span>
                  <span className="w-8 h-[2px] bg-[#006B8F]/30" />
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    {activeStage.journeyTag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl lg:text-3xl font-extrabold text-[#10232B] leading-tight">
                  {activeStage.title}
                </h3>

                {/* Description */}
                <p className="text-base text-gray-600 leading-relaxed font-normal">
                  {activeStage.description}
                </p>

                {/* Key Highlights List */}
                <div className="space-y-2 pt-1">
                  <p className="text-xs font-bold font-mono text-gray-400 uppercase tracking-wider">
                    KEY IMPLEMENTATION HIGHLIGHTS
                  </p>
                  <ul className="space-y-2">
                    {activeStage.highlights.slice(0, 3).map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#006B8F] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outcome Callout Box */}
                <div className="p-3.5 rounded-xl bg-white border border-gray-200 shadow-2xs flex items-center gap-3 text-xs font-medium text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-[#006B8F] shrink-0" />
                  <span><strong className="text-[#006B8F] font-bold">Outcome:</strong> {activeStage.outcome}</span>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center gap-3">
                  {onOpenConsultationModal && (
                    <button
                      onClick={() => onOpenConsultationModal(activeStage.title)}
                      className="px-5 py-2.5 rounded-lg bg-[#006B8F] hover:bg-[#005775] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2 uppercase tracking-wide"
                    >
                      <span>DISCUSS THIS STAGE</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedStep(activeStage)}
                    className="px-4 py-2.5 rounded-lg bg-white border border-gray-200 hover:border-[#006B8F] text-[#10232B] hover:text-[#006B8F] text-sm font-bold transition-all cursor-pointer"
                  >
                    View Full Specifications
                  </button>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* BOTTOM TIMELINE PROGRESS NAVIGATION BAR */}
        <div className="shrink-0 pt-6 border-t border-gray-200/80">
          <div className="relative flex items-center justify-between max-w-5xl mx-auto px-4">
            
            {/* Background Connecting Line */}
            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[3px] bg-gray-200 rounded-full z-0" />
            
            {/* Active Progress Line Fill */}
            <div
              className="absolute left-6 top-1/2 -translate-y-1/2 h-[3px] bg-[#006B8F] rounded-full z-0 transition-all duration-300 ease-out"
              style={{
                width: `calc(${(activeIndex / (WORKFLOW_STAGES.length - 1)) * 100}% - 3rem)`,
              }}
            />

            {/* 8 Process Step Nodes */}
            {WORKFLOW_STAGES.map((stage, idx) => {
              const isActive = idx === activeIndex;
              const isPassed = idx < activeIndex;

              return (
                <button
                  key={stage.id}
                  onClick={() => handleStepSelect(idx)}
                  className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
                  title={`Go to Step ${stage.stepNumber}: ${stage.title}`}
                >
                  {/* Circle Node */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 shadow-sm ${
                      isActive
                        ? 'bg-[#006B8F] text-white ring-4 ring-[#006B8F]/20 scale-110'
                        : isPassed
                        ? 'bg-[#2F7445] text-white'
                        : 'bg-white text-gray-500 border border-gray-300 group-hover:border-[#006B8F] group-hover:text-[#006B8F]'
                    }`}
                  >
                    {isPassed ? <Check className="w-4 h-4 text-white" /> : stage.stepNumber}
                  </div>

                  {/* Step Label below node */}
                  <span
                    className={`mt-2 text-[11px] font-bold font-mono uppercase tracking-wider transition-colors max-w-[80px] text-center line-clamp-1 ${
                      isActive
                        ? 'text-[#006B8F]'
                        : isPassed
                        ? 'text-[#2F7445]'
                        : 'text-gray-400 group-hover:text-gray-600'
                    }`}
                  >
                    {stage.journeyTag}
                  </span>
                </button>
              );
            })}

          </div>
        </div>

      </div>

      {/* ===================== MOBILE & TABLET RESPONSIVE VERTICAL SCROLL EXPERIENCE ===================== */}
      <div className="lg:hidden py-12 px-4 sm:px-6 space-y-10 max-w-2xl mx-auto">
        {/* MOBILE HEADER */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#006B8F]/25 bg-white shadow-2xs">
            <Leaf className="w-3.5 h-3.5 text-[#006B8F]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#006B8F]">
              FROM CONCEPT TO COMPLETION
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#10232B] uppercase">
            OUR PROJECT PROCESS
          </h2>

          <p className="text-sm text-gray-600 leading-relaxed font-normal">
            From site assessment to final execution — every stage is planned with precision.
          </p>
        </div>

        {/* MOBILE VERTICAL PROCESS LIST */}
        <div className="space-y-8 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-[2px] before:bg-gray-200">
          {WORKFLOW_STAGES.map((stage) => {
            const IconComp = stage.icon;
            return (
              <div key={stage.id} className="relative pl-12 space-y-3 group">
                {/* Vertical Node Indicator */}
                <div className="absolute left-2 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-[#006B8F] text-white flex items-center justify-center font-mono text-xs font-bold shadow-md">
                  {stage.stepNumber}
                </div>

                {/* Stage Content Card */}
                <div className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-xs space-y-3">
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
                    <img
                      src={stage.imageUrl}
                      alt={stage.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded bg-[#006B8F] text-white text-[10px] font-mono font-bold uppercase">
                      {stage.category}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#006B8F]">
                      <IconComp className="w-4 h-4" />
                      <span>STEP {stage.stepNumber} • {stage.journeyTag}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#10232B] leading-snug">
                      {stage.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-normal">
                      {stage.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1.5 pt-1 border-t border-gray-100">
                    {stage.highlights.slice(0, 2).map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#006B8F] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedStep(stage)}
                    className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-[#10232B] text-xs font-bold rounded-lg border border-gray-200 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
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
