import React from 'react';
import { Link } from 'react-router-dom';
import LazyImage from '../common/LazyImage';
import { PlayBadge } from '../common/Badges';
import AdBanner from '../common/AdBanner';
import { getRelativeTimeBangla, parseKickerAndTitle } from '../../utils/formatters';

export default function HeroSection({ heroData }) {
  if (!heroData) return null;

  const {
    left = [],
    centerLead,
    centerSubHorizontal = [],
    centerSubVertical = [],
    centerTextOnly = [],
    right = [],
  } = heroData;

  const parsedLead = centerLead ? parseKickerAndTitle(centerLead.title, centerLead.kicker) : null;

  return (
    <section className="w-full my-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
        {/* --- LEFT COLUMN (3/12 ~ 25%) --- */}
        <div className="order-2 lg:order-1 lg:col-span-3 lg:pr-5 lg:border-r border-hairline flex flex-col divide-y divide-hairline mt-6 lg:mt-0">
          {left.map((item, index) => {
            const hasThumb = index === 1 || index === 2 || index === 4;
            const parsed = parseKickerAndTitle(item.title, item.kicker);
            const showKicker = index < 2 && parsed.kicker;

            return (
              <article key={item._id} className="py-3 first:pt-0 last:pb-0">
                <Link
                  to={`/${item.category}/${item.slug}`}
                  className="group flex items-start justify-between gap-3"
                >
                  <div className="flex-1">
                    <h3 className="font-headline text-[15px] font-bold leading-[1.38] text-primary group-hover:text-brand-red transition-colors">
                      {showKicker && (
                        <span className="text-brand-red font-bold mr-1">
                          {parsed.kicker} •
                        </span>
                      )}
                      {parsed.title}
                    </h3>
                    {item.excerpt && (
                      <p className="text-[13px] text-excerpt leading-[1.5] mt-1 line-clamp-2">
                        {item.excerpt}
                      </p>
                    )}
                    <div className="text-[12px] text-meta mt-1.5">
                      {getRelativeTimeBangla(item.publishedAt)}
                    </div>
                  </div>

                  {hasThumb && (
                    <div className="w-[96px] h-[64px] flex-shrink-0">
                      <LazyImage
                        src={item.coverImage?.url}
                        alt={item.title}
                        aspectRatio="aspect-[3/2]"
                      />
                    </div>
                  )}
                </Link>
              </article>
            );
          })}
        </div>

        {/* --- CENTER COLUMN (6/12 ~ 50%) --- */}
        <div className="order-1 lg:order-2 lg:col-span-6 lg:px-6 lg:border-r border-hairline flex flex-col">
          {/* (a) Lead Story */}
          {centerLead && (
            <article className="pb-4 border-b border-hairline">
              <Link
                to={`/${centerLead.category}/${centerLead.slug}`}
                className="group flex flex-col md:flex-row gap-4 items-start"
              >
                {/* 3:2 Image ~45% width */}
                <div className="w-full md:w-[48%] flex-shrink-0 relative">
                  <LazyImage
                    src={centerLead.coverImage?.url}
                    alt={centerLead.title}
                    aspectRatio="aspect-[3/2]"
                    priority={true}
                  />
                  {centerLead.type === 'video' && <PlayBadge />}
                  <div className="text-[10px] text-meta mt-1 line-clamp-1 italic">
                    ছবি: {centerLead.coverImage?.credit || 'খবরঘর আলোকচিত্র'}
                  </div>
                </div>

                {/* Right Text */}
                <div className="flex-1">
                  <h2 className="font-headline text-[24px] md:text-[28px] lg:text-[32px] font-bold leading-[1.28] text-primary group-hover:text-brand-red transition-colors">
                    {parsedLead.kicker && (
                      <span className="text-brand-red font-bold mr-1.5">
                        {parsedLead.kicker} •
                      </span>
                    )}
                    {parsedLead.title}
                  </h2>
                  <p className="text-[14px] leading-[1.6] text-excerpt mt-2 line-clamp-4">
                    {centerLead.excerpt}
                  </p>
                  <div className="text-[12px] text-meta mt-2">
                    {getRelativeTimeBangla(centerLead.publishedAt)}
                  </div>
                </div>
              </Link>
            </article>
          )}

          {/* (b) Two compact horizontal cards with 1px divider */}
          {centerSubHorizontal.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-x divide-hairline py-3.5 border-b border-hairline">
              {centerSubHorizontal.slice(0, 2).map((item, idx) => {
                const parsed = parseKickerAndTitle(item.title, item.kicker);
                return (
                  <article key={item._id} className={idx === 0 ? 'pr-4' : 'pl-4'}>
                    <Link
                      to={`/${item.category}/${item.slug}`}
                      className="group flex items-start gap-3"
                    >
                      <div className="flex-1">
                        <h4 className="font-headline text-[15px] font-bold leading-[1.35] text-primary group-hover:text-brand-red transition-colors line-clamp-3">
                          {item.title}
                        </h4>
                        <div className="text-[11px] text-meta mt-1.5">
                          {getRelativeTimeBangla(item.publishedAt)}
                        </div>
                      </div>
                      <div className="w-[84px] h-[56px] flex-shrink-0">
                        <LazyImage
                          src={item.coverImage?.url}
                          alt={item.title}
                          aspectRatio="aspect-[3/2]"
                        />
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          )}

          {/* (c) Three vertical image cards with 1px divider */}
          {centerSubVertical.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-x divide-hairline py-3.5 border-b border-hairline">
              {centerSubVertical.slice(0, 3).map((item, idx) => (
                <article key={item._id} className={idx === 0 ? 'pr-3' : idx === 1 ? 'px-3' : 'pl-3'}>
                  <Link
                    to={`/${item.category}/${item.slug}`}
                    className="group flex flex-col"
                  >
                    <div className="w-full relative mb-2">
                      <LazyImage
                        src={item.coverImage?.url}
                        alt={item.title}
                        aspectRatio="aspect-[3/2]"
                      />
                      {item.type === 'video' && <PlayBadge />}
                    </div>
                    <h4 className="font-headline text-[15px] font-bold leading-[1.32] text-primary group-hover:text-brand-red transition-colors line-clamp-3">
                      {item.title}
                    </h4>
                    <p className="text-[12px] text-excerpt leading-[1.45] mt-1 line-clamp-2">
                      {item.excerpt}
                    </p>
                    <div className="text-[11px] text-meta mt-1.5">
                      {getRelativeTimeBangla(item.publishedAt)}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}

          {/* (d) Three text-only items with 1px vertical dividers */}
          {centerTextOnly.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-x divide-hairline pt-3.5">
              {centerTextOnly.slice(0, 3).map((item, idx) => (
                <article key={item._id} className={idx === 0 ? 'pr-3' : idx === 1 ? 'px-3' : 'pl-3'}>
                  <Link
                    to={`/${item.category}/${item.slug}`}
                    className="group flex flex-col"
                  >
                    <h4 className="font-headline text-[15px] font-bold leading-[1.35] text-primary group-hover:text-brand-red transition-colors line-clamp-3">
                      {item.title}
                    </h4>
                    <p className="text-[12px] text-excerpt leading-[1.45] mt-1.5 line-clamp-2">
                      {item.excerpt}
                    </p>
                    <div className="text-[11px] text-meta mt-1.5">
                      {getRelativeTimeBangla(item.publishedAt)}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* --- RIGHT COLUMN (3/12 ~ 25%) --- */}
        <div className="order-3 lg:order-3 lg:col-span-3 lg:pl-5 mt-6 lg:mt-0 flex flex-col">
          {/* 300x250 AdSlot */}
          <div className="w-full flex justify-center pb-2">
            <AdBanner slot="hero-right" size="300x250" />
          </div>

          {/* Compact rows (text left, 72x72 thumb right) */}
          <div className="flex flex-col divide-y divide-hairline">
            {right.map((item, idx) => {
              const parsed = parseKickerAndTitle(item.title, item.kicker);
              const kickerLabel = idx === 0 ? 'মতামত' : idx === 1 ? 'অভিমত' : (idx < 3 ? parsed.kicker : null);

              return (
                <article key={item._id} className="py-3 first:pt-2 last:pb-0">
                  <Link
                    to={`/${item.category}/${item.slug}`}
                    className="group flex items-start justify-between gap-2.5"
                  >
                    <div className="flex-1">
                      <h4 className="font-headline text-[15px] font-bold leading-[1.38] text-primary group-hover:text-brand-red transition-colors">
                        {kickerLabel && (
                          <span className="text-brand-red font-bold mr-1">
                            {kickerLabel} •
                          </span>
                        )}
                        {parsed.title}
                      </h4>
                      <div className="text-[12px] text-meta mt-1.5">
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
    </section>
  );
}
