import React, { useState, useEffect } from 'react';

export default function AdBanner({
  slot,
  height = 'h-[90px]',
  fullBleed = true,
  className = '',
  size = 'responsive',
}) {
  const [adData, setAdData] = useState(null);

  useEffect(() => {
    if (slot) {
      fetch(`/api/ads/${slot}`)
        .then((res) => {
          if (res.ok) return res.json();
          return null;
        })
        .then((data) => {
          if (data && data.active) {
            setAdData(data);
          }
        })
        .catch(() => {});
    }
  }, [slot]);

  if (size === '300x250') {
    return (
      <div
        className={`w-[300px] h-[250px] bg-ad mx-auto my-2 flex flex-col items-center justify-center border border-hairline relative text-[#666666] overflow-hidden ${className}`}
      >
        {adData?.imageUrl ? (
          <a
            href={adData.targetUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-full block relative group"
          >
            <img
              src={adData.imageUrl}
              alt={adData.title || 'বিজ্ঞাপন'}
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-1 right-2 bg-black/60 text-white text-[9px] px-1 py-0.5 rounded">
              বিজ্ঞাপন
            </span>
          </a>
        ) : (
          <>
            <span className="text-[11px] font-medium tracking-wide mb-1 text-[#666666]">
              বিজ্ঞাপন
            </span>
            <div className="w-16 h-0.5 bg-[#D0D0D0] rounded"></div>
            {adData?.title && (
              <span className="text-[10px] text-gray-500 mt-2 px-2 text-center line-clamp-1">
                {adData.title}
              </span>
            )}
          </>
        )}
      </div>
    );
  }

  const content = (
    <div
      className={`w-full max-w-[970px] mx-auto ${height} flex flex-col items-center justify-center relative text-[#666666] overflow-hidden ${className}`}
    >
      {adData?.imageUrl ? (
        <a
          href={adData.targetUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-full block relative"
        >
          <img
            src={adData.imageUrl}
            alt={adData.title || 'বিজ্ঞাপন'}
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-1 right-2 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded">
            বিজ্ঞাপন
          </span>
        </a>
      ) : (
        <>
          <span className="text-[11px] font-medium tracking-wide text-[#666666]">
            বিজ্ঞাপন
          </span>
          <div className="w-20 h-0.5 bg-[#D0D0D0] mt-1 rounded"></div>
          {adData?.title && (
            <span className="text-[10px] text-gray-500 mt-1 line-clamp-1">
              {adData.title}
            </span>
          )}
        </>
      )}
    </div>
  );

  if (fullBleed) {
    return (
      <div className="w-full my-5 bg-ad border-y border-hairline overflow-hidden py-2 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return <div className="my-5 bg-ad border-y border-hairline py-2">{content}</div>;
}
