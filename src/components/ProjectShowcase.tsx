import React, { useState, useMemo, useEffect } from 'react';
import { VERIFIED_PROJECTS } from '../data/projects';
import { ProjectItem } from '../types';
import {
  MapPin,
  ArrowRight,
  Search,
  Filter,
  X,
  Building2,
} from 'lucide-react';
import { ProjectDetailView } from './ProjectDetailView';
import { useAdmin } from '../context/AdminContext';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectShowcaseProps {
  onSelectProjectForQuote: (projectName?: string) => void;
  selectedSlug?: string | null;
  onClearSlug?: () => void;
  onSelectProject?: (slug: string | null) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  onSelectProjectForQuote,
  selectedSlug,
  onClearSlug,
  onSelectProject,
}) => {
  const { projects } = useAdmin();
  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(selectedSlug || null);
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setActiveProjectSlug(selectedSlug || null);
  }, [selectedSlug]);

  const handleOpenDetail = (slug: string) => {
    setActiveProjectSlug(slug);
    if (onSelectProject) onSelectProject(slug);
  };

  const handleBackToAllProjects = () => {
    setActiveProjectSlug(null);
    if (onClearSlug) onClearSlug();
    if (onSelectProject) onSelectProject(null);
    window.history.pushState({}, '', '/projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Source verified project items with full media metadata
  const liveProjects: ProjectItem[] = useMemo(() => {
    if (projects && projects.length > 0) {
      return projects
        .filter((p) => p.published !== false)
        .map((p, idx) => {
          const matchingVerified = VERIFIED_PROJECTS.find(
            (vp) => vp.slug === (p.slug || p.id) || vp.id === p.id || vp.slug === p.id
          );

          return {
            id: p.id,
            slug: p.slug || p.id,
            title: p.name,
            location: p.location,
            projectType: p.projectType || matchingVerified?.projectType || 'Protected Cultivation Project',
            executionType: p.executionType || matchingVerified?.executionType,
            crop: p.crop || matchingVerified?.crop,
            areaSize: p.areaSize || matchingVerified?.areaSize,
            imageUrl: p.imageUrl || matchingVerified?.imageUrl || `/gallery/site-gallery-${(idx % 7) + 1}.jpg`,
            heroImage: p.heroImage || matchingVerified?.heroImage || p.imageUrl,
            galleryImages: matchingVerified?.galleryImages || (p.galleryImages && p.galleryImages.length > 0 ? p.galleryImages : [`/gallery/site-gallery-${(idx % 7) + 1}.jpg`]),
            videoUrl: (p.videos && p.videos[0]) || matchingVerified?.videoUrl,
            videos: p.videos && p.videos.length > 0 ? p.videos : matchingVerified?.videos,
            media: (p as any).media || matchingVerified?.media,
            galleryImageObjects: p.galleryImageObjects || matchingVerified?.galleryImageObjects,
            videoObjects: p.videoObjects || matchingVerified?.videoObjects,
            overview: p.description || matchingVerified?.overview || `Protected cultivation and agricultural infrastructure project at ${p.name}.`,
            isFeatured: p.featured,
          };
        });
    }
    return VERIFIED_PROJECTS;
  }, [projects]);

  // Filter projects by region and search query
  const filteredProjects = useMemo(() => {
    return liveProjects.filter((proj) => {
      const loc = proj.location.toLowerCase();
      const title = proj.title.toLowerCase();
      const overview = (proj.overview || '').toLowerCase();

      let matchesRegion = true;
      if (selectedRegion === 'GUJARAT') {
        matchesRegion = loc.includes('gujarat') || loc.includes('sanand') || loc.includes('jamnagar') || loc.includes('dholka') || loc.includes('kadi') || title.includes('vinayaka');
      } else if (selectedRegion === 'RAJASTHAN') {
        matchesRegion = loc.includes('rajasthan') || loc.includes('jodhpur') || loc.includes('pushkar') || loc.includes('kota');
      } else if (selectedRegion === 'CHHATTISGARH') {
        matchesRegion = loc.includes('chhattisgarh');
      } else if (selectedRegion === 'JHARKHAND') {
        matchesRegion = loc.includes('jharkhand') || loc.includes('ranchi');
      } else if (selectedRegion === 'OTHER') {
        matchesRegion = !loc.includes('gujarat') && !loc.includes('rajasthan') && !loc.includes('chhattisgarh') && !loc.includes('jharkhand');
      }

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        title.includes(query) ||
        loc.includes(query) ||
        overview.includes(query);

      return matchesRegion && matchesSearch;
    });
  }, [liveProjects, selectedRegion, searchQuery]);

  const currentProject = VERIFIED_PROJECTS.find(
    (p) => p.slug === activeProjectSlug || p.id === activeProjectSlug
  ) || liveProjects.find(
    (p) => p.slug === activeProjectSlug || p.id === activeProjectSlug
  );

  // If a specific project detail is active, render ProjectDetailView
  if (currentProject) {
    return (
      <ProjectDetailView
        project={currentProject}
        onBack={handleBackToAllProjects}
        onOpenConsultationModal={onSelectProjectForQuote}
        onSelectProject={(slug) => handleOpenDetail(slug)}
      />
    );
  }

  return (
    <div className="bg-[#FAFBF9] min-h-screen text-[#10232B] font-sans selection:bg-[#006B8F] selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. PROJECT SHOWCASE HERO HEADER */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-b from-[#F4F7F5] to-[#FAFBF9] border-b border-gray-200/80 pt-[65px] pb-[55px]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-[#10232B] tracking-tight leading-tight">
            Projects That Speak for Our Work
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-[650px] leading-relaxed font-normal">
            Explore protected cultivation and agricultural infrastructure projects executed by Pujya Agritech across Gujarat and other regions of India.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. REGION FILTER TABS & SEARCH BAR */}
      {/* ========================================================================= */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-3 border-b border-gray-200/80">
          
          {/* Region Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mr-2 shrink-0">
              <Filter className="w-3.5 h-3.5 text-[#006B8F]" /> FILTER:
            </span>

            {[
              { id: 'ALL', label: 'ALL' },
              { id: 'GUJARAT', label: 'GUJARAT' },
              { id: 'RAJASTHAN', label: 'RAJASTHAN' },
              { id: 'CHHATTISGARH', label: 'CHHATTISGARH' },
              { id: 'JHARKHAND', label: 'JHARKHAND' },
              { id: 'OTHER', label: 'OTHER' },
            ].map((tab) => {
              const isActive = selectedRegion === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedRegion(tab.id)}
                  className={`px-3.5 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 ${
                    isActive
                      ? 'border-[#006B8F] text-[#006B8F] bg-white font-extrabold shadow-2xs'
                      : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-100/50'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Field */}
          <div className="relative w-full md:w-[280px] shrink-0">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects or locations..."
              className="w-full pl-9 pr-8 py-2 bg-white border border-gray-300 rounded-md text-xs font-medium text-[#10232B] placeholder:text-gray-400 focus:outline-none focus:border-[#006B8F] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. 3-COLUMN PROJECT CARDS GRID */}
      {/* ========================================================================= */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200/80 space-y-3">
            <p className="text-sm text-gray-500 font-medium">No project entries match your search query or selected region filter.</p>
            <button
              onClick={() => {
                setSelectedRegion('ALL');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#006B8F] text-white text-xs font-mono font-bold rounded uppercase tracking-wider hover:bg-[#005775] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((proj, idx) => (
                <motion.div
                  key={proj.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, delay: idx * 0.03 }}
                  onClick={() => handleOpenDetail(proj.slug)}
                  className="group cursor-pointer bg-white rounded-lg border border-gray-200 shadow-2xs hover:shadow-md hover:-translate-y-[2px] transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Real Site Photography Container */}
                    <div className="relative w-full h-[240px] overflow-hidden bg-gray-100 border-b border-gray-100">
                      <img
                        src={proj.imageUrl || `/gallery/site-gallery-${(idx % 7) + 1}.jpg`}
                        alt={`${proj.title} protected cultivation project in ${proj.location}`}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-out"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `/gallery/site-gallery-${(idx % 7) + 1}.jpg`;
                        }}
                      />
                    </div>

                    {/* Card Body */}
                    <div className="p-5 space-y-2">
                      <div className="text-xs font-mono font-semibold text-[#006B8F] uppercase tracking-wider flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#006B8F]" />
                        <span>{proj.location}</span>
                      </div>

                      <h3 className="text-xl font-bold text-[#10232B] group-hover:text-[#006B8F] transition-colors leading-snug">
                        {proj.title}
                      </h3>

                      <p className="text-sm text-gray-600 leading-relaxed font-normal line-clamp-2">
                        {proj.overview}
                      </p>
                    </div>
                  </div>

                  {/* Card Action Link */}
                  <div className="p-5 pt-0 flex items-center justify-between border-t border-gray-100/80 mt-2">
                    <span className="text-xs font-mono font-bold text-[#006B8F] group-hover:translate-x-1 transition-transform flex items-center gap-1 uppercase tracking-wider">
                      <span>VIEW PROJECT DETAILS</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 4. BOTTOM CONSULTATION CTA BANNER */}
      {/* ========================================================================= */}
      <section className="bg-white border-t border-gray-200/80 py-14">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F4F8F5] border border-[#2F7445]/20 rounded-xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs">
            <div className="space-y-1.5 text-center sm:text-left max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10232B] tracking-tight">
                Planning a Protected Cultivation Project?
              </h2>
              <p className="text-sm text-gray-600 font-normal leading-relaxed">
                Talk to Pujya Agritech about your protected cultivation requirements.
              </p>
            </div>

            <button
              onClick={() => onSelectProjectForQuote('General Project Consultation')}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#2F7445] hover:bg-[#255d37] text-white text-xs font-mono font-bold rounded-lg uppercase tracking-wider transition-colors shadow-xs shrink-0 cursor-pointer"
            >
              <span>GET PROJECT CONSULTATION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ProjectShowcase;


