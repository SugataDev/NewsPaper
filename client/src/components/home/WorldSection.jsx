import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../common/SectionHeader';
import LazyImage from '../common/LazyImage';
import { getRelativeTimeBangla, parseKickerAndTitle } from '../../utils/formatters';

export default function WorldSection({ worldData }) {
  if (!worldData) return null;

  const { lead, grid = [] } = worldData;
  const parsedLead = lead ? parseKickerAndTitle(lead.title, lead.kicker) : null;

  return (
    <section className="w-full my-8">
      <SectionHeader title="বিশ্ব" href="/world" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
        {/* Left Half (50% / 6 cols) */}
        <div className="lg:col-span-6 lg:pr-6 lg:border-r border-hairline">
          {lead && (
            <article className="group flex flex-col">
              <Link to={`/world/${lead.slug}`} className="flex flex-col">
                <div className="w-full mb-3">
                  <LazyImage
                    src={lead.coverImage?.url}
                    alt={lead.title}
                    aspectRatio="aspect-[4/3]"
                  />
                </div>
                <h3 className="font-headline text-[24px] md:text-[26px] font-bold leading-[1.3] text-primary group-hover:text-brand-red transition-colors">
                  {parsedLead.kicker && (
                    <span className="text-brand-red mr-1.5 font-bold">
                      {parsedLead.kicker} •
                    </span>
                  )}
                  {parsedLead.title}
                </h3>
                <p className="text-[14px] leading-[1.6] text-excerpt mt-2 line-clamp-3">
                  {lead.excerpt}
                </p>
                <div className="text-[12px] text-meta mt-2">
                  {getRelativeTimeBangla(lead.publishedAt)}
                </div>
              </Link>
            </article>
          )}
        </div>

        {/* Right Half: 2x2 Grid with 1px dividers (50% / 6 cols) */}
        <div className="lg:col-span-6 lg:pl-6 mt-6 lg:mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-x divide-hairline">
            {/* Col 1 */}
            <div className="pr-4 space-y-6">
              {grid[0] && (
                <article>
                  <Link to={`/world/${grid[0].slug}`} className="group flex flex-col">
                    <div className="w-full mb-2">
                      <LazyImage
                        src={grid[0].coverImage?.url}
                        alt={grid[0].title}
                        aspectRatio="aspect-[3/2]"
                      />
                    </div>
                    <h4 className="font-headline text-[15px] font-bold leading-[1.35] text-primary group-hover:text-brand-red transition-colors line-clamp-3">
                      {grid[0].title}
                    </h4>
                    <div className="text-[11px] text-meta mt-1.5">
                      {getRelativeTimeBangla(grid[0].publishedAt)}
                    </div>
                  </Link>
                </article>
              )}
              {grid[2] && (
                <article className="pt-5 border-t border-hairline">
                  <Link to={`/world/${grid[2].slug}`} className="group flex flex-col">
                    <div className="w-full mb-2">
                      <LazyImage
                        src={grid[2].coverImage?.url}
                        alt={grid[2].title}
                        aspectRatio="aspect-[3/2]"
                      />
                    </div>
                    <h4 className="font-headline text-[15px] font-bold leading-[1.35] text-primary group-hover:text-brand-red transition-colors line-clamp-3">
                      {grid[2].title}
                    </h4>
                    <div className="text-[11px] text-meta mt-1.5">
                      {getRelativeTimeBangla(grid[2].publishedAt)}
                    </div>
                  </Link>
                </article>
              )}
            </div>

            {/* Col 2 */}
            <div className="pl-4 space-y-6">
              {grid[1] && (
                <article>
                  <Link to={`/world/${grid[1].slug}`} className="group flex flex-col">
                    <div className="w-full mb-2">
                      <LazyImage
                        src={grid[1].coverImage?.url}
                        alt={grid[1].title}
                        aspectRatio="aspect-[3/2]"
                      />
                    </div>
                    <h4 className="font-headline text-[15px] font-bold leading-[1.35] text-primary group-hover:text-brand-red transition-colors line-clamp-3">
                      {grid[1].title}
                    </h4>
                    <div className="text-[11px] text-meta mt-1.5">
                      {getRelativeTimeBangla(grid[1].publishedAt)}
                    </div>
                  </Link>
                </article>
              )}
              {grid[3] && (
                <article className="pt-5 border-t border-hairline">
                  <Link to={`/world/${grid[3].slug}`} className="group flex flex-col">
                    <div className="w-full mb-2">
                      <LazyImage
                        src={grid[3].coverImage?.url}
                        alt={grid[3].title}
                        aspectRatio="aspect-[3/2]"
                      />
                    </div>
                    <h4 className="font-headline text-[15px] font-bold leading-[1.35] text-primary group-hover:text-brand-red transition-colors line-clamp-3">
                      <span className="text-brand-red font-bold mr-1">
                        হুথি হামলা •
                      </span>
                      {parseKickerAndTitle(grid[3].title).title}
                    </h4>
                    <div className="text-[11px] text-meta mt-1.5">
                      {getRelativeTimeBangla(grid[3].publishedAt)}
                    </div>
                  </Link>
                </article>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
