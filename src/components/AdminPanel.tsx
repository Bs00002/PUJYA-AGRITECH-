import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import {
  LayoutDashboard,
  Package,
  FolderGit2,
  Image as ImageIcon,
  FileText,
  Building2,
  Award,
  Mail,
  Settings,
  Lock,
  LogOut,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  RefreshCw,
  Eye,
  EyeOff,
  Phone,
  MessageSquare,
  Globe,
  Save,
  Copy,
  Search,
  Filter,
  X,
  ExternalLink,
  ChevronRight,
  AlertTriangle,
  Layers,
  Sparkles,
  Tag,
  Calendar,
  User,
  Check,
  Sliders,
  Upload,
  Play,
  ArrowUpRight,
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import { Product, Project, GalleryMedia, BlogPost, CertificateItem, Enquiry, ContactInfo, SiteSettings, AboutUsContent } from '../data/adminStore';

export const AdminPanel: React.FC<{ onGoToSite: () => void }> = ({ onGoToSite }) => {
  const {
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
  } = useAdmin();

  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'products'
    | 'projects'
    | 'gallery'
    | 'blog'
    | 'about'
    | 'certificates'
    | 'contact'
    | 'enquiries'
    | 'settings'
  >('dashboard');

  const [usernameInput, setUsernameInput] = useState('pujya_root_admin');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [requiresPasswordChangeModal, setRequiresPasswordChangeModal] = useState(false);
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState<string | null>(null);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState('all');

  // Modals & Editing States
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [editingGallery, setEditingGallery] = useState<Partial<GalleryMedia> | null>(null);
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);
  const [editingCert, setEditingCert] = useState<Partial<CertificateItem> | null>(null);
  const [viewingEnquiry, setViewingEnquiry] = useState<Enquiry | null>(null);

  // Live Preview Modal
  const [previewItem, setPreviewItem] = useState<{ type: 'product' | 'project' | 'blog'; data: any } | null>(null);

  // Delete Confirmation Modal
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: 'product' | 'project' | 'gallery' | 'blog' | 'cert' | 'enquiry';
    id: string;
    title: string;
  } | null>(null);

  // Editable Form Helpers for Specs Table Editor
  const [specRows, setSpecRows] = useState<Array<{ key: string; value: string }>>([]);

  const showSaveSuccess = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const result = await loginAdmin(passwordInput, usernameInput);
    if (result.success) {
      setPasswordInput('');
      if (result.requiresPasswordChange) {
        setRequiresPasswordChangeModal(true);
      }
    } else {
      setLoginError(result.error || 'Authentication failed. Invalid username or password.');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeError(null);
    if (newPasswordInput.length < 16) {
      setPasswordChangeError('New password must be at least 16 characters long.');
      return;
    }
    if (newPasswordInput !== confirmPasswordInput) {
      setPasswordChangeError('New passwords do not match.');
      return;
    }

    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword: passwordInput, newPassword: newPasswordInput }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRequiresPasswordChangeModal(false);
        showSaveSuccess('Admin password updated successfully!');
      } else {
        setPasswordChangeError(data.error || 'Failed to update password.');
      }
    } catch {
      setPasswordChangeError('Server error while changing password.');
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteConfirm) return;
    const { type, id, title } = deleteConfirm;
    if (type === 'product') deleteProduct(id);
    else if (type === 'project') deleteProject(id);
    else if (type === 'gallery') deleteGalleryItem(id);
    else if (type === 'blog') deleteBlogPost(id);
    else if (type === 'cert') deleteCertificate(id);
    else if (type === 'enquiry') deleteEnquiry(id);

    setDeleteConfirm(null);
    showSaveSuccess(`Deleted "${title}" successfully.`);
  };

  // Product Edit Modal Open
  const handleOpenProductEdit = (product?: Product) => {
    if (product) {
      setEditingProduct({ ...product });
      const rows = Object.entries(product.specifications || {}).map(([key, value]) => ({ key, value }));
      setSpecRows(rows.length > 0 ? rows : [
        { key: 'Structure Frame', value: 'Hot-Dip Galvanized GI Steel' },
        { key: 'Cladding Material', value: '200 Micron UV Polyfilm' },
        { key: 'Wind Speed Rating', value: '120 km/h' },
      ]);
    } else {
      setEditingProduct({
        name: '',
        model: 'NVPH',
        category: 'Naturally Ventilated Poly House',
        categoryLabel: 'Green House Turnkey Project',
        shortDesc: '',
        fullDesc: '',
        imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
        galleryImages: ['https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80'],
        specifications: {},
        applications: ['Commercial Vegetable Farming', 'Floriculture'],
        advantages: ['High crop yield', 'Zero electricity cooling'],
        crops: ['Capsicum', 'Cucumber'],
        displayOrder: products.length + 1,
        featured: true,
        published: true,
      });
      setSpecRows([
        { key: 'Model', value: 'NVPH-400' },
        { key: 'Standard Grids', value: '8m × 4m' },
        { key: 'Std. Gutter Height', value: '4m / 4.5m' },
        { key: 'Std. Top Height', value: '6m / 6.5m' },
      ]);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.name) return;

    // Convert specRows back to Record<string, string>
    const specsObj: Record<string, string> = {};
    specRows.forEach((row) => {
      if (row.key.trim()) {
        specsObj[row.key.trim()] = row.value.trim();
      }
    });

    const finalProduct = {
      ...editingProduct,
      specifications: specsObj,
      slug: editingProduct.slug || editingProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    } as Product;

    if (finalProduct.id) {
      updateProduct(finalProduct.id, finalProduct);
      showSaveSuccess(`Updated product "${finalProduct.name}"`);
    } else {
      addProduct(finalProduct);
      showSaveSuccess(`Added new product "${finalProduct.name}"`);
    }
    setEditingProduct(null);
  };

  // Project Edit Modal Open
  const handleOpenProjectEdit = (proj?: Project) => {
    if (proj) {
      setEditingProject({ ...proj });
    } else {
      setEditingProject({
        name: '',
        location: 'Ahmedabad, Gujarat',
        projectType: 'Naturally Ventilated Poly House',
        category: 'poly-houses',
        areaSize: '4,000 Sq. Meters',
        description: '',
        challenge: '',
        approach: '',
        execution: '',
        result: '',
        imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80',
        galleryImages: ['https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1000&q=80'],
        completionDate: '2024',
        crops: ['Capsicum', 'Cucumber'],
        featured: true,
        published: true,
      });
    }
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.name) return;

    const finalProject = {
      ...editingProject,
      slug: editingProject.slug || editingProject.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    } as Project;

    if (finalProject.id) {
      updateProject(finalProject.id, finalProject);
      showSaveSuccess(`Updated project "${finalProject.name}"`);
    } else {
      addProject(finalProject);
      showSaveSuccess(`Added new project "${finalProject.name}"`);
    }
    setEditingProject(null);
  };

  // Gallery Edit Modal Open
  const handleOpenGalleryEdit = (item?: GalleryMedia) => {
    if (item) {
      setEditingGallery({ ...item });
    } else {
      setEditingGallery({
        type: 'photo',
        title: '',
        category: 'Greenhouses',
        url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80',
        videoEmbedUrl: '',
        description: '',
        featured: true,
        published: true,
      });
    }
  };

  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGallery || !editingGallery.title) return;

    const finalItem = { ...editingGallery } as GalleryMedia;
    if (finalItem.id) {
      updateGalleryItem(finalItem.id, finalItem);
      showSaveSuccess(`Updated media "${finalItem.title}"`);
    } else {
      addGalleryItem(finalItem);
      showSaveSuccess(`Added media "${finalItem.title}"`);
    }
    setEditingGallery(null);
  };

  // Blog Edit Modal Open
  const handleOpenBlogEdit = (post?: BlogPost) => {
    if (post) {
      setEditingBlog({ ...post });
    } else {
      setEditingBlog({
        title: '',
        slug: '',
        coverImage: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80',
        excerpt: '',
        content: '',
        category: 'Protected Cultivation',
        tags: ['Polyhouse', 'Greenhouse'],
        author: 'Pujya Agritech Technical Team',
        readTime: '5 min read',
        date: 'August 2026',
        seoTitle: '',
        seoDescription: '',
        published: true,
      });
    }
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog || !editingBlog.title) return;

    const slug = editingBlog.slug || editingBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const finalPost = {
      ...editingBlog,
      slug,
      seoTitle: editingBlog.seoTitle || `${editingBlog.title} | Pujya Agritech`,
      seoDescription: editingBlog.seoDescription || editingBlog.excerpt,
    } as BlogPost;

    if (finalPost.id) {
      updateBlogPost(finalPost.id, finalPost);
      showSaveSuccess(`Updated article "${finalPost.title}"`);
    } else {
      addBlogPost(finalPost);
      showSaveSuccess(`Published article "${finalPost.title}"`);
    }
    setEditingBlog(null);
  };

  // Certificate Edit Modal Open
  const handleOpenCertEdit = (cert?: CertificateItem) => {
    if (cert) {
      setEditingCert({ ...cert });
    } else {
      setEditingCert({
        title: '',
        issuingOrganization: 'Government Authority',
        imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
        issueYear: '2024',
        description: '',
        displayOrder: certificates.length + 1,
        published: true,
      });
    }
  };

  const handleSaveCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert || !editingCert.title) return;

    const finalCert = { ...editingCert } as CertificateItem;
    if (finalCert.id) {
      updateCertificate(finalCert.id, finalCert);
      showSaveSuccess(`Updated certificate "${finalCert.title}"`);
    } else {
      addCertificate(finalCert);
      showSaveSuccess(`Added certificate "${finalCert.title}"`);
    }
    setEditingCert(null);
  };

  // Login Screen
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0A161D] flex items-center justify-center p-4 selection:bg-[#08779A] selection:text-white">
        <div className="bg-[#11222C] border border-[#1E3A4B] rounded-2xl p-8 max-w-md w-full shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-[#08779A]/15 border border-[#08779A]/40 text-[#08779A] rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">PUJYA AGRITECH ADMIN</h1>
            <p className="text-xs text-slate-400">Content Management & Enquiry Hub</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Admin Username
              </label>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full px-4 py-3 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-sm text-white focus:outline-none focus:border-[#08779A] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#08779A] transition-colors"
                required
              />
              {loginError && (
                <p className="text-xs text-red-400 mt-2 font-medium">{loginError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#08779A] hover:bg-[#066380] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg cursor-pointer"
            >
              Access Admin Portal
            </button>
          </form>

          <div className="pt-4 border-t border-[#1E3A4B] text-center">
            <button
              onClick={onGoToSite}
              className="text-xs text-slate-400 hover:text-white transition-colors underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>← Return to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Stats Calculations
  const pubProducts = products.filter((p) => p.published !== false);
  const draftProducts = products.filter((p) => p.published === false);

  const pubProjects = projects.filter((p) => p.published !== false);
  const draftProjects = projects.filter((p) => p.published === false);

  const pubBlog = blog.filter((b) => b.published !== false);
  const draftBlog = blog.filter((b) => b.published === false);

  const newEnquiries = enquiries.filter((e) => e.status === 'New');

  return (
    <div className="min-h-screen bg-[#0B171E] text-slate-100 flex flex-col font-sans selection:bg-[#08779A] selection:text-white">
      {/* Toast Notification Bar */}
      {saveToast && (
        <div className="fixed top-5 right-5 z-50 bg-[#08779A] text-white px-5 py-3 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2 border border-white/20 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Force Password Change Modal */}
      {requiresPasswordChangeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#11222C] border border-[#1E3A4B] rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5">
            <div className="space-y-2 text-center">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Security Update Required</h3>
              <p className="text-xs text-slate-300">
                You are currently using the initial setup password. For security compliance, you must set a new strong administrator password (at least 16 characters).
              </p>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1">
                  New Admin Password (min 16 chars)
                </label>
                <input
                  type="password"
                  placeholder="Enter new 16+ character password"
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-sm text-white focus:outline-none focus:border-[#08779A]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="Re-enter new password"
                  value={confirmPasswordInput}
                  onChange={(e) => setConfirmPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-sm text-white focus:outline-none focus:border-[#08779A]"
                  required
                />
              </div>

              {passwordChangeError && (
                <p className="text-xs text-red-400 font-medium">{passwordChangeError}</p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-[#08779A] hover:bg-[#066380] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg cursor-pointer"
              >
                Update Password & Proceed
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Admin Top Header Bar */}
      <header className="bg-[#071015] border-b border-[#1A3343] px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#08779A]/20 border border-[#08779A]/50 rounded-xl flex items-center justify-center text-[#08779A] font-black text-lg shadow-sm">
            P
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black tracking-tight text-white uppercase">PUJYA AGRITECH ADMIN</h2>
              <span className="bg-[#08779A]/20 text-[#08779A] border border-[#08779A]/40 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded">
                LIVE CMS
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">Content Management & Enquiry Hub</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onGoToSite}
            className="px-3.5 py-1.5 bg-[#122733] hover:bg-[#1A3748] text-slate-200 text-xs font-semibold rounded-lg border border-[#1E3E52] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-[#08779A]" />
            <span>View Public Website</span>
          </button>
          <button
            onClick={logoutAdmin}
            className="px-3.5 py-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-200 text-xs font-semibold rounded-lg border border-red-900/40 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex flex-1 min-h-[calc(100vh-61px)]">
        {/* Sidebar */}
        <aside className="w-64 bg-[#071015] border-r border-[#1A3343] p-4 flex flex-col justify-between shrink-0">
          <div className="space-y-1">
            <div className="px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#08779A]">
              SYSTEM MODULES
            </div>

            <nav className="space-y-1">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { id: 'products', label: 'Products Catalogue', icon: Package, count: products.length },
                { id: 'projects', label: 'Executed Projects', icon: FolderGit2, count: projects.length },
                { id: 'gallery', label: 'Media Library', icon: ImageIcon, count: gallery.length },
                { id: 'blog', label: 'Blog Articles', icon: FileText, count: blog.length },
                { id: 'about', label: 'About Us Content', icon: Building2 },
                { id: 'certificates', label: 'Certificates', icon: Award, count: certificates.length },
                { id: 'contact', label: 'Contact Info', icon: Phone },
                { id: 'enquiries', label: 'Customer Enquiries', icon: Mail, count: enquiries.length, badge: newEnquiries.length > 0 ? `${newEnquiries.length} NEW` : undefined },
                { id: 'settings', label: 'Global Settings', icon: Settings },
              ].map((item) => {
                const IconComp = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#08779A] text-white shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-[#122733]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <IconComp className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#08779A]'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge ? (
                      <span className="bg-emerald-500 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded-full animate-pulse">
                        {item.badge}
                      </span>
                    ) : item.count !== undefined ? (
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${isActive ? 'bg-white/20 text-white' : 'bg-[#122733] text-slate-400'}`}>
                        {item.count}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer Info */}
          <div className="pt-4 border-t border-[#1A3343] text-[11px] text-slate-500 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono">Storage Engine</span>
              <span className="text-emerald-400 font-bold">Active Sync</span>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Reset all website data to seed defaults? Custom changes will be cleared.')) {
                  resetToDefaults();
                  showSaveSuccess('Reset all data to defaults!');
                }
              }}
              className="w-full py-2 bg-[#122733] hover:bg-[#1A3748] text-slate-300 rounded text-[10px] font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#1E3E52]"
            >
              <RefreshCw className="w-3 h-3 text-[#08779A]" />
              <span>Reset Seed Defaults</span>
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 sm:p-8 bg-[#0B171E] overflow-y-auto">
          {/* ========================================================================= */}
          {/* TAB 1: DASHBOARD */}
          {/* ========================================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in max-w-6xl">
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">System Overview</h1>
                <p className="text-xs text-slate-400 mt-1">Live metrics and real-time statistics across all content modules.</p>
              </div>

              {/* Stats Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#11222C] border border-[#1E3A4B] p-5 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#08779A] font-bold">PRODUCTS</span>
                    <Package className="w-5 h-5 text-[#08779A]" />
                  </div>
                  <div className="text-3xl font-black text-white">{products.length}</div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                    <span className="text-emerald-400 font-bold">{pubProducts.length} Published</span>
                    <span>•</span>
                    <span>{draftProducts.length} Drafts</span>
                  </div>
                </div>

                <div className="bg-[#11222C] border border-[#1E3A4B] p-5 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#08779A] font-bold">PROJECTS</span>
                    <FolderGit2 className="w-5 h-5 text-[#08779A]" />
                  </div>
                  <div className="text-3xl font-black text-white">{projects.length}</div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                    <span className="text-emerald-400 font-bold">{pubProjects.length} Published</span>
                    <span>•</span>
                    <span>{draftProjects.length} Drafts</span>
                  </div>
                </div>

                <div className="bg-[#11222C] border border-[#1E3A4B] p-5 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#08779A] font-bold">MEDIA GALLERY</span>
                    <ImageIcon className="w-5 h-5 text-[#08779A]" />
                  </div>
                  <div className="text-3xl font-black text-white">{gallery.length}</div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                    <span>{gallery.filter(g => g.type === 'photo').length} Photos</span>
                    <span>•</span>
                    <span>{gallery.filter(g => g.type === 'video').length} Videos</span>
                  </div>
                </div>

                <div className="bg-[#11222C] border border-[#1E3A4B] p-5 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#08779A] font-bold">ENQUIRIES</span>
                    <Mail className="w-5 h-5 text-[#08779A]" />
                  </div>
                  <div className="text-3xl font-black text-white">{enquiries.length}</div>
                  <div className="flex items-center gap-2 text-[11px] font-mono">
                    {newEnquiries.length > 0 ? (
                      <span className="text-emerald-400 font-bold animate-pulse">{newEnquiries.length} New Pending</span>
                    ) : (
                      <span className="text-slate-400">All Responded</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Actions & Recent Enquiries */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Quick Actions (5 cols) */}
                <div className="lg:col-span-5 bg-[#11222C] border border-[#1E3A4B] rounded-xl p-5 space-y-4">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#08779A]">QUICK CONTENT ACTIONS</h3>
                  <div className="grid grid-cols-1 gap-2.5 text-xs">
                    <button
                      onClick={() => { setActiveTab('products'); handleOpenProductEdit(); }}
                      className="p-3 bg-[#172D3A] hover:bg-[#1E3A4B] rounded-lg border border-[#25495E] flex items-center justify-between font-semibold text-white transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Plus className="w-4 h-4 text-[#08779A]" />
                        <span>Add New Product</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>

                    <button
                      onClick={() => { setActiveTab('projects'); handleOpenProjectEdit(); }}
                      className="p-3 bg-[#172D3A] hover:bg-[#1E3A4B] rounded-lg border border-[#25495E] flex items-center justify-between font-semibold text-white transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Plus className="w-4 h-4 text-[#08779A]" />
                        <span>Add Executed Project</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>

                    <button
                      onClick={() => { setActiveTab('gallery'); handleOpenGalleryEdit(); }}
                      className="p-3 bg-[#172D3A] hover:bg-[#1E3A4B] rounded-lg border border-[#25495E] flex items-center justify-between font-semibold text-white transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Plus className="w-4 h-4 text-[#08779A]" />
                        <span>Upload Media Photo/Video</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>

                    <button
                      onClick={() => { setActiveTab('blog'); handleOpenBlogEdit(); }}
                      className="p-3 bg-[#172D3A] hover:bg-[#1E3A4B] rounded-lg border border-[#25495E] flex items-center justify-between font-semibold text-white transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Plus className="w-4 h-4 text-[#08779A]" />
                        <span>Write Blog Article</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                </div>

                {/* Recent Customer Enquiries (7 cols) */}
                <div className="lg:col-span-7 bg-[#11222C] border border-[#1E3A4B] rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#08779A]">RECENT CUSTOMER ENQUIRIES</h3>
                    <button onClick={() => setActiveTab('enquiries')} className="text-xs text-[#08779A] hover:underline font-semibold">
                      View All ({enquiries.length})
                    </button>
                  </div>

                  {enquiries.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-xs">No customer enquiries received yet.</div>
                  ) : (
                    <div className="space-y-2.5">
                      {enquiries.slice(0, 4).map((enq) => (
                        <div key={enq.id} className="p-3 bg-[#0A161D] border border-[#1E3A4B] rounded-lg flex items-center justify-between gap-3 text-xs">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white truncate">{enq.name}</span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#172D3A] text-emerald-400 border border-emerald-500/20">{enq.status}</span>
                            </div>
                            <p className="text-[11px] text-slate-400 truncate mt-0.5">{enq.interestedProduct} • {enq.mobile}</p>
                          </div>
                          <button
                            onClick={() => setViewingEnquiry(enq)}
                            className="px-3 py-1.5 bg-[#08779A]/20 hover:bg-[#08779A] text-[#08779A] hover:text-white rounded font-medium text-[11px] transition-colors shrink-0 cursor-pointer"
                          >
                            View
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: PRODUCTS MODULE */}
          {/* ========================================================================= */}
          {activeTab === 'products' && (
            <div className="space-y-6 animate-fade-in max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">Products Management</h1>
                  <p className="text-xs text-slate-400 mt-1">Manage all greenhouse, polyhouse, net house, and material listings for the live public site.</p>
                </div>
                <button
                  onClick={() => handleOpenProductEdit()}
                  className="px-4 py-2.5 bg-[#08779A] hover:bg-[#066380] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Filters Bar */}
              <div className="flex flex-col sm:flex-row gap-3 bg-[#11222C] p-3 rounded-xl border border-[#1E3A4B]">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search products by name, model or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-[#0A161D] border border-[#1E3A4B] rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#08779A]"
                  />
                </div>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 bg-[#0A161D] border border-[#1E3A4B] rounded-lg text-xs text-slate-300 focus:outline-none focus:border-[#08779A]"
                >
                  <option value="all">All Categories</option>
                  <option value="Greenhouse">Greenhouse</option>
                  <option value="Naturally Ventilated Poly House">Naturally Ventilated Poly House</option>
                  <option value="Fan & Pad Poly House">Fan & Pad Poly House</option>
                  <option value="Net House">Net House</option>
                  <option value="Turnkey Projects">Turnkey Projects</option>
                </select>
              </div>

              {/* Products List Table */}
              {products.length === 0 ? (
                <div className="bg-[#11222C] border border-[#1E3A4B] rounded-2xl p-12 text-center space-y-4">
                  <Package className="w-12 h-12 text-[#08779A] mx-auto opacity-50" />
                  <h3 className="text-base font-bold text-white">No products found</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">Create your first product to display it on the public Pujya Agritech catalogue.</p>
                  <button onClick={() => handleOpenProductEdit()} className="px-5 py-2.5 bg-[#08779A] text-white text-xs font-bold rounded-xl cursor-pointer">
                    + Add First Product
                  </button>
                </div>
              ) : (
                <div className="bg-[#11222C] border border-[#1E3A4B] rounded-xl overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#0A161D] text-slate-400 font-mono text-[10px] uppercase border-b border-[#1E3A4B]">
                        <tr>
                          <th className="py-3.5 px-4">Product Details</th>
                          <th className="py-3.5 px-4">Category</th>
                          <th className="py-3.5 px-4">Specs Summary</th>
                          <th className="py-3.5 px-4 text-center">Status</th>
                          <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1A3343] text-slate-300">
                        {products
                          .filter((p) => {
                            const matchQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.shortDesc?.toLowerCase().includes(searchQuery.toLowerCase());
                            const matchCat = categoryFilter === 'all' || p.category === categoryFilter;
                            return matchQuery && matchCat;
                          })
                          .map((prod) => (
                            <tr key={prod.id} className="hover:bg-[#142935] transition-colors">
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-3">
                                  <img src={prod.imageUrl} alt={prod.name} className="w-12 h-12 rounded object-cover border border-[#1E3A4B] shrink-0" />
                                  <div className="min-w-0">
                                    <div className="font-bold text-white truncate text-sm">{prod.name}</div>
                                    <div className="text-[11px] text-slate-400 font-mono">Model: {prod.model || 'NVPH'}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3.5 px-4 font-medium text-slate-300">
                                <span className="bg-[#172D3A] text-[#08779A] border border-[#08779A]/30 px-2 py-0.5 rounded text-[11px]">
                                  {prod.category}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-[11px] text-slate-400 max-w-xs truncate">
                                {Object.entries(prod.specifications || {}).slice(0, 2).map(([k, v]) => `${k}: ${v}`).join(' • ')}
                              </td>
                              <td className="py-3.5 px-4 text-center">
                                <button
                                  onClick={() => {
                                    updateProduct(prod.id, { published: !prod.published });
                                    showSaveSuccess(`Toggled status for "${prod.name}"`);
                                  }}
                                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                                    prod.published !== false
                                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                                      : 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                                  }`}
                                >
                                  {prod.published !== false ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                  <span>{prod.published !== false ? 'Published' : 'Draft'}</span>
                                </button>
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => setPreviewItem({ type: 'product', data: prod })}
                                    className="p-1.5 bg-[#172D3A] hover:bg-[#08779A] text-slate-300 hover:text-white rounded transition-colors"
                                    title="Live Preview"
                                  >
                                    <Globe className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleOpenProductEdit(prod)}
                                    className="p-1.5 bg-[#172D3A] hover:bg-[#08779A] text-slate-300 hover:text-white rounded transition-colors"
                                    title="Edit Product"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      duplicateProduct(prod.id);
                                      showSaveSuccess(`Duplicated "${prod.name}"`);
                                    }}
                                    className="p-1.5 bg-[#172D3A] hover:bg-[#08779A] text-slate-300 hover:text-white rounded transition-colors"
                                    title="Duplicate Product"
                                  >
                                    <Copy className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => setDeleteConfirm({ type: 'product', id: prod.id, title: prod.name })}
                                    className="p-1.5 bg-red-950/50 hover:bg-red-800 text-red-300 hover:text-white rounded transition-colors"
                                    title="Delete Product"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: PROJECTS MODULE */}
          {/* ========================================================================= */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-fade-in max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">Executed Projects Management</h1>
                  <p className="text-xs text-slate-400 mt-1">Manage project showcase installations displayed on the public website.</p>
                </div>
                <button
                  onClick={() => handleOpenProjectEdit()}
                  className="px-4 py-2.5 bg-[#08779A] hover:bg-[#066380] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Project</span>
                </button>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-[#11222C] border border-[#1E3A4B] rounded-xl overflow-hidden p-4 space-y-3 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="relative h-44 rounded-lg overflow-hidden border border-[#1E3A4B]">
                        <img src={proj.imageUrl} alt={proj.name} className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 flex items-center gap-1.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${proj.published !== false ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/30' : 'bg-amber-950/90 text-amber-300'}`}>
                            {proj.published !== false ? 'Published' : 'Draft'}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-[#08779A] font-bold uppercase">
                          <MapPin className="w-3 h-3" />
                          <span>{proj.location}</span>
                          <span>•</span>
                          <span>{proj.projectType}</span>
                        </div>
                        <h3 className="text-sm font-bold text-white mt-1">{proj.name}</h3>
                        <p className="text-xs text-slate-400 line-clamp-2 mt-1">{proj.description}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#1A3343] flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-400 font-mono">Completed: {proj.completionDate}</span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleOpenProjectEdit(proj)} className="px-3 py-1.5 bg-[#172D3A] hover:bg-[#08779A] text-white rounded text-xs font-semibold cursor-pointer">
                          Edit
                        </button>
                        <button onClick={() => setDeleteConfirm({ type: 'project', id: proj.id, title: proj.name })} className="px-2.5 py-1.5 bg-red-950/50 hover:bg-red-800 text-red-300 rounded cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: GALLERY MEDIA MODULE */}
          {/* ========================================================================= */}
          {activeTab === 'gallery' && (
            <div className="space-y-6 animate-fade-in max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">Media Library Management</h1>
                  <p className="text-xs text-slate-400 mt-1">Upload and manage photo & video documentation for the public gallery.</p>
                </div>
                <button
                  onClick={() => handleOpenGalleryEdit()}
                  className="px-4 py-2.5 bg-[#08779A] hover:bg-[#066380] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload Media Item</span>
                </button>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {gallery.map((item) => (
                  <div key={item.id} className="bg-[#11222C] border border-[#1E3A4B] rounded-xl overflow-hidden p-3 space-y-3">
                    <div className="relative h-40 rounded-lg overflow-hidden border border-[#1E3A4B] bg-black">
                      <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                      {item.type === 'video' && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-[#08779A] flex items-center justify-center text-white">
                            <Play className="w-5 h-5 fill-white" />
                          </div>
                        </div>
                      )}
                      <span className="absolute top-2 left-2 bg-[#0A161D]/80 text-[10px] font-mono text-white px-2 py-0.5 rounded border border-white/20">
                        {item.type.toUpperCase()}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.description || item.category}</p>
                    </div>

                    <div className="pt-2 border-t border-[#1A3343] flex items-center justify-between text-xs">
                      <button
                        onClick={() => {
                          updateGalleryItem(item.id, { published: !item.published });
                          showSaveSuccess(`Toggled status for "${item.title}"`);
                        }}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.published !== false ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'}`}
                      >
                        {item.published !== false ? 'Published' : 'Draft'}
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button onClick={() => handleOpenGalleryEdit(item)} className="p-1.5 bg-[#172D3A] hover:bg-[#08779A] text-white rounded cursor-pointer">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setDeleteConfirm({ type: 'gallery', id: item.id, title: item.title })} className="p-1.5 bg-red-950/50 hover:bg-red-800 text-red-300 rounded cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: BLOG MODULE */}
          {/* ========================================================================= */}
          {activeTab === 'blog' && (
            <div className="space-y-6 animate-fade-in max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">Blog Articles CMS</h1>
                  <p className="text-xs text-slate-400 mt-1">Publish protected cultivation technical guides and news articles.</p>
                </div>
                <button
                  onClick={() => handleOpenBlogEdit()}
                  className="px-4 py-2.5 bg-[#08779A] hover:bg-[#066380] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Write New Article</span>
                </button>
              </div>

              {/* Articles Table */}
              <div className="bg-[#11222C] border border-[#1E3A4B] rounded-xl overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0A161D] text-slate-400 font-mono text-[10px] uppercase border-b border-[#1E3A4B]">
                    <tr>
                      <th className="py-3.5 px-4">Article</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4 text-center">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1A3343] text-slate-300">
                    {blog.map((post) => (
                      <tr key={post.id} className="hover:bg-[#142935] transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img src={post.coverImage} alt={post.title} className="w-12 h-12 rounded object-cover border border-[#1E3A4B] shrink-0" />
                            <div className="min-w-0">
                              <div className="font-bold text-white truncate text-sm">{post.title}</div>
                              <div className="text-[10px] text-slate-400 font-mono">Slug: /{post.slug}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-300">{post.category}</td>
                        <td className="py-3.5 px-4 text-slate-400 font-mono">{post.date}</td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => {
                              updateBlogPost(post.id, { published: !post.published });
                              showSaveSuccess(`Toggled status for "${post.title}"`);
                            }}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer ${post.published !== false ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'}`}
                          >
                            {post.published !== false ? 'Published' : 'Draft'}
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => setPreviewItem({ type: 'blog', data: post })} className="p-1.5 bg-[#172D3A] hover:bg-[#08779A] text-white rounded">
                              <Globe className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => handleOpenBlogEdit(post)} className="p-1.5 bg-[#172D3A] hover:bg-[#08779A] text-white rounded">
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => setDeleteConfirm({ type: 'blog', id: post.id, title: post.title })} className="p-1.5 bg-red-950/50 hover:bg-red-800 text-red-300 rounded">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: ABOUT US EDIT MODULE */}
          {/* ========================================================================= */}
          {activeTab === 'about' && (
            <div className="space-y-6 animate-fade-in max-w-4xl">
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">About Us Content Editor</h1>
                <p className="text-xs text-slate-400 mt-1">Edit the corporate profile and foundation stories on the public About page.</p>
              </div>

              <div className="bg-[#11222C] border border-[#1E3A4B] p-6 rounded-2xl space-y-5">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">Hero Main Heading</label>
                  <input
                    type="text"
                    value={aboutUs.mainHeading || ''}
                    onChange={(e) => updateAboutUs({ ...aboutUs, mainHeading: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-xs text-white focus:outline-none focus:border-[#08779A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">Company Overview / Introduction</label>
                  <textarea
                    rows={4}
                    value={aboutUs.companyIntro || ''}
                    onChange={(e) => updateAboutUs({ ...aboutUs, companyIntro: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-xs text-white focus:outline-none focus:border-[#08779A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">Establishment & Background Story</label>
                  <textarea
                    rows={4}
                    value={aboutUs.establishmentStory || ''}
                    onChange={(e) => updateAboutUs({ ...aboutUs, establishmentStory: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-xs text-white focus:outline-none focus:border-[#08779A]"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => showSaveSuccess('About Us content saved successfully!')}
                    className="px-6 py-3 bg-[#08779A] hover:bg-[#066380] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-lg cursor-pointer flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save About Us Changes</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 7: CERTIFICATES MODULE */}
          {/* ========================================================================= */}
          {activeTab === 'certificates' && (
            <div className="space-y-6 animate-fade-in max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">Certifications & Empanelment</h1>
                  <p className="text-xs text-slate-400 mt-1">Manage ISO, Horticulture Empanelment, and MSME certificates.</p>
                </div>
                <button onClick={() => handleOpenCertEdit()} className="px-4 py-2 bg-[#08779A] text-white text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer">
                  <Plus className="w-4 h-4" /> Add Certificate
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className="bg-[#11222C] border border-[#1E3A4B] p-4 rounded-xl flex items-center gap-4">
                    <img src={cert.imageUrl} alt={cert.title} className="w-16 h-16 rounded object-cover border border-[#1E3A4B] shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{cert.title}</h4>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{cert.issuingOrganization} ({cert.issueYear})</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button onClick={() => handleOpenCertEdit(cert)} className="text-[10px] text-[#08779A] hover:underline font-bold">Edit</button>
                        <span>•</span>
                        <button onClick={() => setDeleteConfirm({ type: 'cert', id: cert.id, title: cert.title })} className="text-[10px] text-red-400 hover:underline">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 8: CONTACT INFORMATION MODULE */}
          {/* ========================================================================= */}
          {activeTab === 'contact' && (
            <div className="space-y-6 animate-fade-in max-w-4xl">
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">Contact Information & Social Links</h1>
                <p className="text-xs text-slate-400 mt-1">Updates made here immediately sync to the public Contact page, Footer, and Header.</p>
              </div>

              <div className="bg-[#11222C] border border-[#1E3A4B] p-6 rounded-2xl space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">Registered Office Address</label>
                  <input
                    type="text"
                    value={contactInfo.officeAddress || ''}
                    onChange={(e) => updateContactInfo({ ...contactInfo, officeAddress: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">Primary Phone Number</label>
                    <input
                      type="text"
                      value={contactInfo.mobile || ''}
                      onChange={(e) => updateContactInfo({ ...contactInfo, mobile: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">Secondary Phone Number</label>
                    <input
                      type="text"
                      value={contactInfo.phone2 || ''}
                      onChange={(e) => updateContactInfo({ ...contactInfo, phone2: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">Contact Email Address</label>
                    <input
                      type="email"
                      value={contactInfo.email || ''}
                      onChange={(e) => updateContactInfo({ ...contactInfo, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">WhatsApp Mobile Number</label>
                    <input
                      type="text"
                      value={contactInfo.whatsapp || ''}
                      onChange={(e) => updateContactInfo({ ...contactInfo, whatsapp: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-xs text-white"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => showSaveSuccess('Contact details saved & synced to live website!')}
                    className="px-6 py-3 bg-[#08779A] hover:bg-[#066380] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-lg cursor-pointer flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Contact Details</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 9: ENQUIRIES MODULE */}
          {/* ========================================================================= */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6 animate-fade-in max-w-6xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">Customer Enquiries & Lead Hub</h1>
                  <p className="text-xs text-slate-400 mt-1">Live inquiries submitted through the website consultation form.</p>
                </div>
              </div>

              {/* Status Filter */}
              <div className="flex gap-2">
                {['all', 'New', 'Contacted', 'In Progress', 'Converted', 'Closed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setEnquiryStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase font-bold transition-all cursor-pointer ${
                      enquiryStatusFilter === status ? 'bg-[#08779A] text-white' : 'bg-[#11222C] text-slate-400 border border-[#1E3A4B]'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {/* Enquiries Table */}
              <div className="bg-[#11222C] border border-[#1E3A4B] rounded-xl overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0A161D] text-slate-400 font-mono text-[10px] uppercase border-b border-[#1E3A4B]">
                    <tr>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4">Customer Name</th>
                      <th className="py-3.5 px-4">Contact Phone</th>
                      <th className="py-3.5 px-4">Requirement</th>
                      <th className="py-3.5 px-4 text-center">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1A3343] text-slate-300">
                    {enquiries
                      .filter((e) => enquiryStatusFilter === 'all' || e.status === enquiryStatusFilter)
                      .map((enq) => (
                        <tr key={enq.id} className="hover:bg-[#142935] transition-colors">
                          <td className="py-3.5 px-4 font-mono text-slate-400">{enq.date}</td>
                          <td className="py-3.5 px-4 font-bold text-white">{enq.name}</td>
                          <td className="py-3.5 px-4 font-mono">{enq.mobile}</td>
                          <td className="py-3.5 px-4 text-slate-300">{enq.interestedProduct}</td>
                          <td className="py-3.5 px-4 text-center">
                            <select
                              value={enq.status}
                              onChange={(e) => {
                                updateEnquiryStatus(enq.id, e.target.value as any);
                                showSaveSuccess(`Updated status to "${e.target.value}"`);
                              }}
                              className="px-2 py-1 bg-[#0A161D] border border-[#1E3A4B] rounded text-[11px] text-emerald-400 font-semibold focus:outline-none"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Converted">Converted</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => setViewingEnquiry(enq)} className="px-3 py-1 bg-[#08779A] text-white rounded text-xs font-bold">
                                View
                              </button>
                              <button onClick={() => setDeleteConfirm({ type: 'enquiry', id: enq.id, title: `Enquiry from ${enq.name}` })} className="p-1 bg-red-950 text-red-300 rounded">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 10: SETTINGS MODULE */}
          {/* ========================================================================= */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fade-in max-w-4xl">
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">CMS & Website Settings</h1>
                <p className="text-xs text-slate-400 mt-1">Global site metadata and administrative settings.</p>
              </div>

              <div className="bg-[#11222C] border border-[#1E3A4B] p-6 rounded-2xl space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">Visible Brand Name</label>
                  <input
                    type="text"
                    value={siteSettings.companyName || ''}
                    onChange={(e) => updateSiteSettings({ ...siteSettings, companyName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">Copyright Footer Text</label>
                  <input
                    type="text"
                    value={siteSettings.copyrightText || ''}
                    onChange={(e) => updateSiteSettings({ ...siteSettings, copyrightText: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-xs text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => showSaveSuccess('Settings saved successfully!')}
                    className="px-6 py-3 bg-[#08779A] hover:bg-[#066380] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-lg cursor-pointer flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Settings</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: PRODUCT ADD / EDIT MODAL */}
      {/* ========================================================================= */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#11222C] border border-[#1E3A4B] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl animate-fade-in my-8">
            <div className="flex items-center justify-between border-b border-[#1E3A4B] pb-4">
              <h3 className="text-lg font-black text-white">
                {editingProduct.id ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={() => setEditingProduct(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">Model Code</label>
                  <input
                    type="text"
                    value={editingProduct.model || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, model: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">Category</label>
                <select
                  value={editingProduct.category || 'Naturally Ventilated Poly House'}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                  className="w-full px-4 py-2.5 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-xs text-white"
                >
                  <option value="Greenhouse">Greenhouse</option>
                  <option value="Naturally Ventilated Poly House">Naturally Ventilated Poly House</option>
                  <option value="Fan & Pad Poly House">Fan & Pad Poly House</option>
                  <option value="Net House">Net House</option>
                  <option value="Turnkey Projects">Turnkey Projects</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">Short Description</label>
                <input
                  type="text"
                  value={editingProduct.shortDesc || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, shortDesc: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">Full Overview Description</label>
                <textarea
                  rows={4}
                  value={editingProduct.fullDesc || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, fullDesc: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-xs text-white"
                />
              </div>

              {/* TECHNICAL SPECIFICATIONS ROWS EDITOR */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase text-[#08779A] font-bold">STRUCTURED TECHNICAL SPECIFICATIONS TABLE</label>
                  <button
                    type="button"
                    onClick={() => setSpecRows([...specRows, { key: '', value: '' }])}
                    className="text-xs text-[#08779A] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Spec Row
                  </button>
                </div>

                <div className="space-y-2">
                  {specRows.map((row, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Specification (e.g. Gutter Height)"
                        value={row.key}
                        onChange={(e) => {
                          const updated = [...specRows];
                          updated[idx].key = e.target.value;
                          setSpecRows(updated);
                        }}
                        className="w-1/2 px-3 py-2 bg-[#0A161D] border border-[#1E3A4B] rounded text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Details (e.g. 4m / 4.5m)"
                        value={row.value}
                        onChange={(e) => {
                          const updated = [...specRows];
                          updated[idx].value = e.target.value;
                          setSpecRows(updated);
                        }}
                        className="w-1/2 px-3 py-2 bg-[#0A161D] border border-[#1E3A4B] rounded text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={() => setSpecRows(specRows.filter((_, i) => i !== idx))}
                        className="p-2 bg-red-950/50 hover:bg-red-800 text-red-300 rounded shrink-0 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image URL & Preview */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">Main Image URL</label>
                <div className="flex gap-3 items-center">
                  <input
                    type="text"
                    value={editingProduct.imageUrl || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                    className="flex-1 px-4 py-2.5 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-xs text-white"
                  />
                  <img src={editingProduct.imageUrl} alt="preview" className="w-10 h-10 rounded border border-[#1E3A4B] object-cover shrink-0" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">
                  Product Gallery Photos (Enter 5 to 8 Image URLs, one per line)
                </label>
                <textarea
                  rows={4}
                  placeholder="/gallery/site-gallery-1.jpg&#10;/gallery/site-gallery-2.jpg&#10;/gallery/site-gallery-3.jpg"
                  value={(editingProduct.galleryImages || []).join('\n')}
                  onChange={(e) => {
                    const urls = e.target.value.split('\n').map((u) => u.trim()).filter(Boolean);
                    setEditingProduct({ ...editingProduct, galleryImages: urls });
                  }}
                  className="w-full px-4 py-2 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">
                  Product Structure Video URL (MP4 / Video Link)
                </label>
                <input
                  type="text"
                  placeholder="/hero-banner.mp4"
                  value={(editingProduct as any).videoUrl || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, videoUrl: e.target.value } as any)}
                  className="w-full px-4 py-2 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-xs text-white font-mono"
                />
              </div>

              {/* Checkboxes */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.published !== false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, published: e.target.checked })}
                    className="w-4 h-4 accent-[#08779A]"
                  />
                  <span>Published on Website</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.featured === true}
                    onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                    className="w-4 h-4 accent-[#08779A]"
                  />
                  <span>Featured Product</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#1E3A4B] flex justify-end gap-3">
                <button type="button" onClick={() => setEditingProduct(null)} className="px-4 py-2.5 bg-[#172D3A] text-slate-300 rounded-xl text-xs font-bold">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 bg-[#08779A] text-white rounded-xl text-xs font-bold cursor-pointer">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: PROJECT ADD / EDIT MODAL */}
      {/* ========================================================================= */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#11222C] border border-[#1E3A4B] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl animate-fade-in my-8">
            <div className="flex items-center justify-between border-b border-[#1E3A4B] pb-4">
              <h3 className="text-lg font-black text-white">{editingProject.id ? 'Edit Project' : 'Add New Project'}</h3>
              <button onClick={() => setEditingProject(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">Project Name *</label>
                <input type="text" required value={editingProject.name || ''} onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })} className="w-full px-4 py-2 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-xs text-white" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">Location</label>
                  <input type="text" value={editingProject.location || ''} onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })} className="w-full px-4 py-2 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-xs text-white" />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">Project Type</label>
                  <input type="text" value={editingProject.projectType || ''} onChange={(e) => setEditingProject({ ...editingProject, projectType: e.target.value })} className="w-full px-4 py-2 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-xs text-white" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">Description</label>
                <textarea rows={3} value={editingProject.description || ''} onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })} className="w-full px-4 py-2 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-xs text-white" />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">Main Image URL</label>
                <input type="text" value={editingProject.imageUrl || ''} onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })} className="w-full px-4 py-2 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-xs text-white" />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">
                  Gallery Photos (Enter 5 to 8 Image URLs, one per line)
                </label>
                <textarea
                  rows={4}
                  placeholder="/gallery/site-gallery-1.jpg&#10;/gallery/site-gallery-2.jpg&#10;/gallery/site-gallery-3.jpg"
                  value={(editingProject.galleryImages || []).join('\n')}
                  onChange={(e) => {
                    const urls = e.target.value.split('\n').map((u) => u.trim()).filter(Boolean);
                    setEditingProject({ ...editingProject, galleryImages: urls });
                  }}
                  className="w-full px-4 py-2 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">
                  Execution Video URL (MP4 / Video Link)
                </label>
                <input
                  type="text"
                  placeholder="/hero-banner.mp4"
                  value={(editingProject as any).videoUrl || (editingProject.videos && editingProject.videos[0]) || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, videos: [e.target.value], videoUrl: e.target.value } as any)}
                  className="w-full px-4 py-2 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-xs text-white font-mono"
                />
              </div>

              <div className="pt-4 border-t border-[#1E3A4B] flex justify-end gap-3">
                <button type="button" onClick={() => setEditingProject(null)} className="px-4 py-2 bg-[#172D3A] text-slate-300 rounded-xl text-xs font-bold">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-[#08779A] text-white rounded-xl text-xs font-bold cursor-pointer">Save Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: GALLERY MEDIA ADD / EDIT MODAL */}
      {/* ========================================================================= */}
      {editingGallery && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#11222C] border border-[#1E3A4B] rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-[#1E3A4B] pb-3">
              <h3 className="text-base font-black text-white">{editingGallery.id ? 'Edit Media Item' : 'Upload Media Item'}</h3>
              <button onClick={() => setEditingGallery(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSaveGallery} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">Media Type</label>
                <select value={editingGallery.type || 'photo'} onChange={(e) => setEditingGallery({ ...editingGallery, type: e.target.value as any })} className="w-full px-3 py-2 bg-[#0A161D] border border-[#1E3A4B] rounded-lg text-xs text-white">
                  <option value="photo">Photo Image</option>
                  <option value="video">Video Embed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">Title *</label>
                <input type="text" required value={editingGallery.title || ''} onChange={(e) => setEditingGallery({ ...editingGallery, title: e.target.value })} className="w-full px-3 py-2 bg-[#0A161D] border border-[#1E3A4B] rounded-lg text-xs text-white" />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">Image URL</label>
                <input type="text" value={editingGallery.url || ''} onChange={(e) => setEditingGallery({ ...editingGallery, url: e.target.value })} className="w-full px-3 py-2 bg-[#0A161D] border border-[#1E3A4B] rounded-lg text-xs text-white" />
              </div>

              {editingGallery.type === 'video' && (
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">Video Embed URL (YouTube/Vimeo)</label>
                  <input type="text" value={editingGallery.videoEmbedUrl || ''} onChange={(e) => setEditingGallery({ ...editingGallery, videoEmbedUrl: e.target.value })} className="w-full px-3 py-2 bg-[#0A161D] border border-[#1E3A4B] rounded-lg text-xs text-white" />
                </div>
              )}

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">Caption / Description</label>
                <input type="text" value={editingGallery.description || ''} onChange={(e) => setEditingGallery({ ...editingGallery, description: e.target.value })} className="w-full px-3 py-2 bg-[#0A161D] border border-[#1E3A4B] rounded-lg text-xs text-white" />
              </div>

              <div className="pt-3 border-t border-[#1E3A4B] flex justify-end gap-2">
                <button type="button" onClick={() => setEditingGallery(null)} className="px-3 py-2 bg-[#172D3A] text-slate-300 rounded text-xs font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#08779A] text-white rounded text-xs font-bold cursor-pointer">Save Media</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: BLOG ADD / EDIT MODAL */}
      {/* ========================================================================= */}
      {editingBlog && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#11222C] border border-[#1E3A4B] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl animate-fade-in my-8">
            <div className="flex items-center justify-between border-b border-[#1E3A4B] pb-3">
              <h3 className="text-lg font-black text-white">{editingBlog.id ? 'Edit Article' : 'Write New Article'}</h3>
              <button onClick={() => setEditingBlog(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">Article Title *</label>
                <input type="text" required value={editingBlog.title || ''} onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })} className="w-full px-4 py-2.5 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-xs text-white" />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">Excerpt / Summary</label>
                <textarea rows={2} value={editingBlog.excerpt || ''} onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })} className="w-full px-4 py-2 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-xs text-white" />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">Full Article Content</label>
                <textarea rows={6} value={editingBlog.content || ''} onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })} className="w-full px-4 py-2 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-xs text-white font-mono" />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1">Cover Image URL</label>
                <input type="text" value={editingBlog.coverImage || ''} onChange={(e) => setEditingBlog({ ...editingBlog, coverImage: e.target.value })} className="w-full px-4 py-2 bg-[#0A161D] border border-[#1E3A4B] rounded-xl text-xs text-white" />
              </div>

              <div className="pt-4 border-t border-[#1E3A4B] flex justify-end gap-3">
                <button type="button" onClick={() => setEditingBlog(null)} className="px-4 py-2 bg-[#172D3A] text-slate-300 rounded-xl text-xs font-bold">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-[#08779A] text-white rounded-xl text-xs font-bold cursor-pointer">Publish Article</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: CERTIFICATE EDIT MODAL */}
      {/* ========================================================================= */}
      {editingCert && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#11222C] border border-[#1E3A4B] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-black text-white">{editingCert.id ? 'Edit Certificate' : 'Add Certificate'}</h3>
            <form onSubmit={handleSaveCert} className="space-y-3">
              <input type="text" placeholder="Title" required value={editingCert.title || ''} onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })} className="w-full px-3 py-2 bg-[#0A161D] border border-[#1E3A4B] rounded text-xs text-white" />
              <input type="text" placeholder="Issuing Organization" value={editingCert.issuingOrganization || ''} onChange={(e) => setEditingCert({ ...editingCert, issuingOrganization: e.target.value })} className="w-full px-3 py-2 bg-[#0A161D] border border-[#1E3A4B] rounded text-xs text-white" />
              <input type="text" placeholder="Year" value={editingCert.issueYear || ''} onChange={(e) => setEditingCert({ ...editingCert, issueYear: e.target.value })} className="w-full px-3 py-2 bg-[#0A161D] border border-[#1E3A4B] rounded text-xs text-white" />
              <input type="text" placeholder="Image URL" value={editingCert.imageUrl || ''} onChange={(e) => setEditingCert({ ...editingCert, imageUrl: e.target.value })} className="w-full px-3 py-2 bg-[#0A161D] border border-[#1E3A4B] rounded text-xs text-white" />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditingCert(null)} className="px-3 py-1.5 bg-[#172D3A] text-slate-300 rounded text-xs">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-[#08779A] text-white rounded text-xs font-bold cursor-pointer">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 6: ENQUIRY VIEW MODAL */}
      {/* ========================================================================= */}
      {viewingEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#11222C] border border-[#1E3A4B] rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-[#1E3A4B] pb-3">
              <h3 className="text-sm font-black text-white">Customer Enquiry Details</h3>
              <button onClick={() => setViewingEnquiry(null)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-2 text-slate-300">
              <p><strong className="text-white">Customer Name:</strong> {viewingEnquiry.name}</p>
              <p><strong className="text-white">Mobile:</strong> {viewingEnquiry.mobile}</p>
              <p><strong className="text-white">Email:</strong> {viewingEnquiry.email || 'N/A'}</p>
              <p><strong className="text-white">Requirement:</strong> {viewingEnquiry.interestedProduct}</p>
              {viewingEnquiry.location && <p><strong className="text-white">Location:</strong> {viewingEnquiry.location}</p>}
              {viewingEnquiry.areaSqM && <p><strong className="text-white">Proposed Area:</strong> {viewingEnquiry.areaSqM} Sq. Meters</p>}
              <p><strong className="text-white">Date Submitted:</strong> {viewingEnquiry.date}</p>
              <div className="pt-2">
                <strong className="text-white block mb-1">Message / Inquiry Notes:</strong>
                <div className="p-3 bg-[#0A161D] border border-[#1E3A4B] rounded text-slate-300 leading-relaxed">
                  {viewingEnquiry.message || 'No additional notes provided.'}
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-[#1E3A4B] flex justify-end">
              <button onClick={() => setViewingEnquiry(null)} className="px-4 py-2 bg-[#08779A] text-white rounded text-xs font-bold cursor-pointer">Close Panel</button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 7: DELETE CONFIRMATION DIALOG */}
      {/* ========================================================================= */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="bg-[#11222C] border border-red-900/40 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 bg-red-950/80 border border-red-500/30 text-red-400 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Confirm Deletion</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to delete <strong className="text-white">"{deleteConfirm.title}"</strong>?
              This action will remove it from the live Pujya Agritech website.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 bg-[#172D3A] text-slate-300 rounded-xl text-xs font-bold">
                Cancel
              </button>
              <button onClick={handleConfirmDelete} className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold cursor-pointer shadow-lg">
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 8: LIVE PREVIEW MODAL */}
      {/* ========================================================================= */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col p-4 sm:p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto w-full bg-white text-[#10232B] rounded-2xl overflow-hidden shadow-2xl my-auto p-6 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                <span className="bg-[#08779A] text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase">LIVE PREVIEW</span>
                <span className="text-xs text-slate-500">How it appears to website visitors</span>
              </div>
              <button onClick={() => setPreviewItem(null)} className="p-1 text-slate-500 hover:text-slate-900"><X className="w-6 h-6" /></button>
            </div>

            {previewItem.type === 'product' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-[#10232B]">{previewItem.data.name}</h2>
                <div className="h-64 rounded-xl overflow-hidden bg-slate-100"><img src={previewItem.data.imageUrl} alt="" className="w-full h-full object-cover" /></div>
                <p className="text-xs text-slate-600">{previewItem.data.fullDesc || previewItem.data.shortDesc}</p>
                {previewItem.data.specifications && (
                  <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-200">
                    <h4 className="text-xs font-mono uppercase text-[#08779A] font-bold">Technical Specifications</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(previewItem.data.specifications).map(([k, v]) => (
                        <div key={k} className="p-2 bg-white rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 block">{k}</span>
                          <span className="font-bold text-slate-800">{String(v)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {previewItem.type === 'blog' && (
              <div className="space-y-4">
                <span className="text-xs font-mono text-[#08779A] font-bold uppercase">{previewItem.data.category} • {previewItem.data.date}</span>
                <h2 className="text-2xl font-bold text-[#10232B]">{previewItem.data.title}</h2>
                <div className="h-60 rounded-xl overflow-hidden bg-slate-100"><img src={previewItem.data.coverImage} alt="" className="w-full h-full object-cover" /></div>
                <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">{previewItem.data.content}</div>
              </div>
            )}

            <div className="pt-4 border-t flex justify-end">
              <button onClick={() => setPreviewItem(null)} className="px-5 py-2 bg-[#08779A] text-white rounded-xl text-xs font-bold cursor-pointer">Close Preview</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
