import React from 'react';
import { Link } from 'react-router-dom';
import { Feather } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import { parseKickerAndTitle } from '../../utils/formatters';

export default function OpinionSection({ opinionData }) {
  if (!opinionData) return null;

  const { lead, list = [] } = opinionData;
  const leadAuthor = lead?.authors?.[0] || {
    nameBn: 'গওহার নঈম ওয়ারা',
    designation: 'লেখক, গবেষক ও দুর্যোগ ব্যবস্থাপনা বিশেষজ্ঞ',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  };

  const parsedLead = lead ? parseKickerAndTitle(lead.title, 'মতামত') : null;

  return (
    <section className="w-full my-8">
      <SectionHeader title="মতামত" href="/opinion" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Feature Box (~34% / 4 cols) */}
        <div className="lg:col-span-4 flex">
          {lead && (
            <div className="w-full border border-[#333333] p-5 flex flex-col justify-between bg-white group">
              <div>
                <Link to={`/opinion/${lead.slug}`} className="block">
                  <div className="mb-3">
                    {/* Headline set in white on near-black inline highlight with box-decoration-break: clone */}
                    <span className="bg-[#0A1020] text-white px-2 py-0.5 box-decoration-clone inline font-headline text-[18px] md:text-[20px] font-bold leading-[1.5]">
                      <span className="text-[#FF3B30] font-bold mr-1.5 inline">
                        {parsedLead.kicker} •
                      </span>
                      {parsedLead.title}
                    </span>
                  </div>
                  <p className="text-[13px] text-excerpt leading-[1.6] line-clamp-3 mt-3">
                    {lead.excerpt}
                  </p>
                </Link>
              </div>

              {/* Author footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-hairline mt-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  {leadAuthor.avatar ? (
                    <img
                      src={leadAuthor.avatar}
                      alt={leadAuthor.nameBn}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#C9C9C9] flex items-center justify-center text-white">
                      <Feather className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <div>
                  <h5 className="font-bold text-[14px] text-primary">
                    {leadAuthor.nameBn}
                  </h5>
                  <p className="text-[11px] text-meta">
                    {leadAuthor.designation || 'লেখক ও গবেষক'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Author Rows (~66% / 8 cols) */}
        <div className="lg:col-span-8 flex flex-col divide-y divide-hairline">
          {list.slice(0, 4).map((item) => {
            const author = item.authors?.[0] || { nameBn: 'জাকির হোসেন' };
            const parsed = parseKickerAndTitle(item.title, 'মতামত');

            return (
              <article key={item._id} className="py-3.5 first:pt-0 last:pb-0">
                <Link
                  to={`/opinion/${item.slug}`}
                  className="group flex items-center gap-4"
                >
                  {/* 56px circular gray avatar with pen icon or photo */}
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-[#C9C9C9] flex-shrink-0 flex items-center justify-center text-white">
                    <Feather className="w-6 h-6 text-white stroke-[2.2]" />
                  </div>

                  {/* Headline & Author credit */}
                  <div className="flex-1">
                    <h4 className="font-headline text-[16px] md:text-[17px] font-bold text-primary group-hover:text-brand-red leading-[1.4] line-clamp-2">
                      <span className="text-brand-red font-bold mr-1.5">
                        {parsed.kicker} •
                      </span>
                      {parsed.title}
                    </h4>
                    <p className="text-[12px] text-meta mt-1">
                      লেখা: <span className="text-gray-700">{author.nameBn}</span>
                    </p>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
