import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import LazyImage from '../common/LazyImage';
import { PlayBadge } from '../common/Badges';
import AdBanner from '../common/AdBanner';
import { getRelativeTimeBangla } from '../../utils/formatters';

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

  return (
    <section className="w-full my-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* --- LEFT COLUMN (3/12 ~ 25%) --- */}
        <div className="lg:col-span-3 lg:pr-5 lg:border-r border-hairline flex flex-col divide-y divide-hairline">
          {left.map((item, index) => {
            const hasThumb = index % 2 === 1 || index === 2 || index === 4;
            return (
              <article key={item._id} className="py-3.5 first:pt-0 last:pb-0">
                <Link
                  to={`/${item.category}/${item.slug}`}
                  className="group flex items-start justify-between gap-3"
                >
                  <div className="flex-1">
                    <h3 className="font-headline text-[15px] font-bold leading-[1.4] text-primary group-hover:text-brand-red transition-colors">
                      {item.kicker && (
                        <span className="text-brand-red font-bold mr-1">
                          {item.kicker} •
                        </span>
                      )}
                      {item.title}
                    </h3>
                    {item.excerpt && (
                      <p className="text-[13px] text-excerpt leading-[1.5] mt-1.5 line-clamp-2">
                        {item.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-1 text-[12px] text-meta mt-2">
                      <Clock className="w-3 h-3 text-meta" />
                      <span>{getRelativeTimeBangla(item.publishedAt)}</span>
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
        <div className="lg:col-span-6 lg:px-6 lg:border-r border-hairline mt-6 lg:mt-0 flex flex-col">
          {/* (a) Lead Story */}
          {centerLead && (
            <article className="pb-5 border-b border-hairline">
              <Link
                to={`/${centerLead.category}/${centerLead.slug}`}
                className="group flex flex-col md:flex-row gap-4 items-start"
              >
                {/* 3:2 Image ~45% width */}
                <div className="w-full md:w-[46%] flex-shrink-0 relative">
                  <LazyImage
                    src={centerLead.coverImage?.url}
                    alt={centerLead.title}
                    aspectRatio="aspect-[3/2]"
                    priority={true}
                  />
                  {centerLead.type === 'video' && <PlayBadge />}
                </div>

                {/* Right Text */}
                <div className="flex-1">
                  <h2 className="font-headline text-[24px] md:text-[30px] lg:text-[32px] font-bold leading-[1.3] text-primary group-hover:text-brand-red transition-colors">
                    {centerLead.kicker && (
                      <span className="text-brand-red font-bold mr-1.5">
                        {centerLead.kicker} •
                      </span>
                    )}
                    {centerLead.title}
                  </h2>
                  <p className="text-[14px] leading-[1.6] text-excerpt mt-2 line-clamp-4">
                    {centerLead.excerpt}
                  </p>
                  <div className="flex items-center gap-1 text-[12px] text-meta mt-2.5">
                    <Clock className="w-3.5 h-3.5 text-meta" />
                    <span>{getRelativeTimeBangla(centerLead.publishedAt)}</span>
                  </div>
                </div>
              </Link>
            </article>
          )}

          {/* (b) Two compact horizontal cards */}
          {centerSubHorizontal.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-b border-hairline">
              {centerSubHorizontal.slice(0, 2).map((item) => (
                <article key={item._id}>
                  <Link
                    to={`/${item.category}/${item.slug}`}
                    className="group flex items-start gap-3"
                  >
                    <div className="flex-1">
                      <h4 className="font-headline text-[15px] font-bold leading-[1.4] text-primary group-hover:text-brand-red transition-colors line-clamp-3">
                        {item.kicker && (
                          <span className="text-brand-red mr-1">
                            {item.kicker} •
                          </span>
                        )}
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-1 text-[12px] text-meta mt-2">
                        <Clock className="w-3 h-3 text-meta" />
                        <span>{getRelativeTimeBangla(item.publishedAt)}</span>
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
              ))}
            </div>
          )}

          {/* (c) Three vertical image cards */}
          {centerSubVertical.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-b border-hairline">
              {centerSubVertical.slice(0, 3).map((item) => (
                <article key={item._id}>
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
                    <h4 className="font-headline text-[16px] font-bold leading-[1.35] text-primary group-hover:text-brand-red transition-colors line-clamp-3">
                      {item.kicker && (
                        <span className="text-brand-red mr-1">
                          {item.kicker} •
                        </span>
                      )}
                      {item.title}
                    </h4>
                    <p className="text-[12px] text-excerpt leading-[1.5] mt-1 line-clamp-2">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-meta mt-2">
                      <Clock className="w-3 h-3 text-meta" />
                      <span>{getRelativeTimeBangla(item.publishedAt)}</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}

          {/* (d) Three text-only items */}
          {centerTextOnly.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {centerTextOnly.slice(0, 3).map((item) => (
                <article key={item._id} className="border-r last:border-r-0 border-hairline pr-3">
                  <Link
                    to={`/${item.category}/${item.slug}`}
                    className="group flex flex-col"
                  >
                    <h4 className="font-headline text-[15px] font-bold leading-[1.4] text-primary group-hover:text-brand-red transition-colors line-clamp-3">
                      {item.title}
                    </h4>
                    <p className="text-[12px] text-excerpt leading-[1.5] mt-1.5 line-clamp-2">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-meta mt-2">
                      <Clock className="w-3 h-3 text-meta" />
                      <span>{getRelativeTimeBangla(item.publishedAt)}</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* --- RIGHT COLUMN (3/12 ~ 25%) --- */}
        <div className="lg:col-span-3 lg:pl-5 mt-6 lg:mt-0 flex flex-col">
          {/* 300x250 AdSlot */}
          <AdBanner slot="hero-right" size="300x250" />

          {/* Compact rows (text left, 72x72 thumb right) */}
          <div className="flex flex-col divide-y divide-hairline mt-2">
            {right.map((item) => (
              <article key={item._id} className="py-3 first:pt-1 last:pb-0">
                <Link
                  to={`/${item.category}/${item.slug}`}
                  className="group flex items-start justify-between gap-2.5"
                >
                  <div className="flex-1">
                    <h4 className="font-headline text-[15px] font-bold leading-[1.4] text-primary group-hover:text-brand-red transition-colors">
                      {item.kicker && (
                        <span className="text-brand-red font-bold mr-1">
                          {item.kicker} •
                        </span>
                      )}
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-1 text-[12px] text-meta mt-1.5">
                      <Clock className="w-3 h-3 text-meta" />
                      <span>{getRelativeTimeBangla(item.publishedAt)}</span>
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
