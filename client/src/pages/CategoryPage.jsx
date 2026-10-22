import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Clock } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SectionHeader from '../components/common/SectionHeader';
import LazyImage from '../components/common/LazyImage';
import { getRelativeTimeBangla } from '../utils/formatters';

const categoryTitles = {
  latest: 'সর্বশেষ সংবাদ',
  bangladesh: 'বাংলাদেশ',
  politics: 'রাজনীতি',
  world: 'আন্তর্জাতিক সংবাদ',
  business: 'অর্থনীতি ও বাণিজ্য',
  opinion: 'মতামত ও বিশ্লেষণ',
  sports: 'খেলাধুলা',
  entertainment: 'বিনোদন',
  jobs: 'চাকরি ও ক্যারিয়ার',
  lifestyle: 'জীবনযাপন',
  video: 'ভিডিও সংবাদ',
};

export default function CategoryPage() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const division = searchParams.get('division');
  const district = searchParams.get('district');
  const upazila = searchParams.get('upazila');

  const pageTitle = categoryTitles[category] || category || 'সংবাদ';

  useEffect(() => {
    setLoading(true);
    setPage(1);

    const queryParams = new URLSearchParams();
    if (category && category !== 'latest') queryParams.append('category', category);
    if (division) queryParams.append('division', division);
    if (district) queryParams.append('district', district);
    if (upazila) queryParams.append('upazila', upazila);
    queryParams.append('page', '1');
    queryParams.append('limit', '13');

    fetch(`/api/articles?${queryParams.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [category, division, district, upazila]);

  const loadMore = () => {
    if (page >= totalPages) return;
    setLoadingMore(true);

    const nextPage = page + 1;
    const queryParams = new URLSearchParams();
    if (category && category !== 'latest') queryParams.append('category', category);
    if (division) queryParams.append('division', division);
    if (district) queryParams.append('district', district);
    if (upazila) queryParams.append('upazila', upazila);
    queryParams.append('page', nextPage.toString());
    queryParams.append('limit', '12');

    fetch(`/api/articles?${queryParams.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setArticles((prev) => [...prev, ...(data.articles || [])]);
        setPage(nextPage);
        setLoadingMore(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingMore(false);
      });
  };

  const featured = articles[0];
  const listItems = articles.slice(1);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>{`${pageTitle} | খবরঘর`}</title>
        <meta name="description" content={`${pageTitle} সম্পর্কিত সর্বশেষ সংবাদ ও প্রতিবেদন`} />
      </Helmet>

      <Header />

      <main className="max-w-[1240px] mx-auto px-4 py-6 flex-1">
        <SectionHeader
          title={pageTitle}
          showArrow={false}
          className="pt-0 border-t-0 mb-6 text-[28px]"
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
            <div className="md:col-span-3 h-80 bg-gray-200 rounded" />
            <div className="h-60 bg-gray-200 rounded" />
            <div className="h-60 bg-gray-200 rounded" />
            <div className="h-60 bg-gray-200 rounded" />
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg font-bold">এই বিভাগে কোনো সংবাদ পাওয়া যায়নি</p>
          </div>
        ) : (
          <>
            {/* Featured Lead Row */}
            {featured && (
              <div className="mb-10 pb-8 border-b border-hairline">
                <Link
                  to={`/${featured.category}/${featured.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                >
                  <div className="md:col-span-7">
                    <LazyImage
                      src={featured.coverImage?.url}
                      alt={featured.title}
                      aspectRatio="aspect-[16/10]"
                    />
                  </div>
                  <div className="md:col-span-5">
                    {featured.kicker && (
                      <span className="text-brand-red font-bold text-[15px] block mb-1">
                        {featured.kicker} •
                      </span>
                    )}
                    <h2 className="font-headline text-[26px] md:text-[32px] font-bold leading-[1.3] text-primary group-hover:text-brand-red transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-[15px] leading-[1.6] text-excerpt mt-3 line-clamp-3">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center gap-1 text-[12px] text-meta mt-3">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{getRelativeTimeBangla(featured.publishedAt)}</span>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* 3-Column Articles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
              {listItems.map((item) => (
                <article key={item._id} className="flex flex-col group">
                  <Link to={`/${item.category}/${item.slug}`} className="flex flex-col h-full">
                    <div className="w-full mb-3">
                      <LazyImage
                        src={item.coverImage?.url}
                        alt={item.title}
                        aspectRatio="aspect-[3/2]"
                      />
                    </div>
                    <h3 className="font-headline text-[17px] font-bold leading-[1.35] text-primary group-hover:text-brand-red transition-colors line-clamp-2">
                      {item.kicker && (
                        <span className="text-brand-red font-bold mr-1">
                          {item.kicker} •
                        </span>
                      )}
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-excerpt leading-[1.5] mt-1.5 line-clamp-2">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-meta mt-auto pt-2.5">
                      <Clock className="w-3 h-3 text-meta" />
                      <span>{getRelativeTimeBangla(item.publishedAt)}</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {/* "আরও" Load More Button */}
            {page < totalPages && (
              <div className="text-center mt-12 pt-6 border-t border-hairline">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="px-8 py-3 bg-white border border-input-border hover:border-black font-headline font-bold text-base text-primary hover:text-black rounded transition-all shadow-sm disabled:opacity-50"
                >
                  {loadingMore ? 'লোড হচ্ছে...' : 'আরও দেখুন'}
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
