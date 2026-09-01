import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/blog';
import { BlogPost } from '../types';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export const BlogView: React.FC = () => {
  const { blog } = useAdmin();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const liveBlogPosts: BlogPost[] = (blog && blog.length > 0)
    ? blog.filter(b => b.published !== false).map(b => ({
        id: b.id,
        slug: b.slug,
        title: b.title,
        category: b.category || 'Protected Cultivation',
        author: b.author,
        date: b.date,
        featuredImage: b.coverImage,
        excerpt: b.excerpt,
        content: b.content,
        readTime: b.readTime || '5 min read',
        seoTitle: b.seoTitle,
        seoDescription: b.seoDescription,
      }))
    : BLOG_POSTS;

  if (selectedPost) {
    return (
      <div className="bg-white min-h-screen py-16 text-[#10232B] font-sans">
        <div className="max-w-[840px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <button
            onClick={() => setSelectedPost(null)}
            className="inline-flex items-center gap-2 text-xs font-medium text-[#60717A] hover:text-[#10232B] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>BACK TO ALL ARTICLES</span>
          </button>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs text-[#60717A]">
              <span className="font-mono text-[#2F7445] uppercase">{selectedPost.category}</span>
              <span>·</span>
              <span>{selectedPost.date}</span>
              <span>·</span>
              <span>{selectedPost.readTime}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#10232B] leading-tight">
              {selectedPost.title}
            </h1>
          </div>

          <div className="overflow-hidden rounded border border-[#E4EAE5] h-[320px] sm:h-[420px] bg-[#F5F8F5]">
            <img
              src={selectedPost.featuredImage}
              alt={selectedPost.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-xs sm:text-sm text-[#10232B] leading-relaxed space-y-4 whitespace-pre-line font-normal">
            {selectedPost.content}
          </div>

          <div className="pt-8 border-t border-[#E4EAE5]">
            <button
              onClick={() => setSelectedPost(null)}
              className="px-6 py-3 bg-[#F5F8F5] hover:bg-[#E4EAE5] text-[#10232B] text-xs font-medium rounded transition-colors"
            >
              Back to Insights
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-16 text-[#10232B] font-sans">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-2xl">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#2F7445]">
            INSIGHTS & KNOWLEDGE
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#10232B]">
            Protected Cultivation Articles
          </h1>
          <p className="text-base sm:text-lg text-[#60717A] leading-relaxed">
            Technical guides, engineering insights, and practical farming advice from our agricultural infrastructure experts.
          </p>
        </div>

        {/* Articles Grid */}
        <div className={`grid grid-cols-1 ${liveBlogPosts.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2 max-w-5xl'} gap-8`}>
          {liveBlogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white border border-[#E4EAE5] rounded-xl overflow-hidden flex flex-col justify-between group cursor-pointer hover:border-[#2F7445] transition-all"
              onClick={() => setSelectedPost(post)}
            >
              <div>
                <div className="overflow-hidden h-56 bg-[#F5F8F5] img-hover-container">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover img-hover-zoom"
                  />
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#60717A]">
                    <span className="font-mono font-bold text-[#2F7445] uppercase">{post.category}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#10232B] group-hover:text-[#2F7445] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-[15px] text-[#60717A] line-clamp-3 leading-relaxed font-normal">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-4 border-t border-[#E4EAE5] mt-4 flex items-center justify-between">
                <span className="text-sm text-[#2F7445] font-semibold group-hover:translate-x-1 transition-transform">
                  Read article →
                </span>
                <span className="text-xs text-[#60717A] font-medium">{post.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

