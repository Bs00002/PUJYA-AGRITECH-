import React, { useState, useEffect } from 'react';
import { ProductItemData, PRODUCT_CATALOGUE } from './ProductsShowcase';
import { ProductItem } from '../types';
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  X
} from 'lucide-react';

interface ProductDetailViewProps {
  product: ProductItemData | ProductItem;
  onBack: () => void;
  onOpenConsultationModal: (itemName?: string) => void;
  onSelectProduct: (slug: string) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onBack,
  onOpenConsultationModal,
  onSelectProduct,
}) => {
  // Collect all unique images for gallery
  const rawGallery = 'galleryImages' in product && product.galleryImages ? product.galleryImages : [];
  const allImages = Array.from(new Set([product.imageUrl, ...rawGallery].filter(Boolean)));
  
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  useEffect(() => {
    setActiveImageIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const activeImageUrl = allImages[activeImageIndex] || product.imageUrl;

  const relatedProducts = PRODUCT_CATALOGUE.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 3);

  const features = 'features' in product && product.features ? product.features : [];
  const specifications = 'specifications' in product && product.specifications ? product.specifications : undefined;

  const categoryLabel = ('categoryLabel' in product && product.categoryLabel) || 'Greenhouse Turnkey Project';
  const fullOverview = ('fullOverview' in product && product.fullOverview) || product.shortDescription;

  // Specification mapping helper
  const gutterHeight = specifications?.gutterHeight || ('standardSideHeight' in (specifications || {}) ? (specifications as any).standardSideHeight : undefined);
  const gutterHeightLabel = specifications?.gutterHeightLabel || (product.name.includes('Net House') || product.name.includes('Tunnel') ? 'Std. Side Height' : 'Std. Gutter Height');
  const topHeight = specifications?.topHeight || ('standardTopHeight' in (specifications || {}) ? (specifications as any).standardTopHeight : undefined);

  return (
    <div className="bg-[#F8FAF8] text-[#10232B] font-sans min-h-screen pb-12 md:pb-16 selection:bg-[#006B8F] selection:text-white">
      
      {/* 1. FULLSCREEN LIGHTBOX MODAL */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/92 flex flex-col items-center justify-between p-4 sm:p-6 animate-fade-in">
          {/* Top Bar */}
          <div className="w-full max-w-[1240px] flex items-center justify-between text-white py-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold bg-white/20 px-3 py-1 rounded text-white">
                IMAGE {activeImageIndex + 1} OF {allImages.length}
              </span>
              <span className="text-sm font-semibold text-white/90 truncate hidden sm:inline">
                {product.name}
              </span>
            </div>

            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Close Fullscreen"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Center Lightbox Image */}
          <div className="relative flex-1 w-full max-w-[1000px] flex items-center justify-center py-4">
            {allImages.length > 1 && (
              <button
                onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1))}
                className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <img
              src={activeImageUrl}
              alt={product.name}
              className="max-h-[75vh] max-w-full object-contain rounded-md shadow-2xl"
            />

            {allImages.length > 1 && (
              <button
                onClick={() => setActiveImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0))}
                className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-2.5 overflow-x-auto max-w-full py-2 px-4 bg-black/40 rounded-lg border border-white/10">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-12 rounded overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    activeImageIndex === idx ? 'border-[#006B8F] opacity-100 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. BREADCRUMB NAV BAR */}
      <div className="bg-white border-b border-gray-200/80 py-2.5 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-[1240px] w-[92%] mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-gray-500 font-medium">
            <button
              onClick={onBack}
              className="hover:text-[#006B8F] transition-colors cursor-pointer font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4 text-[#006B8F]" />
              <span>Products Catalogue</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <button
              onClick={onBack}
              className="hover:text-[#006B8F] transition-colors cursor-pointer text-gray-600 hidden sm:inline"
            >
              {categoryLabel}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 hidden sm:inline" />
            <span className="text-[#006B8F] font-bold truncate max-w-[180px] sm:max-w-none">
              {product.name}
            </span>
          </div>

          <button
            onClick={onBack}
            className="text-[11px] font-bold text-[#006B8F] hover:text-[#005775] transition-colors cursor-pointer uppercase tracking-wider flex items-center gap-1 shrink-0"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">BACK TO ALL PRODUCTS</span>
            <span className="sm:hidden">ALL PRODUCTS</span>
          </button>
        </div>
      </div>

      {/* 3. MAIN COMPACT BROCHURE CARD (MATCHING PDF BROCHURE SCREENSHOT EXACTLY!) */}
      <div className="max-w-[1240px] w-[92%] mx-auto my-6 sm:my-8 bg-white border border-gray-200/90 rounded-lg p-5 sm:p-7 lg:p-9 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          
          {/* LEFT COLUMN: Product Photograph (50% width = lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-3">
            <div className="overflow-hidden rounded border border-gray-200 bg-[#F8FAF8] relative">
              <img
                src={activeImageUrl}
                alt={product.name}
                className="w-full h-[320px] sm:h-[380px] lg:h-[420px] object-cover cursor-pointer hover:scale-[1.01] transition-transform duration-300"
                onClick={() => setIsLightboxOpen(true)}
              />
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute bottom-3 right-3 bg-[#10232B]/85 hover:bg-[#10232B] text-white px-3 py-1 rounded text-xs font-mono flex items-center gap-1.5 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#006B8F]" />
                <span>FULLSCREEN</span>
              </button>
            </div>

            {/* Gallery Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-2 pt-1 overflow-x-auto">
                {allImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-18 h-12 rounded overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-[#006B8F] opacity-100 scale-105'
                        : 'border-gray-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Title + Description + Specification Table + Suitable For + CTA (50% width = lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Product Title */}
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#006B8F]">
                {categoryLabel}
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#006B8F] tracking-tight uppercase leading-snug">
                {product.name}
              </h1>
            </div>

            {/* Description Paragraph */}
            <p className="text-base text-gray-700 leading-relaxed font-normal">
              {fullOverview || product.shortDescription}
            </p>

            {/* Specification Grid Table (Matching PDF Brochure Table Grid or Key-Value Details) */}
            {specifications && (
              specifications.model ? (
                <div className="overflow-x-auto pt-1 pb-1">
                  <span className="text-[10px] text-gray-500 font-medium sm:hidden block pb-1">
                    ← Swipe horizontally to view full specifications →
                  </span>
                  <table className="min-w-[560px] w-full text-center border-collapse text-sm border border-gray-300">
                    <thead>
                      <tr className="bg-[#F8FAF8] text-[#10232B] font-bold border-b border-gray-300 text-xs uppercase">
                        <th className="py-2.5 px-2 border-r border-gray-300">MODEL</th>
                        <th className="py-2.5 px-2 border-r border-gray-300">Standard Grids</th>
                        <th className="py-2.5 px-2 border-r border-gray-300">{gutterHeightLabel}</th>
                        <th className="py-2.5 px-2 border-r border-gray-300">Std. Top Height</th>
                        <th className="py-2.5 px-2 border-r border-gray-300">Top Vent</th>
                        <th className="py-2.5 px-2 border-r border-gray-300">Side Vent</th>
                        <th className="py-2.5 px-2">Side Corridors</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="font-semibold text-[#10232B] text-sm">
                        <td className="py-3 px-2 font-bold border-r border-gray-300 font-mono">{specifications.model || '—'}</td>
                        <td className="py-3 px-2 border-r border-gray-300 font-mono">{specifications.standardGrids || '—'}</td>
                        <td className="py-3 px-2 border-r border-gray-300 font-mono">{gutterHeight || '—'}</td>
                        <td className="py-3 px-2 border-r border-gray-300 font-mono">{topHeight || '—'}</td>
                        <td className="py-3 px-2 border-r border-gray-300 font-mono">{specifications.topVent !== undefined ? specifications.topVent : '—'}</td>
                        <td className="py-3 px-2 border-r border-gray-300 font-mono">{specifications.sideVent !== undefined ? specifications.sideVent : '—'}</td>
                        <td className="py-3 px-2 font-mono">{specifications.sideCorridors !== undefined ? specifications.sideCorridors : '—'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-[#F8FAF8] border border-gray-200/90 rounded-lg p-4 space-y-2.5 text-sm">
                  <div className="font-mono font-bold text-xs text-[#006B8F] uppercase tracking-wider">
                    PRODUCT DETAILS & SPECIFICATIONS
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {Object.entries(specifications).map(([key, val]) => {
                      if (!val) return null;
                      const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
                      return (
                        <div key={key} className="flex flex-col py-1 border-b border-gray-200/60 last:border-0">
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{formattedKey}</span>
                          <span className="font-semibold text-[#10232B] text-sm sm:text-base">{String(val)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            )}

            {/* Suitable for line */}
            {specifications?.suitableCrops && (
              <div className="text-sm sm:text-base pt-1">
                <span className="font-bold text-[#10232B]">Suitable for: </span>
                <span className="text-gray-700 font-medium">{specifications.suitableCrops}</span>
              </div>
            )}

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                onClick={() => onOpenConsultationModal(`Product Consultation: ${product.name}`)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-semibold text-white bg-[#006B8F] hover:bg-[#005775] transition-colors uppercase tracking-wider cursor-pointer shadow-2xs"
              >
                <span>GET PROJECT CONSULTATION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* 4. VIDEO DOCUMENTATION PLAYER */}
      {(product.videoUrl || (product.galleryVideos && product.galleryVideos.length > 0)) && (
        <div className="max-w-[1240px] w-[92%] mx-auto mb-6 bg-white border border-gray-200/90 rounded-lg p-5 sm:p-7 shadow-xs space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#006B8F]">
              VIDEO DOCUMENTATION
            </span>
            <h3 className="text-lg font-extrabold text-[#10232B] uppercase">
              STRUCTURE & INSTALLATION VIDEO
            </h3>
          </div>
          <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-black aspect-video max-w-3xl">
            <video
              src={product.videoUrl || (product.galleryVideos && product.galleryVideos[0]) || '/hero-banner.mp4'}
              controls
              playsInline
              className="w-full h-full object-cover"
              poster={product.imageUrl}
            >
              Your browser does not support video playback.
            </video>
          </div>
        </div>
      )}

      {/* 5. MULTI-PHOTO GALLERY (5 TO 8 PHOTOS) */}
      {allImages.length > 0 && (
        <div className="max-w-[1240px] w-[92%] mx-auto mb-6 bg-white border border-gray-200/90 rounded-lg p-5 sm:p-7 shadow-xs space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#006B8F]">
              PRODUCT GALLERY ({allImages.length} PHOTOS)
            </span>
            <h3 className="text-lg font-extrabold text-[#10232B] uppercase">
              REAL SITE & PRODUCT PHOTOGRAPHY
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {allImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`group cursor-pointer aspect-[4/3] rounded-lg overflow-hidden border bg-gray-100 relative shadow-2xs hover:shadow-md transition-all ${
                  activeImageIndex === idx ? 'border-[#006B8F] ring-2 ring-[#006B8F]/30' : 'border-gray-200'
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} photo ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `/gallery/site-gallery-${(idx % 7) + 1}.jpg`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. COMPACT ENGINEERING & STRUCTURAL INCLUSIONS */}
      {features.length > 0 && (
        <div className="max-w-[1240px] w-[92%] mx-auto mb-6 bg-white border border-gray-200/90 rounded-lg p-5 sm:p-7 shadow-xs space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#006B8F]">
            ENGINEERING & STRUCTURAL INCLUSIONS
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2 py-1">
                <span className="text-[#006B8F] font-bold shrink-0 mt-0.5">•</span>
                <span className="text-[#10232B] font-medium leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. EXPLORE OTHER PROTECTED CULTIVATION STRUCTURES */}
      {relatedProducts.length > 0 && (
        <div className="max-w-[1240px] w-[92%] mx-auto space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#006B8F]">
            EXPLORE OTHER PROTECTED CULTIVATION STRUCTURES
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectProduct(rel.slug)}
                className="group cursor-pointer rounded bg-white border border-gray-200/90 hover:border-[#006B8F] transition-all overflow-hidden flex flex-col justify-between p-4 shadow-xs"
              >
                <div className="aspect-[16/10] w-full overflow-hidden rounded bg-[#F8FAF8] mb-3">
                  <img
                    src={rel.imageUrl}
                    alt={rel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#006B8F]">{rel.categoryLabel}</span>
                    <h4 className="text-sm font-bold text-[#10232B] group-hover:text-[#006B8F] transition-colors leading-snug">
                      {rel.name}
                    </h4>
                  </div>

                  <div className="pt-2 border-t border-gray-100 text-xs font-bold text-[#006B8F] group-hover:text-[#005775] flex items-center gap-1 uppercase">
                    <span>VIEW PRODUCT</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductDetailView;
