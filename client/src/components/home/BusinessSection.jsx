import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import LazyImage from '../common/LazyImage';
import { getRelativeTimeBangla } from '../../utils/formatters';

export default function BusinessSection({ businessData }) {
  if (!businessData) return null;

  const { lead, grid = [] } = businessData;

  return (
    <section className="w-full my-8">
      <SectionHeader title="বাণিজ্য" href="/business" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Half (50% / 6 cols) */}
        <div className="lg:col-span-6 lg:pr-6 lg:border-r border-hairline">
          {lead && (
            <article className="group flex flex-col">
              <Link to={`/business/${lead.slug}`} className="flex flex-col">
                <div className="w-full mb-3">
                  <LazyImage
                    src={lead.coverImage?.url}
                    alt={lead.title}
                    aspectRatio="aspect-[3/2]"
                  />
                </div>
                <h3 className="font-headline text-[22px] md:text-[24px] font-bold leading-[1.3] text-primary group-hover:text-brand-red transition-colors">
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

        {/* Right Half: 2 cols x 2 vertical cards (50% / 6 cols) */}
        <div className="lg:col-span-6 lg:pl-6 mt-6 lg:mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-6">
            {grid.slice(0, 4).map((item) => (
              <article key={item._id}>
                <Link
                  to={`/business/${item.slug}`}
                  className="group flex flex-col"
                >
                  <div className="w-full mb-2">
                    <LazyImage
                      src={item.coverImage?.url}
                      alt={item.title}
                      aspectRatio="aspect-[3/2]"
                    />
                  </div>
                  <h4 className="font-headline text-[15px] md:text-[16px] font-bold leading-[1.35] text-primary group-hover:text-brand-red transition-colors line-clamp-3">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-meta mt-2">
                    <Clock className="w-3 h-3 text-meta" />
                    <span>{getRelativeTimeBangla(item.publishedAt)}</span>
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
