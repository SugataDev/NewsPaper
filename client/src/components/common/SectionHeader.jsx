import React from 'react';
import { Link } from 'react-router-dom';

export default function SectionHeader({
  title,
  href = null,
  dotColor = null,
  showArrow = true,
  className = '',
  rightElement = null,
}) {
  const content = (
    <span className="group inline-flex items-center gap-1.5 font-headline text-[24px] leading-tight text-primary hover:text-brand-red transition-colors">
      {dotColor && (
        <span
          className="w-2.5 h-2.5 rounded-full inline-block mr-1"
          style={{ backgroundColor: dotColor }}
        />
      )}
      <span>{title}</span>
      {showArrow && href && (
        <span className="text-brand-red text-[26px] font-normal leading-none group-hover:translate-x-0.5 transition-transform">
          ›
        </span>
      )}
    </span>
  );

  return (
    <div className={`pt-4 border-t border-hairline mb-4 flex items-center justify-between ${className}`}>
      {href ? (
        <Link to={href} className="inline-flex items-center">
          {content}
        </Link>
      ) : (
        <div className="inline-flex items-center">
          {content}
        </div>
      )}
      {rightElement}
    </div>
  );
}
