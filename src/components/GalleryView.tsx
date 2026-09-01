import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/gallery';
import { GalleryItem } from '../types';
import { Play, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export const GalleryView: React.FC = () => {
  const { gallery } = useAdmin();
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  // Sourced gallery items (7 selected authentic site photographs)
  const galleryItems: GalleryItem[] = (gallery && gallery.length > 0)
    ? gallery.filter(g => g.published !== false).map(g => ({
        id: g.id,
        title: g.title,
        category: (g.type === 'video' ? 'video' : (g.category?.toLowerCase() || 'greenhouses')) as any,
        imageUrl: g.url || '/gallery/site-gallery-1.jpg',
        videoUrl: g.videoEmbedUrl,
        caption: g.description || g.title,
        isFeatured: g.featured,
      }))
    : GALLERY_ITEMS;

  const activeMedia = activeItemIndex !== null ? galleryItems[activeItemIndex] : null;

  return (
    <div className="bg-[#F8FAF8] min-h-screen py-12 md:py-16 text-[#10232B] font-sans selection:bg-[#006B8F] selection:text-white">
      <div className="max-w-[1280px] w-[94%] mx-auto space-y-10 md:space-y-12">
        
        {/* ================= 1. HEADER SECTION ================= */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#006B8F]/20 bg-white shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-widest text-[#006B8F]">
              VISUAL DOCUMENTATION
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#10232B] uppercase">
            GALLERY & VIDEO
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed font-normal">
            Real-world photography and structural execution documentation from Pujya Agritech protected cultivation projects.
          </p>
        </div>

        {/* ================= 2. CLEAN RESPONSIVE GALLERY GRID (NO CATEGORIES / NO FILTERS) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {galleryItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveItemIndex(idx)}
              className="group cursor-pointer rounded-2xl bg-white border border-gray-200/90 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-gray-100 border-b border-gray-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />

                {item.videoUrl && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-[#006B8F] shadow-md group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                )}

                <div className="absolute bottom-3 right-3 bg-[#10232B]/80 backdrop-blur-xs px-2.5 py-1 rounded text-xs font-mono font-bold text-white flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5 text-[#AEE583]" />
                  <span>EXPAND</span>
                </div>
              </div>

              {/* Title & Description Box */}
              <div className="p-6 space-y-2.5 bg-white flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-[#10232B] group-hover:text-[#006B8F] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-[15px] text-gray-600 leading-relaxed font-normal line-clamp-2">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ================= 3. CLEAN LIGHTBOX PREVIEW MODAL ================= */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div className="max-w-4xl w-full bg-white rounded-2xl p-5 sm:p-7 space-y-4 relative border border-gray-200 shadow-2xl overflow-hidden">
            {/* Top Close Button */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base sm:text-lg font-extrabold text-[#006B8F] truncate pr-8">
                {activeMedia.title}
              </h3>
              <button
                onClick={() => setActiveItemIndex(null)}
                className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Area */}
            <div className="relative h-[360px] sm:h-[480px] bg-[#F8FAF8] rounded-xl overflow-hidden flex items-center justify-center border border-gray-200/80">
              {activeMedia.videoUrl ? (
                <iframe
                  src={activeMedia.videoUrl}
                  title={activeMedia.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <img
                  src={activeMedia.imageUrl}
                  alt={activeMedia.title}
                  className="max-w-full max-h-full object-contain"
                />
              )}

              {/* Prev / Next Navigation Controls */}
              {galleryItems.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveItemIndex((prev) =>
                        prev !== null ? (prev - 1 + galleryItems.length) % galleryItems.length : null
                      )
                    }
                    className="absolute left-3 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 shadow-md transition-all cursor-pointer"
                    title="Previous"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() =>
                      setActiveItemIndex((prev) =>
                        prev !== null ? (prev + 1) % galleryItems.length : null
                      )
                    }
                    className="absolute right-3 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 shadow-md transition-all cursor-pointer"
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

