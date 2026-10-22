import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Newspaper, Globe, Menu, X, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import CategoryDrawer from './CategoryDrawer';
import SearchModal from './SearchModal';
import EpaperModal from './EpaperModal';
import { toBanglaDigits } from '../../utils/formatters';

const navItems = [
  { name: 'সর্বশেষ', slug: 'latest' },
  { name: 'বাংলাদেশ', slug: 'bangladesh' },
  { name: 'রাজনীতি', slug: 'politics' },
  { name: 'বিশ্ব', slug: 'world' },
  { name: 'বাণিজ্য', slug: 'business' },
  { name: 'মতামত', slug: 'opinion' },
  { name: 'খেলা', slug: 'sports' },
  { name: 'বিনোদন', slug: 'entertainment' },
  { name: 'চাকরি', slug: 'jobs' },
  { name: 'জীবনযাপন', slug: 'lifestyle' },
  { name: 'ভিডিও', slug: 'video' },
];

function getHeaderBanglaDate() {
  const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  const months = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];
  const now = new Date();
  const dayName = days[now.getDay()];
  const dateNum = toBanglaDigits(now.getDate());
  const monthName = months[now.getMonth()];
  const yearNum = toBanglaDigits(now.getFullYear());
  return `${dayName}, ${dateNum} ${monthName} ${yearNum}`;
}

export default function Header({ topTeasers = [] }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEpaperOpen, setIsEpaperOpen] = useState(false);
  const [isEnglishNoticeOpen, setIsEnglishNoticeOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const formattedDate = getHeaderBanglaDate();

  return (
    <>
      <header className="w-full bg-white">
        {/* ROW 1: Wordmark & Top Teasers (~100px) */}
        <div className="max-w-[1248px] mx-auto px-4 h-[94px] flex items-center justify-between">
          {/* Two-tone Wordmark with Authentic Dateline */}
          <div className="flex flex-col justify-center py-1">
            <Link to="/" className="inline-flex items-center group" aria-label="খবরঘর হোমপেজ">
              <span className="font-headline text-[44px] md:text-[50px] font-black tracking-tight leading-none text-primary">
                খবর
              </span>
              <span className="font-headline text-[44px] md:text-[50px] font-black tracking-tight leading-none text-brand-red">
                ঘর
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-brand-red ml-1.5 self-center inline-block"></span>
            </Link>
            <div className="text-[11px] text-meta font-medium tracking-normal flex items-center gap-1.5 mt-0.5">
              <span>ঢাকা</span>
              <span>•</span>
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* Right: Strip of 3 Top Teasers with hairline dividers between them */}
          <div className="hidden lg:flex items-center divide-x divide-hairline">
            {topTeasers.slice(0, 3).map((item, idx) => (
              <div key={item._id} className={idx === 0 ? 'pr-5' : 'px-5'}>
                <Link
                  to={`/${item.category}/${item.slug}`}
                  className="flex items-center gap-2.5 group max-w-[210px]"
                >
                  {/* 40x30 thumbnail */}
                  <div className="w-[40px] h-[30px] overflow-hidden bg-gray-200 flex-shrink-0 border border-[#EAEAEA]">
                    <img
                      src={item.coverImage?.url || 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=100'}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  {/* 12px two-line text with red bullet */}
                  <p className="text-[12px] leading-[1.35] text-primary group-hover:text-brand-red line-clamp-2">
                    <span className="text-brand-red font-bold mr-1">●</span>
                    {item.title}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: Sticky Nav & Utilities (~48px) */}
        <div className="sticky top-0 z-40 bg-white border-y border-hairline">
          <div className="max-w-[1248px] mx-auto px-4 h-[44px] flex items-center justify-between">
            {/* Primary Navigation Links */}
            <nav className="flex items-center gap-4 xl:gap-5 overflow-x-auto no-scrollbar py-1">
              {navItems.map((item) => {
                const isActive =
                  item.slug === 'latest'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(`/${item.slug}`);

                return (
                  <Link
                    key={item.slug}
                    to={item.slug === 'latest' ? '/' : `/${item.slug}`}
                    className={`relative text-[15px] font-semibold whitespace-nowrap transition-colors py-2.5 ${
                      isActive
                        ? 'text-brand-red'
                        : 'text-primary hover:text-brand-red'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-brand-red" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Utilities with vertical hairline dividers */}
            <div className="flex items-center h-full flex-shrink-0 border-l border-hairline ml-2">
              {/* Search button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="h-full px-3 flex items-center gap-1.5 text-brand-blue hover:opacity-80 transition-opacity border-r border-hairline"
                aria-label="অনুসন্ধান"
              >
                <Search className="w-4 h-4 text-brand-blue" />
                <span className="text-[14px] font-semibold hidden sm:inline">খুঁজুন</span>
              </button>

              {/* E-paper modal trigger */}
              <button
                type="button"
                onClick={() => setIsEpaperOpen(true)}
                className="h-full px-3 hidden md:flex items-center gap-1 text-[#444444] hover:text-brand-red transition-colors border-r border-hairline"
                aria-label="ই-পেপার সংস্করণ দেখুন"
              >
                <Newspaper className="w-4 h-4 text-gray-700" />
                <span className="text-[13px] font-medium">ই-পেপার</span>
              </button>

              {/* Language toggle (English Edition notice) */}
              <div className="h-full px-3 hidden sm:flex items-center border-r border-hairline">
                <button
                  type="button"
                  onClick={() => setIsEnglishNoticeOpen(true)}
                  className="px-2 py-0.5 bg-[#F8EEEE] hover:bg-[#F0D5D5] text-brand-red rounded-full text-[12px] font-medium flex items-center gap-1 transition-colors"
                  aria-label="Switch to English edition"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Eng</span>
                </button>
              </div>

              {/* Login / Profile with red dot prefix */}
              <div className="h-full px-3 flex items-center border-r border-hairline">
                {user ? (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:text-brand-red transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-brand-red"></span>
                    <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:text-brand-red transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-brand-red"></span>
                    <span className="hidden sm:inline">লগইন</span>
                  </Link>
                )}
              </div>

              {/* Hamburger Drawer Button */}
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="h-full px-3 text-gray-800 hover:text-brand-red transition-colors flex items-center"
                aria-label="বিভাগসমূহ দেখুন"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-out Category Drawer */}
      <CategoryDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        categories={navItems.map((n) => ({ nameBn: n.name, slug: n.slug }))}
      />

      {/* Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Interactive E-Paper Viewer Modal */}
      <EpaperModal
        isOpen={isEpaperOpen}
        onClose={() => setIsEpaperOpen(false)}
      />

      {/* English Edition Announcement Modal */}
      {isEnglishNoticeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white max-w-md w-full p-6 rounded shadow-2xl border border-hairline relative">
            <button
              onClick={() => setIsEnglishNoticeOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1"
              aria-label="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-5 h-5 text-brand-red" />
              <h3 className="font-headline text-lg font-bold text-primary">
                KhaborGhor English Edition
              </h3>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Our dedicated English digital newsroom and international portal are currently undergoing final rollout. We are committed to bringing balanced reporting from Bangladesh to a global audience.
            </p>

            <div className="p-3 bg-gray-50 border border-hairline rounded text-xs text-gray-500 mb-5">
              <span>শীঘ্রই উন্মোচিত হতে যাচ্ছে খবরঘর ইংরেজি সংস্করণ। নিয়মিত আপডেটের জন্য সঙ্গে থাকুন।</span>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEnglishNoticeOpen(false)}
                className="px-4 py-2 bg-primary hover:bg-black text-white text-xs font-semibold rounded transition-colors"
              >
                বুঝেছি (Close)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
