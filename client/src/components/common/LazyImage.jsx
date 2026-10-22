import React, { useState, useEffect } from 'react';

// Clean editorial photographic placeholder for news publication
function getEditorialSvg(seed = '') {
  return `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <rect width="600" height="400" fill="#F0F2F5" />
      <rect x="230" y="145" width="140" height="95" rx="6" fill="#DDE1E6" />
      <circle cx="300" cy="192" r="28" fill="#F0F2F5" />
      <circle cx="300" cy="192" r="18" fill="#B4BAC3" />
      <polygon points="280,145 290,135 320,135 330,145" fill="#DDE1E6" />
      <circle cx="350" cy="160" r="5" fill="#B4BAC3" />
      <text x="300" y="275" font-family="'Hind Siliguri', 'Noto Sans Bengali', sans-serif" font-size="14" font-weight="600" fill="#666666" text-anchor="middle">খবরঘর আলোকচিত্র</text>
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
