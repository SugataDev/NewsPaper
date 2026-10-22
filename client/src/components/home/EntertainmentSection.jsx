import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import LazyImage from '../common/LazyImage';
import { PlayBadge } from '../common/Badges';
import { getRelativeTimeBangla } from '../../utils/formatters';

export default function EntertainmentSection({ entertainmentData }) {
  if (!entertainmentData) return null;

  const { lead, left = [], right = [] } = entertainmentData;

  return (
    <section className="w-full my-8">
      <SectionHeader title="বিনোদন" href="/entertainment" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Column (~28% / 3 cols) */}
        <div className="lg:col-span-3 lg:pr-5 lg:border-r border-hairline flex flex-col divide-y divide-hairline">
          {left.slice(0, 3).map((item, idx) => (
            <article key={item._id} className="py-3.5 first:pt-0 last:pb-0">
              <Link
                to={`/entertainment/${item.slug}`}
                className="group flex items-start justify-between gap-2.5"
              >
                <div className="flex-1">
                  <h4 className="font-headline text-[14px] font-bold leading-[1.35] text-primary group-hover:text-brand-red transition-colors line-clamp-3">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-meta mt-1.5">
                    <Clock className="w-3 h-3 text-meta" />
                    <span>{getRelativeTimeBangla(item.publishedAt)}</span>
                  </div>
                </div>

                <div className="w-[72px] h-[72px] flex-shrink-0 relative">
                  <LazyImage
                    src={item.coverImage?.url}
                    alt={item.title}
                    aspectRatio="aspect-square"
                  />
                  {idx === 1 && <PlayBadge className="top-1 left-1 w-5 h-5 !p-0.5" />}
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Center Feature (~44% / 6 cols) */}
        <div className="lg:col-span-6 lg:px-6 lg:border-r border-hairline my-6 lg:my-0">
          {lead && (
            <article className="group flex flex-col">
              <Link to={`/entertainment/${lead.slug}`} className="flex flex-col">
                <div className="w-full mb-3">
                  <LazyImage
                    src={lead.coverImage?.url}
                    alt={lead.title}
                    aspectRatio="aspect-[4/3]"
                  />
                </div>
                <h3 className="font-headline text-[24px] md:text-[26px] font-bold leading-[1.3] text-primary group-hover:text-brand-red transition-colors">
                  {lead.title}
                </h3>
                <p className="text-[14px] leading-[1.6] text-excerpt mt-2 line-clamp-3">
                  {lead.excerpt}
                </p>
                <div className="flex items-center gap-1 text-[12px] text-meta mt-2">
                  <Clock className="w-3.5 h-3.5 text-meta" />
                  <span>{getRelativeTimeBangla(lead.publishedAt)}</span>
                </div>
              </Link>
            </article>
          )}
        </div>

        {/* Right Column (~28% / 3 cols) */}
        <div className="lg:col-span-3 lg:pl-5 flex flex-col divide-y divide-hairline">
          {right.slice(0, 3).map((item) => (
            <article key={item._id} className="py-3.5 first:pt-0 last:pb-0">
              <Link
                to={`/entertainment/${item.slug}`}
                className="group flex items-start justify-between gap-2.5"
              >
                <div className="flex-1">
                  <h4 className="font-headline text-[14px] font-bold leading-[1.35] text-primary group-hover:text-brand-red transition-colors line-clamp-3">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-meta mt-1.5">
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
    </section>
  );
}
