import { ProductItem, GreenhouseSystem, CropSolution, CatalogDoc } from '../types';

export const VERIFIED_PRODUCTS: ProductItem[] = [
  {
    id: 'greenhouses-polyhouses',
    slug: 'greenhouses-poly-houses',
    name: 'Greenhouses & Poly Houses',
    category: 'greenhouses',
    categoryLabel: 'Greenhouses / Poly Houses',
    numberLabel: '01',
    tagline: 'Climate-controlled & hi-tech protected growing environments',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1400&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1592417817098-8f3d6eb1628d?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDescription: 'Hi-tech climate-controlled greenhouses equipped with evaporative fan & pad cooling systems, thermal screens, and automated ventilation.',
    fullOverview: 'Pujya Agritech designs and installs engineered climate-controlled greenhouses and poly houses. These structures maintain optimized temperature, humidity, and airflow levels, enabling high-value crop cultivation regardless of external weather extremes.',
    features: [
      'Hot-dip galvanized structural steel tubular framing',
      'Cellulose evaporative cooling pad & axial exhaust fans',
      '200-micron UV-stabilized anti-drip poly film cladding',
      'Motorized thermal shading screens & ridge vent actuators',
      'Integrated drip fertigation manifold compatibility'
    ],
    applications: [
      'Commercial High-Value Horticulture',
      'Exotic & Off-Season Vegetable Farming',
      'Floriculture & Export-Grade Cut Flowers',
      'Agricultural Research & Seed Production'
    ],
    crops: ['Colored Bell Peppers (Capsicum)', 'Dutch Seedless Cucumbers', 'Cherry Tomatoes', 'Gerbera & Roses', 'Exotic Leafy Greens'],
    structureInfo: {
      'Structural Steel': 'IS-2062 Grade Hot-Dip Galvanized Tubes',
      'Cladding Material': '200-Micron 5-Layer UV Poly Film',
      'Cooling Mechanism': 'Evaporative Cooling Pad & Heavy-Duty Exhaust Fans',
      'Ventilation': 'Top Ridge Vents with Anti-Insect Net Screens',
      'Project Execution': 'Supply & Installation across Pan-India Locations'
    },
    isFeatured: true
  },
  {
    id: 'naturally-ventilated-polyhouse',
    slug: 'naturally-ventilated-poly-houses',
    name: 'Naturally Ventilated Poly Houses',
    category: 'poly-houses',
    categoryLabel: 'Naturally Ventilated Poly Houses',
    numberLabel: '02',
    tagline: 'Cost-effective micro-climate protection with natural airflow',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?auto=format&fit=crop&w=1400&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDescription: 'High-roof multi-span poly houses engineered to maximize natural convection ventilation without heavy electricity consumption.',
    fullOverview: 'Naturally Ventilated Poly Houses (NVPH) utilize aerodynamic arch geometry and continuous top/side ventilation openings. This design allows hot air to escape naturally through the roof ridge while drawing fresh air through insect-proof side curtains.',
    features: [
      'Gothic or round arch roof geometry for maximum height',
      'Continuous top ridge vent and perimeter skirt vents',
      '40-mesh / 50-mesh anti-insect side net curtains',
      'Strong wind load resistant GI pipe structural framework',
      'Trellising wire framework for vertical crop support'
    ],
    applications: [
      'Progressive Commercial Farms',
      'Sub-Tropical & Temperate Regional Agriculture',
      'Protected Vegetable & Fruit Cultivation',
      'Seedling & Tissue Culture Hardening'
    ],
    crops: ['Capsicum', 'Tomato', 'Cucumber', 'Melons', 'Papaya Nursery'],
    structureInfo: {
      'Bay Span': '8.0 meters / 9.6 meters standard spans',
      'Gutter Height': '4.0 meters to 4.5 meters clearance',
      'Structural Pipe': 'Galvanized Circular & Rectangular Sections',
      'Roof Vent': 'Continuous Fixed / Manual Roll-Up Vent',
      'Anchoring': 'Concrete Plinth / Foundation Stub Columns'
    },
    isFeatured: true
  },
  {
    id: 'shade-net-houses',
    slug: 'shade-net-houses',
    name: 'Shade-Net & Net Houses',
    category: 'net-houses',
    categoryLabel: 'Shade-Net / Net Houses',
    numberLabel: '03',
    tagline: 'Solar protection, heat mitigation and pest barrier structures',
    imageUrl: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1400&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDescription: 'Sturdy GI framework structures fitted with UV-stabilized agro shade nets and anti-insect netting for light and temperature modulation.',
    fullOverview: 'Shade-Net Houses provide essential crop protection against intense solar radiation, heat stress, wind drag, and damaging insects. They offer an ideal, economical growing micro-climate for tropical and hot regions.',
    features: [
      'High-density UV-treated monofilament/tape agro shade netting',
      'Custom shade percentage options (35%, 50%, 75% shading)',
      'Heavy-duty GI structural post and purlin arrangement',
      'Compatible with micro-sprinkler & overhead fogging systems',
      'Economical construction and minimal operational cost'
    ],
    applications: [
      'Vegetable & Leafy Green Production',
      'Plant Nurseries & Sapling Propagation',
      'Medicinal & Aromatic Plant Farming',
      'Hardening Facilities for Grafted Saplings'
    ],
    crops: ['Spinach & Coriander', 'Nurseries', 'Medicinal Plants', 'Ornamental Foliage', 'Capsicum'],
    structureInfo: {
      'Framework': 'Galvanized Structural Steel Poles',
      'Net Cladding': 'UV Stabilized HDPE Agro Shade Netting',
      'Shade Factor': '35% to 75% shade factor based on crop need',
      'Fixing': 'Zig-Zag Spring & Profile Lock Channels',
      'Life Expectancy': 'Durable multi-season agricultural use'
    },
    isFeatured: true
  },
  {
    id: 'poly-tunnels',
    slug: 'poly-tunnels',
    name: 'Poly Tunnels',
    category: 'poly-tunnels',
    categoryLabel: 'Poly Tunnels',
    numberLabel: '04',
    tagline: 'Practical modular protection for row crops & berries',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1400&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDescription: 'Economical hoop-arched poly tunnels engineered to protect ground crops from unseasonal rains, frost, and wind.',
    fullOverview: 'Poly Tunnels offer a flexible and low-cost solution for protected agriculture. They shield delicate crops against harsh rain, morning dew frost, and wind damage, extending the growing season and protecting fruit quality.',
    features: [
      'Curved galvanized steel hoop arches',
      'Clear high-PAR transmission poly film covering',
      'Simple roll-up side ventilation design',
      'Quick modular assembly and easy site relocation',
      'Protects soil bed structure from heavy rain washouts'
    ],
    applications: [
      'Strawberry & Berry Farming',
      'Low-Height Row Vegetables',
      'Off-Season Seedling Raising',
      'Smallholder Farmers & Demonstration Farms'
    ],
    crops: ['Strawberry', 'Tomato', 'Cabbage & Cauliflower', 'Cucumber', 'Melons'],
    structureInfo: {
      'Hoop Structure': 'Galvanized Circular Steel Pipe Arches',
      'Covering': 'Agricultural UV Poly Film',
      'Width Options': '4m to 6m span options',
      'Assembly': 'Modular Bolt-Together Design'
    },
    isFeatured: true
  },
  {
    id: 'hydroponic-systems',
    slug: 'hydroponics',
    name: 'Hydroponic Systems & Infrastructure',
    category: 'hydroponics',
    categoryLabel: 'Hydroponic Systems / Infrastructure',
    numberLabel: '05',
    tagline: 'Soil-less growing channels, troughs & precise dosing setups',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?auto=format&fit=crop&w=1400&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDescription: 'Precision soil-less growing infrastructure including NFT channels, coco-peat substrate troughs, and fertigation manifolds.',
    fullOverview: 'Pujya Agritech delivers hydroponic and soil-less growing infrastructure tailored for modern controlled environment agriculture. From NFT leafy green systems to substrate slab troughs, our setups ensure clean, resource-efficient crop nutrition.',
    features: [
      'Food-grade UV-stabilized PVC NFT hydroponic channels',
      'Drainage-optimized coco-peat grow bags & substrate troughs',
      'Precision drip fertigation & EC/pH monitoring manifolds',
      'Heavy-duty stand frameworks & elevated benching',
      'Water recirculation & filtration compatibility'
    ],
    applications: [
      'Commercial Hydroponic Greenhouses',
      'Urban & Peri-Urban Fresh Produce Farms',
      'Exotic Salad Leaf Production',
      'High-Density Berry Cultivation'
    ],
    crops: ['Lettuce & Salad Greens', 'Exotic Herbs (Basil, Mint)', 'Vine Tomatoes', 'Strawberries'],
    structureInfo: {
      'Channel Profile': 'Food-Grade UV PVC NFT Channels',
      'Bench Structure': 'Galvanized Steel Bench Frame Assemblies',
      'Substrate System': 'Coco-Peat Slab Troughs & Dutch Buckets',
      'Irrigation': 'Micro-Drip Emitters & Return Water Plumbing'
    },
    isFeatured: true
  },
  {
    id: 'cattle-shelters',
    slug: 'cattle-shelters',
    name: 'Cattle Shelters & Dairy Structures',
    category: 'cattle-shelters',
    categoryLabel: 'Cattle Shelters',
    numberLabel: '06',
    tagline: 'Ventilated structural steel housing for dairy & livestock',
    imageUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1400&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDescription: 'Robust steel structural sheds designed to provide thermal comfort, cross-ventilation, and hygienic housing for cattle farms.',
    fullOverview: 'Pujya Agritech manufactures heavy-duty structural steel animal shelters designed specifically for dairy farms and cattle housing. Proper roof pitch, ridge ventilation, and shaded overhangs maintain comfortable temperatures for animal welfare.',
    features: [
      'High-strength galvanized tubular steel truss construction',
      'Thermal insulated roofing or heat-reflective sheet cladding',
      'High clearance open-side design for natural cross-ventilation',
      'Corrosion-resistant structural coatings for long lifespan',
      'Hygienic layout adaptable for feeding alleys & cubicles'
    ],
    applications: [
      'Commercial Dairy Farms',
      'Cattle Breeding & Rearing Facilities',
      'Livestock Shelters & Feed Storage Sheds'
    ],
    crops: ['Dairy Cattle Housing', 'Livestock Feed Protection'],
    structureInfo: {
      'Frame Structural': 'Galvanized Steel Tubular Trusses',
      'Roof Pitch': 'Engineered for Hot Climate Heat Dissipation',
      'Side Clearance': 'Open-Sided / Mesh Curtained Configuration'
    },
    isFeatured: false
  },
  {
    id: 'poultry-structures',
    slug: 'poultry-structures',
    name: 'Poultry Farm Structures',
    category: 'poultry-structures',
    categoryLabel: 'Poultry Structures',
    numberLabel: '07',
    tagline: 'Engineered structural housing for commercial poultry farming',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDescription: 'Durable prefabricated steel poultry sheds designed for environmentally controlled or open-sided poultry operations.',
    fullOverview: 'We fabricate and erect pre-engineered poultry farm structures that protect poultry stock against extreme ambient weather, predators, and disease transmission vectors.',
    features: [
      'Prefabricated structural steel framework',
      'Side curtain wall assemblies or insulated wall panels',
      'Evaporative cooling fan & pad integration ready',
      'Smooth cleanable surfaces for biosecurity maintenance',
      'Custom width and length modular layouts'
    ],
    applications: [
      'Broiler Poultry Farms',
      'Layer Poultry Facilities',
      'Breeder Farm Housing'
    ],
    crops: ['Broiler Housing', 'Layer Housing'],
    structureInfo: {
      'Framing': 'Galvanized / Anti-Corrosion Painted Steel',
      'Wall System': 'Mesh & Roll-Up Curtains / Sandwich Panels',
      'Ventilation': 'Cross / Tunnel Ventilation Prepared'
    },
    isFeatured: false
  },
  {
    id: 'related-agricultural-infrastructure',
    slug: 'related-agricultural-infrastructure',
    name: 'Related Agricultural Materials & Infrastructure',
    category: 'agricultural-infrastructure',
    categoryLabel: 'Related Agricultural Infrastructure',
    numberLabel: '08',
    tagline: 'Protective agricultural films, nets, geo-membranes & accessories',
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1400&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDescription: 'Comprehensive material supply including UV poly films, agro shade nets, anti-insect nets, weed mats, mulch films, and pond liners.',
    fullOverview: 'Pujya Agritech supplies high-quality agricultural protective materials across India. We provide verified UV-stabilized poly films, agro shade nets, anti-insect screens, weed mats, mulching films, and geo-membrane farm pond liners.',
    features: [
      'UV-stabilized 5-layer 200-micron polyhouse cladding film',
      'Agro shade nets in 35%, 50%, 75% shading percentages',
      'Fine mesh 40-mesh & 50-mesh anti-insect barrier netting',
      'Woven polypropylene weed mat ground covers & mulch films',
      'HDPE geo-membrane pond lining sheets for farm water storage'
    ],
    applications: [
      'Farm Pond Water Storage',
      'Weed Suppression & Ground Covering',
      'Greenhouse Maintenance & Repairs',
      'Open Field Crop Protection'
    ],
    crops: ['All Protected Cultivation Crops', 'Farm Water Harvesting'],
    structureInfo: {
      'Poly Film': '200 Micron UV Stabilized Polyethylene Film',
      'Shade Net': 'HDPE UV Monofilament & Tape Netting',
      'Pond Liner': 'HDPE Geo-Membrane Lining Sheet',
      'Supply Scope': 'Pan-India Bulk & Project Material Supply'
    },
    isFeatured: true
  }
];

export const GREENHOUSE_SYSTEMS: GreenhouseSystem[] = [
  {
    id: 'sys-shading',
    name: 'Shading Net & Screen Systems',
    category: 'Shading',
    description: 'Shade netting and screen mechanisms to regulate light intensity and manage temperature inside protected structures.',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?auto=format&fit=crop&w=800&q=80',
    keySpecs: ['Multiple shading density options', 'Manual and motorized drive options', 'UV resistant materials'],
    benefits: ['Helps reduce heat stress', 'Manages light intensity', 'Protects crop foliage']
  },
  {
    id: 'sys-cooling',
    name: 'Evaporative Cooling Pad & Exhaust Fan Systems',
    category: 'Cooling & Ventilation',
    description: 'Evaporative cooling pads combined with heavy-duty axial exhaust fans for climate-controlled polyhouses.',
    imageUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80',
    keySpecs: ['Cellulose cooling pads', 'Heavy duty exhaust fans', 'Air circulation controls'],
    benefits: ['Lowers internal temperature in hot weather', 'Maintains airflow turnover', 'Helps regulate microclimate']
  },
  {
    id: 'sys-fertigation',
    name: 'Drip Irrigation & Fertigation Systems',
    category: 'Irrigation & Fertigation',
    description: 'Drip irrigation components, filtration units, and fertigation systems for balanced nutrient and water supply.',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    keySpecs: ['Disc and sand filtration units', 'Drip lines and emitters', 'Venturi injectors'],
    benefits: ['Targeted root zone irrigation', 'Efficient nutrient application', 'Water conservation']
  },
  {
    id: 'sys-farmpond',
    name: 'Geo-Membrane Lined Farm Pond Systems',
    category: 'Irrigation & Fertigation',
    description: 'Farm ponds lined with HDPE geo-membrane for rainwater collection and irrigation water reserves.',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
    keySpecs: ['HDPE geo-membrane lining', 'Seepage-proof water storage', 'Custom pond sizes'],
    benefits: ['Rainwater harvesting', 'Prevents water seepage into soil', 'Provides dependable water storage']
  }
];

export const CROP_SOLUTIONS: CropSolution[] = [
  {
    id: 'crop-capsicum',
    cropName: 'Colored Bell Pepper (Capsicum)',
    recommendedStructure: 'Naturally Ventilated or Climate Controlled Polyhouse',
    recommendedSystems: ['Drip Fertigation', 'Shade Net', 'Ridge Vents'],
    yieldBoost: 'Protected Quality Crop',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
    description: 'Protected cultivation shields bell peppers from harsh weather, pests, and sun damage.',
    keyFeatures: ['Uniform fruit development', 'Extends harvesting season', 'Reduces pest damage']
  },
  {
    id: 'crop-cucumber',
    cropName: 'Dutch Seedless Cucumber',
    recommendedStructure: 'Polyhouse / Shade Net House',
    recommendedSystems: ['Evaporative Cooling', 'Drip Irrigation', 'Trellising Support'],
    yieldBoost: 'Consistent Fruit Growth',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?auto=format&fit=crop&w=800&q=80',
    description: 'Polyhouse environment provides optimal temperature and humidity for seedless cucumbers.',
    keyFeatures: ['Vertical trellis farming', 'Clean fruit surface', 'High yield frequency']
  },
  {
    id: 'crop-strawberry',
    cropName: 'Strawberries & Berries',
    recommendedStructure: 'Poly Tunnel / Polyhouse',
    recommendedSystems: ['Tabletop Troughs', 'Drip Fertigation'],
    yieldBoost: 'Protected Berry Quality',
    imageUrl: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80',
    description: 'Protected tunnels safeguard delicate berry crops from unseasonal rains and ground pests.',
    keyFeatures: ['Clean harvest', 'Rain protection', 'Optimized plant density']
  }
];

export const CATALOG_DOCS: CatalogDoc[] = [
  {
    id: 'cat-main',
    title: 'Pujya Agritech Official Company Brochure',
    fileSize: '24.2 MB PDF',
    category: 'Company Brochure',
    downloadUrl: '/brochure.pdf',
    description: 'Complete official company brochure & catalog of Greenhouses, Poly Houses, Shade Net Houses, Hydroponics, Cattle Shelters, Poultry Farms, and Protective Ag-Materials.',
    iconType: 'FileText'
  }
];

