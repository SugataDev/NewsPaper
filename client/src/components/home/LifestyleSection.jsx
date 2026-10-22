import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import LazyImage from '../common/LazyImage';
import { CameraBadge, PlayBadge } from '../common/Badges';
import { getRelativeTimeBangla } from '../../utils/formatters';

export default function LifestyleSection({ lifestyleItems = [] }) {
  if (!lifestyleItems || lifestyleItems.length === 0) return null;

  return (
    <section className="w-full my-8">
      <SectionHeader title="জীবনযাপন" href="/lifestyle" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {lifestyleItems.slice(0, 4).map((item, index) => (
          <article key={item._id}>
            <Link
              to={`/lifestyle/${item.slug}`}
              className="group flex flex-col h-full"
            >
              {/* Near-square image with badge on some */}
              <div className="w-full relative mb-2.5">
                <LazyImage
                  src={item.coverImage?.url}
                  alt={item.title}
                  aspectRatio="aspect-square"
                />
                {index === 0 && <CameraBadge />}
                {index === 2 && <PlayBadge />}
              </div>

              <h4 className="font-headline text-[17px] md:text-[18px] font-bold leading-[1.35] text-primary group-hover:text-brand-red transition-colors line-clamp-3">
                {item.title}
              </h4>

              {item.excerpt && (
                <p className="text-[13px] text-excerpt leading-[1.55] mt-1.5 line-clamp-3">
                  {item.excerpt}
                </p>
              )}

              <div className="flex items-center gap-1 text-[11px] text-meta mt-2 pt-1">
                <Clock className="w-3 h-3 text-meta" />
                <span>{getRelativeTimeBangla(item.publishedAt)}</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
