import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SiteSettings,
  HomeContent,
  AboutUsContent,
  CertificateItem,
  Product,
  Project,
  GalleryMedia,
  BlogPost,
  ContactInfo,
  Enquiry,
  DEFAULT_SITE_SETTINGS,
  DEFAULT_HOME_CONTENT,
  DEFAULT_ABOUT_US,
  DEFAULT_CERTIFICATES,
  DEFAULT_PRODUCTS,
  DEFAULT_PROJECTS,
  DEFAULT_GALLERY,
  DEFAULT_BLOG,
  DEFAULT_ENQUIRIES,
} from '../data/adminStore';

interface AdminContextType {
  isAdminLoggedIn: boolean;
  loginAdmin: (password: string, username?: string) => Promise<{ success: boolean; requiresPasswordChange?: boolean; error?: string }>;
  logoutAdmin: () => void;

  siteSettings: SiteSettings;
  updateSiteSettings: (settings: SiteSettings) => void;

  homeContent: HomeContent;
  updateHomeContent: (content: HomeContent) => void;

  aboutUs: AboutUsContent;
  updateAboutUs: (about: AboutUsContent) => void;

  certificates: CertificateItem[];
  addCertificate: (cert: Omit<CertificateItem, 'id'>) => void;
  updateCertificate: (id: string, cert: Partial<CertificateItem>) => void;
  deleteCertificate: (id: string) => void;

  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  duplicateProduct: (id: string) => void;
  deleteProduct: (id: string) => void;

  projects: Project[];
  addProject: (proj: Omit<Project, 'id'>) => void;
  updateProject: (id: string, proj: Partial<Project>) => void;
  duplicateProject: (id: string) => void;
  deleteProject: (id: string) => void;

  gallery: GalleryMedia[];
  addGalleryItem: (item: Omit<GalleryMedia, 'id'>) => void;
  updateGalleryItem: (id: string, item: Partial<GalleryMedia>) => void;
  deleteGalleryItem: (id: string) => void;

  blog: BlogPost[];
  addBlogPost: (post: Omit<BlogPost, 'id'>) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  duplicateBlogPost: (id: string) => void;
  deleteBlogPost: (id: string) => void;

  contactInfo: ContactInfo;
  updateContactInfo: (info: ContactInfo) => void;

  enquiries: Enquiry[];
  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'date' | 'status'>) => void;
  updateEnquiryStatus: (id: string, status: Enquiry['status']) => void;
  deleteEnquiry: (id: string) => void;

  resetToDefaults: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ADMIN_AUTH: 'pujya_admin_auth',
  SITE_SETTINGS: 'pujya_site_settings',
  HOME_CONTENT: 'pujya_home_content',
  ABOUT_US: 'pujya_about_us',
  CERTIFICATES: 'pujya_certificates_v3_local',
  PRODUCTS: 'pujya_products_v4_hyphenated',
  PROJECTS: 'pujya_projects_v7_11_real_locations',
  GALLERY: 'pujya_gallery_v3_local',
  BLOG: 'pujya_blog_v3_clean',
  CONTACT_INFO: 'pujya_contact_info_v3',
  ENQUIRIES: 'pujya_enquiries_v2',
};

export const DEFAULT_CONTACT_INFO: ContactInfo = {
  manufacturingAddress: 'Plot No. 42, GIDC Industrial Estate, Sanand, Gandhinagar / Ahmedabad, Gujarat, India',
  officeAddress: '210, 2nd Floor, Aarohi Verve, Nr. One World West, S.P. Ring Road, Bopal, Ahmedabad – 380058, Gujarat, India',
  mobile: '+91 99744 31960',
  phone2: '+91 90814 12412',
  whatsapp: '+91 90814 12412',
  email: 'info@pujyaagritech.com',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.862371948834!2d72.4632!3d23.0289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAxJzdoLjQiTiA3MsKwMjcnNDtuNSJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin',
  businessHours: 'Monday - Saturday: 9:00 AM - 7:00 PM',
  instagram: 'https://www.instagram.com/pujyaagritech/',
  facebook: 'https://www.facebook.com/pujyasales',
  indiaMart: 'https://www.indiamart.com/pujyasalescorporation/photos.html',
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Purge all legacy storage keys on provider initialization
  useEffect(() => {
    const legacyKeys = [
      'pujya_projects',
      'pujya_projects_v2',
      'pujya_projects_v3',
      'pujya_projects_v4_real_locations_only',
      'pujya_products',
      'pujya_products_v2',
      'pujya_products_v3',
      'pujya_gallery',
      'pujya_gallery_v2',
      'pujya_certificates',
      'pujya_certificates_v2',
      'pujya_contact_info',
      'pujya_contact_info_v2',
      'pujya_site_settings',
    ];
    legacyKeys.forEach((key) => {
      try {
        localStorage.removeItem(key);
      } catch {}
    });
  }, []);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SITE_SETTINGS);
    return saved ? JSON.parse(saved) : DEFAULT_SITE_SETTINGS;
  });

  const [homeContent, setHomeContent] = useState<HomeContent>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HOME_CONTENT);
    return saved ? JSON.parse(saved) : DEFAULT_HOME_CONTENT;
  });

  const [aboutUs, setAboutUs] = useState<AboutUsContent>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ABOUT_US);
    return saved ? JSON.parse(saved) : DEFAULT_ABOUT_US;
  });

  const [certificates, setCertificates] = useState<CertificateItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const hasUnsplash = parsed.some((c: any) => c.imageUrl?.includes('unsplash'));
          if (!hasUnsplash) return parsed;
        }
      }
    } catch {}
    return DEFAULT_CERTIFICATES;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const hasSpaceOrBadPath = parsed.some((p: any) => p.imageUrl?.includes(' ') || p.imageUrl?.includes('&') || p.imageUrl?.includes('unsplash'));
          if (!hasSpaceOrBadPath) return parsed;
        }
      }
    } catch {}
    return DEFAULT_PRODUCTS;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const hasInvalid = parsed.some((p: any) =>
            p.id === 'proj-1' ||
            p.id === 'proj-2' ||
            p.id === 'proj-3' ||
            p.id === 'proj-4' ||
            p.id === 'proj-gujarat-nvph' ||
            p.slug === 'naturally-ventilated-polyhouse-gujarat' ||
            p.name?.includes('Commercial Naturally Ventilated Poly House') ||
            p.name?.includes('Hi-Tech Fan & Pad') ||
            p.name?.includes('High-Density Shade-Net') ||
            p.name?.includes('Commercial Turnkey Greenhouse Project')
          );
          if (!hasInvalid) return parsed;
        }
      }
    } catch {}
    return DEFAULT_PROJECTS;
  });

  const [gallery, setGallery] = useState<GalleryMedia[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const hasUnsplash = parsed.some((g: any) => g.url?.includes('unsplash'));
          if (!hasUnsplash) return parsed;
        }
      }
    } catch {}
    return DEFAULT_GALLERY;
  });

  const [blog, setBlog] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BLOG);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const filtered = parsed.filter(
            (b: any) =>
              b.id !== 'blog-2' &&
              b.id !== 'post-2' &&
              !b.slug?.includes('fundamentals-of-agricultural-protective-materials') &&
              !b.title?.includes('Fundamentals of UV Poly Films')
          );
          if (filtered.length !== parsed.length) {
            localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(filtered));
          }
          return filtered;
        }
      }
    } catch {}
    return DEFAULT_BLOG;
  });

  const [contactInfo, setContactInfo] = useState<ContactInfo>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CONTACT_INFO);
    return saved ? JSON.parse(saved) : DEFAULT_CONTACT_INFO;
  });

  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
    return saved ? JSON.parse(saved) : DEFAULT_ENQUIRIES;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SITE_SETTINGS, JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HOME_CONTENT, JSON.stringify(homeContent));
  }, [homeContent]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ABOUT_US, JSON.stringify(aboutUs));
  }, [aboutUs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(blog));
  }, [blog]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONTACT_INFO, JSON.stringify(contactInfo));
  }, [contactInfo]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
  }, [enquiries]);

  // Auth Methods - Server Session Validation
  useEffect(() => {
    fetch('/api/admin/session')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setIsAdminLoggedIn(true);
        } else {
          setIsAdminLoggedIn(false);
        }
      })
      .catch(() => {
        setIsAdminLoggedIn(false);
      });
  }, []);

  const loginAdmin = async (password: string, username = 'pujya_root_admin'): Promise<{ success: boolean; requiresPasswordChange?: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAdminLoggedIn(true);
        return { success: true, requiresPasswordChange: data.requiresPasswordChange };
      }
      return { success: false, error: data.error || 'Authentication failed' };
    } catch {
      return { success: false, error: 'Server authentication error' };
    }
  };

  const logoutAdmin = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } finally {
      setIsAdminLoggedIn(false);
    }
  };

  // Updaters
  const updateSiteSettings = (settings: SiteSettings) => setSiteSettings(settings);
  const updateHomeContent = (content: HomeContent) => setHomeContent(content);
  const updateAboutUs = (about: AboutUsContent) => setAboutUs(about);

  // Certificates CRUD
  const addCertificate = (cert: Omit<CertificateItem, 'id'>) => {
    const newItem: CertificateItem = { ...cert, id: 'cert-' + Date.now() };
    setCertificates((prev) => [...prev, newItem]);
  };
  const updateCertificate = (id: string, cert: Partial<CertificateItem>) => {
    setCertificates((prev) => prev.map((item) => (item.id === id ? { ...item, ...cert } : item)));
  };
  const deleteCertificate = (id: string) => {
    setCertificates((prev) => prev.filter((item) => item.id !== id));
  };

  // Products CRUD
  const addProduct = (prod: Omit<Product, 'id'>) => {
    const newItem: Product = { ...prod, id: 'prod-' + Date.now() };
    setProducts((prev) => [newItem, ...prev]);
  };
  const updateProduct = (id: string, prod: Partial<Product>) => {
    setProducts((prev) => prev.map((item) => (item.id === id ? { ...item, ...prod } : item)));
  };
  const duplicateProduct = (id: string) => {
    const existing = products.find((p) => p.id === id);
    if (!existing) return;
    const duplicated: Product = {
      ...existing,
      id: 'prod-' + Date.now(),
      name: `${existing.name} (Copy)`,
      published: false,
    };
    setProducts((prev) => [duplicated, ...prev]);
  };
  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  // Projects CRUD
  const addProject = (proj: Omit<Project, 'id'>) => {
    const newItem: Project = { ...proj, id: 'proj-' + Date.now() };
    setProjects((prev) => [newItem, ...prev]);
  };
  const updateProject = (id: string, proj: Partial<Project>) => {
    setProjects((prev) => prev.map((item) => (item.id === id ? { ...item, ...proj } : item)));
  };
  const duplicateProject = (id: string) => {
    const existing = projects.find((p) => p.id === id);
    if (!existing) return;
    const duplicated: Project = {
      ...existing,
      id: 'proj-' + Date.now(),
      name: `${existing.name} (Copy)`,
      published: false,
    };
    setProjects((prev) => [duplicated, ...prev]);
  };
  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((item) => item.id !== id));
  };

  // Gallery CRUD
  const addGalleryItem = (item: Omit<GalleryMedia, 'id'>) => {
    const newItem: GalleryMedia = { ...item, id: 'gal-' + Date.now() };
    setGallery((prev) => [newItem, ...prev]);
  };
  const updateGalleryItem = (id: string, item: Partial<GalleryMedia>) => {
    setGallery((prev) => prev.map((i) => (i.id === id ? { ...i, ...item } : i)));
  };
  const deleteGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((i) => i.id !== id));
  };

  // Blog CRUD
  const addBlogPost = (post: Omit<BlogPost, 'id'>) => {
    const newItem: BlogPost = { ...post, id: 'blog-' + Date.now() };
    setBlog((prev) => [newItem, ...prev]);
  };
  const updateBlogPost = (id: string, post: Partial<BlogPost>) => {
    setBlog((prev) => prev.map((b) => (b.id === id ? { ...b, ...post } : b)));
  };
  const duplicateBlogPost = (id: string) => {
    const existing = blog.find((b) => b.id === id);
    if (!existing) return;
    const duplicated: BlogPost = {
      ...existing,
      id: 'blog-' + Date.now(),
      title: `${existing.title} (Copy)`,
      slug: `${existing.slug}-copy-${Date.now().toString().slice(-4)}`,
      published: false,
    };
    setBlog((prev) => [duplicated, ...prev]);
  };
  const deleteBlogPost = (id: string) => {
    setBlog((prev) => prev.filter((b) => b.id !== id));
  };

  // Contact Info
  const updateContactInfo = (info: ContactInfo) => setContactInfo(info);

  // Enquiries
  const addEnquiry = (enquiryData: Omit<Enquiry, 'id' | 'date' | 'status'>) => {
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id: 'enq-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'New',
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);
  };

  const updateEnquiryStatus = (id: string, status: Enquiry['status']) => {
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
  };

  const resetToDefaults = () => {
    setSiteSettings(DEFAULT_SITE_SETTINGS);
    setHomeContent(DEFAULT_HOME_CONTENT);
    setAboutUs(DEFAULT_ABOUT_US);
    setCertificates(DEFAULT_CERTIFICATES);
    setProducts(DEFAULT_PRODUCTS);
    setProjects(DEFAULT_PROJECTS);
    setGallery(DEFAULT_GALLERY);
    setBlog(DEFAULT_BLOG);
    setContactInfo(DEFAULT_CONTACT_INFO);
    setEnquiries(DEFAULT_ENQUIRIES);
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        siteSettings,
        updateSiteSettings,
        homeContent,
        updateHomeContent,
        aboutUs,
        updateAboutUs,
        certificates,
        addCertificate,
        updateCertificate,
        deleteCertificate,
        products,
        addProduct,
        updateProduct,
        duplicateProduct,
        deleteProduct,
        projects,
        addProject,
        updateProject,
        duplicateProject,
        deleteProject,
        gallery,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        blog,
        addBlogPost,
        updateBlogPost,
        duplicateBlogPost,
        deleteBlogPost,
        contactInfo,
        updateContactInfo,
        enquiries,
        addEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,
        resetToDefaults,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return ctx;
};
