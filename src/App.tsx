import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AdminProvider } from './context/AdminContext';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { ProductsShowcase } from './components/ProductsShowcase';
import { ProjectShowcase } from './components/ProjectShowcase';
import { GalleryView } from './components/GalleryView';
import { BlogView } from './components/BlogView';
import { AboutUs } from './components/AboutUs';
import { ContactView } from './components/ContactView';
import { ContactModal } from './components/ContactModal';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { SEOHead } from './components/SEOHead';
import { CheckCircle2 } from 'lucide-react';

const TAB_TO_PATH: Record<string, string> = {
  home: '/',
  products: '/products',
  projects: '/projects',
  gallery: '/gallery',
  blog: '/blog',
  about: '/about',
  contact: '/contact',
};

const PATH_TO_TAB: Record<string, string> = {
  '/': 'home',
  '/products': 'products',
  '/projects': 'projects',
  '/gallery': 'gallery',
  '/blog': 'blog',
  '/about': 'about',
  '/contact': 'contact',
};

// Global Organization & LocalBusiness JSON-LD Schema
const GLOBAL_ORGANIZATION_SCHEMA = {
  '@type': 'Organization',
  '@id': 'https://www.pujyaagritech.com/#organization',
  name: 'Pujya Agritech',
  alternateName: 'Pujya Sales Corporation',
  url: 'https://www.pujyaagritech.com',
  logo: 'https://www.pujyaagritech.com/logo.png',
  description: 'Manufacturer and turnkey EPC partner for Greenhouses, Naturally Ventilated Poly Houses, Shade Net Houses, Drip Irrigation, and Protected Farming Infrastructure in India.',
  foundingDate: '2012',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    addressCountry: 'IN',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91 99744 31960',
      contactType: 'sales & project consultation',
      email: 'contact@pujyasales.com',
      availableLanguage: ['English', 'Hindi', 'Gujarati'],
    },
    {
      '@type': 'ContactPoint',
      telephone: '+91 90814 12412',
      contactType: 'engineering & customer support',
      email: 'contact@pujyasales.com',
      availableLanguage: ['English', 'Hindi', 'Gujarati'],
    },
  ],
  sameAs: [
    'https://www.instagram.com/pujyasales/',
    'https://www.facebook.com/pujyasales',
    'https://www.indiamart.com/pujyasalescorporation/photos.html',
  ],
};

const GLOBAL_LOCAL_BUSINESS_SCHEMA = {
  '@type': 'LocalBusiness',
  '@id': 'https://www.pujyaagritech.com/#localbusiness',
  name: 'Pujya Agritech',
  image: 'https://www.pujyaagritech.com/who-we-are-bg.jpeg',
  telephone: ['+91 99744 31960', '+91 90814 12412'],
  email: 'contact@pujyasales.com',
  priceRange: '₹₹₹',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    addressCountry: 'IN',
  },
};

function MainLayout() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>(null);
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [modalItemName, setModalItemName] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync Initial URL Path & Hash to Tab State
  useEffect(() => {
    const parseUrlState = () => {
      const path = window.location.pathname.toLowerCase();
      let matchedTab = PATH_TO_TAB[path];
      if (!matchedTab) {
        if (path.startsWith('/products')) matchedTab = 'products';
        else if (path.startsWith('/projects')) matchedTab = 'projects';
        else if (path.startsWith('/gallery')) matchedTab = 'gallery';
        else if (path.startsWith('/blog')) matchedTab = 'blog';
        else if (path.startsWith('/about')) matchedTab = 'about';
        else if (path.startsWith('/contact')) matchedTab = 'contact';
        else matchedTab = 'home';
      }
      setActiveTab(matchedTab);

      const parts = path.split('/').filter(Boolean);
      const pathSlug = parts.length > 1 ? parts[1] : null;
      const hash = window.location.hash.replace('#', '');
      const slug = hash || pathSlug;

      if (slug && matchedTab === 'projects') {
        setSelectedProjectSlug(slug);
      } else if (slug && matchedTab === 'products') {
        setSelectedProductSlug(slug);
      } else {
        setSelectedProductSlug(null);
        setSelectedProjectSlug(null);
      }
    };

    parseUrlState();

    const handlePopState = () => {
      parseUrlState();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedProductSlug(null);
    setSelectedProjectSlug(null);

    const targetPath = TAB_TO_PATH[tab] || '/';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
  };

  const handleOpenConsultation = (itemName?: string) => {
    setModalItemName(itemName);
    setIsConsultationModalOpen(true);
  };

  const handleSelectProduct = (slug: string) => {
    setSelectedProductSlug(slug);
    setActiveTab('products');
    window.history.pushState({}, '', `/products#${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (slug: string) => {
    setSelectedProjectSlug(slug);
    setActiveTab('projects');
    window.history.pushState({}, '', `/projects#${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate Page-Specific SEO Metadata & Schemas
  const getSEOMetadata = () => {
    const canonicalPath = TAB_TO_PATH[activeTab] || '/';

    switch (activeTab) {
      case 'products':
        return {
          title: selectedProductSlug
            ? `${selectedProductSlug.replace(/-/g, ' ').toUpperCase()} | Pujya Agritech`
            : 'Greenhouse & Polyhouse Materials Catalogue | Pujya Agritech',
          description: 'Explore Pujya Agritech\'s high-grade Greenhouse Materials, Naturally Ventilated Poly Houses, Fan & Pad Cooling Systems, Shade Net Houses, Insect Nets, and Drip Irrigation Systems.',
          canonicalPath: selectedProductSlug ? `/products#${selectedProductSlug}` : '/products',
          jsonLd: [
            GLOBAL_ORGANIZATION_SCHEMA,
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.pujyaagritech.com/' },
                { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://www.pujyaagritech.com/products' },
              ],
            },
          ],
        };
      case 'projects':
        return {
          title: 'Turnkey Protected Cultivation Projects & Infrastructure | Pujya Agritech',
          description: 'View commercial Poly House, Greenhouse, Shade Net House, and Drip Irrigation turnkey EPC project execution case studies across India by Pujya Agritech.',
          canonicalPath: '/projects',
          jsonLd: [
            GLOBAL_ORGANIZATION_SCHEMA,
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.pujyaagritech.com/' },
                { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://www.pujyaagritech.com/projects' },
              ],
            },
          ],
        };
      case 'gallery':
        return {
          title: 'Protected Cultivation Photography & Video Documentation | Pujya Agritech',
          description: 'Real-world photography, structural engineering execution videos, and protected farming project documentation from Pujya Agritech.',
          canonicalPath: '/gallery',
          jsonLd: [GLOBAL_ORGANIZATION_SCHEMA],
        };
      case 'blog':
        return {
          title: 'Protected Farming Technical Articles & Agronomy Insights | Pujya Agritech',
          description: 'Read technical greenhouse engineering guides, polyhouse construction advice, drip irrigation strategies, and protected cultivation agronomy insights.',
          canonicalPath: '/blog',
          jsonLd: [GLOBAL_ORGANIZATION_SCHEMA],
        };
      case 'about':
        return {
          title: 'About Pujya Agritech | Protected Cultivation & Agricultural Engineering Leader',
          description: 'Pujya Agritech (Estd. 2012, Ahmedabad & Gandhinagar, Gujarat) is a premier turnkey EPC contractor and manufacturer of polyhouses, greenhouses, shade nets, and irrigation systems in India.',
          canonicalPath: '/about',
          jsonLd: [GLOBAL_ORGANIZATION_SCHEMA, GLOBAL_LOCAL_BUSINESS_SCHEMA],
        };
      case 'contact':
        return {
          title: 'Contact Pujya Agritech | Greenhouse Project Consultation & Quote',
          description: 'Get project cost estimates, NHB/MIDH subsidy guidance, and turnkey polyhouse consultation from Pujya Agritech. Phone: +91 99744 31960 / +91 90814 12412, Email: contact@pujyasales.com.',
          canonicalPath: '/contact',
          jsonLd: [GLOBAL_ORGANIZATION_SCHEMA, GLOBAL_LOCAL_BUSINESS_SCHEMA],
        };
      default:
        return {
          title: 'Pujya Agritech | Protected Cultivation & Agricultural Infrastructure',
          description: 'Turnkey EPC manufacturer and infrastructure provider for Polyhouses, Greenhouses, Shade Net Houses, Drip Irrigation, and Hydroponics in Ahmedabad, Gujarat, India.',
          canonicalPath: '/',
          jsonLd: [GLOBAL_ORGANIZATION_SCHEMA, GLOBAL_LOCAL_BUSINESS_SCHEMA],
        };
    }
  };

  const currentSEO = getSEOMetadata();

  // If viewing admin panel, show full screen Admin Panel
  if (activeTab === 'admin') {
    return <AdminPanel onGoToSite={() => handleTabChange('home')} />;
  }

  return (
    <div className="min-h-screen bg-white text-[#10232B] font-sans flex flex-col selection:bg-[#2F7445] selection:text-white">
      {/* Dynamic Production SEO Metadata & JSON-LD Structured Data */}
      <SEOHead
        title={currentSEO.title}
        description={currentSEO.description}
        canonicalPath={currentSEO.canonicalPath}
        jsonLd={currentSEO.jsonLd}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#10232B] text-white p-4 rounded shadow-2xl border border-[#2F7445]/30 max-w-md flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-[#2F7445] shrink-0" />
          <div className="text-xs">
            <p className="font-medium text-white">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Main Header with Crawlable Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenConsultationModal={() => handleOpenConsultation()}
      />

      {/* Dynamic Page Content */}
      <main className="flex-grow" id="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {activeTab === 'home' && (
              <HomeView
                setActiveTab={handleTabChange}
                onOpenConsultationModal={(itemName) => handleOpenConsultation(itemName)}
                onSelectProduct={handleSelectProduct}
                onSelectProject={handleSelectProject}
              />
            )}

            {activeTab === 'about' && (
              <AboutUs
                onOpenConsultationModal={() => handleOpenConsultation('Corporate Profile Inquiry')}
              />
            )}

            {activeTab === 'products' && (
              <ProductsShowcase
                key={selectedProductSlug || 'products-list'}
                onOpenQuote={(itemName) => handleOpenConsultation(itemName)}
                selectedSlug={selectedProductSlug}
                onClearSlug={() => setSelectedProductSlug(null)}
              />
            )}

            {activeTab === 'projects' && (
              <ProjectShowcase
                key={selectedProjectSlug || 'projects-list'}
                onSelectProjectForQuote={(itemName) => handleOpenConsultation(itemName || 'Project Inquiry')}
                selectedSlug={selectedProjectSlug}
                onSelectProject={(slug) => {
                  if (slug) handleSelectProject(slug);
                  else setSelectedProjectSlug(null);
                }}
                onClearSlug={() => setSelectedProjectSlug(null)}
              />
            )}

            {activeTab === 'gallery' && <GalleryView />}

            {activeTab === 'blog' && <BlogView />}

            {activeTab === 'contact' && (
              <ContactView onSubmitSuccess={(msg) => setToastMessage(msg)} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Premium Pujya Agritech Footer with Crawlable Links */}
      <Footer
        setActiveTab={handleTabChange}
        onOpenConsultationModal={() => handleOpenConsultation()}
      />

      {/* Consultation Modal */}
      <ContactModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        onSubmitSuccess={(msg) => setToastMessage(msg)}
        initialItemName={modalItemName}
      />
    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <MainLayout />
    </AdminProvider>
  );
}
