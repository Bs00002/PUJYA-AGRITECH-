import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, FileText, Wrench, Layers, Award } from 'lucide-react';
import { ProductItem } from '../types';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onOpenQuote: (productName: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenQuote,
}) => {
  if (!product) return null;

  const [activeImg, setActiveImg] = useState<string>(product.imageUrl);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      {/* Modal Card Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="bg-[#004b93] text-white px-6 py-4 flex items-center justify-between border-b border-blue-900">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-white/20 text-white border border-white/30 text-[11px] font-bold uppercase tracking-wider">
              {product.categoryLabel}
            </span>
            <span className="text-xs text-blue-100 hidden sm:inline">• Technical Specification Data Sheet</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Top Section: Gallery & Title */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Gallery Column */}
            <div className="md:col-span-6 space-y-3">
              <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={activeImg || product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-slate-900/90 text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider flex items-center gap-1 shadow-sm">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>ISO & IS-1239 Compliant</span>
                </div>
              </div>

              {/* Thumbnails */}
              {product.galleryImages && product.galleryImages.length > 0 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <button
                    onClick={() => setActiveImg(product.imageUrl)}
                    className={`h-16 w-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImg === product.imageUrl ? 'border-[#004b93] scale-105' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={product.imageUrl} alt="Main" className="w-full h-full object-cover" />
                  </button>
                  {product.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImg(img)}
                      className={`h-16 w-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                        activeImg === img ? 'border-[#004b93] scale-105' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Overview Column */}
            <div className="md:col-span-6 space-y-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">{product.name}</h2>
                <p className="text-xs font-bold text-[#004b93] mt-1 leading-relaxed">{product.tagline}</p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {product.description}
              </p>

              {/* Quick Spec Highlights Badges */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Expected Lifespan</span>
                  <span className="text-xs font-black text-slate-900">{product.lifespan}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Light Transmittance</span>
                  <span className="text-xs font-black text-slate-900">{product.lightTransmittance}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Wind Load Resistance</span>
                  <span className="text-xs font-black text-slate-800">{product.windLoad}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Snow Load Capacity</span>
                  <span className="text-xs font-black text-slate-800">{product.snowLoad}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-3">
                <button
                  onClick={() => {
                    onClose();
                    onOpenQuote(product.name);
                  }}
                  className="flex-1 py-3 px-4 rounded-lg bg-[#004b93] hover:bg-[#003870] text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Request Project Quotation</span>
                </button>
              </div>
            </div>

          </div>

          {/* Specifications Table Grid */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#004b93]" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Engineering & Structural Specifications</h3>
            </div>

            <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-200 text-xs">
              {Object.entries(product.specifications).map(([key, val], idx) => (
                <div key={idx} className="grid grid-cols-12 p-3 hover:bg-white transition-colors">
                  <span className="col-span-5 sm:col-span-4 font-bold text-slate-700">{key}</span>
                  <span className="col-span-7 sm:col-span-8 text-slate-900 font-medium">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Advantages & Features */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#004b93]" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Key Design Advantages</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-800 font-medium leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Sticky Footer Bar */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#004b93]" />
            <span>Turnkey Fabrication, Delivery & Site Installation Included</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none py-2.5 px-5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-all"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenQuote(product.name);
              }}
              className="flex-1 sm:flex-none py-2.5 px-6 rounded-lg bg-[#004b93] hover:bg-[#003870] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>Get Detailed DPR Quote</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-200" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
