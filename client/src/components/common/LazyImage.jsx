import React, { useState, useEffect } from 'react';

// Deterministic palette of editorial photographic gradients
const colorThemes = [
  { c1: '#1E3A8A', c2: '#3B82F6', title: 'নদী ও প্রকৃতি' }, // Blue
  { c1: '#064E3B', c2: '#10B981', title: 'সবুজ বাংলাদেশ' }, // Green
  { c1: '#7C2D12', c2: '#F97316', title: 'নগর ও জীবন' }, // Warm Sunset
  { c1: '#312E81', c2: '#8B5CF6', title: 'আন্তর্জাতিক' }, // Purple
  { c1: '#831843', c2: '#EC4899', title: 'বিনোদন ও সংস্কৃতি' }, // Magenta
  { c1: '#1F2937', c2: '#4B5563', title: 'বাণিজ্য ও অর্থনীতি' }, // Slate
];

function getEditorialSvg(seed = '') {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const theme = colorThemes[Math.abs(hash) % colorThemes.length];

  return `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <defs>
        <linearGradient id="g_${Math.abs(hash)}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${theme.c1}" />
          <stop offset="100%" stop-color="${theme.c2}" />
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#g_${Math.abs(hash)})" />
      <circle cx="450" cy="120" r="70" fill="white" opacity="0.12" />
      <polygon points="50,380 260,200 400,380" fill="white" opacity="0.15" />
      <polygon points="200,380 380,160 550,380" fill="white" opacity="0.10" />
      <text x="50" y="360" font-family="'Hind Siliguri', sans-serif" font-size="20" font-weight="700" fill="white" opacity="0.8">খবরঘর</text>
    </svg>
  `)}`;
}

export default function LazyImage({
  src,
  alt = '',
  className = '',
  aspectRatio = 'aspect-[3/2]',
  priority = false,
}) {
  const fallback = getEditorialSvg(alt || 'khaborghor');
  const [imgSrc, setImgSrc] = useState(src || fallback);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (src) {
      setImgSrc(src);
      setIsLoaded(false);
    } else {
      setImgSrc(fallback);
      setIsLoaded(true);
    }
  }, [src, fallback]);

  const handleError = () => {
    setImgSrc(fallback);
    setIsLoaded(true);
  };

  return (
    <div
      className={`overflow-hidden ${aspectRatio} relative flex-shrink-0 bg-cover bg-center bg-[#E5E5E5]`}
      style={{ backgroundImage: `url("${fallback}")` }}
    >
      <img
        src={imgSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      />
    </div>
  );
}
