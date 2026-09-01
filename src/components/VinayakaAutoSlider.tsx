import React, { useState, useEffect, useRef } from 'react';
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
} from 'lucide-react';
import { ProjectItem, ProjectMediaItem } from '../types';
import { VERIFIED_PROJECTS, getProjectMediaList } from '../data/projects';

interface VinayakaAutoSliderProps {
  project?: ProjectItem;
  onOpenConsultationModal?: (itemName?: string) => void;
}

export const VinayakaAutoSlider: React.FC<VinayakaAutoSliderProps> = ({
  project: propProject,
}) => {
  // Source target project (Vinayaka Farm or provided project)
  const activeProject =
    propProject ||
    VERIFIED_PROJECTS.find((p) => p.id === 'proj-vinayaka-farm' || p.slug === 'vinayaka-farm') ||
    VERIFIED_PROJECTS[0];

  // Media items list containing all V2-V8 images + both w1.mp4 & w2.mp4 videos
  const mediaItems: ProjectMediaItem[] = getProjectMediaList(activeProject);
  const totalSlides = mediaItems.length;

  // Slider State
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const currentSlide = mediaItems[activeSlideIndex] || mediaItems[0];
  const isCurrentVideo = currentSlide?.type === 'video';

  // Navigation Handlers
  const goToNextSlide = () => {
    setActiveSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
    setIsVideoPlaying(false);
  };

  const goToPrevSlide = () => {
    setActiveSlideIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
    setIsVideoPlaying(false);
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

  // Reset video playback state on slide change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsVideoPlaying(false);
    }
  }, [activeSlideIndex]);

  // Keyboard Navigation
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

    if (diffX > 40) goToNextSlide();
    else if (diffX < -40) goToPrevSlide();
    touchStartX.current = null;
  };

  // Video Playback Toggle
  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsVideoPlaying(true);
        setIsPlaying(false);
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
      {/* MAIN CLEAN MEDIA VIEWPORT (NO OVERLAYS, NO TOP STRIP, NO ARROWS, NO BADGES) */}
      {/* ========================================================================= */}
      <div
        className="relative w-full h-[440px] sm:h-[540px] lg:h-[600px] bg-[#07171E] overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Animated Slide Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide?.src || activeSlideIndex}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={toggleVideoPlayback}
                >
                  Your browser does not support HTML5 video.
                </video>

                {/* Center Play Overlay Button when video is paused */}
                {!isVideoPlaying && (
                  <button
                    onClick={toggleVideoPlayback}
                    className="absolute z-30 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#FF9933] via-[#D4AF37] to-[#800020] p-1 shadow-[0_0_30px_rgba(255,153,51,0.6)] hover:scale-110 transition-transform cursor-pointer flex items-center justify-center group"
                  >
                    <div className="w-full h-full rounded-full bg-[#07171E]/90 flex items-center justify-center group-hover:bg-[#07171E]/70 transition-colors">
                      <Play className="w-9 h-9 sm:w-11 sm:h-11 text-[#FF9933] fill-[#FF9933] ml-1.5" />
                    </div>
                  </button>
                )}

                {/* Minimal Video Controls Bar */}
                <div className="absolute bottom-4 left-4 right-4 z-30 flex items-center justify-between bg-[#07171E]/85 backdrop-blur-md px-4 py-2 rounded-xl border border-[#D4AF37]/30 text-white shadow-lg">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleVideoPlayback}
                      className="p-2 rounded-lg bg-[#800020] hover:bg-[#9B1B30] text-[#D4AF37] transition-colors cursor-pointer"
                      title={isVideoPlaying ? 'Pause Video' : 'Play Video'}
                    >
                      {isVideoPlaying ? <Pause className="w-4 h-4 text-[#FF9933]" /> : <Play className="w-4 h-4 text-[#FF9933] fill-[#FF9933]" />}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="p-2 rounded-lg bg-[#07171E] border border-white/20 hover:border-[#D4AF37] text-white transition-colors cursor-pointer"
                      title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-gray-400" /> : <Volume2 className="w-4 h-4 text-[#AEE583]" />}
                    </button>

                    <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider hidden sm:inline">
                      {isVideoPlaying ? 'Playing Video' : 'Click Play to Watch'}
                    </span>
                  </div>

                  <button
                    onClick={() => setLightboxIndex(activeSlideIndex)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-[#800020] text-white transition-colors cursor-pointer flex items-center gap-1 text-xs font-mono border border-white/20"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#FF9933]" />
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
                  alt={(currentSlide as any)?.alt || `${activeProject.title} photo ${activeSlideIndex + 1}`}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/projects/vinayaka-farm/v2.jpg';
                  }}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ========================================================================= */}
      {/* FULLSCREEN LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between text-white z-10">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider bg-[#800020] px-3 py-1 rounded border border-[#D4AF37]/40">
                  {activeProject.title} Lightbox
                </span>
                <span className="text-xs font-mono font-bold text-[#FF9933]">
                  {lightboxIndex + 1} / {totalSlides}
                </span>
              </div>

              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-[#800020] text-white transition-colors cursor-pointer border border-white/20"
                title="Close Fullscreen View (Esc)"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Lightbox Display Area */}
            <div className="relative flex-grow flex items-center justify-center my-4 overflow-hidden">
              {mediaItems[lightboxIndex]?.type === 'video' ? (
                <video
                  src={mediaItems[lightboxIndex].src}
                  controls
                  autoPlay
                  playsInline
                  className="max-w-full max-h-[82vh] object-contain rounded-lg shadow-2xl border border-white/10"
                />
              ) : (
                <img
                  src={mediaItems[lightboxIndex]?.src}
                  alt={mediaItems[lightboxIndex]?.title || 'Fullscreen image'}
                  className="max-w-full max-h-[82vh] object-contain rounded-lg shadow-2xl border border-white/10"
                />
              )}

              {/* Prev / Next Lightbox Arrows */}
              <button
                onClick={() => setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : totalSlides - 1))}
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-[#800020]/90 hover:bg-[#9B1B30] text-[#D4AF37] border border-[#D4AF37] shadow-xl cursor-pointer"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={() => setLightboxIndex((prev) => (prev !== null && prev < totalSlides - 1 ? prev + 1 : 0))}
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-[#800020]/90 hover:bg-[#9B1B30] text-[#D4AF37] border border-[#D4AF37] shadow-xl cursor-pointer"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            {/* Footer Caption */}
            <div className="text-center text-xs font-mono text-gray-300 max-w-xl mx-auto">
              <p className="font-bold text-[#FF9933] uppercase">
                {mediaItems[lightboxIndex]?.title || `${activeProject.title} Media`}
              </p>
              <p className="text-gray-400 mt-1">
                {mediaItems[lightboxIndex]?.caption || 'Protected cultivation project media.'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
