import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut } from 'lucide-react';
import { toBanglaDigits } from '../../utils/formatters';

const epaperPages = [
  { pageNo: 1, title: 'প্রধান পাতা (মূল শিরোনাম ও শীর্ষ সংবাদ)', type: 'front' },
  { pageNo: 2, title: 'জাতীয় ও রাজনীতি', type: 'national' },
  { pageNo: 3, title: 'সারাদেশ ও মাঠপর্যায়', type: 'regional' },
  { pageNo: 4, title: 'অর্থনীতি ও বাণিজ্য', type: 'business' },
  { pageNo: 5, title: 'আন্তর্জাতিক খবর', type: 'world' },
  { pageNo: 6, title: 'মতামত ও সম্পাদকীয়', type: 'editorial' },
  { pageNo: 7, title: 'বিনোদন ও সংস্কৃতি', type: 'entertainment' },
  { pageNo: 8, title: 'খেলাধুলা ও শেষ পাতা', type: 'sports' },
];

export default function EpaperModal({ isOpen, onClose }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [edition, setEdition] = useState('dhaka');
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && currentPage < epaperPages.length) {
        setCurrentPage((p) => p + 1);
      }
      if (e.key === 'ArrowLeft' && currentPage > 1) {
        setCurrentPage((p) => p - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, currentPage]);

  if (!isOpen) return null;

  const page = epaperPages.find((p) => p.pageNo === currentPage) || epaperPages[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-white w-full max-w-5xl h-[92vh] max-h-[850px] rounded flex flex-col overflow-hidden shadow-2xl border border-hairline">
        {/* Top Control Bar */}
        <div className="px-4 py-3 bg-[#141416] text-white flex items-center justify-between border-b border-gray-700 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-headline text-[18px] font-bold text-white flex items-center gap-1.5">
              <span>খবর</span>
              <span className="text-brand-red">ঘর</span>
              <span className="text-xs font-normal text-gray-300 ml-1">মুদ্রিত ই-পেপার</span>
            </span>

            {/* Edition Switcher */}
            <div className="hidden sm:flex items-center gap-1 text-xs bg-gray-800 p-1 rounded border border-gray-700 ml-2">
              <button
                onClick={() => setEdition('dhaka')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  edition === 'dhaka' ? 'bg-brand-red text-white font-medium' : 'text-gray-300 hover:text-white'
                }`}
              >
                ঢাকা সংস্করণ
              </button>
              <button
                onClick={() => setEdition('chattogram')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  edition === 'chattogram' ? 'bg-brand-red text-white font-medium' : 'text-gray-300 hover:text-white'
                }`}
              >
                চট্টগ্রাম সংস্করণ
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="hidden md:flex items-center gap-1 text-xs text-gray-300 bg-gray-800 px-2 py-1 rounded border border-gray-700">
              <button
                onClick={() => setZoom((z) => Math.max(75, z - 15))}
                className="hover:text-white p-0.5"
                title="জুম কমান"
                aria-label="জুম কমান"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-1">{toBanglaDigits(zoom)}%</span>
              <button
                onClick={() => setZoom((z) => Math.min(150, z + 15))}
                className="hover:text-white p-0.5"
                title="জুম বাড়ান"
                aria-label="জুম বাড়ান"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Download Button */}
            <a
              href="#download"
              onClick={(e) => {
                e.preventDefault();
                alert(`খবরঘর ই-পেপার ${edition === 'dhaka' ? 'ঢাকা' : 'চট্টগ্রাম'} সংস্করণ (পাতা ${toBanglaDigits(currentPage)}) পিডিএফ ডাউনলোড প্রক্রিয়া শুরু হয়েছে।`);
              }}
              className="hidden sm:flex items-center gap-1 text-xs bg-gray-800 hover:bg-gray-700 text-gray-200 px-2.5 py-1 rounded transition-colors border border-gray-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>পিডিএফ</span>
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors ml-1"
              aria-label="ই-পেপার বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Subheader: Page Indicator & Page Navigation */}
        <div className="px-4 py-2 bg-gray-100 border-b border-hairline flex items-center justify-between text-xs text-gray-700 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-primary">
              পাতা {toBanglaDigits(currentPage)} / {toBanglaDigits(epaperPages.length)}:
            </span>
            <span className="text-gray-600 truncate max-w-[280px] sm:max-w-md">
              {page.title}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="p-1 border border-hairline rounded bg-white disabled:opacity-40 hover:bg-gray-50 text-gray-700"
              aria-label="পূর্ববর্তী পাতা"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(epaperPages.length, p + 1))}
              disabled={currentPage >= epaperPages.length}
              className="p-1 border border-hairline rounded bg-white disabled:opacity-40 hover:bg-gray-50 text-gray-700"
              aria-label="পরবর্তী পাতা"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Content Area: E-Paper Page Surface */}
        <div className="flex-1 bg-[#2C2D30] overflow-auto p-4 flex justify-center items-start">
          <div
            style={{ width: `${zoom}%`, maxWidth: '780px', transition: 'width 0.2s ease-out' }}
            className="bg-[#FFFDF8] shadow-2xl border border-gray-400 p-6 sm:p-8 flex flex-col text-[#1A1A1A]"
          >
            {/* Masthead facsimile */}
            <div className="border-b-2 border-primary pb-3 mb-4 text-center">
              <div className="flex items-center justify-between text-[11px] text-gray-600 border-b border-hairline pb-1.5 mb-2 font-body">
                <span>বর্ষ ১, সংখ্যা ২২৪</span>
                <span>ঢাকা, বৃহস্পতিবার, ২২ অক্টোবর ২০২৬</span>
                <span>মূল্য: ১০ টাকা</span>
              </div>
              <div className="font-headline text-[38px] sm:text-[46px] font-black tracking-tight leading-none text-primary">
                <span>খবর</span>
                <span className="text-brand-red">ঘর</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1 font-body">
                স্বাধীন, নিরপেক্ষ ও বস্তুনিষ্ঠ সাংবাদিকতার প্রতিশ্রুতি
              </p>
            </div>

            {/* Page Header */}
            <div className="flex items-center justify-between text-xs font-semibold text-gray-700 pb-2 mb-4 border-b border-hairline">
              <span className="uppercase text-brand-red tracking-wider font-bold">
                {edition === 'dhaka' ? 'ঢাকা মহানগর সংস্করণ' : 'চট্টগ্রাম বিভাগীয় সংস্করণ'}
              </span>
              <span>পাতা নং {toBanglaDigits(currentPage)}</span>
            </div>

            {/* Facsimile Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              {/* Column 1 */}
              <div className="space-y-3 sm:border-r border-hairline sm:pr-3">
                <span className="text-[11px] font-bold text-brand-red block">অর্থনীতি ও বাণিজ্য</span>
                <h4 className="font-headline text-[16px] font-bold leading-snug">
                  রেমিট্যান্স প্রবাহে নতুন রেকর্ড, চলতি মাসে এসেছে ২ বিলিয়ন ডলার
                </h4>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  বৈধ চ্যানেলে প্রবাসী আয় বৃদ্ধির ফলে বৈদেশিক মুদ্রার রিজার্ভে ইতিবাচক প্রভাব পড়তে শুরু করেছে। কেন্দ্রীয় ব্যাংক প্রণোদনা প্রক্রিয়া আরও সহজ করার ঘোষণা দিয়েছে।
                </p>
                <div className="h-px bg-hairline" />
                <h5 className="font-headline text-[13px] font-bold leading-tight">
                  রপ্তানি খাতে প্রণোদনা পুনর্বিবেচনার প্রস্তাব
                </h5>
                <p className="text-[10px] text-gray-500 leading-normal">
                  তৈরি পোশাক শিল্পের পাশাপাশি চামড়া ও পাটজাত পণ্যের জন্য কার্যকর সহায়তা প্যাকেজের দাবি।
                </p>
              </div>

              {/* Column 2 (Main Story) */}
              <div className="space-y-3 sm:border-r border-hairline sm:pr-3">
                <span className="text-[11px] font-bold text-brand-red block">শীর্ষ প্রতিবেদন</span>
                <h3 className="font-headline text-[18px] font-black leading-tight">
                  উপকূলীয় বেড়িবাঁধ টেকসইকরণে জলবায়ু তহবিলের শতকোটি টাকা বরাদ্দ
                </h3>
                <div className="w-full h-32 bg-gray-200 border border-gray-300 relative overflow-hidden flex items-center justify-center text-xs text-gray-500">
                  <span className="font-headline font-semibold">খবরঘর আলোকচিত্র • পটুয়াখালী উপকূল</span>
                </div>
                <p className="text-[11px] text-gray-700 leading-relaxed font-body">
                  ঘূর্ণিঝড় ও জলোচ্ছ্বাস থেকে দক্ষিণ উপকূলের বাসিন্দাদের জানমাল সুরক্ষায় নতুন প্রকৌশল নকশায় উচ্চতা বৃদ্ধি ও কংক্রিট ব্লকের কাজ শুরু হতে যাচ্ছে।
                </p>
              </div>

              {/* Column 3 */}
              <div className="space-y-3">
                <span className="text-[11px] font-bold text-brand-red block">নগর জীবন</span>
                <h4 className="font-headline text-[15px] font-bold leading-snug">
                  মেট্রোরেলের নতুন রুটের সম্ভাব্যতা যাচাই সম্পন্ন
                </h4>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  যানজট নিরসনে নতুন করিডোর যুক্ত করার পরিকল্পনা চূড়ান্ত করেছে কর্তৃপক্ষ। আগামী বছর থেকেই প্রাথমিক নির্মাণ কার্যক্রম শুরু হতে পারে।
                </p>
                <div className="p-2.5 bg-gray-100 border border-hairline text-center">
                  <span className="text-[10px] text-gray-400 block mb-1">বিজ্ঞাপন</span>
                  <p className="text-[11px] font-bold text-gray-800">
                    জাতীয় সঞ্চয়পত্র ও নির্ভরযোগ্য বিনিয়োগ
                  </p>
                  <span className="text-[9px] text-gray-500">বাংলাদেশ ব্যাংক অনুমোদিত</span>
                </div>
              </div>
            </div>

            {/* Bottom Footer Facsimile */}
            <div className="mt-8 pt-3 border-t-2 border-gray-800 flex items-center justify-between text-[10px] text-gray-500">
              <span>মুদ্রণ ও প্রকাশনা: খবরঘর মিডিয়া লিমিটেড, মতিঝিল, ঢাকা-১০০০</span>
              <span>ই-পেপার রিডার সংস্করণ ২.৪</span>
            </div>
          </div>
        </div>

        {/* Bottom Page Thumbnails Bar */}
        <div className="p-2.5 bg-white border-t border-hairline flex items-center gap-2 overflow-x-auto no-scrollbar flex-shrink-0">
          {epaperPages.map((p) => (
            <button
              key={p.pageNo}
              onClick={() => setCurrentPage(p.pageNo)}
              className={`h-9 px-3 border rounded text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                currentPage === p.pageNo
                  ? 'bg-brand-red text-white border-brand-red font-bold'
                  : 'bg-gray-50 text-gray-700 border-hairline hover:bg-gray-100'
              }`}
            >
              <span>পাতা {toBanglaDigits(p.pageNo)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
