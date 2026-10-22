import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Clock,
  Share2,
  Facebook,
  Twitter,
  Link as LinkIcon,
  Check,
  Calendar,
} from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import AdBanner from '../components/common/AdBanner';
import LazyImage from '../components/common/LazyImage';
import { PlayBadge } from '../components/common/Badges';
import {
  formatBanglaDate,
  getRelativeTimeBangla,
  toBanglaDigits,
} from '../utils/formatters';

export default function ArticlePage() {
  const { category, slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/articles/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('সংবাদটি পাওয়া যায়নি');
        return res.json();
      })
      .then((d) => {
        setData(d);
        setLoading(false);
        // Track view
        if (d.article?._id) {
          fetch(`/api/articles/${d.article._id}/view`, { method: 'POST' }).catch(() => {});
        }
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      '_blank'
    );
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(data?.article?.title || '')}`,
      '_blank'
    );
  };

  const shareWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(data?.article?.title + ' ' + window.location.href)}`,
      '_blank'
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="max-w-[1240px] mx-auto px-4 py-12 flex-1 animate-pulse">
          <div className="h-8 bg-gray-200 w-1/3 mb-4 rounded" />
          <div className="h-12 bg-gray-200 w-3/4 mb-6 rounded" />
          <div className="aspect-[16/9] max-w-2xl bg-gray-200 mb-6 rounded" />
          <div className="space-y-3 max-w-2xl">
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !data?.article) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="max-w-[1240px] mx-auto px-4 py-20 text-center flex-1">
          <h2 className="text-2xl font-bold font-headline text-primary mb-3">
            {error || 'সংবাদটি খুঁজে পাওয়া যায়নি'}
          </h2>
          <p className="text-gray-600 mb-6">
            হয়তো সংবাদটি সরানো হয়েছে অথবা লিংকটি সঠিক নয়।
          </p>
          <Link
            to="/"
            className="px-6 py-2.5 bg-brand-red text-white font-semibold rounded hover:bg-red-700 transition-colors inline-block"
          >
            হোমপেজে ফিরে যান
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const { article, related = [] } = data;
  const author = article.authors?.[0] || { nameBn: 'বিশেষ প্রতিনিধি' };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>{`${article.title} | খবরঘর`}</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.coverImage?.url} />
        <meta property="og:type" content="article" />
      </Helmet>

      <Header />

      <main className="max-w-[1240px] mx-auto px-4 py-6 flex-1">
        {/* Category breadcrumb */}
        <div className="flex items-center gap-2 text-[13px] text-meta mb-3">
          <Link to="/" className="hover:text-brand-red">
            হোম
          </Link>
          <span>/</span>
          <Link to={`/${article.category}`} className="text-brand-red font-medium">
            {article.category}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Article Column (8 cols) */}
          <div className="lg:col-span-8 flex flex-col">
            <article>
              {/* Kicker */}
              {article.kicker && (
                <div className="mb-2">
                  <span className="text-brand-red font-bold text-[16px] inline-block">
                    {article.kicker}
                  </span>
                </div>
              )}

              {/* Headline (36px/700) */}
              <h1 className="font-headline text-[28px] md:text-[36px] font-bold leading-[1.3] text-primary mb-4">
                {article.title}
              </h1>

              {/* Excerpt */}
              {article.excerpt && (
                <p className="text-[17px] leading-[1.6] text-excerpt font-medium mb-5 pb-4 border-b border-hairline">
                  {article.excerpt}
                </p>
              )}

              {/* Byline + Times + Share Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-3 mb-6 border-b border-hairline">
                {/* Author & Timestamp */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    {author.avatar ? (
                      <img
                        src={author.avatar}
                        alt={author.nameBn}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#E0E0E0] flex items-center justify-center font-bold text-gray-500">
                        {author.nameBn.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-headline text-[15px] font-bold text-primary">
                      {author.nameBn}
                    </h4>
                    <div className="flex items-center gap-2 text-[12px] text-meta mt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatBanglaDate(article.publishedAt)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {getRelativeTimeBangla(article.publishedAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={shareFacebook}
                    className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90"
                    aria-label="ফেসবুকে শেয়ার করুন"
                  >
                    <Facebook className="w-4 h-4 fill-current" />
                  </button>
                  <button
                    onClick={shareTwitter}
                    className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-90"
                    aria-label="এক্সে শেয়ার করুন"
                  >
                    <Twitter className="w-4 h-4 fill-current" />
                  </button>
                  <button
                    onClick={shareWhatsApp}
                    className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90"
                    aria-label="হোয়াটসঅ্যাপে পাঠান"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={copyUrl}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors"
                    aria-label="লিংক কপি করুন"
                    title="লিংক কপি করুন"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <LinkIcon className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Cover Image or Video Embed */}
              {article.type === 'video' && article.videoUrl ? (
                <div className="w-full aspect-[16/9] mb-6 bg-black">
                  <iframe
                    src={article.videoUrl}
                    title={article.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                article.coverImage?.url && (
                  <figure className="mb-6">
                    <div className="w-full relative overflow-hidden bg-gray-100 aspect-[16/10] sm:aspect-[3/2]">
                      <img
                        src={article.coverImage.url}
                        alt={article.coverImage.alt || article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {(article.coverImage.caption || article.coverImage.credit) && (
                      <figcaption className="text-[12px] text-meta mt-2 flex justify-between px-1">
                        <span>{article.coverImage.caption}</span>
                        {article.coverImage.credit && (
                          <span className="italic">ছবি: {article.coverImage.credit}</span>
                        )}
                      </figcaption>
                    )}
                  </figure>
                )
              )}

              {/* Article Body: max 720px, 18px / 1.8 line-height */}
              <div
                className="max-w-[720px] text-[18px] leading-[1.8] text-primary space-y-5 prose prose-neutral"
                dangerouslySetInnerHTML={{ __html: article.body }}
              />

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="pt-6 mt-8 border-t border-hairline flex flex-wrap items-center gap-2">
                  <span className="text-[13px] font-semibold text-meta">সম্পর্কিত বিষয়:</span>
                  {article.tags.map((tag, i) => (
                    <Link
                      key={i}
                      to={`/search?q=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 bg-chip border border-chip-border hover:border-brand-red hover:text-brand-red rounded-full text-[12px] font-medium text-gray-700 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </article>

            {/* Related Stories */}
            {related.length > 0 && (
              <section className="mt-12 pt-8 border-t border-hairline">
                <h3 className="font-headline text-[22px] font-bold text-primary mb-6">
                  আরও পড়ুন
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {related.map((item) => (
                    <article key={item._id}>
                      <Link
                        to={`/${item.category}/${item.slug}`}
                        className="group flex gap-3"
                      >
                        <div className="w-[100px] h-[66px] flex-shrink-0">
                          <LazyImage
                            src={item.coverImage?.url}
                            alt={item.title}
                            aspectRatio="aspect-[3/2]"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-headline text-[15px] font-bold leading-[1.35] text-primary group-hover:text-brand-red transition-colors line-clamp-2">
                            {item.title}
                          </h4>
                          <span className="text-[11px] text-meta mt-1 block">
                            {getRelativeTimeBangla(item.publishedAt)}
                          </span>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Rail (4 cols): Sticky with AdSlot + Most Read */}
          <aside className="lg:col-span-4 lg:pl-4 sticky top-16">
            <AdBanner slot="hero-right" size="300x250" />

            <div className="mt-6 p-4 border border-hairline bg-[#FAFAFA]">
              <h3 className="font-headline text-[18px] font-bold text-primary pb-2.5 mb-3 border-b border-hairline">
                সর্বাধিক পঠিত
              </h3>
              <div className="flex flex-col divide-y divide-hairline">
                {related.slice(0, 5).map((item, idx) => (
                  <article key={item._id} className="py-2.5 first:pt-0 last:pb-0">
                    <Link
                      to={`/${item.category}/${item.slug}`}
                      className="group flex items-start gap-2.5"
                    >
                      <span className="font-headline text-[22px] font-light text-[#C4C4C4] leading-none">
                        {toBanglaDigits(idx + 1)}
                      </span>
                      <h4 className="font-headline text-[14px] font-bold text-primary group-hover:text-brand-red leading-[1.35] line-clamp-2">
                        {item.title}
                      </h4>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
