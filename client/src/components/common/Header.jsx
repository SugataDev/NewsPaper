import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Newspaper, Globe, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import CategoryDrawer from './CategoryDrawer';
import SearchModal from './SearchModal';

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

export default function Header({ topTeasers = [] }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  return (
    <>
      <header className="w-full bg-white">
        {/* ROW 1: Wordmark & Top Teasers (~100px) */}
        <div className="max-w-[1248px] mx-auto px-4 h-[94px] flex items-center justify-between">
          {/* Two-tone Wordmark */}
          <Link to="/" className="inline-flex items-center group py-2" aria-label="খবরঘর হোমপেজ">
            <span className="font-headline text-[48px] md:text-[54px] font-black tracking-tight leading-none text-primary">
              খবর
            </span>
            <span className="font-headline text-[48px] md:text-[54px] font-black tracking-tight leading-none text-brand-red">
              ঘর
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-brand-red ml-1.5 self-center inline-block"></span>
          </Link>

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

              {/* E-paper */}
              <a
                href="#epaper"
                className="h-full px-3 hidden md:flex items-center gap-1 text-[#444444] hover:text-brand-red transition-colors border-r border-hairline"
              >
                <Newspaper className="w-4 h-4" />
                <span className="text-[13px] font-medium">ই-পেপার</span>
              </a>

              {/* Language pill */}
              <div className="h-full px-3 hidden sm:flex items-center border-r border-hairline">
                <span className="px-2 py-0.5 bg-[#F8EEEE] text-brand-red rounded-full text-[12px] font-medium flex items-center gap-1 cursor-default">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Eng</span>
                </span>
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
                    <span className="hidden sm:inline">Login</span>
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
    </>
  );
}
