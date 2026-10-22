import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import LazyImage from '../common/LazyImage';
import { PlayBadge } from '../common/Badges';
import { getRelativeTimeBangla } from '../../utils/formatters';

export default function VideoCarousel({ videos = [] }) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const totalDots = 6;

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = scrollLeft / (scrollWidth - clientWidth || 1);
      const index = Math.min(
        totalDots - 1,
        Math.floor(progress * totalDots + 0.1)
      );
      setActiveIndex(index);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = 270;
      const amount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  if (!videos || videos.length === 0) return null;

  return (
    <section className="w-full my-8">
      <SectionHeader title="ভিডিও" href="/video" />

      {/* Carousel Container with Relative Controls */}
      <div className="relative group">
        {/* Left 36px Square Button */}
        <button
          onClick={() => scroll('left')}
          className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-ink hover:bg-black text-white flex items-center justify-center shadow transition-opacity"
          aria-label="পূর্ববর্তী ভিডিও"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        {/* Scroll Snap Row: ~4.5 cards visible */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar py-2 px-1"
        >
          {videos.map((item) => (
            <article
              key={item._id}
              className="w-[255px] flex-shrink-0 snap-start bg-[#E7F0FB] p-2.5 flex flex-col group/card"
            >
              <Link to={`/video/${item.slug}`} className="flex flex-col h-full">
                {/* 3:2 Image with Red Play Badge */}
                <div className="w-full relative">
                  <LazyImage
                    src={item.coverImage?.url}
                    alt={item.title}
                    aspectRatio="aspect-[3/2]"
                  />
                  <PlayBadge className="top-2 left-2" />
                </div>

                {/* Content: centered text */}
                <div className="flex-1 flex flex-col justify-between pt-2.5 text-center">
                  <div>
                    <h3 className="font-headline text-[15px] font-bold leading-[1.35] text-primary group-hover/card:text-brand-red transition-colors line-clamp-3">
                      {item.title}
                    </h3>
                    {item.excerpt && (
                      <p className="text-[12px] text-excerpt leading-[1.45] mt-1.5 line-clamp-2">
                        {item.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-center gap-1 text-[11px] text-meta mt-2.5 pt-2 border-t border-[#D5E3F5]">
                    <Clock className="w-3 h-3 text-meta" />
                    <span>{getRelativeTimeBangla(item.publishedAt)}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Right 36px Square Button */}
        <button
          onClick={() => scroll('right')}
          className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-ink hover:bg-black text-white flex items-center justify-center shadow transition-opacity"
          aria-label="পরবর্তী ভিডিও"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* 6 Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {Array.from({ length: totalDots }).map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === activeIndex ? 'bg-primary' : 'bg-[#CFCFCF]'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
