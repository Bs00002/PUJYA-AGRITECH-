import { ProjectPhotoItem, ProjectVideoItem } from '../types';

export interface Product {
  id: string;
  slug?: string;
  name: string;
  model?: string;
  category: string;
  categoryLabel?: string;
  tagline?: string;
  shortDesc: string;
  fullDesc: string;
  imageUrl: string;
  galleryImages: string[];
  specifications: Record<string, string>;
  applications: string[];
  advantages: string[];
  crops?: string[];
  displayOrder: number;
  featured?: boolean;
  published: boolean;
}

export interface Project {
  id: string;
  slug?: string;
  name: string;
  location: string;
  projectType: string;
  executionType?: string;
  category?: string;
  areaSize?: string;
  crop?: string;
  description: string;
  challenge?: string;
  approach?: string;
  execution?: string;
  result?: string;
  imageUrl: string;
  heroImage?: string;
  galleryImages: string[];
  videos?: string[];
  media?: any[];
  galleryImageObjects?: ProjectPhotoItem[];
  videoObjects?: ProjectVideoItem[];
  completionDate?: string;
  yearCompleted?: string;
  crops?: string[];
  featured?: boolean;
  published: boolean;
}

export interface GalleryMedia {
  id: string;
  type: 'photo' | 'video';
  title: string;
  category?: string;
  url: string;
  videoEmbedUrl?: string;
  description?: string;
  featured?: boolean;
  published: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  excerpt: string;
  content: string;
  category?: string;
  tags?: string[];
  author: string;
  readTime?: string;
  date: string;
  seoTitle?: string;
  seoDescription?: string;
  published: boolean;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuingOrganization: string;
  imageUrl: string;
  issueYear?: string;
  description?: string;
  displayOrder?: number;
  published: boolean;
}

export interface Enquiry {
  id: string;
  name: string;
  company?: string;
  mobile: string;
  email: string;
  interestedProduct: string;
  areaSqM?: number;
  location?: string;
  message: string;
  date: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Converted' | 'Closed';
}

export interface SiteSettings {
  companyName: string;
  logoText: string;
  phone: string;
  whatsapp: string;
  email: string;
  socialLinkedin: string;
  socialFacebook: string;
  socialYoutube: string;
  copyrightText: string;
}

export interface HomeContent {
  heroTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  whoWeAreText: string;
  missionText: string;
  visionText: string;
  benefits: { id: string; title: string; desc: string; iconName: string }[];
  whyChooseUs: { id: string; title: string; desc: string }[];
}

export interface AboutUsContent {
  mainHeading: string;
  companyIntro: string;
  establishmentStory: string;
  missionText: string;
  visionText: string;
  keyStrengths: string[];
  clientsSectors: string[];
}

export interface ContactInfo {
  manufacturingAddress: string;
  officeAddress: string;
  mobile: string;
  phone2?: string;
  whatsapp: string;
  email: string;
  mapEmbedUrl: string;
  businessHours?: string;
  instagram?: string;
  facebook?: string;
  indiaMart?: string;
}

// DEFAULT SEED DATA
export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  companyName: 'Pujya Agritech',
  logoText: 'PUJYA AGRITECH',
  phone: '+91 99744 31960 / +91 90814 12412',
  whatsapp: '+91 90814 12412',
  email: 'contact@pujyasales.com',
  socialLinkedin: 'https://www.linkedin.com',
  socialFacebook: 'https://www.facebook.com/pujyasales',
  socialYoutube: 'https://www.youtube.com',
  copyrightText: '© 2026 Pujya Agritech. All rights reserved.',
};

export const DEFAULT_HOME_CONTENT: HomeContent = {
  heroTagline: 'PUJYA AGRITECH',
  heroTitle: 'Professional Greenhouse & Protected Cultivation Solutions',
  heroSubtitle: 'From planning and design to installation and complete project execution.',
  heroImage: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80',
  primaryCtaText: 'GET PROJECT CONSULTATION',
  secondaryCtaText: 'VIEW PRODUCTS',
  whoWeAreText: 'Pujya Agritech is a premier B2B protected cultivation infrastructure manufacturer established in 2017 in Ahmedabad, Gujarat. We engineer and execute high-performance Naturally Ventilated Poly Houses, Fan & Pad Poly Houses, Net Houses, and Turnkey Commercial Greenhouse Projects across India.',
  missionText: 'To empower commercial growers, agricultural institutions, and government bodies with scientifically engineered, durable, and high-yield protected cultivation infrastructure that maximizes productivity and conserves resources.',
  visionText: 'To be India\'s most trusted B2B partner in protected farming infrastructure, recognized for engineering precision, structural reliability, and complete turnkey project delivery.',
  benefits: [
    { id: 'b1', title: 'Quality Engineering', desc: 'IS-2062 grade hot-dip galvanized steel framing engineered for maximum wind load resistance and structural stability.', iconName: 'Cpu' },
    { id: 'b2', title: 'Durable Structures', desc: 'Multi-layer 200-micron UV-stabilized polyfilm and 40-mesh anti-insect netting built for 10+ years operational lifespan.', iconName: 'ShieldCheck' },
    { id: 'b3', title: 'Expert Installation', desc: 'In-house civil and structural engineering teams delivering turnkey site erection complying with NHB & NHM standards.', iconName: 'Wrench' },
    { id: 'b4', title: 'Complete Project Support', desc: 'End-to-end guidance covering site land assessment, DPR formulation, loan subsidy processing, and agronomy advice.', iconName: 'Headphones' },
    { id: 'b5', title: 'Protected Cultivation Expertise', desc: 'Optimized microclimate design for high-value capsicum, cucumber, tomato, floriculture, and nursery crops.', iconName: 'ThermometerSun' },
  ],
  whyChooseUs: [
    { id: 'w1', title: 'Precision Site & Microclimate Assessment', desc: 'Custom structural design based on land topography, local wind velocity, solar radiation, and intended crop varieties.' },
    { id: 'w2', title: 'Certified Material Sourcing', desc: 'Heavy-duty hot-dip galvanized steel sections, aluminum profile locking springs, and genuine UV-stabilized cladding.' },
    { id: 'w3', title: 'Government Approval & Empanelment', desc: 'Official empanelled vendor with Directorate of Horticulture, Gujarat State, assisting in government subsidy applications.' },
    { id: 'w4', title: 'Integrated Drip & Fertigation Systems', desc: 'Automated pressure-compensating drip irrigation, fogging, and precise vent controls for optimal root-zone delivery.' },
    { id: 'w5', title: 'On-Site Training & Agronomy Service', desc: 'Hands-on technical guidance for growers, ongoing maintenance inspections, and rapid spare component availability.' },
  ],
};

export const DEFAULT_ABOUT_US: AboutUsContent = {
  mainHeading: 'Building protected cultivation for better farming',
  companyIntro: 'Pujya Agritech is a leading manufacturer and turnkey contractor of protected cultivation infrastructure in India. We specialize in end-to-end greenhouse construction, high-tech polyhouses, shade net structures, and automated irrigation systems.',
  establishmentStory: 'Founded in 2017 in Ahmedabad, Gujarat, Pujya Agritech was established to bridge the gap between advanced agricultural engineering and commercial farming profitability. Over the past decade, we have successfully completed over 150+ commercial greenhouse installations across Gujarat, Maharashtra, Rajasthan, Madhya Pradesh, and other major agrarian states.',
  missionText: 'To engineer robust, long-lasting protected cultivation infrastructure that safeguards crops against adverse weather, pests, and climate instability while optimizing resource usage.',
  visionText: 'To serve as India\'s leading B2B agricultural infrastructure partner, driving sustainable protected farming adoption through technical craftsmanship and reliable execution.',
  keyStrengths: [
    'Turnkey Engineering & Erection',
    'IS-2062 Grade Hot-Dip Galvanized Framing',
    'NHB & NHM Subsidy Compliance',
    'Pan-India Project Execution Capability',
    'Integrated Automated Irrigation & Fertigation'
  ],
  clientsSectors: [
    'Commercial Greenhouse Farmers & Agribusinesses',
    'State Horticulture Departments & Nodal Agencies',
    'Agricultural Universities & Research Institutions',
    'Corporate Farm Holdings & Export Houses',
    'High-Tech Nursery & Seed Production Facilities',
  ],
};

export const DEFAULT_CERTIFICATES: CertificateItem[] = [
  {
    id: 'cert-1',
    title: 'IEC Export License Certificate',
    issuingOrganization: 'Directorate General of Foreign Trade, Govt. of India',
    imageUrl: '/certificates/iec-certificate.png',
    issueYear: '2019',
    description: 'Empanelled contractor for subsidised greenhouse & polyhouse erection in Gujarat state.',
    displayOrder: 1,
    published: true,
  },
  {
    id: 'cert-2',
    title: 'APEDA RCMC Registration Certificate',
    issuingOrganization: 'Agricultural & Processed Food Products Export Development Authority',
    imageUrl: '/certificates/apeda-rcmc.png',
    issueYear: '2020',
    description: 'Certified design, manufacturing, and erection of agricultural protected structures.',
    displayOrder: 2,
    published: true,
  },
  {
    id: 'cert-3',
    title: 'Indian Nurserymen Association Certificate',
    issuingOrganization: 'Indian Nurserymen Association',
    imageUrl: '/certificates/nurseryman-association-certificate.png',
    issueYear: '2018',
    description: 'Verified manufacturer member adhering to national greenhouse construction standards.',
    displayOrder: 3,
    published: true,
  },
  {
    id: 'cert-4',
    title: 'Horticulture Department Empanelment',
    issuingOrganization: 'Directorate of Horticulture, Govt. of Gujarat',
    imageUrl: '/certificates/gujarat-preview.jpg',
    issueYear: '2017',
    description: 'Registered manufacturing enterprise in agricultural infrastructure.',
    displayOrder: 4,
    published: true,
  },
];

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'naturally-ventilated-poly-house',
    name: 'Naturally Ventilated Poly House',
    model: 'NVPH',
    category: 'Naturally Ventilated Poly House',
    categoryLabel: 'Green House Turnkey Project',
    tagline: 'Cost-effective micro-climate protection with natural airflow',
    shortDesc: 'Designed for sustainable cultivation, naturally ventilated greenhouses reduce energy consumption while maintaining ideal growing conditions.',
    fullDesc: 'Designed for sustainable cultivation, naturally ventilated greenhouses reduce energy consumption while maintaining ideal growing conditions. Natural air circulation continuously expels excess heat and moisture, creating a healthier environment for flowers and sensitive crops.',
    imageUrl: '/products/naturally-ventilated-poly-house.png',
    galleryImages: ['/products/naturally-ventilated-poly-house.png'],
    specifications: {
      'Model': 'NVPH',
      'Standard Grids': '8m × 4m',
      'Std. Gutter Height': '4m / 4.5m',
      'Std. Top Height': '6m / 6.5m',
    },
    applications: ['Exotic Vegetables', 'Flowers', 'Nurseries'],
    advantages: ['Zero electricity cooling costs', 'Continuous top ridge vent', '40-mesh anti-insect curtains'],
    crops: ['Capsicum', 'Cucumber', 'Gerbera', 'Roses'],
    displayOrder: 1,
    featured: true,
    published: true,
  },
  {
    id: 'prod-2',
    slug: 'fan-and-pad-poly-house',
    name: 'Fan & Pad Poly House',
    model: 'FPPH',
    category: 'Fan & Pad Poly House',
    categoryLabel: 'Green House Turnkey Project',
    tagline: 'Precision evaporative cooling for extreme summer heat',
    shortDesc: 'Active evaporative cooling systems engineered for precise micro-climate control in high-temperature regions.',
    fullDesc: 'Engineered for extreme heat environments, Fan & Pad poly houses utilize cellulose evaporative cooling wall pads combined with heavy-duty axial exhaust fans.',
    imageUrl: '/products/fan-and-pad-poly-house.png',
    galleryImages: ['/products/fan-and-pad-poly-house.png'],
    specifications: {
      'Model': 'FPPH',
      'Standard Grids': '8m × 4m',
      'Std. Gutter Height': '4m / 4.5m',
      'Std. Top Height': '6m / 6.5m',
    },
    applications: ['Hydroponics', 'Exotic Vegetables', 'Dutch Roses'],
    advantages: ['Active evaporative cooling', 'Maintains 8-12°C cooler microclimate', 'Automated temperature sensors'],
    crops: ['Strawberries', 'Gerbera', 'Dutch Roses', 'Cherry Tomatoes'],
    displayOrder: 2,
    featured: true,
    published: true,
  },
  {
    id: 'prod-3',
    slug: 'dome-shape-net-house',
    name: 'Dome Shape Net House',
    model: 'DSNH',
    category: 'Dome Shape Net House',
    categoryLabel: 'Green House Turnkey Project',
    tagline: 'Curved roof aerodynamic net house structure',
    shortDesc: 'A modern protected cultivation structure with a curved roof design covered by high-quality shade or insect-proof net.',
    fullDesc: 'A modern protected cultivation structure with a curved roof design covered by high-quality shade or insect-proof net.',
    imageUrl: '/products/dome-shape-net-house.jpeg',
    galleryImages: ['/products/dome-shape-net-house.jpeg'],
    specifications: {
      'Model': 'DSNH',
      'Standard Grids': '6m × 4m / 6m × 6m',
      'Std. Side Height': '3.5m / 4m',
      'Std. Top Height': '5.5m / 6m',
    },
    applications: ['Vegetables', 'Flowers', 'Nurseries'],
    advantages: ['Aerodynamic curved dome', 'HDPE agro shade net', 'Reduces cultivation costs'],
    crops: ['Capsicum', 'Leafy Greens', 'Saplings'],
    displayOrder: 3,
    featured: true,
    published: true,
  },
  {
    id: 'prod-4',
    slug: 'flat-type-net-house',
    name: 'Flat Type Net House',
    model: 'FTNH',
    category: 'Flat Type Net House',
    categoryLabel: 'Green House Turnkey Project',
    tagline: 'Economical high-tension cable net house',
    shortDesc: 'Flat Type Net House is a cost-effective protected cultivation structure designed to protect crops from insects, birds, and harsh weather.',
    fullDesc: 'Flat Type Net House is a cost-effective protected cultivation structure designed to protect crops from insects, birds, and harsh weather conditions.',
    imageUrl: '/products/flat-type-net-house.jpeg',
    galleryImages: ['/products/flat-type-net-house.jpeg'],
    specifications: {
      'Model': 'FTNH',
      'Standard Grids': '6m × 4m / 6m × 6m',
      'Std. Side Height': '4m / 4.5m / 5m',
    },
    applications: ['Commercial Crop Protection', 'Bird & Pest Barrier'],
    advantages: ['High-tension cable layout', 'Economical construction', 'Uniform light diffusion'],
    crops: ['Chili', 'Tomato', 'Vegetables'],
    displayOrder: 4,
    featured: false,
    published: true,
  },
  {
    id: 'prod-5',
    slug: 'wire-rope-net-house',
    name: 'Wire Rope Net House',
    model: 'WRNH',
    category: 'Wire Rope Net House',
    categoryLabel: 'Green House Turnkey Project',
    tagline: 'High-tensile wire rope support net structure',
    shortDesc: 'An advanced protected cultivation structure designed with high-tensile wire rope support systems and premium-quality nets.',
    fullDesc: 'An advanced protected cultivation structure designed with high-tensile wire rope support systems and premium-quality nets.',
    imageUrl: '/products/wire-rope-net-house.png',
    galleryImages: ['/products/wire-rope-net-house.png'],
    specifications: {
      'Model': 'WRNH',
      'Standard Grids': '8m × 6m / 8m × 4m',
      'Std. Side Height': '4m / 5m',
    },
    applications: ['High-value Crops', 'Ornamental Plants', 'Medicinal Crops'],
    advantages: ['High-tensile wire rope network', 'Low structural shadow', 'Multi-season UV net cladding'],
    crops: ['Exotic Vegetables', 'Medicinal Plants'],
    displayOrder: 5,
    featured: true,
    published: true,
  },
  {
    id: 'prod-6',
    slug: 'multi-span-tunnel',
    name: 'Multi Span Tunnel',
    model: 'MST',
    category: 'Multi Span Tunnel',
    categoryLabel: 'Green House Turnkey Project',
    tagline: 'Interconnected hoop tunnel structure',
    shortDesc: 'Multi Span Tunnel is a large protected cultivation structure formed by connecting multiple tunnel units.',
    fullDesc: 'Multi Span Tunnel is a large protected cultivation structure formed by connecting multiple tunnel units.',
    imageUrl: '/products/multi-span-tunnel-house.png',
    galleryImages: ['/products/multi-span-tunnel-house.png'],
    specifications: {
      'Model': 'MST',
      'Standard Grids': '8m × 2.5m / 9m × 3m',
      'Std. Side Height': '2m / 2.5m',
      'Std. Top Height': '4.5m / 5m',
    },
    applications: ['Row Crops', 'Berries', 'Vegetables'],
    advantages: ['Modular bolt-together assembly', 'High-PAR poly film', 'Roll-up side ventilation'],
    crops: ['Blueberries', 'Exotic Vegetables'],
    displayOrder: 6,
    featured: true,
    published: true,
  },
];

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'proj-vinayaka-farm',
    slug: 'vinayaka-farm',
    name: 'Vinayaka Farm',
    location: 'Chekhla, Sanand, Gujarat, India',
    projectType: 'Soilless Farming Project',
    executionType: 'Turnkey Project',
    category: 'projects',
    areaSize: '55,000+ Sq. M.',
    crop: 'Cucumber, Capsicum, Strawberry, Basil & Nursery Plants',
    crops: ['Cucumber', 'Capsicum', 'Strawberry', 'Basil', 'Nursery Saplings'],
    yearCompleted: '2018–2019',
    description: 'Vinayaka Farm, located at Chekhla, Sanand, Gujarat, is a large-scale soilless farming project developed using different protected-cultivation models at a single site. The project included multiple cultivation structures and systems designed for different crops and growing requirements.',
    imageUrl: '/projects/vinayaka-farm/v2.jpg',
    heroImage: '/projects/vinayaka-farm/v2.jpg',
    galleryImages: [
      '/projects/vinayaka-farm/v2.jpg',
      '/projects/vinayaka-farm/v3.jpg',
      '/projects/vinayaka-farm/v4.jpg',
      '/projects/vinayaka-farm/v5.jpg',
      '/projects/vinayaka-farm/v6.jpg',
      '/projects/vinayaka-farm/v7.jpg',
      '/projects/vinayaka-farm/v8.jpg',
      '/projects/vinayaka-farm/vinayaka-capsicum-crop.jpg',
      '/projects/vinayaka-farm/vinayaka-exterior-polyhouse.jpg',
      '/projects/vinayaka-farm/vinayaka-interior-ceiling.jpg',
      '/projects/vinayaka-farm/vinayaka-multi-span-road.jpg',
    ],
    videos: [
      '/projects/vinayaka-farm/w1.mp4',
      '/projects/vinayaka-farm/w2.mp4',
    ],
    featured: true,
    published: true,
  },
  {
    id: 'proj-gabbar-farm-sanand',
    slug: 'gabbar-farm-sanand',
    name: 'Gabbar Farm — Sanand',
    location: 'Sanand, Gujarat, India',
    projectType: 'Protected Cultivation Project',
    category: 'projects',
    description: 'Pujya Agritech protected cultivation project location at Gabbar Farm in Sanand, Gujarat.',
    imageUrl: '/gallery/site-gallery-2.jpg',
    galleryImages: ['/gallery/site-gallery-2.jpg', '/gallery/site-gallery-4.jpg'],
    featured: true,
    published: true,
  },
  {
    id: 'proj-sanand-gujarat',
    slug: 'sanand-gujarat',
    name: 'Sanand',
    location: 'Sanand, Gujarat, India',
    projectType: 'Protected Cultivation Project',
    category: 'projects',
    description: 'Pujya Agritech protected cultivation project location in Sanand region, Gujarat.',
    imageUrl: '/gallery/site-gallery-3.jpg',
    galleryImages: ['/gallery/site-gallery-3.jpg', '/gallery/site-gallery-5.jpg'],
    featured: true,
    published: true,
  },
  {
    id: 'proj-jodhpur-rajasthan',
    slug: 'jodhpur-rajasthan',
    name: 'Jodhpur — Rajasthan',
    location: 'Jodhpur, Rajasthan, India',
    projectType: 'Protected Cultivation Project',
    category: 'projects',
    description: 'Pujya Agritech protected cultivation project location in Jodhpur, Rajasthan.',
    imageUrl: '/gallery/site-gallery-4.jpg',
    galleryImages: ['/gallery/site-gallery-4.jpg', '/gallery/site-gallery-6.jpg'],
    featured: true,
    published: true,
  },
  {
    id: 'proj-chhattisgarh',
    slug: 'chhattisgarh',
    name: 'Chhattisgarh',
    location: 'Chhattisgarh, India',
    projectType: 'Protected Cultivation Project',
    category: 'projects',
    description: 'Pujya Agritech protected cultivation project location in Chhattisgarh region.',
    imageUrl: '/gallery/site-gallery-5.jpg',
    galleryImages: ['/gallery/site-gallery-5.jpg', '/gallery/site-gallery-7.jpg'],
    featured: true,
    published: true,
  },
  {
    id: 'proj-jamnagar-gujarat',
    slug: 'jamnagar-gujarat',
    name: 'Jamnagar — Gujarat',
    location: 'Jamnagar, Gujarat, India',
    projectType: 'Protected Cultivation Project',
    category: 'projects',
    description: 'Pujya Agritech protected cultivation project location in Jamnagar, Gujarat.',
    imageUrl: '/gallery/site-gallery-6.jpg',
    galleryImages: ['/gallery/site-gallery-6.jpg', '/gallery/site-gallery-1.jpg'],
    featured: true,
    published: true,
  },
  {
    id: 'proj-dholka-gujarat',
    slug: 'dholka-gujarat',
    name: 'Dholka — Gujarat',
    location: 'Dholka, Gujarat, India',
    projectType: 'Protected Cultivation Project',
    category: 'projects',
    description: 'Pujya Agritech protected cultivation project location in Dholka, Gujarat.',
    imageUrl: '/gallery/site-gallery-7.jpg',
    galleryImages: ['/gallery/site-gallery-7.jpg', '/gallery/site-gallery-2.jpg'],
    featured: true,
    published: true,
  },
  {
    id: 'proj-pushkar-rajasthan',
    slug: 'pushkar-rajasthan',
    name: 'Pushkar — Rajasthan',
    location: 'Pushkar, Rajasthan, India',
    projectType: 'Protected Cultivation Project',
    category: 'projects',
    description: 'Pujya Agritech protected cultivation project location in Pushkar, Rajasthan.',
    imageUrl: '/products/naturally-ventilated-poly-house.png',
    galleryImages: ['/products/naturally-ventilated-poly-house.png'],
    featured: true,
    published: true,
  },
  {
    id: 'proj-kota-rajasthan',
    slug: 'kota-rajasthan',
    name: 'Kota — Rajasthan',
    location: 'Kota, Rajasthan, India',
    projectType: 'Protected Cultivation Project',
    category: 'projects',
    description: 'Pujya Agritech protected cultivation project location in Kota, Rajasthan.',
    imageUrl: '/products/fan-and-pad-poly-house.png',
    galleryImages: ['/products/fan-and-pad-poly-house.png'],
    featured: true,
    published: true,
  },
  {
    id: 'proj-vamaj-kadi',
    slug: 'vamaj-kadi',
    name: 'Vamaj — Kadi',
    location: 'Vamaj, Kadi, Gujarat, India',
    projectType: 'Protected Cultivation Project',
    category: 'projects',
    description: 'Pujya Agritech protected cultivation project location at Vamaj, Kadi, Gujarat.',
    imageUrl: '/products/dome-shape-net-house.jpeg',
    galleryImages: ['/products/dome-shape-net-house.jpeg'],
    featured: true,
    published: true,
  },
  {
    id: 'proj-ranchi-jharkhand',
    slug: 'ranchi-jharkhand',
    name: 'Ranchi — Jharkhand',
    location: 'Ranchi, Jharkhand, India',
    projectType: 'Protected Cultivation Project',
    category: 'projects',
    description: 'Pujya Agritech protected cultivation project location in Ranchi, Jharkhand.',
    imageUrl: '/products/flat-type-net-house.jpeg',
    galleryImages: ['/products/flat-type-net-house.jpeg'],
    featured: true,
    published: true,
  },
];

export const DEFAULT_GALLERY: GalleryMedia[] = [
  {
    id: 'gal-1',
    type: 'photo',
    title: 'Naturally Ventilated Polyhouse Field Installation',
    category: 'poly-houses',
    url: '/gallery/site-gallery-1.jpg',
    description: 'Turnkey execution of multi-span naturally ventilated polyhouse structure.',
    featured: true,
    published: true,
  },
  {
    id: 'gal-2',
    type: 'photo',
    title: 'Hi-Tech Commercial Polyhouse Facility',
    category: 'poly-houses',
    url: '/gallery/site-gallery-2.jpg',
    description: 'High-performance polyhouse structural installation with internal crop trellising.',
    featured: true,
    published: true,
  },
  {
    id: 'gal-3',
    type: 'photo',
    title: 'Galvanized Structural Steel Frame Erection',
    category: 'projects',
    url: '/gallery/site-gallery-3.jpg',
    description: 'IS-2062 grade hot-dip galvanized steel framing and purlin assembly.',
    featured: true,
    published: true,
  },
  {
    id: 'gal-4',
    type: 'photo',
    title: 'Agro Shade Net House & Nursery Unit',
    category: 'net-houses',
    url: '/gallery/site-gallery-4.jpg',
    description: 'UV-stabilized agro shade net house for sapling propagation and crop protection.',
    featured: false,
    published: true,
  },
  {
    id: 'gal-5',
    type: 'photo',
    title: 'High-Tension Cable Net House Installation',
    category: 'net-houses',
    url: '/gallery/site-gallery-5.jpg',
    description: 'Cable-supported anti-insect monofilament net structure.',
    featured: false,
    published: true,
  },
  {
    id: 'gal-6',
    type: 'photo',
    title: 'Evaporative Climate Control Fan & Pad Unit',
    category: 'poly-houses',
    url: '/gallery/site-gallery-6.jpg',
    description: 'Evaporative cooling pad wall and heavy-duty axial exhaust fan installation.',
    featured: false,
    published: true,
  },
  {
    id: 'gal-7',
    type: 'photo',
    title: 'Automated Drip Fertigation & Irrigation System',
    category: 'field',
    url: '/gallery/site-gallery-7.jpg',
    description: 'Pressure-compensating micro-drip delivery manifolds and automated dosing.',
    featured: true,
    published: true,
  },
];

export const DEFAULT_BLOG: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Selecting the Right Protected Cultivation Structure for Your Site',
    slug: 'selecting-the-right-greenhouse-structure',
    coverImage: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'A practical guide on evaluating local climate, wind patterns, and crop requirements when choosing between Naturally Ventilated Poly Houses, Shade Net Houses, and Climate Controlled Greenhouses.',
    content: `Protected cultivation requires selecting the appropriate structural design and cladding materials based on regional temperatures, wind exposure, solar radiation, and target crop economics.

### 1. Land & Water Quality
Before erecting a polyhouse, conduct comprehensive soil and irrigation water testing. High salinity or heavy clay soil requires raised bed or substrate bag cultivation.

### 2. Structural Galvanization
Ensure all steel pipes use hot-dip galvanization (minimum 275 gsm zinc coating) to prevent corrosion from humidity and liquid fertilizers.

### 3. Microclimate Ventilation
For hot Indian plains, top-ridge ventilation combined with 40-mesh anti-insect side netting ensures natural air movement without electrical cooling power.

### 4. Government Subsidies
Programs under the National Horticulture Board (NHB) and Mission for Integrated Development of Horticulture (MIDH) offer financial assistance for empanelled polyhouse contractors like Pujya Agritech.`,
    category: 'Protected Cultivation',
    tags: ['Polyhouse', 'Greenhouse', 'Agriculture', 'Subsidy'],
    author: 'Pujya Agritech Technical Team',
    readTime: '5 min read',
    date: 'February 2026',
    seoTitle: 'Selecting the Right Greenhouse Structure | Pujya Agritech',
    seoDescription: 'Guide on selecting Naturally Ventilated Poly Houses, Fan & Pad Greenhouses, and Shade Net Houses based on site climate and crop economics.',
    published: true,
  },

  {
    id: 'blog-3',
    title: 'Farm Pond Rainwater Harvesting for Year-Round Drip Irrigation',
    slug: 'water-harvesting-farm-pond-planning',
    coverImage: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'How capturing polyhouse roof runoff and storing water in HDPE geo-membrane lined farm ponds provides water security for commercial farms.',
    content: `Water security is essential for successful commercial protected cultivation. Capturing rainwater runoff from polyhouse roof gutters offers a clean, low-salinity water source ideal for sensitive horticulture crops.

By channeling gutter discharge into an excavated farm pond lined with 500-micron HDPE geo-membrane sheet, growers prevent water loss through soil seepage.

Integrated disc filtration and fertigation pump stations draw from this stored rainwater asset, ensuring reliable drip irrigation even during dry summer months.`,
    category: 'Water Conservation',
    tags: ['Rainwater', 'Farm Pond', 'Drip Irrigation'],
    author: 'Pujya Agritech Technical Team',
    readTime: '4 min read',
    date: 'January 2026',
    seoTitle: 'Farm Pond Rainwater Harvesting | Pujya Agritech',
    seoDescription: 'How rainwater harvesting and HDPE lined farm ponds provide irrigation security for polyhouse projects.',
    published: true,
  },
];

export const DEFAULT_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-101',
    name: 'Rajesh Patel',
    company: 'Patel Agro Farms',
    mobile: '+91 98250 12345',
    email: 'rajesh@patelagro.com',
    interestedProduct: 'Naturally Ventilated Poly House',
    areaSqM: 4000,
    location: 'Anand, Gujarat',
    message: 'Interested in constructing a 4000 sqm Naturally Ventilated Polyhouse in Anand district. Require DPR and subsidy details.',
    date: '2026-08-11',
    status: 'New',
  },
  {
    id: 'enq-102',
    name: 'Sanjay Sharma',
    company: 'Himalayan Organic Produce',
    mobile: '+91 98110 54321',
    email: 'sanjay@himalayanorganic.in',
    interestedProduct: 'Fan & Pad Poly House',
    areaSqM: 2500,
    location: 'Jaipur, Rajasthan',
    message: 'Looking for a climate controlled Fan & Pad polyhouse for strawberry and exotic vegetable farming.',
    date: '2026-08-09',
    status: 'Contacted',
  },
];
