import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../common/SectionHeader';
import LazyImage from '../common/LazyImage';
import { CameraBadge } from '../common/Badges';
import { getRelativeTimeBangla } from '../../utils/formatters';

export default function LifestyleSection({ lifestyleItems = [] }) {
  if (!lifestyleItems || lifestyleItems.length === 0) return null;

  return (
    <section className="w-full my-8">
      <SectionHeader title="জীবনযাপন" href="/lifestyle" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-x divide-hairline items-stretch">
        {lifestyleItems.slice(0, 4).map((item, index) => (
          <article key={item._id} className={index === 0 ? 'pr-4' : index === 3 ? 'pl-4' : 'px-4'}>
            <Link
              to={`/lifestyle/${item.slug}`}
              className="group flex flex-col h-full"
            >
              {/* Near-square image with camera badge on 3rd and 4th card */}
              <div className="w-full relative mb-2.5">
                <LazyImage
                  src={item.coverImage?.url}
                  alt={item.title}
                  aspectRatio="aspect-[4/3]"
                />
                {(index === 2 || index === 3) && <CameraBadge className="top-2 left-2" />}
              </div>

              <h4 className="font-headline text-[17px] font-bold leading-[1.35] text-primary group-hover:text-brand-red transition-colors line-clamp-3">
                {item.title}
              </h4>

              {item.excerpt && (
                <p className="text-[13px] text-excerpt leading-[1.55] mt-1.5 line-clamp-3">
                  {item.excerpt}
                </p>
              )}

              <div className="text-[11px] text-meta mt-auto pt-2">
                {getRelativeTimeBangla(item.publishedAt)}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
