import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TrendingTopicsBar({ topics = [] }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!topics || topics.length === 0) return null;

  return (
    <div className="w-full my-4 py-2 border-y border-hairline bg-white">
      <div className="flex items-center gap-3">
        {/* Label */}
        <span className="font-headline text-[14px] font-bold text-primary whitespace-nowrap flex-shrink-0">
          আলোচিত বিষয়:
        </span>

        {/* Scrollable chip strip */}
        <div
          ref={scrollRef}
          className="flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1"
        >
          {topics.map((topic) => (
            <Link
              key={topic._id || topic.slug}
              to={`/topic/${topic.slug}`}
              className="h-[28px] px-3 bg-[#F5F5F5] border border-[#D9D9D9] hover:border-brand-red hover:text-brand-red rounded-full text-[12px] font-medium text-gray-800 flex items-center whitespace-nowrap transition-colors flex-shrink-0"
            >
              {topic.nameBn}
            </Link>
          ))}
        </div>

        {/* Scroll arrow buttons */}
        <div className="flex items-center gap-1.5 flex-shrink-0 pl-1">
          <button
            onClick={() => scroll('left')}
            className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-black hover:border-black transition-colors"
            aria-label="আগের বিষয়সমূহ"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-black hover:border-black transition-colors"
            aria-label="পরের বিষয়সমূহ"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
