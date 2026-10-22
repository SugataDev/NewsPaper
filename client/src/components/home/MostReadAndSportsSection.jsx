import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../common/SectionHeader';
import LazyImage from '../common/LazyImage';
import AdBanner from '../common/AdBanner';
import { toBanglaDigits, getRelativeTimeBangla, parseKickerAndTitle } from '../../utils/formatters';

export default function MostReadAndSportsSection({ mostReadAndSports }) {
  const [activeTab, setActiveTab] = useState('read'); // 'read' | 'trending' | 'goodNews'

  if (!mostReadAndSports) return null;

  const { tabs = {}, sports = {} } = mostReadAndSports;
  const currentTabItems = tabs[activeTab] || tabs.read || [];

  const { lead: sportsLead, sub: sportsSub = [], right: sportsRight = [] } = sports;

  return (
    <section className="w-full my-8 pt-4 border-t border-hairline">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
        {/* --- LEFT: MOST READ TABS (~25% / 3 cols) --- */}
        <div className="lg:col-span-3 lg:pr-6 lg:border-r border-hairline pb-6 lg:pb-0">
          {/* Tabs header */}
          <div className="flex items-center gap-4 border-b border-hairline mb-3">
            <button
              onClick={() => setActiveTab('read')}
              className={`pb-2.5 text-[15px] font-headline transition-colors relative ${
                activeTab === 'read'
                  ? 'font-bold text-primary'
                  : 'font-medium text-[#777777] hover:text-primary'
              }`}
            >
              পঠিত
              {activeTab === 'read' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-brand-red" />
              )}
            </button>
            <span className="text-gray-300 pb-2">|</span>
            <button
              onClick={() => setActiveTab('trending')}
              className={`pb-2.5 text-[15px] font-headline transition-colors relative ${
                activeTab === 'trending'
                  ? 'font-bold text-primary'
                  : 'font-medium text-[#777777] hover:text-primary'
              }`}
            >
              আলোচিত
              {activeTab === 'trending' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-brand-red" />
              )}
            </button>
            <span className="text-gray-300 pb-2">|</span>
            <button
              onClick={() => setActiveTab('goodNews')}
              className={`pb-2.5 text-[15px] font-headline transition-colors relative ${
                activeTab === 'goodNews'
                  ? 'font-bold text-primary'
                  : 'font-medium text-[#777777] hover:text-primary'
              }`}
            >
              সুখবর
              {activeTab === 'goodNews' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-brand-red" />
              )}
            </button>
          </div>

          {/* 5 Rows with Bangla Digits (১ to ৫) */}
          <div className="flex flex-col divide-y divide-hairline">
            {currentTabItems.slice(0, 5).map((item, index) => {
              const { title: cleanTitle } = parseKickerAndTitle(item.title, '');
              return (
                <article key={item._id} className="py-2.5 first:pt-1 last:pb-0">
                  <Link
                    to={`/${item.category}/${item.slug}`}
                    className="group flex flex-col"
                  >
                    {/* Bangla Numeral: 36px, #C4C4C4, weight 300 */}
                    <span className="font-headline text-[34px] font-light text-[#C4C4C4] leading-none mb-1">
                      {toBanglaDigits(index + 1)}
                    </span>
                    <h4 className="font-headline text-[15px] font-bold leading-[1.35] text-primary group-hover:text-brand-red transition-colors line-clamp-3">
                      {cleanTitle}
                    </h4>
                    <div className="text-[11px] text-meta mt-1">
                      {getRelativeTimeBangla(item.publishedAt)}
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>

        {/* --- RIGHT: SPORTS (~75% / 9 cols) --- */}
        <div className="lg:col-span-9 lg:pl-6 mt-6 lg:mt-0">
          <SectionHeader
            title="খেলা"
            href="/sports"
            dotColor="#2172BF"
            className="pt-0 border-t-0 mb-3"
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            {/* Inner Left (2/3 of 9 cols ~ 8 cols) */}
            <div className="md:col-span-8 flex flex-col">
              {/* Lead Image (~16:10) with Overlay Headline */}
              {sportsLead && (
                <article className="relative overflow-hidden group">
                  <Link to={`/sports/${sportsLead.slug}`} className="block relative aspect-[16/10] overflow-hidden">
                    <img
                      src={sportsLead.coverImage?.url || 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800'}
                      alt={sportsLead.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5">
                      <h3 className="font-headline text-[20px] md:text-[24px] font-bold text-white leading-[1.3] group-hover:text-red-200 transition-colors">
                        {parseKickerAndTitle(sportsLead.title).title}
                      </h3>
                      <div className="text-[12px] text-gray-300 mt-2">
                        {getRelativeTimeBangla(sportsLead.publishedAt)}
                      </div>
                    </div>
                  </Link>
                </article>
              )}

              {/* Two image cards below lead with 1px divider */}
              {sportsSub.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-x divide-hairline mt-4 pt-4 border-t border-hairline">
                  {sportsSub.slice(0, 2).map((item, idx) => (
                    <article key={item._id} className={idx === 0 ? 'pr-3' : 'pl-3'}>
                      <Link
                        to={`/sports/${item.slug}`}
                        className="group flex flex-col"
                      >
                        <div className="w-full mb-2">
                          <LazyImage
                            src={item.coverImage?.url}
                            alt={item.title}
                            aspectRatio="aspect-[3/2]"
                          />
                        </div>
                        <h4 className="font-headline text-[15px] font-bold leading-[1.35] text-primary group-hover:text-brand-red transition-colors line-clamp-2">
                          {parseKickerAndTitle(item.title).title}
                        </h4>
                        <div className="text-[11px] text-meta mt-1.5">
                          {getRelativeTimeBangla(item.publishedAt)}
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Inner Right (1/3 of 9 cols ~ 4 cols) */}
            <div className="md:col-span-4 md:border-l border-hairline md:pl-5 flex flex-col">
              {/* 300x250 AdSlot */}
              <div className="w-full flex justify-center pb-2">
                <AdBanner slot="sports-right" size="300x250" />
              </div>

              {/* 3 compact rows with thumbs and kickers */}
              <div className="flex flex-col divide-y divide-hairline mt-1">
                {sportsRight.slice(0, 3).map((item, idx) => {
                  const parsed = parseKickerAndTitle(item.title);
                  return (
                    <article key={item._id} className="py-2.5 first:pt-0 last:pb-0">
                      <Link
                        to={`/sports/${item.slug}`}
                        className="group flex items-start justify-between gap-2.5"
                      >
                        <div className="flex-1">
                          <h4 className="font-headline text-[14px] font-bold leading-[1.35] text-primary group-hover:text-brand-red transition-colors line-clamp-3">
                            {idx === 2 ? (
                              <span className="text-brand-red font-bold mr-1">
                                চ্যাম্পিয়নস লিগ •
                              </span>
                            ) : null}
                            {parsed.title}
                          </h4>
                          <div className="text-[11px] text-meta mt-1">
                            {getRelativeTimeBangla(item.publishedAt)}
                          </div>
                        </div>
                        <div className="w-[72px] h-[72px] flex-shrink-0">
                          <LazyImage
                            src={item.coverImage?.url}
                            alt={item.title}
                            aspectRatio="aspect-square"
                          />
                        </div>
                      </Link>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
