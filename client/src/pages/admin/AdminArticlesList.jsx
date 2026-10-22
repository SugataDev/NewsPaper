import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Eye, Plus, Search, ExternalLink } from 'lucide-react';
import { toBanglaDigits, getRelativeTimeBangla } from '../../utils/formatters';

export default function AdminArticlesList() {
  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(''); // '' | 'published' | 'draft'
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchArticles = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (category) params.append('category', category);
    if (search.trim()) params.append('q', search.trim());
    params.append('page', page.toString());
    params.append('limit', '20');

    fetch(`/api/admin/articles?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        setArticles(data.articles || []);
        setTotal(data.pagination?.total || 0);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchArticles();
  }, [page, status, category]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchArticles();
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`আপনি কি নিশ্চিতভাবে এই সংবাদটি মুছে ফেলতে চান?\n"${title}"`)) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setArticles(articles.filter((a) => a._id !== id));
        setTotal((prev) => prev - 1);
      } else {
        alert('সংবাদটি মুছতে ব্যর্থ হয়েছে');
      }
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold font-headline text-primary">
            সংবাদ তালিকা
          </h1>
          <p className="text-xs text-meta">
            মোট {toBanglaDigits(total)} টি সংবাদ সংরক্ষিত রয়েছে
          </p>
        </div>

        <Link
          to="/admin/articles/new"
          className="px-3.5 py-1.5 bg-brand-red hover:bg-red-700 text-white text-xs font-semibold rounded flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          নতুন সংবাদ যোগ করুন
        </Link>
      </div>

      {/* Filter Bar & Status Tabs */}
      <div className="bg-white p-3 border border-hairline rounded flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Status Tabs */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => { setStatus(''); setPage(1); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded ${
              status === '' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            সকল
          </button>
          <button
            onClick={() => { setStatus('published'); setPage(1); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded ${
              status === 'published' ? 'bg-green-700 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            প্রকাশিত
          </button>
          <button
            onClick={() => { setStatus('draft'); setPage(1); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded ${
              status === 'draft' ? 'bg-amber-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            খসড়া
          </button>
        </div>

        {/* Category & Search */}
        <div className="flex items-center gap-2">
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            className="px-2.5 py-1.5 border border-input-border text-xs rounded bg-white text-gray-700"
          >
            <option value="">সকল বিভাগ</option>
            <option value="bangladesh">বাংলাদেশ</option>
            <option value="politics">রাজনীতি</option>
            <option value="world">বিশ্ব</option>
            <option value="business">বাণিজ্য</option>
            <option value="opinion">মতামত</option>
            <option value="sports">খেলা</option>
            <option value="entertainment">বিনোদন</option>
            <option value="jobs">চাকরি</option>
            <option value="lifestyle">জীবনযাপন</option>
            <option value="video">ভিডিও</option>
          </select>

          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="শিরোনাম খুঁজুন..."
              className="pl-7 pr-3 py-1.5 border border-input-border rounded text-xs w-48 focus:outline-none focus:border-brand-blue"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2" />
          </form>
        </div>
      </div>

      {/* Dense Table */}
      <div className="bg-white border border-hairline rounded overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-xs text-meta">লোড হচ্ছে...</div>
        ) : articles.length === 0 ? (
          <div className="p-8 text-center text-xs text-meta">কোনো সংবাদ পাওয়া যায়নি।</div>
        ) : (
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-hairline text-meta font-semibold uppercase tracking-wider">
                <th className="py-2.5 px-3">শিরোনাম</th>
                <th className="py-2.5 px-3">বিভাগ</th>
                <th className="py-2.5 px-3">লেখক</th>
                <th className="py-2.5 px-3">স্ট্যাটাস</th>
                <th className="py-2.5 px-3">তারিখ</th>
                <th className="py-2.5 px-3 text-right">ভিউ</th>
                <th className="py-2.5 px-3 text-center">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {articles.map((item) => (
                <tr key={item._id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-2 px-3 max-w-sm">
                    <div className="font-semibold text-primary line-clamp-1">
                      {item.title}
                    </div>
                    {item.kicker && (
                      <span className="text-[10px] text-brand-red font-medium">
                        {item.kicker}
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-3 text-gray-600 capitalize">
                    {item.category}
                  </td>
                  <td className="py-2 px-3 text-gray-600">
                    {item.authors?.[0]?.nameBn || '—'}
                  </td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        item.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.status === 'published' ? 'প্রকাশিত' : 'খসড়া'}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-meta text-[11px] whitespace-nowrap">
                    {getRelativeTimeBangla(item.publishedAt || item.createdAt)}
                  </td>
                  <td className="py-2 px-3 text-right font-mono text-gray-700">
                    {toBanglaDigits(item.stats?.views || 0)}
                  </td>
                  <td className="py-2 px-3 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5">
                      <Link
                        to={`/${item.category}/${item.slug}`}
                        target="_blank"
                        className="p-1 text-gray-500 hover:text-black"
                        title="দেখুন"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        to={`/admin/articles/${item._id}/edit`}
                        className="p-1 text-blue-600 hover:text-blue-800"
                        title="সম্পাদনা"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id, item.title)}
                        className="p-1 text-red-600 hover:text-red-800"
                        title="মুছুন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination footer */}
        <div className="p-3 bg-[#F8F9FA] border-t border-hairline flex items-center justify-between text-xs text-meta">
          <span>পৃষ্ঠা {toBanglaDigits(page)}</span>
          <div className="flex gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-2.5 py-1 border border-input-border rounded bg-white disabled:opacity-40"
            >
              পূর্ববর্তী
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={articles.length < 20}
              className="px-2.5 py-1 border border-input-border rounded bg-white disabled:opacity-40"
            >
              পরবর্তী
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
