export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  category: 'greenhouses' | 'poly-houses' | 'net-houses' | 'poly-tunnels' | 'hydroponics' | 'cattle-shelters' | 'poultry-structures' | 'agricultural-infrastructure';
  categoryLabel: string;
  numberLabel: string;
  tagline: string;
  imageUrl: string;
  galleryImages: string[];
  shortDescription: string;
  fullOverview: string;
  features: string[];
  applications: string[];
  crops: string[];
  structureInfo: { [key: string]: string };
  isFeatured?: boolean;
}

export interface ProjectMediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  title?: string;
  alt?: string;
  caption?: string;
  videoType?: 'mp4' | 'youtube' | 'vimeo';
}

export interface ProjectPhotoItem {
  id: string;
  src: string;
  alt?: string;
  caption?: string;
  title?: string;
}

export interface ProjectVideoItem {
  id: string;
  src: string;
  thumbnail?: string;
  title?: string;
  caption?: string;
  videoType?: 'mp4' | 'youtube' | 'vimeo';
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  location: string;
  state?: string;
  country?: string;
  projectType?: string;
  executionType?: string;
  crop?: string;
  areaSize?: string;
  area?: string;
  yearCompleted?: string;
  projectDate?: string;
  imageUrl?: string;
  heroImage?: string;
  galleryImages?: string[];
  videoUrl?: string;
  videos?: string[];
  galleryImageObjects?: ProjectPhotoItem[];
  videoObjects?: ProjectVideoItem[];
  media?: ProjectMediaItem[];
  overview: string;
  shortDescription?: string;
  challenge?: string;
  approach?: string;
  execution?: string;
  result?: string;
  projectPeriod?: string;
  automationInfo?: string;
  technologyInfo?: string;
  structuresUsed?: { name: string; crops: string }[];
  story?: string;
  status?: string;
  isFeatured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'greenhouses' | 'poly-houses' | 'net-houses' | 'projects' | 'field' | 'video';
  imageUrl: string;
  videoUrl?: string;
  caption?: string;
  isFeatured?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  featuredImage: string;
  excerpt: string;
  content: string;
  readTime: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ContactEnquiryData {
  fullName: string;
  phone: string;
  email: string;
  companyOrFarmName?: string;
  location?: string;
  interestedIn: string;
  projectRequirement?: string;
  approximateArea?: string;
  message?: string;
}

export interface CropApplication {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
}

export interface WhyPujyaPrinciple {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'assistant';
  text: string;
  timestamp: string;
}

export interface ComponentAnatomy {
  id: string;
  name: string;
  category: string;
  description?: string;
  shortDesc?: string;
  fullDesc?: string;
  specifications?: string[];
  specs?: { [key: string]: string };
  iconName?: string;
  imageFallbackUrl?: string;
  imageUrl?: string;
}

export interface QuoteFormData {
  name: string;
  phone: string;
  email: string;
  location: string;
  structureType: string;
  areaSize: number;
  cropType: string;
  includeIrrigation: boolean;
  includeAutomation: boolean;
  notes?: string;
}

export interface CostBreakdown {
  structureCost: number;
  claddingCost: number;
  irrigationCost: number;
  automationCost: number;
  installationCost: number;
  totalCost: number;
  costPerSqm: number;
  totalAreaSqm?: number;
  totalProjectCost?: number;
  estimatedSubsidy?: number;
  farmPondCost?: number;
  dripSystemCost?: number;
  netCostToFarmer?: number;
  expectedAnnualYieldKg?: number;
  paybackPeriodYears?: number;
}


export interface GreenhouseSystem {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  keySpecs: string[];
  benefits: string[];
}

export interface CropSolution {
  id: string;
  cropName: string;
  recommendedStructure: string;
  recommendedSystems: string[];
  yieldBoost: string;
  imageUrl: string;
  description: string;
  keyFeatures: string[];
}

export interface CatalogDoc {
  id: string;
  title: string;
  fileSize: string;
  category: string;
  downloadUrl: string;
  description: string;
  iconType: string;
}



