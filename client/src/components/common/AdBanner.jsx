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
      <div className={`w-[300px] h-[250px] bg-ad mx-auto my-2 flex flex-col items-center justify-center border border-hairline relative text-[#999999] ${className}`}>
        <span className="text-[10px] font-body tracking-wider mb-1 text-[#999999]">বিজ্ঞাপন</span>
        <div className="w-16 h-0.5 bg-[#E0E0E0] rounded"></div>
      </div>
    );
  }

  const content = (
    <div
      className={`w-full max-w-[970px] mx-auto ${height} flex flex-col items-center justify-center relative text-[#999999] ${className}`}
    >
      <span className="text-[10px] font-body tracking-wider text-[#999999]">বিজ্ঞাপন</span>
      <div className="w-20 h-0.5 bg-[#E0E0E0] mt-1 rounded"></div>
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
