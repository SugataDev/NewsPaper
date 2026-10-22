import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, Clock } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import LazyImage from '../components/common/LazyImage';
import { getRelativeTimeBangla, toBanglaDigits } from '../utils/formatters';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(query);
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim()) {
      setLoading(true);
      fetch(`/api/search?q=${encodeURIComponent(query.trim())}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data.articles || []);
          setTotal(data.pagination?.total || 0);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setResults([]);
      setTotal(0);
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>{`অনুসন্ধান: ${query || ''} | খবরঘর`}</title>
      </Helmet>

      <Header />

      <main className="max-w-[1240px] mx-auto px-4 py-8 flex-1">
        {/* Search Input Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="সংবাদ অনুসন্ধান করুন..."
                className="w-full pl-10 pr-4 py-3 border border-input-border rounded text-base focus:outline-none focus:border-brand-blue"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-brand-blue hover:bg-blue-700 text-white font-semibold text-sm rounded transition-colors"
            >
              অনুসন্ধান
            </button>
          </form>

          {query && (
            <p className="text-sm text-meta mt-3">
              "{query}" সম্পর্কিত মোট{' '}
              <span className="font-bold text-primary">
                {toBanglaDigits(total)}
              </span>{' '}
              টি সংবাদ পাওয়া গেছে
            </p>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <div className="space-y-4 max-w-3xl mx-auto animate-pulse">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-24 bg-gray-200 rounded" />
            ))}
          </div>
        ) : results.length === 0 && query ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg font-bold">কোনো ফলাফল পাওয়া যায়নি</p>
            <p className="text-sm mt-1">অন্য কোনো শব্দ দিয়ে পুনরায় অনুসন্ধান করুন।</p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto divide-y divide-hairline">
            {results.map((item) => (
              <article key={item._id} className="py-4 first:pt-0">
                <Link
                  to={`/${item.category}/${item.slug}`}
                  className="group flex items-start gap-4"
                >
                  <div className="w-[120px] h-[80px] flex-shrink-0">
                    <LazyImage
                      src={item.coverImage?.url}
                      alt={item.title}
                      aspectRatio="aspect-[3/2]"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-headline text-[17px] font-bold text-primary group-hover:text-brand-red leading-[1.35] line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-excerpt leading-[1.5] mt-1.5 line-clamp-2">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-meta mt-2">
                      <Clock className="w-3 h-3 text-meta" />
                      <span>{getRelativeTimeBangla(item.publishedAt)}</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
