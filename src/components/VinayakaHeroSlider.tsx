import React, { useState, useEffect, useRef, useTransition } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  Video as VideoIcon,
  Image as ImageIcon,
  Sparkles,
  MapPin,
  CheckCircle2,
  Sprout,
  ShieldCheck,
} from 'lucide-react';
import { ProjectItem, ProjectMediaItem } from '../types';
import { VERIFIED_PROJECTS, getProjectMediaList } from '../data/projects';
import { PujyaLogo } from './PujyaLogo';

interface VinayakaHeroSliderProps {
  project?: ProjectItem;
  onOpenConsultationModal?: (itemName?: string) => void;
  onViewAllProjects?: () => void;
}

export const VinayakaHeroSlider: React.FC<VinayakaHeroSliderProps> = ({
  project: propProject,
  onOpenConsultationModal,
  onViewAllProjects,
}) => {
  // Source Vinayaka Farm or fallback to provided project
  const vinayakaProject =
    propProject ||
    VERIFIED_PROJECTS.find((p) => p.id === 'proj-vinayaka-farm' || p.slug === 'vinayaka-farm') ||
    VERIFIED_PROJECTS[0];

  // Comprehensive Media Items list (All V2–V8 images + all project videos & photos)
  const mediaItems: ProjectMediaItem[] = getProjectMediaList(vinayakaProject);
  const totalSlides = mediaItems.length;

  // States
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true); // Auto-slide default ON
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [progressKey, setProgressKey] = useState(0);

  const [, startTransition] = useTransition();

  // Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const thumbnailStripRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const currentSlide = mediaItems[activeSlideIndex] || mediaItems[0];
  const isCurrentVideo = currentSlide?.type === 'video';

  // Navigation Handlers
  const goToNextSlide = () => {
    startTransition(() => {
      setActiveSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
      setProgressKey((k) => k + 1);
      setIsVideoPlaying(false);
    });
  };

  const goToPrevSlide = () => {
    startTransition(() => {
      setActiveSlideIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
      setProgressKey((k) => k + 1);
      setIsVideoPlaying(false);
    });
  };

  const goToSlide = (index: number) => {
    startTransition(() => {
      setActiveSlideIndex(index);
      setProgressKey((k) => k + 1);
      setIsVideoPlaying(false);
    });
  };

  // Auto-Slide Timer (5 seconds)
  useEffect(() => {
    if (!isPlaying || isVideoPlaying || lightboxIndex !== null || totalSlides <= 1) {
      return;
    }

    const timer = setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [isPlaying, isVideoPlaying, lightboxIndex, activeSlideIndex, totalSlides]);

  // Handle Video Slide Auto-Play & Reset
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsVideoPlaying(false);
    }
  }, [activeSlideIndex]);

  // Scroll active thumbnail into center view smoothly
  useEffect(() => {
    if (thumbnailStripRef.current) {
      const activeThumb = thumbnailStripRef.current.children[activeSlideIndex] as HTMLElement;
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeSlideIndex]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : totalSlides - 1));
        else if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev !== null && prev < totalSlides - 1 ? prev + 1 : 0));
        else if (e.key === 'Escape') setLightboxIndex(null);
      } else {
        if (e.key === 'ArrowLeft') goToPrevSlide();
        else if (e.key === 'ArrowRight') goToNextSlide();
        else if (e.key === ' ') {
          e.preventDefault();
          setIsPlaying((prev) => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, totalSlides]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    if (diffX > 40) {
      goToNextSlide();
    } else if (diffX < -40) {
      goToPrevSlide();
    }
    touchStartX.current = null;
  };

  // Video Play / Pause Toggle
  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsVideoPlaying(true);
        setIsPlaying(false); // Pause auto-slider while playing video
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative w-full bg-[#07171E] text-white selection:bg-[#FF9933] selection:text-white font-sans overflow-hidden border-b border-[#2F7445]/30">
      
      {/* ========================================================================= */}
      {/* 1. TOP DENSE METADATA & BRAND HEADER STRIP */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-[#800020]/90 via-[#07171E] to-[#1E5128]/90 border-b border-[#D4AF37]/30 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Left Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-[#800020] text-[#D4AF37] px-2.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider text-[11px] border border-[#D4AF37]/40 shadow-xs">
              <Sparkles className="w-3 h-3 text-[#FF9933]" />
              FLAGSHIP TURNKEY PROJECT
            </span>

            <span className="inline-flex items-center gap-1 text-[#AEE583] font-mono text-[11px] font-semibold bg-[#2F7445]/40 px-2 py-0.5 rounded border border-[#2F7445]/50">
              <MapPin className="w-3 h-3 text-[#FF9933]" />
              SANAND, GUJARAT • 55,000+ SQ. M.
            </span>
          </div>

          {/* Right Controls Quick Status */}
          <div className="flex items-center gap-3 text-gray-300 font-mono text-[11px]">
            <span className="hidden sm:inline-flex items-center gap-1 text-[#D4AF37]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2F7445]" />
              NETAFIM AUTOMATED
            </span>

            <button
              onClick={() => setIsPlaying((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#07171E] border border-[#D4AF37]/40 text-[#D4AF37] hover:text-white hover:border-[#FF9933] transition-all cursor-pointer"
              title="Toggle Auto-Slide (Spacebar)"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3 text-[#FF9933]" />
                  <span>AUTOSLIDE ON</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-[#2F7445]" />
                  <span>PAUSED</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CONTINUOUS PROGRESS INDICATOR BAR (GOLDEN/SAFFRON/GREEN) */}
      {/* ========================================================================= */}
      <div className="w-full h-1 bg-[#800020]/40 relative overflow-hidden">
        {isPlaying && !isVideoPlaying && lightboxIndex === null && (
          <motion.div
            key={progressKey}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 5, ease: 'linear' }}
            className="h-full bg-gradient-to-r from-[#FF9933] via-[#D4AF37] to-[#2F7445] shadow-[0_0_10px_rgba(212,175,55,0.8)]"
          />
        )}
        {!isPlaying && (
          <div className="w-full h-full bg-[#D4AF37]/50" />
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN SLIDER VIEWPORT */}
      {/* ========================================================================= */}
      <div
        className="relative w-full h-[460px] sm:h-[580px] lg:h-[650px] bg-[#07171E] overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Animated Slide Transition (Fade + Subtle Scale/Slide) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide?.src || activeSlideIndex}
            initial={{ opacity: 0, scale: 1.03, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.98, x: -20 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full relative"
          >
            {isCurrentVideo ? (
              /* ================= VIDEO SLIDE ================= */
              <div className="w-full h-full relative flex items-center justify-center bg-black">
                <video
                  ref={videoRef}
                  src={currentSlide.src}
                  playsInline
                  muted={isMuted}
                  poster={(currentSlide as any).thumbnail || '/projects/vinayaka-farm/v2.jpg'}
                  onEnded={() => {
                    setIsVideoPlaying(false);
                    goToNextSlide();
                  }}
                  className="w-full h-full object-contain"
                >
                  Your browser does not support HTML5 video.
                </video>

                {/* Big Center Play Overlay Button when video is paused */}
                {!isVideoPlaying && (
                  <button
                    onClick={toggleVideoPlayback}
                    className="absolute z-30 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#FF9933] via-[#D4AF37] to-[#800020] p-1 shadow-[0_0_35px_rgba(255,153,51,0.6)] hover:scale-110 transition-transform cursor-pointer flex items-center justify-center group"
                  >
                    <div className="w-full h-full rounded-full bg-[#07171E]/90 flex items-center justify-center group-hover:bg-[#07171E]/70 transition-colors">
                      <Play className="w-9 h-9 sm:w-11 sm:h-11 text-[#FF9933] fill-[#FF9933] ml-1.5" />
                    </div>
                  </button>
                )}

                {/* Video Controls Bar Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-30 flex items-center justify-between bg-[#07171E]/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#D4AF37]/30 text-white">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleVideoPlayback}
                      className="p-2 rounded-lg bg-[#800020] hover:bg-[#9B1B30] text-[#D4AF37] transition-colors cursor-pointer"
                      title={isVideoPlaying ? 'Pause Video' : 'Play Video'}
                    >
                      {isVideoPlaying ? <Pause className="w-5 h-5 text-[#FF9933]" /> : <Play className="w-5 h-5 text-[#FF9933] fill-[#FF9933]" />}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="p-2 rounded-lg bg-[#07171E] border border-white/20 hover:border-[#D4AF37] text-white transition-colors cursor-pointer"
                      title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-gray-400" /> : <Volume2 className="w-4 h-4 text-[#AEE583]" />}
                    </button>

                    <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider hidden sm:inline">
                      {isVideoPlaying ? 'Playing Execution Video' : 'Click Play to Watch Walkthrough'}
                    </span>
                  </div>

                  <button
                    onClick={() => setLightboxIndex(activeSlideIndex)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-mono"
                  >
                    <Maximize2 className="w-4 h-4 text-[#FF9933]" />
                    <span className="hidden sm:inline">FULLSCREEN</span>
                  </button>
                </div>
              </div>
            ) : (
              /* ================= IMAGE SLIDE ================= */
              <div
                onClick={() => setLightboxIndex(activeSlideIndex)}
                className="w-full h-full relative cursor-pointer group overflow-hidden"
              >
                <img
                  src={currentSlide?.src || '/projects/vinayaka-farm/v2.jpg'}
                  alt={(currentSlide as any)?.alt || `Vinayaka Farm media slide ${activeSlideIndex + 1}`}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/projects/vinayaka-farm/v2.jpg';
                  }}
                />

                {/* Dark Gradient Overlay for Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07171E] via-[#07171E]/30 to-transparent pointer-events-none" />

                {/* Fullscreen Hint Overlay on Hover */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-20">
                  <div className="bg-[#07171E]/90 text-white px-5 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 border border-[#D4AF37] backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                    <Maximize2 className="w-4 h-4 text-[#FF9933]" />
                    <span>Expand Fullscreen Lightbox</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Brand Watermark Badge (Top Right) */}
        <div className="absolute top-5 right-5 z-20 pointer-events-none flex items-center gap-2 bg-[#07171E]/80 px-3.5 py-1.5 rounded-lg border border-[#D4AF37]/30 backdrop-blur-md">
          <PujyaLogo className="h-5 w-auto" />
          <span className="text-[11px] font-mono font-bold text-[#D4AF37] uppercase tracking-widest">PUJYA AGRITECH</span>
        </div>

        {/* ========================================================================= */}
        {/* 4. NAVIGATION ARROWS (DRIBBLE INSIDER VOYAGE STYLE) */}
        {/* ========================================================================= */}
        <button
          onClick={goToPrevSlide}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#07171E]/80 hover:bg-[#800020] text-white flex items-center justify-center transition-all border border-[#D4AF37]/50 shadow-[0_0_20px_rgba(0,0,0,0.6)] hover:border-[#FF9933] hover:scale-110 cursor-pointer group"
          title="Previous Slide (‹)"
        >
          <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8 text-[#D4AF37] group-hover:text-white transition-colors" />
        </button>

        <button
          onClick={goToNextSlide}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#07171E]/80 hover:bg-[#800020] text-white flex items-center justify-center transition-all border border-[#D4AF37]/50 shadow-[0_0_20px_rgba(0,0,0,0.6)] hover:border-[#FF9933] hover:scale-110 cursor-pointer group"
          title="Next Slide (›)"
        >
          <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8 text-[#D4AF37] group-hover:text-white transition-colors" />
        </button>

        {/* ========================================================================= */}
        {/* 5. HERO BOTTOM CONTENT & COUNTER OVERLAY */}
        {/* ========================================================================= */}
        <div className="absolute bottom-0 left-0 right-0 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-6 pt-16 z-20 flex flex-col md:flex-row md:items-end justify-between gap-4 pointer-events-none">
          
          {/* Title & Caption */}
          <div className="space-y-2 pointer-events-auto max-w-3xl">
            {/* Category Tag */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#FF9933] uppercase tracking-widest bg-[#800020]/90 px-3 py-1 rounded border border-[#D4AF37]/40 shadow-xs flex items-center gap-1.5">
                <Sprout className="w-3.5 h-3.5 text-[#AEE583]" />
                {vinayakaProject.projectType || 'SOILLESS FARMING PROJECT'}
              </span>
              <span className="text-xs font-mono font-bold text-[#AEE583] bg-[#2F7445]/80 px-2.5 py-1 rounded border border-emerald-400/30 uppercase">
                {vinayakaProject.executionType || 'TURNKEY EXECUTION'}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-[46px] font-extrabold tracking-tight text-white uppercase leading-none drop-shadow-md">
              {vinayakaProject.title}
            </h1>

            {/* Slide Title & Description */}
            {currentSlide && (
              <div className="pt-1 bg-[#07171E]/80 backdrop-blur-md p-3 rounded-lg border border-white/10 max-w-2xl">
                <p className="text-xs sm:text-sm font-bold text-[#D4AF37] uppercase tracking-wide">
                  {currentSlide.title || `Slide ${activeSlideIndex + 1}`}:
                </p>
                <p className="text-xs sm:text-sm text-gray-200 font-normal leading-relaxed line-clamp-2 mt-0.5">
                  {currentSlide.caption || 'High-tech protected cultivation installation at Vinayaka Farm, Gujarat.'}
                </p>
              </div>
            )}
          </div>

          {/* Dribbble Style Slide Counter & Play Button Badge */}
          <div className="flex items-center md:flex-col md:items-end gap-3 shrink-0 pointer-events-auto">
            {/* Formatting: e.g. 01 / 13 */}
            <div className="bg-[#07171E]/90 border border-[#D4AF37] px-4 py-2 rounded-xl backdrop-blur-md shadow-[0_0_15px_rgba(212,175,55,0.25)] flex items-center gap-3">
              {isCurrentVideo ? (
                <VideoIcon className="w-4 h-4 text-[#FF9933]" />
              ) : (
                <ImageIcon className="w-4 h-4 text-[#AEE583]" />
              )}
              <div className="font-mono flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#D4AF37]">
                  {String(activeSlideIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-xs font-bold text-[#FF9933]">
                  / {String(totalSlides).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Consultation CTA Button */}
            {onOpenConsultationModal && (
              <button
                onClick={() => onOpenConsultationModal(vinayakaProject.title)}
                className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-[#FF9933] via-[#D4AF37] to-[#2F7445] text-[#07171E] font-extrabold text-xs px-4 py-2.5 rounded-lg shadow-lg hover:brightness-110 transition-all uppercase tracking-wider cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-[#07171E]" />
                <span>INQUIRE THIS PROJECT</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. CLICKABLE THUMBNAILS CAROUSEL STRIP (ALL V2-V8 + VIDEOS + PHOTOS) */}
      {/* ========================================================================= */}
      <div className="bg-[#040C0F] border-t border-[#D4AF37]/30 py-3.5">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between pb-2 mb-1">
            <span className="text-[11px] font-mono font-bold text-[#D4AF37] uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF9933]" />
              PROJECT MEDIA CAROUSEL ({totalSlides} ITEMS INCLUDING V2–V8 & EXECUTION VIDEOS)
            </span>

            {onViewAllProjects && (
              <button
                onClick={onViewAllProjects}
                className="text-[11px] font-mono font-bold text-[#AEE583] hover:text-[#FF9933] transition-colors uppercase tracking-wider cursor-pointer"
              >
                VIEW ALL PROJECTS →
              </button>
            )}
          </div>

          <div
            ref={thumbnailStripRef}
            className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-none scroll-smooth"
          >
            {mediaItems.map((item, idx) => {
              const isSelected = idx === activeSlideIndex;
              const thumbUrl = item.type === 'video' ? (item as any).thumbnail || '/projects/vinayaka-farm/v2.jpg' : item.src;
              
              return (
                <button
                  key={item.id || idx}
                  onClick={() => goToSlide(idx)}
                  className={`group shrink-0 w-24 sm:w-32 aspect-[16/10] rounded-xl overflow-hidden relative border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'border-[#FF9933] ring-2 ring-[#D4AF37] scale-105 shadow-[0_0_15px_rgba(255,153,51,0.5)] opacity-100'
                      : 'border-white/20 opacity-55 hover:opacity-100 hover:border-[#D4AF37]'
                  }`}
                  title={item.title || `Slide ${idx + 1}`}
                >
                  <img
                    src={thumbUrl}
                    alt={(item as any)?.alt || `Vinayaka Farm thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/projects/vinayaka-farm/v2.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

                  {/* Video Badge */}
                  {item.type === 'video' ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#800020]/40 group-hover:bg-transparent transition-colors">
                      <div className="p-1.5 rounded-full bg-[#FF9933] text-[#07171E] shadow-md">
                        <Play className="w-3.5 h-3.5 fill-[#07171E] text-[#07171E] ml-0.5" />
                      </div>
                    </div>
                  ) : null}

                  {/* Number Badge */}
                  <span className="absolute bottom-1 right-1 bg-[#07171E]/90 text-[9px] font-mono font-bold text-[#D4AF37] px-1.5 py-0.2 rounded border border-[#D4AF37]/30">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. FULLSCREEN LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6"
          >
            {/* Lightbox Header */}
            <div className="flex items-center justify-between text-white z-10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider bg-[#800020] px-2.5 py-1 rounded">
                  {vinayakaProject.title} Lightbox
                </span>
                <span className="text-xs font-mono font-bold text-gray-400">
                  {lightboxIndex + 1} / {totalSlides}
                </span>
              </div>

              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-[#800020] text-white transition-colors cursor-pointer"
                title="Close Lightbox (Esc)"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Main Media Content */}
            <div className="relative flex-grow flex items-center justify-center my-4 overflow-hidden">
              {mediaItems[lightboxIndex]?.type === 'video' ? (
                <video
                  src={mediaItems[lightboxIndex].src}
                  controls
                  autoPlay
                  playsInline
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                />
              ) : (
                <img
                  src={mediaItems[lightboxIndex]?.src}
                  alt={mediaItems[lightboxIndex]?.title || 'Lightbox image'}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                />
              )}

              {/* Lightbox Navigation Buttons */}
              <button
                onClick={() => setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : totalSlides - 1))}
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#07171E]/80 hover:bg-[#800020] text-[#D4AF37] border border-[#D4AF37]/50 shadow-xl cursor-pointer"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={() => setLightboxIndex((prev) => (prev !== null && prev < totalSlides - 1 ? prev + 1 : 0))}
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#07171E]/80 hover:bg-[#800020] text-[#D4AF37] border border-[#D4AF37]/50 shadow-xl cursor-pointer"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            {/* Lightbox Footer Caption */}
            <div className="text-center text-xs font-mono text-gray-300 max-w-xl mx-auto">
              <p className="font-bold text-[#FF9933] uppercase">
                {mediaItems[lightboxIndex]?.title || `${vinayakaProject.title} Media Slide`}
              </p>
              <p className="text-gray-400 mt-1">
                {mediaItems[lightboxIndex]?.caption || 'Protected cultivation project photography.'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
