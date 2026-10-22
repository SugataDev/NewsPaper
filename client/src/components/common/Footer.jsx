import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Youtube, Instagram } from 'lucide-react';
import { toBanglaDigits } from '../../utils/formatters';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#F5F5F5] border-t border-hairline mt-12 pt-10 pb-8 text-primary">
      <div className="max-w-[1248px] mx-auto px-4">
        {/* Row 1: Wordmark & Social Icons */}
        <div className="flex flex-col md:flex-row items-center justify-between pb-6 border-b border-hairline gap-4">
          <Link to="/" className="inline-flex items-center">
            <span className="font-headline text-[38px] font-black text-primary">খবর</span>
            <span className="font-headline text-[38px] font-black text-brand-red">ঘর</span>
            <span className="w-2 h-2 rounded-full bg-brand-red ml-1 self-center"></span>
          </Link>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white border border-hairline flex items-center justify-center text-gray-600 hover:text-brand-red hover:border-brand-red transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white border border-hairline flex items-center justify-center text-gray-600 hover:text-brand-red hover:border-brand-red transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white border border-hairline flex items-center justify-center text-gray-600 hover:text-brand-red hover:border-brand-red transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white border border-hairline flex items-center justify-center text-gray-600 hover:text-brand-red hover:border-brand-red transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Row 2: Category Quick Links */}
        <div className="py-6 border-b border-hairline">
          <ul className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-[14px] font-medium text-gray-700">
            <li><Link to="/latest" className="hover:text-brand-red">সর্বশেষ</Link></li>
            <li><Link to="/bangladesh" className="hover:text-brand-red">বাংলাদেশ</Link></li>
            <li><Link to="/politics" className="hover:text-brand-red">রাজনীতি</Link></li>
            <li><Link to="/world" className="hover:text-brand-red">বিশ্ব</Link></li>
            <li><Link to="/business" className="hover:text-brand-red">বাণিজ্য</Link></li>
            <li><Link to="/opinion" className="hover:text-brand-red">মতামত</Link></li>
            <li><Link to="/sports" className="hover:text-brand-red">খেলা</Link></li>
            <li><Link to="/entertainment" className="hover:text-brand-red">বিনোদন</Link></li>
            <li><Link to="/jobs" className="hover:text-brand-red">চাকরি</Link></li>
            <li><Link to="/lifestyle" className="hover:text-brand-red">জীবনযাপন</Link></li>
            <li><Link to="/video" className="hover:text-brand-red">ভিডিও</Link></li>
          </ul>
        </div>

        {/* Row 3: Corporate Links & Legal */}
        <div className="py-6 flex flex-wrap items-center justify-center md:justify-start gap-5 text-[13px] text-gray-600">
          <Link to="/about" className="hover:text-brand-red">আমাদের সম্পর্কে</Link>
          <span>•</span>
          <Link to="/contact" className="hover:text-brand-red">যোগাযোগ</Link>
          <span>•</span>
          <Link to="/advertise" className="hover:text-brand-red">বিজ্ঞাপন</Link>
          <span>•</span>
          <Link to="/privacy" className="hover:text-brand-red">গোপনীয়তা নীতি</Link>
          <span>•</span>
          <Link to="/terms" className="hover:text-brand-red">শর্তাবলী</Link>
          <span>•</span>
          <Link to="/sitemap.xml" className="hover:text-brand-red">সাইটম্যাপ</Link>
        </div>

        {/* Row 4: Editorial & Publisher Info + Bangla Digits Copyright */}
        <div className="pt-2 text-xs text-meta text-center md:text-left leading-relaxed">
          <p>ভারপ্রাপ্ত সম্পাদক ও প্রকাশক: খবরঘর মিডিয়া লিমিটেড। মতিঝিল বাণিজ্যিক এলাকা, ঢাকা-১০০০।</p>
          <p className="mt-1">
            স্বত্ব © {toBanglaDigits(currentYear)} খবরঘর ডটকম। সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </div>
    </footer>
  );
}
