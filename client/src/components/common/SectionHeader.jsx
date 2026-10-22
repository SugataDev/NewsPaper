import React from 'react';
import { Link } from 'react-router-dom';

export default function SectionHeader({
  title,
  href,
  dotColor = null,
  showArrow = true,
  className = '',
  rightElement = null,
}) {
  return (
    <div className={`pt-4 border-t border-hairline mb-4 flex items-center justify-between ${className}`}>
      <Link
        to={href || '#'}
        className="group inline-flex items-center gap-1.5 font-headline text-[24px] leading-tight text-primary hover:text-brand-red transition-colors"
      >
        {dotColor && (
          <span
            className="w-2.5 h-2.5 rounded-full inline-block mr-1"
            style={{ backgroundColor: dotColor }}
          />
        )}
        <span>{title}</span>
        {showArrow && (
          <span className="text-brand-red text-[26px] font-normal leading-none group-hover:translate-x-0.5 transition-transform">
            ›
          </span>
        )}
      </Link>
      {rightElement}
    </div>
  );
}
