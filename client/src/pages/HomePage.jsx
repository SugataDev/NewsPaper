import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import AdBanner from '../components/common/AdBanner';

import HeroSection from '../components/home/HeroSection';
import TrendingTopicsBar from '../components/home/TrendingTopicsBar';
import VideoCarousel from '../components/home/VideoCarousel';
import PromoStrip from '../components/home/PromoStrip';
import MostReadAndSportsSection from '../components/home/MostReadAndSportsSection';
import BangladeshSection from '../components/home/BangladeshSection';
import WorldSection from '../components/home/WorldSection';
import EntertainmentSection from '../components/home/EntertainmentSection';
import LifestyleSection from '../components/home/LifestyleSection';
import OpinionSection from '../components/home/OpinionSection';
import BusinessSection from '../components/home/BusinessSection';

async function fetchHomeData() {
  const res = await fetch('/api/home');
  if (!res.ok) throw new Error('হোমপেজের তথ্য লোড করতে ব্যর্থ হয়েছে');
  return res.json();
}

function HomeSkeleton() {
  return (
    <div className="max-w-[1240px] mx-auto px-4 py-8 animate-pulse">
      {/* Hero skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3 space-y-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="h-16 bg-[#EEEEEE] rounded" />
          ))}
        </div>
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-[3/2] bg-[#EEEEEE] rounded" />
          <div className="h-8 bg-[#EEEEEE] rounded w-3/4" />
          <div className="h-4 bg-[#EEEEEE] rounded w-full" />
        </div>
        <div className="lg:col-span-3 space-y-4">
          <div className="w-[300px] h-[250px] bg-[#EEEEEE] mx-auto rounded" />
          <div className="h-16 bg-[#EEEEEE] rounded" />
          <div className="h-16 bg-[#EEEEEE] rounded" />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['homeData'],
    queryFn: fetchHomeData,
    staleTime: 60 * 1000,
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>খবরঘর | শীর্ষ অনলাইন বাংলা দৈনিক ও সংবাদ পোর্টাল</title>
        <meta
          name="description"
          content="দেশ-বিদেশের সর্বশেষ সংবাদ, রাজনীতি, অর্থনীতি, খেলাধুলা, বিনোদন, জীবনযাপন ও নির্ভরযোগ্য মতামত নিয়ে বাংলা অনলাইন পত্রিকা খবরঘর।"
        />
        <meta property="og:title" content="খবরঘর | শীর্ষ অনলাইন বাংলা দৈনিক" />
        <meta
          property="og:description"
          content="বাংলাদেশ ও আন্তর্জাতিক সংবাদের সার্বক্ষণিক নির্ভরযোগ্য মাধ্যম খবরঘর।"
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* 1. Header (Wordmark + Teasers + Sticky Nav) */}
      <Header topTeasers={data?.topTeasers || []} />

      <main className="flex-1">
        {isLoading ? (
          <HomeSkeleton />
        ) : error ? (
          <div className="max-w-[1240px] mx-auto px-4 py-16 text-center text-red-600">
            <p className="text-lg font-bold mb-2">সংবাদ লোড করতে সমস্যা হয়েছে</p>
            <p className="text-sm text-gray-600">{error.message}</p>
          </div>
        ) : (
          <>
            {/* 2. Ad band (Leaderboard, ~90px tall, full-bleed #F0F0F0) */}
            <AdBanner slot="leaderboard" height="h-[90px]" fullBleed={true} />

            <div className="max-w-[1248px] mx-auto px-4">
              {/* 3. Hero Section (3 columns: 3/6/3) */}
              <HeroSection heroData={data?.hero} />
            </div>

            {/* 4. Ad band (Billboard, ~320px tall, full-bleed #F0F0F0) */}
            <AdBanner slot="billboard" height="h-[280px]" fullBleed={true} />

            <div className="max-w-[1248px] mx-auto px-4">
              {/* 5. Trending Topics Row */}
              <TrendingTopicsBar topics={data?.trendingTopics || []} />

              {/* 6. "ভিডিও ›" Carousel */}
              <VideoCarousel videos={data?.video || []} />
            </div>

            {/* 7. Promo Strip (Full-bleed #FDF1EF band with 4 dark cards) */}
            <PromoStrip items={data?.promoStrip || []} />

            <div className="max-w-[1248px] mx-auto px-4">
              {/* 8. Most-read + Sports side by side (~25% / ~75%) */}
              <MostReadAndSportsSection
                mostReadAndSports={data?.mostReadAndSports}
              />

              {/* 9. "বাংলাদেশ ›" */}
              <BangladeshSection bangladeshData={data?.bangladesh} />

              {/* 10. "বিশ্ব ›" */}
              <WorldSection worldData={data?.world} />

              {/* 11. "বিনোদন ›" */}
              <EntertainmentSection entertainmentData={data?.entertainment} />

              {/* 12. "জীবনযাপন ›" */}
              <LifestyleSection lifestyleItems={data?.lifestyle} />

              {/* 13. "মতামত ›" */}
              <OpinionSection opinionData={data?.opinion} />

              {/* 14. "বাণিজ্য ›" */}
              <BusinessSection businessData={data?.business} />
            </div>

            {/* 15. Ad band (Bottom, ~320px tall, full-bleed #F0F0F0) */}
            <AdBanner slot="bottom-billboard" height="h-[280px]" fullBleed={true} />
          </>
        )}
      </main>

      {/* 16. Footer */}
      <Footer />
    </div>
  );
}
