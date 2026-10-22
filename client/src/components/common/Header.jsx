import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Newspaper, Globe, User as UserIcon, Menu } from 'lucide-react';
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
        <div className="max-w-[1240px] mx-auto px-4 h-[92px] flex items-center justify-between">
          {/* Two-tone Wordmark */}
          <Link to="/" className="inline-flex items-center group py-2" aria-label="খবরঘর হোমপেজ">
            <span className="font-headline text-[48px] md:text-[54px] font-black tracking-tight leading-none text-primary group-hover:opacity-95">
              খবর
            </span>
            <span className="font-headline text-[48px] md:text-[54px] font-black tracking-tight leading-none text-brand-red group-hover:opacity-95">
              ঘর
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-brand-red ml-1.5 self-center inline-block"></span>
          </Link>

          {/* Right: Strip of 3 Top Teasers (Desktop) */}
          <div className="hidden lg:flex items-center gap-6">
            {topTeasers.slice(0, 3).map((item) => (
              <Link
                key={item._id}
                to={`/${item.category}/${item.slug}`}
                className="flex items-center gap-2.5 group max-w-[210px]"
              >
                {/* 36x28 thumbnail */}
                <div className="w-[36px] h-[28px] overflow-hidden bg-gray-200 flex-shrink-0">
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
            ))}
          </div>
        </div>

        {/* ROW 2: Sticky Nav & Utilities (~48px) */}
        <div className="sticky top-0 z-40 bg-white border-y border-hairline shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="max-w-[1240px] mx-auto px-4 h-[46px] flex items-center justify-between">
            {/* Primary Navigation Links */}
            <nav className="flex items-center gap-5 overflow-x-auto no-scrollbar py-1">
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

            {/* Right Utilities */}
            <div className="flex items-center gap-3.5 flex-shrink-0 pl-3">
              {/* Search button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-1.5 text-brand-blue hover:opacity-80 transition-opacity"
                aria-label="অনুসন্ধান"
              >
                <Search className="w-4 h-4 text-brand-blue" />
                <span className="text-[14px] font-semibold hidden sm:inline">খুঁজুন</span>
              </button>

              {/* E-paper */}
              <a
                href="#epaper"
                className="hidden md:flex items-center gap-1 text-[#444444] hover:text-brand-red transition-colors"
              >
                <Newspaper className="w-4 h-4" />
                <span className="text-[13px] font-medium">ই-পেপার</span>
              </a>

              {/* Language pill */}
              <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 bg-[#F1F3F5] rounded-full text-[12px] font-medium text-gray-700 cursor-default">
                <Globe className="w-3.5 h-3.5 text-gray-500" />
                <span>Eng</span>
              </div>

              {/* Login / Profile */}
              {user ? (
                <Link
                  to="/admin"
                  className="flex items-center gap-1 text-[13px] font-semibold text-primary hover:text-brand-red transition-colors"
                >
                  <UserIcon className="w-4 h-4 text-brand-red" />
                  <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-1 text-[13px] font-semibold text-primary hover:text-brand-red transition-colors"
                >
                  <UserIcon className="w-4 h-4 text-gray-600" />
                  <span className="hidden sm:inline">লগইন</span>
                </Link>
              )}

              {/* Hamburger Drawer Button */}
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="p-1 text-gray-800 hover:text-brand-red transition-colors"
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
