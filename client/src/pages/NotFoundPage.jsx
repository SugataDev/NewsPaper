import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="max-w-[1240px] mx-auto px-4 py-24 text-center flex-1">
        <h1 className="font-headline text-6xl font-black text-brand-red mb-4">৪০৪</h1>
        <h2 className="font-headline text-2xl font-bold text-primary mb-3">
          পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
        </h2>
        <p className="text-sm text-excerpt max-w-md mx-auto mb-8">
          আপনি যে পাতাটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা ভুল লিংক প্রবেশ করানো হয়েছে।
        </p>
        <Link
          to="/"
          className="px-6 py-2.5 bg-brand-red hover:bg-red-700 text-white font-semibold text-sm rounded transition-colors inline-block"
        >
          হোমপেজে ফিরে যান
        </Link>
      </main>
      <Footer />
    </div>
  );
}
