import React from 'react';
import { ProjectItem } from '../types';
import {
  ArrowRight,
  ChevronLeft,
  MapPin,
  Building2,
  Calendar,
  Layers,
  Sprout,
  Maximize2,
  CheckCircle2,
  MessageCircle,
  Mail,
} from 'lucide-react';
import { VERIFIED_PROJECTS } from '../data/projects';
import { SEOHead } from './SEOHead';
import { VinayakaAutoSlider } from './VinayakaAutoSlider';

interface ProjectDetailViewProps {
  project: ProjectItem;
  onBack: () => void;
  onOpenConsultationModal: (itemName?: string) => void;
  onSelectProject: (slug: string) => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  onBack,
  onOpenConsultationModal,
  onSelectProject,
}) => {
  // Related projects filtering (excluding current project)
  const relatedProjects = VERIFIED_PROJECTS.filter(
    (p) => p.id !== project.id && p.slug !== project.slug
  ).slice(0, 3);

  // Info fields
  const projectTypeVal = project.projectType;
  const locationVal = project.location;
  const executionVal = project.executionType || (project.execution ? 'Turnkey Project' : undefined);
  const cropVal = project.crop;
  const areaVal = project.areaSize || project.area;
  const yearVal = project.yearCompleted || project.projectDate;

  const infoFields = [
    projectTypeVal ? { label: 'PROJECT TYPE', value: projectTypeVal, icon: Building2, color: 'text-[#10232B]' } : null,
    locationVal ? { label: 'LOCATION', value: locationVal, icon: MapPin, color: 'text-[#006B8F]' } : null,
    executionVal ? { label: 'EXECUTION', value: executionVal, icon: CheckCircle2, color: 'text-[#2F7445]' } : null,
    cropVal ? { label: 'CROPS GROWN', value: cropVal, icon: Sprout, color: 'text-[#10232B]' } : null,
    areaVal ? { label: 'AREA COVERED', value: areaVal, icon: Maximize2, color: 'text-[#2F7445]' } : null,
    yearVal ? { label: 'YEAR COMPLETED', value: yearVal, icon: Calendar, color: 'text-[#006B8F]' } : null,
  ].filter(Boolean);

  // WhatsApp Contact URL
  const whatsappMessage = encodeURIComponent(
    `Hello Pujya Agritech, I am interested in a protected cultivation project similar to ${project.title} (${project.location}). Please provide details.`
  );
  const whatsappUrl = `https://wa.me/919081412412?text=${whatsappMessage}`;

  // JSON-LD Metadata
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemPage',
    name: `${project.title} Protected Cultivation Project`,
    description: project.overview || project.shortDescription,
    provider: {
      '@type': 'Organization',
      name: 'Pujya Agritech',
      url: 'https://pujyaagritech.com',
    },
    locationCreated: {
      '@type': 'Place',
      name: project.location,
    },
  };

  return (
    <div className="bg-[#FAFBF9] text-[#10232B] font-sans selection:bg-[#006B8F] selection:text-white min-h-screen">
      <SEOHead
        title={`${project.title} | Pujya Agritech Protected Cultivation Portfolio`}
        description={`Explore the ${project.title} protected cultivation project by Pujya Agritech in ${project.location}. View project specifications and information.`}
        slug={`projects/${project.slug}`}
        jsonLd={jsonLd}
      />

      {/* ========================================================================= */}
      {/* 1. STICKY TOP BACK NAVIGATION BAR */}
      {/* ========================================================================= */}
      <div className="bg-white border-b border-gray-200/80 py-3.5 sticky top-16 z-30 shadow-2xs">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-gray-600 hover:text-[#006B8F] transition-colors uppercase tracking-wider cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-[#006B8F]" />
            <span>BACK TO ALL PROJECTS</span>
          </button>

          {projectTypeVal && (
            <span className="text-xs font-mono font-bold text-[#2F7445] bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 uppercase">
              {projectTypeVal}
            </span>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. PREMIUM DRIBBLE AUTO-SLIDING MEDIA SLIDER (NO THUMBNAIL STRIP) */}
      {/* ========================================================================= */}
      <VinayakaAutoSlider
        project={project}
        onOpenConsultationModal={onOpenConsultationModal}
      />

      {/* ========================================================================= */}
      {/* 3. PROJECT INFORMATION STRIP */}
      {/* ========================================================================= */}
      {infoFields.length > 0 && (
        <section className="bg-white border-b border-gray-200/80 py-4 shadow-2xs">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-${Math.min(infoFields.length, 6)} gap-4 divide-y sm:divide-y-0 divide-gray-100`}>
              {infoFields.map((field, idx) => {
                if (!field) return null;
                const IconComp = field.icon;
                return (
                  <div key={idx} className="p-2 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                      <IconComp className="w-3.5 h-3.5 text-[#006B8F]" />
                      {field.label}
                    </span>
                    <span className={`text-xs sm:text-sm font-bold truncate block ${field.color}`}>
                      {field.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 4. MAIN CONTENT & OVERVIEW SECTION */}
      {/* ========================================================================= */}
      <section className="py-12">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Main Overview Block (lg:col-span-8) */}
            <div className="lg:col-span-8 space-y-8">
              
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-2xs space-y-6">
                
                {/* Main Overview */}
                <div className="space-y-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#10232B] tracking-tight border-b border-gray-100 pb-3 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#006B8F]" />
                    <span>PROJECT OVERVIEW</span>
                  </h2>
                  <p className="text-[15px] sm:text-[16px] text-gray-700 leading-relaxed font-normal">
                    {project.overview || project.description || `Protected cultivation facility engineered by Pujya Agritech at ${project.title}, ${project.location}.`}
                  </p>
                </div>

                {/* Project Story / Case Study */}
                {project.story && (
                  <div className="pt-4 border-t border-gray-100 space-y-2.5 bg-[#F4F8F5] p-5 rounded-lg border border-[#2F7445]/20">
                    <h3 className="text-xs font-mono font-extrabold text-[#2F7445] uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2F7445]" />
                      <span>PROJECT STORY & CASE STUDY</span>
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed font-normal">
                      {project.story}
                    </p>
                  </div>
                )}

                {/* PROJECT HIGHLIGHTS GRID */}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <h3 className="text-xs font-mono font-bold text-[#10232B] uppercase tracking-wider">
                    PROJECT HIGHLIGHTS
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="bg-[#FAFBF9] p-3.5 rounded-lg border border-gray-200/80 space-y-1">
                      <div className="text-base sm:text-lg font-extrabold text-[#2F7445]">{areaVal || '55,000+ Sq. M.'}</div>
                      <div className="text-[10px] font-mono font-semibold text-gray-500 uppercase">Project Area</div>
                    </div>
                    <div className="bg-[#FAFBF9] p-3.5 rounded-lg border border-gray-200/80 space-y-1">
                      <div className="text-base sm:text-lg font-extrabold text-[#006B8F]">{yearVal || '2018–2019'}</div>
                      <div className="text-[10px] font-mono font-semibold text-gray-500 uppercase">Project Period</div>
                    </div>
                    <div className="bg-[#FAFBF9] p-3.5 rounded-lg border border-gray-200/80 space-y-1">
                      <div className="text-sm sm:text-base font-extrabold text-[#10232B] truncate">{projectTypeVal || 'Soilless Farming'}</div>
                      <div className="text-[10px] font-mono font-semibold text-gray-500 uppercase">Cultivation Method</div>
                    </div>
                    <div className="bg-[#FAFBF9] p-3.5 rounded-lg border border-gray-200/80 space-y-1">
                      <div className="text-sm sm:text-base font-extrabold text-[#10232B]">Multiple Structures</div>
                      <div className="text-[10px] font-mono font-semibold text-gray-500 uppercase">Protected Models</div>
                    </div>
                    <div className="bg-[#FAFBF9] p-3.5 rounded-lg border border-gray-200/80 space-y-1">
                      <div className="text-sm sm:text-base font-extrabold text-[#2F7445]">Fully Automated</div>
                      <div className="text-[10px] font-mono font-semibold text-gray-500 uppercase">Centralized Control</div>
                    </div>
                    <div className="bg-[#FAFBF9] p-3.5 rounded-lg border border-gray-200/80 space-y-1">
                      <div className="text-xs sm:text-sm font-extrabold text-[#006B8F] truncate">{project.location.split(',')[0] || 'Chekhla, Sanand'}</div>
                      <div className="text-[10px] font-mono font-semibold text-gray-500 uppercase">Gujarat, India</div>
                    </div>
                  </div>
                </div>

                {/* PROTECTED CULTIVATION STRUCTURES USED */}
                {project.structuresUsed && project.structuresUsed.length > 0 && (
                  <div className="pt-4 border-t border-gray-100 space-y-3">
                    <h3 className="text-xs font-mono font-bold text-[#10232B] uppercase tracking-wider">
                      PROTECTED CULTIVATION STRUCTURES
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {project.structuresUsed.map((struct, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200 shadow-2xs space-y-1.5 hover:border-[#006B8F]/40 transition-colors">
                          <h4 className="text-xs font-mono font-bold text-[#006B8F] uppercase tracking-wider">
                            {struct.name}
                          </h4>
                          <p className="text-xs text-gray-600 leading-snug font-normal">
                            Used for: <strong className="text-[#2F7445] font-semibold">{struct.crops}</strong>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* AUTOMATION & TECHNOLOGY HIGHLIGHT */}
                {(project.automationInfo || project.technologyInfo) && (
                  <div className="pt-4 border-t border-gray-100 space-y-2.5">
                    <h3 className="text-xs font-mono font-bold text-[#10232B] uppercase tracking-wider">
                      AUTOMATION & IRRIGATION TECHNOLOGY
                    </h3>
                    <div className="bg-[#F4F8F5] p-4 rounded-lg border border-[#2F7445]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-[#2F7445] text-white font-mono font-bold uppercase rounded text-[10px] shrink-0">
                          FULLY AUTOMATED
                        </span>
                        <span className="font-semibold text-gray-800">
                          {project.automationInfo || 'Fully Automated • Single-Panel Controlled'}
                        </span>
                      </div>
                      {project.technologyInfo && (
                        <div className="text-gray-600 font-medium shrink-0">
                          Irrigation / Fertigation System: <strong className="text-[#006B8F] font-bold">{project.technologyInfo}</strong>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Company Context */}
                <div className="pt-4 border-t border-gray-100 space-y-2">
                  <h3 className="text-base font-bold text-[#10232B]">
                    About Pujya Agritech Infrastructure
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Pujya Agritech is an established manufacturer and turnkey installer of protected farming structures based in Gujarat, delivering Naturally Ventilated Poly Houses, Fan & Pad Poly Houses, Agro Shade Net Houses, and Automated Drip Fertigation systems across India.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Sidebar Specification Card & Consultation CTA (lg:col-span-4) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Compact Details Card */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-2xs space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#10232B] border-b border-gray-100 pb-3 flex items-center justify-between">
                  <span>PROJECT SUMMARY</span>
                  <Building2 className="w-4 h-4 text-[#006B8F]" />
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-gray-100">
                    <span className="text-gray-500 font-mono">PROJECT NAME</span>
                    <span className="font-bold text-[#10232B] truncate max-w-[180px]">{project.title}</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-gray-100">
                    <span className="text-gray-500 font-mono">LOCATION</span>
                    <span className="font-bold text-[#006B8F] text-right truncate max-w-[180px]" title={project.location}>{project.location}</span>
                  </div>

                  {projectTypeVal && (
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-500 font-mono">TYPE</span>
                      <span className="font-bold text-[#2F7445] truncate max-w-[180px]">{projectTypeVal}</span>
                    </div>
                  )}

                  {areaVal && (
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-500 font-mono">AREA</span>
                      <span className="font-bold text-[#2F7445]">{areaVal}</span>
                    </div>
                  )}

                  {cropVal && (
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-500 font-mono">CROPS</span>
                      <span className="font-bold text-[#10232B] truncate max-w-[180px]" title={cropVal}>{cropVal}</span>
                    </div>
                  )}

                  {yearVal && (
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-500 font-mono">PERIOD</span>
                      <span className="font-bold text-[#10232B]">{yearVal}</span>
                    </div>
                  )}

                  {project.automationInfo && (
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-500 font-mono">CONTROL</span>
                      <span className="font-bold text-[#2F7445] truncate max-w-[180px]">Single-Panel</span>
                    </div>
                  )}

                  {project.technologyInfo && (
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-500 font-mono">TECHNOLOGY</span>
                      <span className="font-bold text-[#006B8F]">{project.technologyInfo}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Consultation Card */}
              <div className="bg-gradient-to-br from-[#071F28] via-[#0A2B37] to-[#006B8F] text-white p-6 rounded-xl space-y-4 shadow-md">
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-white tracking-tight">
                    Get Project Consultation
                  </h4>
                  <p className="text-xs text-blue-100/90 leading-relaxed">
                    Consult our engineering team for polyhouse planning, DPR formulation, or site estimation.
                  </p>
                </div>

                <div className="space-y-2.5 pt-1">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#006B8F] hover:bg-[#005775] text-white text-xs font-mono font-bold rounded-lg flex items-center justify-center gap-2 uppercase tracking-wider transition-colors shadow-2xs border border-white/20"
                  >
                    <MessageCircle className="w-4 h-4 text-white" />
                    <span>WHATSAPP US</span>
                  </a>

                  <button
                    onClick={() => onOpenConsultationModal(`Inquiry for ${project.title}`)}
                    className="w-full py-3 bg-white hover:bg-gray-100 text-[#10232B] text-xs font-mono font-bold rounded-lg flex items-center justify-center gap-2 uppercase tracking-wider transition-colors shadow-2xs cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-[#006B8F]" />
                    <span>SEND ENQUIRY</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. RELATED PROJECTS ("OTHER PROJECTS") */}
      {/* ========================================================================= */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-[#FAFBF9]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2F7445]">
                PORTFOLIO
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10232B] uppercase tracking-tight">
                OTHER PROJECTS
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProjects.map((rel, idx) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectProject(rel.slug)}
                  className="group cursor-pointer bg-white rounded-xl border border-gray-200 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="h-[200px] w-full bg-gray-100 relative overflow-hidden">
                      <img
                        src={rel.imageUrl || rel.heroImage || `/gallery/site-gallery-${(idx % 7) + 1}.jpg`}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `/gallery/site-gallery-${(idx % 7) + 1}.jpg`;
                        }}
                      />
                    </div>
                    <div className="p-5 space-y-1.5">
                      <span className="text-xs font-mono font-semibold text-[#006B8F] uppercase flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {rel.location}
                      </span>
                      <h3 className="text-lg font-bold text-[#10232B] group-hover:text-[#006B8F] transition-colors">
                        {rel.title}
                      </h3>
                      {rel.projectType && (
                        <p className="text-xs text-gray-500 font-mono">
                          {rel.projectType}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center justify-between border-t border-gray-100 mt-2">
                    <span className="text-xs font-mono font-bold text-[#006B8F] group-hover:translate-x-1 transition-transform flex items-center gap-1 uppercase">
                      <span>VIEW PROJECT</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 6. BOTTOM CONSULTATION BANNER */}
      {/* ========================================================================= */}
      <section className="py-14 bg-gradient-to-r from-[#071F28] via-[#0A2B37] to-[#006B8F] text-white border-t border-gray-800">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-[#AEE583] uppercase tracking-widest">
              PUJYA AGRITECH CONSULTATION
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              PLANNING A PROTECTED CULTIVATION PROJECT?
            </h2>
            <p className="text-sm sm:text-base text-gray-200">
              Get end-to-end guidance on greenhouse structural design, DPR formulation, National Horticulture Board subsidy compliance, and site layout execution.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenConsultationModal('Protected Cultivation Consultation')}
              className="px-6 py-3.5 bg-white hover:bg-gray-100 text-[#10232B] font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#006B8F]" />
              <span>REQUEST PROJECT CONSULTATION</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#2F7445] hover:bg-[#276139] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-lg flex items-center gap-2 cursor-pointer border border-emerald-400/30"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>CHAT ON WHATSAPP</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ProjectDetailView;
