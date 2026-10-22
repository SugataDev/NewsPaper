import React from 'react';

export default function AdBanner({
  slot,
  height = 'h-[90px]',
  fullBleed = true,
  className = '',
  size = 'responsive',
}) {
  if (size === '300x250') {
    return (
      <div className={`w-[300px] h-[250px] bg-ad mx-auto my-3 flex flex-col items-center justify-center border border-hairline relative text-[#999999] ${className}`}>
        <span className="text-[11px] font-body tracking-wider mb-1">বিজ্ঞাপন</span>
        <div className="w-16 h-0.5 bg-[#E0E0E0] rounded"></div>
      </div>
    );
  }

  const content = (
    <div
      className={`w-full ${height} bg-ad flex flex-col items-center justify-center relative text-[#999999] border-y border-hairline ${className}`}
    >
      <span className="text-[11px] font-body tracking-wider">বিজ্ঞাপন</span>
    </div>
  );

  if (fullBleed) {
    return (
      <div className="w-full my-6 bg-ad overflow-hidden">
        {content}
      </div>
    );
  }

  return <div className="my-6">{content}</div>;
}
