import React, { useState, useMemo, useEffect } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { ProductDetailView } from './ProductDetailView';
import { PRODUCTS_51_DATA, PRODUCT_CATEGORIES } from '../data/products51Data';

export interface ProductItemData {
  id: string;
  slug: string;
  category: 'turnkey-project' | 'product';
  categoryLabel: string;
  name: string;
  shortDescription: string;
  fullOverview: string;
  imageUrl: string;
  galleryImages?: string[];
  features?: string[];
  specifications?: {
    model?: string;
    standardGrids?: string;
    gutterHeight?: string;
    gutterHeightLabel?: string;
    topHeight?: string;
    topVent?: string;
    sideVent?: string;
    sideCorridors?: string;
    suitableCrops?: string;
    category?: string;
    primaryUse?: string;
    whereUsed?: string;
    application?: string;
    specifications?: string;
    [key: string]: any;
  };
  itemNumber?: number;
  productCategory?: string;
  primaryUse?: string;
  whereUsed?: string;
  application?: string;
  keyBenefits?: string[];
  notes?: string;
  keywords?: string[];
}

// ================= 01 — EXACT 6 TURNKEY PROJECTS (REMAIN 100% UNTOUCHED) =================
export const TURNKEY_PROJECTS: ProductItemData[] = [
  {
    id: 'turnkey-1',
    slug: 'naturally-ventilated-poly-house',
    category: 'turnkey-project',
    categoryLabel: 'Poly House / Green House',
    name: 'Naturally Ventilated Poly House',
    shortDescription: 'Designed for sustainable cultivation, naturally ventilated greenhouses reduce energy consumption while maintaining ideal growing conditions.',
    fullOverview: 'Designed for sustainable cultivation, naturally ventilated greenhouses reduce energy consumption while maintaining ideal growing conditions. Natural air circulation continuously expels excess heat and moisture, creating a healthier environment for flowers and sensitive crops. Adaptable to diverse weather conditions, these greenhouses are a reliable solution for growers around the globe.',
    imageUrl: '/products/Naturally Ventilated Poly House.png',
    galleryImages: ['/products/Naturally Ventilated Poly House.png'],
    features: [
      'Hot-dip galvanized structural GI steel tubular framing',
      '200-micron UV-stabilized anti-drip poly film cladding',
      'Continuous top ridge vent and perimeter skirt vents',
      '40-mesh / 50-mesh anti-insect side net curtains',
      'Trellising wire framework for vertical crop support',
    ],
    specifications: {
      model: 'NVPH',
      standardGrids: '8m × 4m',
      gutterHeight: '4m / 4.5m',
      gutterHeightLabel: 'Std. Gutter Height',
      topHeight: '6m / 6.5m',
      topVent: '1m / 1.2m',
      sideVent: '3m / 3.5m',
      sideCorridors: '2m / 2.5m',
      suitableCrops: 'Exotic Vegetables & Flowers etc.',
    },
  },
  {
    id: 'turnkey-2',
    slug: 'fan-and-pad-poly-house',
    category: 'turnkey-project',
    categoryLabel: 'Poly House / Green House',
    name: 'Fan & Pad Poly House',
    shortDescription: 'Active evaporative cooling systems engineered for precise micro-climate control in high-temperature regions.',
    fullOverview: 'Engineered for extreme heat environments, Fan & Pad poly houses utilize cellulose evaporative cooling wall pads combined with heavy-duty axial exhaust fans. The system pulls ambient air through moist cooling pads, dropping internal temperatures by 8°C to 12°C while controlling humidity for sensitive crops.',
    imageUrl: '/products/FAN & PAD POLY HOUSE.png',
    galleryImages: ['/products/FAN & PAD POLY HOUSE.png'],
    features: [
      'High-efficiency cellulose evaporative cooling wall pads',
      'Heavy-duty 50-inch axial exhaust fans with louvers',
      'Automated climate controller panel with temp & humidity sensors',
      '200-micron anti-drip multi-layer poly film cladding',
      'Drip irrigation and fogging system compatibility',
    ],
    specifications: {
      model: 'FPPH',
      standardGrids: '8m × 4m',
      gutterHeight: '4m / 4.5m',
      gutterHeightLabel: 'Std. Gutter Height',
      topHeight: '6m / 6.5m',
      topVent: 'Automated Fans',
      sideVent: 'Cooling Pad Wall',
      sideCorridors: '2m / 2.5m',
      suitableCrops: 'Gerbera, Dutch Roses, Strawberries & Tomatoes',
    },
  },
  {
    id: 'turnkey-3',
    slug: 'dome-shape-net-house',
    category: 'turnkey-project',
    categoryLabel: 'Shade Net House',
    name: 'Dome Shape Net House',
    shortDescription: 'A modern protected cultivation structure with a curved roof design covered by high-quality shade or insect-proof net.',
    fullOverview: 'A modern protected cultivation structure with a curved roof design covered by high-quality shade or insect-proof net. It provides excellent ventilation, protection from insects and adverse weather conditions, and creates an ideal environment for growing vegetables, flowers, nurseries, and high-value crops while reducing cultivation costs.',
    imageUrl: '/products/dome shape net house.jpeg',
    galleryImages: ['/products/dome shape net house.jpeg'],
    features: [
      'Aerodynamic curved dome frame configuration',
      'UV-stabilized HDPE agro shade net cladding',
      'Heavy-duty GI structural post and purlin arrangement',
      'Side curtain mesh for cross-ventilation',
      'Compatible with micro-sprinkler & overhead fogging',
    ],
    specifications: {
      model: 'DSNH',
      standardGrids: '6m × 4m / 6m × 6m',
      gutterHeight: '3.5m / 4m',
      gutterHeightLabel: 'Std. Side Height',
      topHeight: '5.5m / 6m',
      topVent: 'NA',
      sideVent: 'NA',
      sideCorridors: '2m / 2.5m',
      suitableCrops: 'Exotic Vegetables & Nursery Holders etc.',
    },
  },
  {
    id: 'turnkey-4',
    slug: 'flat-type-net-house',
    category: 'turnkey-project',
    categoryLabel: 'Shade Net House',
    name: 'Flat Type Net House',
    shortDescription: 'Flat Type Net House is a cost-effective protected cultivation structure designed to protect crops from insects, birds, and harsh weather.',
    fullOverview: 'Flat Type Net House is a cost-effective protected cultivation structure designed to protect crops from insects, birds, and harsh weather conditions while improving crop quality and productivity through a controlled growing environment.',
    imageUrl: '/products/FLAT TYPE NET HOUSE.jpeg',
    galleryImages: ['/products/FLAT TYPE NET HOUSE.jpeg'],
    features: [
      'High-tension cable and GI post layout',
      'UV-treated monofilament anti-insect netting',
      'Uniform light diffusion across crop canopy',
      'Economical construction for commercial farming',
    ],
    specifications: {
      model: 'FTNH',
      standardGrids: '6m × 4m / 6m × 6m',
      gutterHeight: '4m / 4.5m / 5m',
      gutterHeightLabel: 'Std. Side Height',
      topHeight: '4m / 4.5m / 5m',
      topVent: 'NA',
      sideVent: 'NA',
      sideCorridors: '2m / 2.5m',
      suitableCrops: 'Exotic Vegetables & Nursery Holders etc.',
    },
  },
  {
    id: 'turnkey-5',
    slug: 'wire-rope-net-house',
    category: 'turnkey-project',
    categoryLabel: 'Shade Net House',
    name: 'Wire Rope Net House',
    shortDescription: 'An advanced protected cultivation structure designed with high-tensile wire rope support systems and premium-quality nets.',
    fullOverview: 'An advanced protected cultivation structure designed with high-tensile wire rope support systems and premium-quality nets. It provides effective protection against insects, birds, and adverse weather conditions while ensuring excellent ventilation and optimum growing conditions. Ideal for vegetables, flowers, fruits, and nursery crops, it helps farmers achieve higher productivity, better crop quality, and improved profitability.',
    imageUrl: '/products/WIRE ROPE NET HOUSE.png',
    galleryImages: ['/products/WIRE ROPE NET HOUSE.png'],
    features: [
      'High-grade galvanized steel wire rope network',
      'Reinforced perimeter anchoring columns',
      'Multi-season UV-stabilized net cladding',
      'Low structural shadow footprint',
    ],
    specifications: {
      model: 'WRNH',
      standardGrids: '8m × 6m / 8m × 4m',
      gutterHeight: '4m / 5m',
      gutterHeightLabel: 'Std. Side Height',
      topHeight: '4m / 5m',
      topVent: 'NA',
      sideVent: 'NA',
      sideCorridors: '2m / 2.5m',
      suitableCrops: 'Exotic Vegetables, Ornamental Plants, Medicinal Plants, etc.',
    },
  },
  {
    id: 'turnkey-6',
    slug: 'multi-span-tunnel',
    category: 'turnkey-project',
    categoryLabel: 'Poly Tunnel',
    name: 'Multi Span Tunnel',
    shortDescription: 'Multi Span Tunnel is a large protected cultivation structure formed by connecting multiple tunnel units.',
    fullOverview: 'Multi Span Tunnel is a large protected cultivation structure formed by connecting multiple tunnel units. It provides an ideal microclimate for vegetables, flowers, and nursery crops, ensuring higher productivity, improved crop quality, and protection from adverse weather conditions.',
    imageUrl: '/products/multi span tunnel house.png',
    galleryImages: ['/products/multi span tunnel house.png'],
    features: [
      'Interconnected GI pipe hoop arches',
      'Clear high-PAR transmission poly film covering',
      'Simple roll-up side ventilation design',
      'Modular bolt-together assembly',
    ],
    specifications: {
      model: 'MST',
      standardGrids: '8m × 2.5m / 9m × 3m',
      gutterHeight: '2m / 2.5m',
      gutterHeightLabel: 'Std. Side Height',
      topHeight: '4.5m / 5m',
      topVent: 'NA',
      sideVent: 'NA',
      sideCorridors: '2m',
      suitableCrops: 'Exotic Vegetables, Exotic Fruit like Blue Berry etc.',
    },
  },
];

// 51 Products from Pujya Agritech Excel Catalog
export const PRODUCTS_CATALOGUE_51: ProductItemData[] = PRODUCTS_51_DATA;

// Full Catalogue: 6 Turnkey Projects + 51 Products = 57 Items
export const PRODUCT_CATALOGUE: ProductItemData[] = [
  ...TURNKEY_PROJECTS,
  ...PRODUCTS_CATALOGUE_51,
];

export interface ProductsShowcaseProps {
  onOpenQuote: (productName?: string) => void;
  selectedSlug?: string | null;
  onClearSlug?: () => void;
  selectedCategory?: string | null;
  onSelectCategory?: (category: string) => void;
  onSelectProduct?: (slug: string) => void;
}

interface FilterPill {
  id: string;
  label: string;
  type: 'all' | 'turnkey' | 'category';
  targetCat?: string;
  isFlagship?: boolean;
}

const FILTER_PILLS: FilterPill[] = [
  { id: 'all-products', label: 'All Products', type: 'all' },
  { id: 'turnkey-projects', label: 'Greenhouses & Turnkey Projects', type: 'turnkey', isFlagship: true },
  { id: 'covering-materials', label: 'Covering Materials', type: 'category', targetCat: 'Covering Materials' },
  { id: 'fitting-accessories', label: 'Fitting Accessories', type: 'category', targetCat: 'Fitting Accessories' },
  { id: 'trellising', label: 'Trellising Accessories', type: 'category', targetCat: 'Trellising Accessories' },
  { id: 'poly-net-fastening', label: 'Poly / Net Fastening System', type: 'category', targetCat: 'Poly / Net Fastening System' },
  { id: 'hvac-cooling', label: 'HVAC / Exhaust & Cooling', type: 'category', targetCat: 'HVAC / Exhaust & Cooling' },
  { id: 'orchard-structure', label: 'Orchard Structure Components', type: 'category', targetCat: 'Orchard Structure Components' },
  { id: 'curtain-installation', label: 'Curtain / Installation & Structure Accessories', type: 'category', targetCat: 'Curtain / Installation & Structure Accessories' },
];

export const ProductsShowcase: React.FC<ProductsShowcaseProps> = ({
  onOpenQuote,
  selectedSlug,
  onClearSlug,
  selectedCategory: initialCategory,
  onSelectCategory,
  onSelectProduct,
}) => {
  // Normalize initial active pill - Default FIRST to All Products
  const getInitialPillId = (cat?: string | null): string => {
    if (!cat) return 'all-products';
    const c = cat.toLowerCase();
    if (
      c === 'turnkey' ||
      c === 'turnkey-project' ||
      c === 'turnkey-projects' ||
      c === 'structures' ||
      c === 'green-houses' ||
      c === 'poly-houses' ||
      c === 'shade-net-houses' ||
      c === 'poly-tunnels' ||
      c === 'greenhouses'
    ) {
      return 'turnkey-projects';
    }
    if (c === 'all' || c === 'products' || c === 'all-products' || c === 'materials' || c === 'greenhouse-material' || c === 'green-house-materials') {
      return 'all-products';
    }
    if (c === 'steel-wire-rope' || c === 'steel-wire-rope-net-house-components') {
      return 'fitting-accessories';
    }
    const match = FILTER_PILLS.find(
      p => p.id === c || (p.targetCat && p.targetCat.toLowerCase() === c) || (p.targetCat && p.targetCat.toLowerCase().replace(/[^a-z0-9]/g, '-') === c)
    );
    return match ? match.id : 'all-products';
  };

  const [activeFilterId, setActiveFilterId] = useState<string>(() => getInitialPillId(initialCategory));
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProductSlug, setActiveProductSlug] = useState<string | null>(selectedSlug || null);

  useEffect(() => {
    if (initialCategory) {
      setActiveFilterId(getInitialPillId(initialCategory));
    }
  }, [initialCategory]);

  useEffect(() => {
    setActiveProductSlug(selectedSlug || null);
  }, [selectedSlug]);

  const handlePillClick = (pill: FilterPill) => {
    setActiveFilterId(pill.id);
    setActiveProductSlug(null);
    if (onSelectCategory) {
      onSelectCategory(pill.id);
    }
  };

  const handleProductCardClick = (slug: string) => {
    setActiveProductSlug(slug);
    if (onSelectProduct) onSelectProduct(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter items
  const displayedItems = useMemo(() => {
    // Global Search: When user searches, search across ALL products so they always find what they are looking for!
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const tokens = q.split(/\s+/).filter(Boolean);

      return PRODUCT_CATALOGUE.filter((p) => {
        const name = (p.name || '').toLowerCase();
        const cat = (p.productCategory || p.categoryLabel || '').toLowerCase();
        const desc = (p.shortDescription || p.fullOverview || '').toLowerCase();
        const primaryUse = (p.primaryUse || '').toLowerCase();
        const whereUsed = (p.whereUsed || '').toLowerCase();
        const app = (p.application || '').toLowerCase();
        const notes = (p.notes || '').toLowerCase();
        const keywords = (p.keywords || []).map(k => k.toLowerCase());

        const fullSearchable = `${name} ${cat} ${desc} ${primaryUse} ${whereUsed} ${app} ${notes} ${keywords.join(' ')}`;
        return tokens.every(token => fullSearchable.includes(token));
      });
    }

    const pill = FILTER_PILLS.find(p => p.id === activeFilterId) || FILTER_PILLS[0];

    if (pill.type === 'turnkey') {
      return TURNKEY_PROJECTS;
    } else if (pill.type === 'all') {
      return PRODUCT_CATALOGUE;
    } else if (pill.type === 'category' && pill.targetCat) {
      return PRODUCTS_CATALOGUE_51.filter(p => p.productCategory === pill.targetCat);
    }

    return TURNKEY_PROJECTS;
  }, [activeFilterId, searchQuery]);

  // If activeProductSlug is set, render ProductDetailView
  const currentProduct = PRODUCT_CATALOGUE.find(
    (p) =>
      p.slug === activeProductSlug ||
      p.id === activeProductSlug ||
      (p.slug === 'greenhouse-poly-film' && activeProductSlug === 'greenhouse-plastic-film')
  );

  if (currentProduct) {
    return (
      <ProductDetailView
        product={currentProduct}
        onBack={() => {
          setActiveProductSlug(null);
          if (onClearSlug) onClearSlug();
        }}
        onOpenConsultationModal={onOpenQuote}
        onSelectProduct={(slug) => {
          setActiveProductSlug(slug);
          if (onSelectProduct) onSelectProduct(slug);
        }}
      />
    );
  }

  const activePill = FILTER_PILLS.find(p => p.id === activeFilterId) || FILTER_PILLS[0];

  return (
    <div className="bg-[#FAFBF9] text-[#10232B] font-sans min-h-screen pt-4 pb-14 sm:pt-6 sm:pb-16">
      <div className="max-w-[1360px] w-[94%] mx-auto space-y-4 sm:space-y-6">
        
        {/* ================= 1. CATEGORY PILLS (CLEAN, NO NUMBERS, MATCHING REFERENCE) ================= */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pt-1">
          {FILTER_PILLS.map((pill) => {
            const isActive = activeFilterId === pill.id;
            const isFlagship = pill.isFlagship;

            let pillClass = '';

            if (isFlagship) {
              if (isActive) {
                pillClass = 'bg-[#1B5E20] text-white shadow-sm ring-2 ring-emerald-500/40 font-bold';
              } else {
                pillClass = 'bg-white text-[#1B5E20] hover:bg-emerald-50/70 hover:text-emerald-950 border border-emerald-300/90 font-bold shadow-2xs';
              }
            } else if (pill.id === 'all-products') {
              if (isActive) {
                pillClass = 'bg-[#006B8F] text-white shadow-sm ring-2 ring-sky-500/30 font-bold';
              } else {
                pillClass = 'bg-white text-gray-800 hover:text-[#006B8F] hover:bg-gray-50 border border-gray-300 font-bold shadow-2xs';
              }
            } else {
              if (isActive) {
                pillClass = 'bg-[#006B8F] text-white shadow-sm ring-2 ring-sky-500/30 font-semibold';
              } else {
                pillClass = 'bg-white text-gray-700 hover:text-[#006B8F] hover:bg-gray-50 border border-gray-200/90 font-medium shadow-2xs';
              }
            }

            return (
              <button
                key={pill.id}
                onClick={() => handlePillClick(pill)}
                className={`rounded-full px-4.5 sm:px-5 py-2 text-xs sm:text-[13px] transition-all cursor-pointer ${pillClass}`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        {/* ================= 2. SEARCH BAR CARD ================= */}
        <div className="max-w-4xl mx-auto bg-white border border-gray-200/90 rounded-2xl shadow-xs p-2 sm:p-2.5 flex items-center">
          
          {/* Search Input */}
          <div className="relative w-full flex items-center">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by name, category, or description..."
              className="w-full pl-10 pr-9 py-2 bg-transparent text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Header Banner */}
        {activeFilterId === 'turnkey-projects' ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1 pt-1 pb-0.5 border-b border-gray-200/70">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <h2 className="text-sm sm:text-base font-bold text-gray-900">
                Commercial Greenhouses, Poly Houses & Shade Net Structures
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 w-fit">
              6 Complete Turnkey EPC Solutions
            </span>
          </div>
        ) : activeFilterId === 'all-products' ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1 pt-1 pb-0.5 border-b border-gray-200/70">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <h2 className="text-sm sm:text-base font-bold text-gray-900">
                All Products & Turnkey Infrastructure
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 w-fit">
              {displayedItems.length} Products Available
            </span>
          </div>
        ) : activePill && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1 pt-1 pb-0.5 border-b border-gray-200/70">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006B8F]"></span>
              <h2 className="text-sm sm:text-base font-bold text-gray-900">
                {activePill.label}
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-[#006B8F] bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200 w-fit">
              {displayedItems.length} Products
            </span>
          </div>
        )}

        {/* ================= 3. PRODUCTS CARDS GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 pt-1">
          {displayedItems.map((prod) => {
            const isHouse = prod.category === 'turnkey-project';
            return (
              <div
                key={prod.id}
                onClick={() => handleProductCardClick(prod.slug)}
                className={`group cursor-pointer rounded-2xl bg-white transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                  isHouse
                    ? 'border-2 border-emerald-300/80 shadow-xs hover:border-emerald-600 hover:shadow-md hover:-translate-y-1'
                    : 'border border-gray-200/80 shadow-2xs hover:shadow-md hover:-translate-y-1'
                }`}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-white border-b border-gray-100 flex items-center justify-center p-3 sm:p-4">
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                </div>

                {/* Card Info */}
                <div className="p-4 sm:p-5 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    {isHouse ? (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-flex items-center gap-1 w-fit mb-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        Turnkey Greenhouse Structure
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#006B8F] bg-sky-50 px-2 py-0.5 rounded border border-sky-200/80 inline-flex items-center gap-1 w-fit mb-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#006B8F]"></span>
                        {prod.productCategory || 'Fitting Accessories'}
                      </span>
                    )}
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-[#006B8F] transition-colors leading-snug line-clamp-2">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 font-normal">
                      {prod.shortDescription}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#006B8F] group-hover:text-[#004F6A] uppercase tracking-wider">
                    <span>VIEW DETAILS</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {displayedItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200/80 space-y-3 shadow-2xs">
            <p className="text-gray-600 text-sm font-medium">No products match your search or category filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilterId('all-products');
              }}
              className="text-xs font-bold text-[#006B8F] hover:underline uppercase cursor-pointer"
            >
              Clear search and view All Products
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductsShowcase;
