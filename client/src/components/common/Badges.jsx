import React from 'react';
import { Camera } from 'lucide-react';

export function PlayBadge({ className = 'top-2 left-2' }) {
  return (
    <div
      className={`absolute ${className} w-7 h-7 bg-brand-red rounded-full flex items-center justify-center shadow-sm z-10 pointer-events-none`}
      aria-label="ভিডিও"
    >
      <svg className="w-3.5 h-3.5 text-white ml-0.5 fill-current" viewBox="0 0 24 24">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    </div>
  );
}

export function CameraBadge({ className = 'top-2 left-2' }) {
  return (
    <div
      className={`absolute ${className} w-7 h-7 bg-brand-red rounded-full flex items-center justify-center shadow-sm z-10 pointer-events-none`}
      aria-label="ছবি গ্যালারি"
    >
      <Camera className="w-3.5 h-3.5 text-white" />
    </div>
  );
}
