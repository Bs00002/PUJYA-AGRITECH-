import React, { useState, useEffect } from 'react';
import { BLOG_POSTS } from '../data/blog';
import { BlogPost } from '../types';
import { ArrowRight, ChevronLeft, Calendar, Clock, User, Phone, CheckCircle2 } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface BlogViewProps {
  onOpenConsultationModal?: (itemName?: string) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onOpenConsultationModal }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const liveBlogPosts: BlogPost[] = BLOG_POSTS;

  useEffect(() => {
    if (selectedPost) {
      document.title = selectedPost.seoTitle || `${selectedPost.title} | Pujya Agritech`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.title = 'Protected Cultivation Articles & Technical Guides | Pujya Agritech';
    }
  }, [selectedPost]);

  // Helper to render formatted article paragraphs with headings & bullets
  const renderArticleContent = (content: string) => {
    const paragraphs = content.split('\n\n').filter(Boolean);

    return paragraphs.map((para, index) => {
      // Check if paragraph starts with a section number like "1. ", "2. ", etc.
      const isSectionHeading = /^\d+\.\s+[A-Za-z]/.test(para);

      if (isSectionHeading) {
        const lines = para.split('\n');
        const heading = lines[0];
        const rest = lines.slice(1);

        return (
          <div key={index} className="space-y-3 pt-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#10232B] tracking-tight border-b border-gray-100 pb-2">
              {heading}
            </h2>
            {rest.length > 0 && (
              <div className="space-y-2 text-[#3A4B53] text-[15px] sm:text-base leading-relaxed">
                {rest.map((line, lIdx) => {
                  if (line.startsWith('•')) {
                    const parts = line.replace('•', '').split(':');
                    return (
                      <div key={lIdx} className="flex items-start gap-2.5 pl-1 py-1">
                        <CheckCircle2 className="w-4 h-4 text-[#2F7445] shrink-0 mt-1" />
                        <div>
                          {parts.length > 1 ? (
                            <span>
                              <strong className="text-[#10232B] font-semibold">{parts[0].trim()}:</strong>
                              <span> {parts.slice(1).join(':').trim()}</span>
                            </span>
                          ) : (
                            <span>{line.replace('•', '').trim()}</span>
                          )}
                        </div>
                      </div>
                    );
                  }
                  return <p key={lIdx}>{line}</p>;
                })}
              </div>
            )}
          </div>
        );
      }

      // Check if paragraph is a bullet list
      if (para.includes('•')) {
        const lines = para.split('\n');
        return (
          <div key={index} className="space-y-2 text-[#3A4B53] text-[15px] sm:text-base leading-relaxed pl-1">
            {lines.map((line, lIdx) => {
              if (line.startsWith('•')) {
                const parts = line.replace('•', '').split(':');
                return (
                  <div key={lIdx} className="flex items-start gap-2.5 py-1">
                    <CheckCircle2 className="w-4 h-4 text-[#2F7445] shrink-0 mt-1" />
                    <div>
                      {parts.length > 1 ? (
                        <span>
                          <strong className="text-[#10232B] font-semibold">{parts[0].trim()}:</strong>
                          <span> {parts.slice(1).join(':').trim()}</span>
                        </span>
                      ) : (
                        <span>{line.replace('•', '').trim()}</span>
                      )}
                    </div>
                  </div>
                );
              }
              return <p key={lIdx}>{line}</p>;
            })}
          </div>
        );
      }

      return (
        <p key={index} className="text-[#3A4B53] text-[15px] sm:text-base leading-relaxed">
          {para}
        </p>
      );
    });
  };

  if (selectedPost) {
    return (
      <article className="bg-[#FAFBF9] min-h-screen py-10 sm:py-16 text-[#10232B] font-sans">
        <div className="max-w-[880px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Back button */}
          <button
            onClick={() => setSelectedPost(null)}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#006B8F] hover:text-[#004F6A] transition-colors cursor-pointer group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>BACK TO ALL TECHNICAL GUIDES</span>
          </button>

          {/* Article Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
              <span className="font-bold uppercase tracking-wider text-[#2F7445] bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                {selectedPost.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                {selectedPost.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                {selectedPost.readTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-gray-400" />
                {selectedPost.author}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#10232B] leading-tight">
              {selectedPost.title}
            </h1>
          </div>

          {/* Featured Image */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm aspect-[16/9] w-full bg-gray-100">
            <img
              src={selectedPost.featuredImage}
              alt={selectedPost.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Body */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200/80 shadow-2xs space-y-6">
            {renderArticleContent(selectedPost.content)}
          </div>

          {/* Consultation CTA Card */}
          <div className="bg-gradient-to-br from-[#10232B] to-[#16333F] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-bold">
                Planning a Commercial {selectedPost.category} Project?
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
                Get an end-to-end turnkey engineering proposal, detailed bill of quantities (BOQ), and complete MIDH / NHB subsidy guidance from Pujya Agritech experts.
              </p>
            </div>
            <button
              onClick={() => {
                if (onOpenConsultationModal) {
                  onOpenConsultationModal(selectedPost.title);
                } else {
                  window.location.href = 'https://wa.me/919974431960?text=Hello%20Pujya%20Agritech,%20I%20am%20interested%20in%20a%20turnkey%20project%20consultation.';
                }
              }}
              className="bg-[#2F7445] hover:bg-[#256038] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-sm shrink-0 cursor-pointer flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Request Consultation</span>
            </button>
          </div>

          {/* Back Footer */}
          <div className="pt-4 flex justify-between items-center">
            <button
              onClick={() => setSelectedPost(null)}
              className="px-5 py-2.5 bg-white hover:bg-gray-100 text-[#10232B] text-xs sm:text-sm font-semibold rounded-xl border border-gray-200 transition-colors cursor-pointer"
            >
              ← Back to All Articles
            </button>
          </div>

        </div>
      </article>
    );
  }

  return (
    <div className="bg-[#FAFBF9] min-h-screen py-12 sm:py-16 text-[#10232B] font-sans">
      <div className="max-w-[1360px] w-[94%] mx-auto space-y-10 sm:space-y-12">
        
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#2F7445]">
            TECHNICAL GUIDES & AGRONOMY
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#10232B]">
            Protected Cultivation Articles
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            In-depth engineering analyses, structural standards (IS 14462), climate control physics, and commercial horticulture insights from the technical team at Pujya Agritech.
          </p>
        </div>

        {/* Articles Grid: 3 columns on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {liveBlogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden flex flex-col justify-between group cursor-pointer hover:border-[#2F7445] hover:shadow-md transition-all duration-300"
              onClick={() => setSelectedPost(post)}
            >
              <div>
                {/* Thumbnail Image */}
                <div className="overflow-hidden aspect-[16/10] bg-gray-100 relative">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-xs border border-emerald-200">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Article Info */}
                <div className="p-5 sm:p-6 space-y-2.5">
                  <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#10232B] group-hover:text-[#2F7445] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-gray-600 line-clamp-3 leading-relaxed font-normal">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Read Link */}
              <div className="px-5 sm:px-6 py-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#2F7445]">
                <span className="flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                  <span>Read full guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-[11px] text-gray-400 font-normal">{post.author}</span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BlogView;
