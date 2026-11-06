import React, { useState, useEffect } from 'react';
import { GALLERY_ITEMS } from '../data/gallery';
import { DEFAULT_GALLERY } from '../data/adminStore';
import { GalleryItem } from '../types';
import { Play, X, ChevronLeft, ChevronRight, Maximize2, Film, Image as ImageIcon, Sparkles } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const isDirectVideo = (url?: string): boolean => {
  if (!url) return false;
  const clean = url.toLowerCase();
  return (
    clean.endsWith('.mp4') ||
    clean.endsWith('.webm') ||
    clean.endsWith('.ogg') ||
    clean.startsWith('/gallery/') ||
    clean.startsWith('/anime/') ||
    clean.startsWith('/uploads/') ||
    clean.startsWith('/projects/') ||
    (!clean.includes('youtube.com') && !clean.includes('youtu.be') && !clean.includes('vimeo.com'))
  );
};

export const GalleryView: React.FC = () => {
  const { gallery } = useAdmin();
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'video' | 'photo'>('all');

  // Sourced gallery items (Authentic site photographs & on-site walkthrough videos)
  const hasVideosInState = gallery && gallery.some(g => g.type === 'video');
  const sourceGallery = (gallery && gallery.length > 0 && hasVideosInState)
    ? gallery
    : DEFAULT_GALLERY;

  const galleryItems: GalleryItem[] = (sourceGallery && sourceGallery.length > 0)
    ? sourceGallery.filter(g => g.published !== false).map(g => ({
        id: g.id,
        title: g.title,
        category: (g.type === 'video' ? 'video' : (g.category?.toLowerCase() || 'greenhouses')) as any,
        imageUrl: g.url || '/gallery/site-gallery-1.jpg',
        videoUrl: g.videoEmbedUrl || (g as any).videoUrl || (g.type === 'video' ? g.url : undefined),
        caption: g.description || g.title,
        isFeatured: g.featured,
      }))
    : GALLERY_ITEMS;

  const videoCount = galleryItems.filter(item => Boolean(item.videoUrl) || item.category === 'video').length;
  const photoCount = galleryItems.length - videoCount;

  const displayedItems = galleryItems.filter(item => {
    const isVideo = Boolean(item.videoUrl) || item.category === 'video';
    if (activeFilter === 'video') return isVideo;
    if (activeFilter === 'photo') return !isVideo;
    return true;
  });

  const activeMedia = activeItemIndex !== null ? displayedItems[activeItemIndex] : null;

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (activeItemIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveItemIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setActiveItemIndex((prev) => (prev !== null ? (prev - 1 + displayedItems.length) % displayedItems.length : null));
      } else if (e.key === 'ArrowRight') {
        setActiveItemIndex((prev) => (prev !== null ? (prev + 1) % displayedItems.length : null));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItemIndex, displayedItems.length]);

  return (
    <div className="bg-[#F8FAF8] min-h-screen py-12 md:py-16 text-[#10232B] font-sans selection:bg-[#006B8F] selection:text-white">
      <div className="max-w-[1280px] w-[94%] mx-auto space-y-10 md:space-y-12">
        
        {/* ================= 1. HEADER SECTION ================= */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#006B8F]/20 bg-white shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#006B8F]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#006B8F]">
              VISUAL DOCUMENTATION
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#10232B] uppercase">
            GALLERY &amp; VIDEO
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Real-world photography, protected cultivation walk-throughs, and structural execution videos from Pujya Agritech agricultural projects.
          </p>

          {/* Filter Pills */}
          <div className="pt-2 flex items-center justify-center gap-2.5 flex-wrap">
            <button
              onClick={() => { setActiveFilter('all'); setActiveItemIndex(null); }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeFilter === 'all'
                  ? 'bg-[#006B8F] text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#006B8F] hover:text-[#006B8F]'
              }`}
            >
              <span>All Media</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeFilter === 'all' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
                {galleryItems.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveFilter('video'); setActiveItemIndex(null); }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeFilter === 'video'
                  ? 'bg-[#006B8F] text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#006B8F] hover:text-[#006B8F]'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Project Videos</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeFilter === 'video' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
                {videoCount}
              </span>
            </button>

            <button
              onClick={() => { setActiveFilter('photo'); setActiveItemIndex(null); }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeFilter === 'photo'
                  ? 'bg-[#006B8F] text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#006B8F] hover:text-[#006B8F]'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Site Photographs</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeFilter === 'photo' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
                {photoCount}
              </span>
            </button>
          </div>
        </div>

        {/* ================= 2. RESPONSIVE GALLERY GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayedItems.map((item, idx) => (
            <div
              key={item.id}
              className="group rounded-2xl bg-white border border-gray-200/90 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Media Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black border-b border-gray-100 flex items-center justify-center">
                {item.videoUrl ? (
                  <div className="relative w-full h-full bg-black">
                    <video
                      src={item.videoUrl}
                      poster={item.imageUrl}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-contain bg-black"
                    >
                      Your browser does not support HTML5 video.
                    </video>

                    {/* Top Right Cinema Modal Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveItemIndex(idx);
                      }}
                      className="absolute top-2.5 right-2.5 bg-[#10232B]/85 hover:bg-[#006B8F] text-white text-[11px] font-mono font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-colors shadow-md z-10 cursor-pointer"
                      title="Enlarge in Fullscreen Cinema"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-[#AEE583]" />
                      <span>CINEMA</span>
                    </button>

                    {/* Top Left Video Badge */}
                    <div className="absolute top-2.5 left-2.5 bg-[#006B8F]/95 backdrop-blur-xs text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md pointer-events-none">
                      <Play className="w-3 h-3 fill-white" />
                      <span>VIDEO</span>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => setActiveItemIndex(idx)}
                    className="relative w-full h-full cursor-pointer group"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute bottom-3 right-3 bg-[#10232B]/80 backdrop-blur-xs px-2.5 py-1 rounded text-xs font-mono font-bold text-white flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3.5 h-3.5 text-[#AEE583]" />
                      <span>EXPAND</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Description Box */}
              <div className="p-6 space-y-2.5 bg-white flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-[#10232B] group-hover:text-[#006B8F] transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  {item.caption && (
                    <p className="text-[14px] text-gray-600 leading-relaxed font-normal line-clamp-2">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ================= 3. LIGHTBOX PREVIEW MODAL ================= */}
      {activeMedia && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => setActiveItemIndex(null)}
        >
          <div
            className="max-w-4xl w-full bg-white rounded-2xl p-4 sm:p-6 space-y-4 relative border border-gray-200 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button & Title */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2 pr-6 overflow-hidden">
                {activeMedia.videoUrl && (
                  <span className="shrink-0 bg-[#006B8F] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                    VIDEO
                  </span>
                )}
                <h3 className="text-base sm:text-lg font-extrabold text-[#006B8F] truncate">
                  {activeMedia.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveItemIndex(null)}
                className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer shrink-0"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Area */}
            <div className="relative h-[280px] sm:h-[430px] md:h-[500px] max-h-[65vh] bg-[#0A161D] rounded-xl overflow-hidden flex items-center justify-center border border-gray-200/80">
              {activeMedia.videoUrl ? (
                isDirectVideo(activeMedia.videoUrl) ? (
                  <video
                    key={activeMedia.videoUrl}
                    src={activeMedia.videoUrl}
                    poster={activeMedia.imageUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain bg-black"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <iframe
                    src={activeMedia.videoUrl}
                    title={activeMedia.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )
              ) : (
                <img
                  src={activeMedia.imageUrl}
                  alt={activeMedia.title}
                  className="max-w-full max-h-full object-contain"
                />
              )}

              {/* Prev / Next Navigation Controls */}
              {displayedItems.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveItemIndex((prev) =>
                        prev !== null ? (prev - 1 + displayedItems.length) % displayedItems.length : null
                      )
                    }
                    className="absolute left-3 p-3 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/20 shadow-md transition-all cursor-pointer z-10"
                    title="Previous"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() =>
                      setActiveItemIndex((prev) =>
                        prev !== null ? (prev + 1) % displayedItems.length : null
                      )
                    }
                    className="absolute right-3 p-3 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/20 shadow-md transition-all cursor-pointer z-10"
                    title="Next"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Caption */}
            {activeMedia.caption && (
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal pt-1">
                {activeMedia.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
