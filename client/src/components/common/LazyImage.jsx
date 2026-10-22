import React, { useState } from 'react';

// Elegant SVG fallback with neutral editorial tones
const fallbackSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#EAEAEA" />
        <stop offset="100%" stop-color="#D4D4D4" />
      </linearGradient>
    </defs>
    <rect width="600" height="400" fill="url(#g)" />
    <circle cx="300" cy="180" r="40" fill="#BFBFBF" />
    <path d="M 230 260 L 280 200 L 330 250 L 370 210 L 410 260 Z" fill="#BFBFBF" />
    <text x="300" y="310" font-family="'Hind Siliguri', sans-serif" font-size="18" font-weight="600" fill="#777777" text-anchor="middle">খবরঘর</text>
  </svg>
`)}`;

export default function LazyImage({
  src,
  alt = '',
  className = '',
  aspectRatio = 'aspect-[3/2]',
  priority = false,
}) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSvg);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSvg);
    }
  };

  return (
    <div className={`overflow-hidden bg-[#ECECEC] ${aspectRatio} relative flex-shrink-0`}>
      <img
        src={imgSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${className}`}
      />
    </div>
  );
}
