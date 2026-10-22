import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, Send, CheckCircle, Shield, FileText, Users, DollarSign } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const pagesData = {
  about: {
    title: 'আমাদের সম্পর্কে',
    subtitle: 'স্বাধীন, সাহসী ও দায়িত্বশীল সাংবাদিকতার অঙ্গীকার',
    icon: Users,
    content: (
      <div className="space-y-6 text-gray-800 text-[16px] leading-[1.8]">
        <p className="lead text-[18px] font-medium text-primary border-l-4 border-brand-red pl-4 py-1">
          ‘খবরঘর’ বাংলাদেশের একটি শীর্ষস্থানীয় আধুনিক ডিজিটাল সংবাদমাধ্যম। সত্য, নিষ্ঠা ও বস্তুনিষ্ঠ তথ্যের ভিত্তিতে জনগণের ক্ষমতায়ন এবং গণতান্ত্রিক মূল্যবোধ সমুন্নত রাখাই আমাদের মূল দর্শন।
        </p>

        <h3 className="font-headline text-2xl font-bold text-primary mt-6">আমাদের নীতি ও অঙ্গীকার</h3>
        <p>
          আমরা বিশ্বাস করি নিরপেক্ষ ও নির্ভীক সাংবাদিকতা সমাজের দর্পণ হিসেবে কাজ করে। গুজব ও অসত্য তথ্যের যুগে যাচাইকৃত সংবাদ দ্রুত পাঠকের কাছে পৌঁছে দিতে খবরঘরের একদল তরুণ ও অভিজ্ঞ সাংবাদিক ২৪ ঘণ্টা নিরবচ্ছিন্নভাবে কাজ করে যাচ্ছেন।
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 pt-2">
          <div className="p-5 bg-gray-50 border border-hairline rounded">
            <h4 className="font-headline text-lg font-bold text-primary mb-2">বস্তুনিষ্ঠ সংবাদ পরিবেশন</h4>
            <p className="text-sm text-gray-600">
              কোনো রাজনৈতিক বা ব্যবসায়িক গোষ্ঠীর অনুকম্পা নয়, কেবলমাত্র জনগণের স্বার্থ এবং তথ্যের সত্যতাকে প্রাধান্য দিয়ে আমরা সংবাদ প্রস্তুত করি।
            </p>
          </div>
          <div className="p-5 bg-gray-50 border border-hairline rounded">
            <h4 className="font-headline text-lg font-bold text-primary mb-2">তৃণমূলের কণ্ঠস্বর</h4>
            <p className="text-sm text-gray-600">
              সারাদেশের ৬৪টি জেলার প্রত্যন্ত অঞ্চলের মানুষের জীবনসংগ্রাম, উন্নয়ন ও অধিকারের কথা আমরা তুলে আনি গুরুত্বের সঙ্গে।
            </p>
          </div>
        </div>

        <h3 className="font-headline text-2xl font-bold text-primary mt-8">সম্পাদকীয় পরিষদ</h3>
        <ul className="space-y-2 text-gray-700">
          <li><strong>প্রধান সম্পাদক ও প্রকাশক:</strong> খবরঘর মিডিয়া লিমিটেড</li>
          <li><strong>বার্তা সম্পাদক:</strong> মাহমুদ ইকবাল</li>
          <li><strong>অনলাইন প্রধান:</strong> সাজ্জাদুর রহমান</li>
          <li><strong>চিফ অব রিপোর্টার্স:</strong> নাসরীন আক্তার</li>
          <li><strong>হেড অব ফিচার:</strong> তানভীর আহমেদ</li>
        </ul>
      </div>
    ),
  },

  contact: {
    title: 'যোগাযোগ',
    subtitle: 'খবরঘর নিউজরুম ও প্রশাসনিক কার্যালয়',
    icon: Phone,
    content: null, // Rendered dynamically with form
  },

  advertise: {
    title: 'বিজ্ঞাপন ও প্রচার',
    subtitle: 'লক্ষ লক্ষ পাঠকের কাছে আপনার ব্র্যান্ডের সঠিক বার্তা পৌঁছে দিন',
    icon: DollarSign,
    content: (
      <div className="space-y-6 text-gray-800 text-[16px] leading-[1.8]">
        <p className="lead text-[18px] font-medium text-primary border-l-4 border-brand-red pl-4 py-1">
          খবরঘর ডিজিটাল প্ল্যাটফর্মে প্রতিদিন দেশ-বিদেশের লক্ষাধিক সচেতন পাঠক নিয়মিত সংবাদ পড়েন। আমাদের সাথে বিজ্ঞাপন প্রচারের মাধ্যমে আপনার পণ্য ও সেবার সর্বোচ্চ গ্রহণযোগ্যতা নিশ্চিত করুন।
        </p>

        <h3 className="font-headline text-2xl font-bold text-primary mt-6">বিজ্ঞাপন স্লট ও স্পেসিফিকেশন</h3>
        <div className="overflow-x-auto border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 border-b border-hairline">
              <tr>
                <th className="p-3 font-semibold text-primary">স্লট নাম</th>
                <th className="p-3 font-semibold text-primary">পরিমাপ (পিক্সেল)</th>
                <th className="p-3 font-semibold text-primary">স্থান</th>
                <th className="p-3 font-semibold text-primary">ফরম্যাট</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="p-3 font-medium">শীর্ষ লিডারবোর্ড (Leaderboard)</td>
                <td className="p-3">৯৭০ x ৯০</td>
                <td className="p-3">হোমপেজ ও সংবাদের শীর্ষে</td>
                <td className="p-3">JPG, PNG, GIF, HTML5</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">বিলবোর্ড ব্যানার (Billboard)</td>
                <td className="p-3">৯৭০ x ২৫০</td>
                <td className="p-3">মূল সংবাদের মাঝে ও ট্রেন্ডিং নিচে</td>
                <td className="p-3">JPG, PNG, GIF, HTML5</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">মিডিয়াম রেকটাঙ্গেল (Sidebar)</td>
                <td className="p-3">৩০০ x ২৫০</td>
                <td className="p-3">সাইডবার ও প্রতিটি খবর পাতায়</td>
                <td className="p-3">JPG, PNG, GIF</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">স্পনসরড আর্টিকেল / ব্র্যান্ড স্টোরি</td>
                <td className="p-3">কন্টেন্ট ভিত্তিক</td>
                <td className="p-3">ফিচার সেকশন ও সামাজিক যোগাযোগ</td>
                <td className="p-3">টেক্সট + ইমেজ + ভিডিও</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-[#E7F0FB] border border-[#C5DCF5] rounded mt-8">
          <h4 className="font-headline text-xl font-bold text-primary mb-2">বিজ্ঞাপন বুকিং সংক্রান্ত যোগাযোগ</h4>
          <p className="text-sm text-gray-700 mb-3">
            রেট কার্ড এবং কাস্টম ক্যাম্পেইন প্যাকেজের জন্য আমাদের মার্কেটিং বিভাগের সঙ্গে যোগাযোগ করুন:
          </p>
          <div className="space-y-1 text-sm text-gray-800 font-medium">
            <p>ইমেইল: ads@khaborghor.com / marketing@khaborghor.com</p>
            <p>হটলাইন: +৮৮০ ২ ৯৫৫৬৬৭৭ (এক্সটেনশন: ২০৪, ২০৫)</p>
            <p>মোবাইল: +৮৮০১৭১২-৩৪৫৬৭৮</p>
          </div>
        </div>
      </div>
    ),
  },

  privacy: {
    title: 'গোপনীয়তা নীতি (Privacy Policy)',
    subtitle: 'ব্যবহারকারীর তথ্যের নিরাপত্তা ও সুরক্ষার অঙ্গীকার',
    icon: Shield,
    content: (
      <div className="space-y-6 text-gray-800 text-[16px] leading-[1.8]">
        <p className="lead text-[18px] font-medium text-primary border-l-4 border-brand-red pl-4 py-1">
          খবরঘর ব্যবহারকারীদের গোপনীয়তা রক্ষায় সর্বদা সচেতন ও অঙ্গীকারবদ্ধ। এই নীতিমালায় কীভাবে পাঠক ও ব্যবহারকারীদের ব্যক্তিগত তথ্য সংগ্রহ, ব্যবহার ও সুরক্ষিত রাখা হয় তা বিশদভাবে তুলে ধরা হলো।
        </p>

        <h3 className="font-headline text-xl font-bold text-primary mt-6">১. সংগৃহীত তথ্যাদি</h3>
        <p>
          ব্যবহারকারী যখন সাইট পরিদর্শন করেন, মন্তব্য করেন বা নিউজলেটার সাবস্ক্রাইব করেন, তখন নাম, ইমেইল ঠিকানা বা ব্রাউজারের সাধারণ অ্যানালিটিক্যাল ডেটা (আইপি ঠিকানা, ডিভাইসের ধরণ) সংরক্ষিত হতে পারে। কোনো ধরনের আর্থিক বা সংবেদনশীল তথ্য সংরক্ষণ করা হয় না।
        </p>

        <h3 className="font-headline text-xl font-bold text-primary mt-6">২. কুকিজ (Cookies) নীতিমালা</h3>
        <p>
          ব্যবহারকারীর পাঠাভ্যাস উন্নত করতে এবং বিজ্ঞাপন প্রাসঙ্গিক রাখতে সাইটে সাধারণ সেশন কুকি ব্যবহার করা হয়। ব্যবহারকারী চাইলে যেকোনো সময় তার ব্রাউজার সেটিংস থেকে কুকি নিষ্ক্রিয় করতে পারেন।
        </p>

        <h3 className="font-headline text-xl font-bold text-primary mt-6">৩. তথ্যের সুরক্ষা ও তৃতীয় পক্ষ</h3>
        <p>
          খবরঘর কখনোই ব্যবহারকারীর ব্যক্তিগত তথ্য তৃতীয় কোনো পক্ষের কাছে বাণিজ্যিক উদ্দেশ্যে বিক্রি বা হস্তান্তর করে না। দেশের প্রচলিত ডিজিটাল নিরাপত্তা আইনের আওতায় তথ্যের সর্বোচ্চ সুরক্ষা নিশ্চিত করা হয়।
        </p>
      </div>
    ),
  },

  terms: {
    title: 'ব্যবহারের শর্তাবলী (Terms of Service)',
    subtitle: 'খবরঘর ব্যবহারের নিয়ম ও বিধিমালা',
    icon: FileText,
    content: (
      <div className="space-y-6 text-gray-800 text-[16px] leading-[1.8]">
        <p className="lead text-[18px] font-medium text-primary border-l-4 border-brand-red pl-4 py-1">
          খবরঘর ওয়েবসাইটে প্রকাশিত সকল সংবাদ, আলোকচিত্র, গ্রাফিক্স, অডিও এবং ভিডিও খবরঘর মিডিয়া লিমিটেডের বৌদ্ধিক সম্পত্তি। সাইটটি ব্যবহারের ক্ষেত্রে নিম্নের শর্তাবলী প্রযোজ্য হবে।
        </p>

        <h3 className="font-headline text-xl font-bold text-primary mt-6">১. স্বত্বাধিকার (Copyright)</h3>
        <p>
          লিখিত অনুমতি ব্যতিরেকে খবরঘরের কোনো সংবাদ বা ছবির অংশবিশেষ বা সম্পূর্ণ অংশ অন্য কোনো মাধ্যমে পুনঃপ্রকাশ বা বাণিজ্যিক উদ্দেশ্যে ব্যবহার করা আইনত নিষিদ্ধ। যথাযথ ক্রেডিট ও হাইপারলিংক সহকারে সীমিত উদ্ধৃতি ব্যবহার করা যেতে পারে।
        </p>

        <h3 className="font-headline text-xl font-bold text-primary mt-6">২. মন্তব্য ও মতামত নীতিমালা</h3>
        <p>
          পাঠকদের মতামতকে আমরা শ্রদ্ধা করি। তবে কোনো ধরনের অশালীন, জাতিগত বিদ্বেষমূলক, ধর্মীয় অনুভূতিতে আঘাত সৃষ্টিকারী বা বেআইনি মন্তব্য গ্রহণযোগ্য নয়। কর্তৃপক্ষ যেকোনো অসৌজন্যমূলক মন্তব্য মুছে ফেলার অধিকার সংরক্ষণ করে।
        </p>

        <h3 className="font-headline text-xl font-bold text-primary mt-6">৩. দায়বদ্ধতার সীমাবদ্ধতা</h3>
        <p>
          খবরঘর সবসময় সঠিক ও তথ্যভিত্তিক সংবাদ প্রকাশে সচেষ্ট থাকে। তবে অনিবার্য কারণবশত তথ্যের কোনো অনিচ্ছাকৃত বিভ্রান্তির ক্ষেত্রে দ্রুততম সময়ে সংশোধন বা সংশোধনী বিবৃতি প্রদান করা হয়।
        </p>
      </div>
    ),
  },
};

export default function StaticEditorialPage() {
  const location = useLocation();
  const slug = location.pathname.replace(/^\//, '');
  const page = pagesData[slug] || pagesData.about;
  const PageIcon = page.icon || FileText;

  // Contact form state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>{`${page.title} | খবরঘর`}</title>
        <meta name="description" content={page.subtitle} />
      </Helmet>

      <Header />

      <main className="max-w-[1248px] mx-auto px-4 py-10 flex-1 w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-meta mb-4">
          <Link to="/" className="hover:text-brand-red">হোম</Link>
          <span>/</span>
          <span className="text-primary font-medium">{page.title}</span>
        </div>

        {/* Page Header Banner */}
        <div className="pb-6 mb-8 border-b border-hairline">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[#FDF1EF] text-brand-red flex items-center justify-center flex-shrink-0">
              <PageIcon className="w-5 h-5" />
            </div>
            <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary">
              {page.title}
            </h1>
          </div>
          <p className="text-gray-600 text-sm md:text-base font-body pl-13">
            {page.subtitle}
          </p>
        </div>

        {/* Dynamic Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            {slug === 'contact' ? (
              <div className="space-y-8">
                <div className="space-y-4 text-gray-700 leading-relaxed text-[15px]">
                  <p>
                    যেকোনো সংবাদ পরামর্শ, প্রতিক্রিয়া, তথ্যের সত্যতা যাচাই বা নিউজরুমের সঙ্গে যোগাযোগের জন্য নিচের ফরমটি পূরণ করুন অথবা সরাসরি আমাদের ঠিকানায় যোগাযোগ করুন।
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="p-6 bg-green-50 border border-green-200 rounded text-center space-y-3">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
                    <h3 className="font-headline text-xl font-bold text-green-800">
                      আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে!
                    </h3>
                    <p className="text-sm text-green-700">
                      খবরঘর নিউজরুমের সংশ্লিষ্ট দায়িত্বপ্রাপ্ত কর্মকর্তা দ্রুতই আপনার সাথে ইমেইলে যোগাযোগ করবেন। ধন্যবাদ।
                    </p>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded"
                    >
                      আরেকটি বার্তা পাঠান
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4 p-6 bg-gray-50 border border-hairline rounded">
                    <h3 className="font-headline text-lg font-bold text-primary mb-2">
                      আমাদের বার্তা পাঠান
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          আপনার নাম *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="পুরো নাম লিখুন"
                          className="w-full px-3 py-2 bg-white border border-input-border rounded text-sm focus:outline-none focus:border-brand-blue"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          ইমেইল ঠিকানা *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="example@mail.com"
                          className="w-full px-3 py-2 bg-white border border-input-border rounded text-sm focus:outline-none focus:border-brand-blue"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        বিষয়
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="বার্তার মূল বিষয় লিখুন"
                        className="w-full px-3 py-2 bg-white border border-input-border rounded text-sm focus:outline-none focus:border-brand-blue"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        আপনার বার্তা বা সংবাদ পরামর্শ *
                      </label>
                      <textarea
                        required
                        rows="5"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="বিস্তারিত বার্তা এখানে লিখুন..."
                        className="w-full px-3 py-2 bg-white border border-input-border rounded text-sm focus:outline-none focus:border-brand-blue"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-brand-red hover:bg-red-700 text-white font-semibold text-sm rounded flex items-center gap-2 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      <span>বার্তা পাঠান</span>
                    </button>
                  </form>
                )}
              </div>
            ) : (
              page.content
            )}
          </div>

          {/* Right Sidebar: Quick Contact & Details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-[#FAFAFA] border border-hairline rounded">
              <h3 className="font-headline text-lg font-bold text-primary mb-4 pb-2 border-b border-hairline">
                কেন্দ্রীয় কার্যালয়
              </h3>
              <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-red flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block text-primary">ঠিকানা:</strong>
                    <span>খবরঘর ভবন, প্লট ১২, মতিঝিল বাণিজ্যিক এলাকা, ঢাকা-১০০০, বাংলাদেশ।</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-brand-red flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block text-primary">টেলিফোন:</strong>
                    <span>+৮৮০ ২ ৯৫৫৬৬৭৭, +৮৮০ ২ ৯৫৫৬৬৭৮</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-brand-red flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block text-primary">ইমেইল:</strong>
                    <span>newsdesk@khaborghor.com<br />editor@khaborghor.com</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Quick Links Menu */}
            <div className="p-5 border border-hairline rounded bg-white">
              <h4 className="font-headline text-sm font-bold uppercase text-meta mb-3">
                অন্যান্য তথ্য ও নীতিমালা
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/about" className={`hover:text-brand-red ${slug === 'about' ? 'text-brand-red font-bold' : 'text-gray-700'}`}>
                    আমাদের সম্পর্কে
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className={`hover:text-brand-red ${slug === 'contact' ? 'text-brand-red font-bold' : 'text-gray-700'}`}>
                    যোগাযোগ
                  </Link>
                </li>
                <li>
                  <Link to="/advertise" className={`hover:text-brand-red ${slug === 'advertise' ? 'text-brand-red font-bold' : 'text-gray-700'}`}>
                    বিজ্ঞাপন ও প্রচার
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className={`hover:text-brand-red ${slug === 'privacy' ? 'text-brand-red font-bold' : 'text-gray-700'}`}>
                    গোপনীয়তা নীতি
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className={`hover:text-brand-red ${slug === 'terms' ? 'text-brand-red font-bold' : 'text-gray-700'}`}>
                    ব্যবহারের শর্তাবলী
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
