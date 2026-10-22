import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Eye, CheckCircle2, Clock, Plus } from 'lucide-react';
import { toBanglaDigits, getRelativeTimeBangla } from '../../utils/formatters';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then((d) => {
        setStats(d);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-xs">ড্যাশবোর্ড তথ্য লোড হচ্ছে...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold font-headline text-primary">
            সম্পাদকীয় ড্যাশবোর্ড
          </h1>
          <p className="text-xs text-meta mt-0.5">
            অনলাইন সংস্করণ ওভারভিউ এবং তাৎক্ষণিক মেট্রিক্স
          </p>
        </div>

        <Link
          to="/admin/articles/new"
          className="px-3.5 py-1.5 bg-brand-red hover:bg-red-700 text-white text-xs font-semibold rounded flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          নতুন সংবাদ তৈরি করুন
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 border border-hairline rounded shadow-sm">
          <div className="flex items-center justify-between text-meta text-xs">
            <span>মোট সংবাদ</span>
            <FileText className="w-4 h-4 text-gray-500" />
          </div>
          <div className="text-2xl font-bold font-headline mt-2 text-primary">
            {toBanglaDigits(stats?.totalArticles || 0)}
          </div>
        </div>

        <div className="bg-white p-4 border border-hairline rounded shadow-sm">
          <div className="flex items-center justify-between text-meta text-xs">
            <span>প্রকাশিত সংবাদ</span>
            <CheckCircle2 className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-2xl font-bold font-headline mt-2 text-green-700">
            {toBanglaDigits(stats?.publishedArticles || 0)}
          </div>
        </div>

        <div className="bg-white p-4 border border-hairline rounded shadow-sm">
          <div className="flex items-center justify-between text-meta text-xs">
            <span>খসড়া (Drafts)</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-headline mt-2 text-amber-600">
            {toBanglaDigits(stats?.draftArticles || 0)}
          </div>
        </div>

        <div className="bg-white p-4 border border-hairline rounded shadow-sm">
          <div className="flex items-center justify-between text-meta text-xs">
            <span>মোট ভিউজ</span>
            <Eye className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold font-headline mt-2 text-blue-700">
            {toBanglaDigits(stats?.totalViews || 0)}
          </div>
        </div>
      </div>

      {/* Two columns: Top Viewed & Recent Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Viewed */}
        <div className="bg-white border border-hairline p-5 rounded shadow-sm">
          <h3 className="font-headline font-bold text-sm text-primary mb-3 pb-2 border-b border-hairline">
            শীর্ষ পঠিত সংবাদ
          </h3>
          <div className="divide-y divide-hairline">
            {stats?.topViewed?.map((item) => (
              <div key={item._id} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                <Link
                  to={`/${item.category}/${item.slug}`}
                  target="_blank"
                  className="text-xs font-semibold text-primary hover:text-brand-red line-clamp-1 flex-1"
                >
                  {item.title}
                </Link>
                <span className="text-[11px] font-mono text-meta flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {toBanglaDigits(item.stats?.views || 0)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Articles */}
        <div className="bg-white border border-hairline p-5 rounded shadow-sm">
          <h3 className="font-headline font-bold text-sm text-primary mb-3 pb-2 border-b border-hairline flex items-center justify-between">
            <span>সাম্প্রতিক তৈরি সংবাদ</span>
            <Link to="/admin/articles" className="text-xs text-brand-red hover:underline font-normal">
              সব দেখুন
            </Link>
          </h3>
          <div className="divide-y divide-hairline">
            {stats?.recentArticles?.map((item) => (
              <div key={item._id} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/admin/articles/${item._id}/edit`}
                    className="text-xs font-semibold text-primary hover:text-brand-red line-clamp-1 block"
                  >
                    {item.title}
                  </Link>
                  <span className="text-[10px] text-meta">
                    {item.category} • {getRelativeTimeBangla(item.publishedAt || item.createdAt)}
                  </span>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                    item.status === 'published'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {item.status === 'published' ? 'প্রকাশিত' : 'খসড়া'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
