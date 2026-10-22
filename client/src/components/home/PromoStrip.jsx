import React from 'react';
import { Link } from 'react-router-dom';
import LazyImage from '../common/LazyImage';

const kickerColors = [
  'text-[#E2262D]', // Red
  'text-[#F59E0B]', // Amber/Yellow
  'text-[#38BDF8]', // Sky blue
  'text-[#FB923C]', // Orange
];

export default function PromoStrip({ items = [] }) {
  if (!items || items.length === 0) return null;

  const displayItems = items.slice(0, 4);

  return (
    <div className="w-full bg-[#FDF1EF] py-6 my-8 border-y border-[#F9E2DF]">
      <div className="max-w-[1240px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {displayItems.map((item, idx) => (
            <Link
              key={item._id}
              to={`/${item.category}/${item.slug}`}
              className="group bg-[#141414] hover:bg-black transition-colors h-[108px] flex items-stretch overflow-hidden"
            >
              {/* Image on left (~45%) */}
              <div className="w-[45%] flex-shrink-0 relative">
                <LazyImage
                  src={item.coverImage?.url}
                  alt={item.title}
                  aspectRatio="aspect-auto h-full"
                  className="h-full object-cover"
                />
              </div>

              {/* Right text container */}
              <div className="w-[55%] p-2.5 flex flex-col justify-center">
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider mb-1 line-clamp-1 ${
                    kickerColors[idx % kickerColors.length]
                  }`}
                >
                  {item.kicker || 'বিশেষ'}
                </span>
                <h4 className="font-headline text-[14px] font-bold text-white group-hover:text-gray-200 leading-[1.3] line-clamp-3">
                  {item.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
