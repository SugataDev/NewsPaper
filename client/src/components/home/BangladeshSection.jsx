import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Search } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import LazyImage from '../common/LazyImage';
import AdBanner from '../common/AdBanner';
import { getRelativeTimeBangla, parseKickerAndTitle } from '../../utils/formatters';

export default function BangladeshSection({ bangladeshData }) {
  const navigate = useNavigate();
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedUpazila, setSelectedUpazila] = useState('');

  useEffect(() => {
    fetch('/api/locations?type=division')
      .then((r) => r.json())
      .then((data) => setDivisions(data || []))
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    if (selectedDivision) {
      fetch(`/api/locations?type=district&parent=${selectedDivision}`)
        .then((r) => r.json())
        .then((data) => {
          setDistricts(data || []);
          setSelectedDistrict('');
          setUpazilas([]);
          setSelectedUpazila('');
        })
        .catch((e) => console.error(e));
    } else {
      setDistricts([]);
      setUpazilas([]);
    }
  }, [selectedDivision]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch(`/api/locations?type=upazila&parent=${selectedDistrict}`)
        .then((r) => r.json())
        .then((data) => {
          setUpazilas(data || []);
          setSelectedUpazila('');
        })
        .catch((e) => console.error(e));
    } else {
      setUpazilas([]);
    }
  }, [selectedDistrict]);

  const handleLocationSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedDivision) params.append('division', selectedDivision);
    if (selectedDistrict) params.append('district', selectedDistrict);
    if (selectedUpazila) params.append('upazila', selectedUpazila);

    navigate(`/bangladesh?${params.toString()}`);
  };

  if (!bangladeshData) return null;

  const { lead, middle = [], right = [] } = bangladeshData;

  return (
    <section className="w-full my-8">
      <SectionHeader title="বাংলাদেশ" href="/bangladesh" />

      {/* Local-news Filter Bar (#E7F0FB, 48px tall) */}
      <div className="w-full h-auto md:h-[48px] bg-[#E7F0FB] px-4 py-2 mb-6 flex flex-col md:flex-row items-center justify-between gap-3 border border-[#D5E3F5]">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <Compass className="w-4 h-4 text-brand-red flex-shrink-0" />
          <span className="font-headline text-[14px] font-semibold text-primary">
            আমার এলাকার খবর
          </span>
        </div>

        {/* 3 Cascading Selects + Blue "খুঁজুন" button */}
        <form onSubmit={handleLocationSearch} className="flex flex-wrap md:flex-nowrap items-center gap-2.5 w-full md:w-auto">
          {/* Division */}
          <select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
            className="h-[34px] w-full md:w-[140px] px-2.5 bg-white border border-[#CFCFCF] text-[13px] text-gray-700 rounded focus:outline-none focus:border-brand-blue"
          >
            <option value="">বিভাগ</option>
            {divisions.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.nameBn}
              </option>
            ))}
          </select>

          {/* District */}
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            disabled={!selectedDivision}
            className="h-[34px] w-full md:w-[140px] px-2.5 bg-white border border-[#CFCFCF] text-[13px] text-gray-700 rounded focus:outline-none focus:border-brand-blue disabled:opacity-60"
          >
            <option value="">জেলা</option>
            {districts.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.nameBn}
              </option>
            ))}
          </select>

          {/* Upazila */}
          <select
            value={selectedUpazila}
            onChange={(e) => setSelectedUpazila(e.target.value)}
            disabled={!selectedDistrict}
            className="h-[34px] w-full md:w-[140px] px-2.5 bg-white border border-[#CFCFCF] text-[13px] text-gray-700 rounded focus:outline-none focus:border-brand-blue disabled:opacity-60"
          >
            <option value="">উপজেলা</option>
            {upazilas.map((u) => (
              <option key={u.slug} value={u.slug}>
                {u.nameBn}
              </option>
            ))}
          </select>

          {/* Blue button */}
          <button
            type="submit"
            className="h-[34px] px-4 bg-brand-blue hover:bg-blue-700 text-white rounded text-[13px] font-semibold flex items-center gap-1.5 transition-colors flex-shrink-0"
          >
            <Search className="w-3.5 h-3.5" />
            <span>খুঁজুন</span>
          </button>
        </form>
      </div>

      {/* 3 Columns (~45 / 30 / 25%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
        {/* Left (~45% / 5 cols) */}
        <div className="lg:col-span-5 lg:pr-6 lg:border-r border-hairline">
          {lead && (() => {
            const parsed = parseKickerAndTitle(lead.title, lead.kicker);
            return (
              <article className="flex flex-col group">
                <Link to={`/bangladesh/${lead.slug}`} className="flex flex-col">
                  <div className="w-full mb-3">
                    <LazyImage
                      src={lead.coverImage?.url}
                      alt={lead.title}
                      aspectRatio="aspect-[4/3]"
                    />
                  </div>
                  <h3 className="font-headline text-[22px] md:text-[24px] font-bold leading-[1.3] text-primary group-hover:text-brand-red transition-colors">
                    {parsed.kicker && (
                      <span className="text-brand-red mr-1.5 font-bold">
                        {parsed.kicker} •
                      </span>
                    )}
                    {parsed.title}
                  </h3>
                  <p className="text-[14px] leading-[1.6] text-excerpt mt-2 line-clamp-4">
                    {lead.excerpt}
                  </p>
                  <div className="text-[12px] text-meta mt-2">
                    {getRelativeTimeBangla(lead.publishedAt)}
                  </div>
                </Link>
              </article>
            );
          })()}
        </div>

        {/* Middle (~30% / 4 cols) - 3 horizontal cards (text left, thumb right) */}
        <div className="lg:col-span-4 lg:px-5 lg:border-r border-hairline mt-6 lg:mt-0 flex flex-col divide-y divide-hairline">
          {middle.slice(0, 3).map((item) => {
            const parsed = parseKickerAndTitle(item.title);
            return (
              <article key={item._id} className="py-3 first:pt-0 last:pb-0">
                <Link
                  to={`/bangladesh/${item.slug}`}
                  className="group flex items-start justify-between gap-3"
                >
                  <div className="flex-1">
                    <h4 className="font-headline text-[15px] font-bold leading-[1.35] text-primary group-hover:text-brand-red transition-colors line-clamp-3">
                      {parsed.title}
                    </h4>
                    {item.excerpt && (
                      <p className="text-[12px] text-excerpt leading-[1.45] mt-1 line-clamp-2">
                        {item.excerpt}
                      </p>
                    )}
                    <div className="text-[11px] text-meta mt-1.5">
                      {getRelativeTimeBangla(item.publishedAt)}
                    </div>
                  </div>
                  <div className="w-[96px] h-[64px] flex-shrink-0">
                    <LazyImage
                      src={item.coverImage?.url}
                      alt={item.title}
                      aspectRatio="aspect-[3/2]"
                    />
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        {/* Right (~25% / 3 cols) - 2 compact cards then 300x250 AdSlot */}
        <div className="lg:col-span-3 lg:pl-5 mt-6 lg:mt-0 flex flex-col justify-between">
          <div className="flex flex-col divide-y divide-hairline mb-4">
            {right.slice(0, 2).map((item) => {
              const parsed = parseKickerAndTitle(item.title);
              return (
                <article key={item._id} className="py-3 first:pt-0 last:pb-0">
                  <Link
                    to={`/bangladesh/${item.slug}`}
                    className="group flex items-start justify-between gap-2.5"
                  >
                    <div className="flex-1">
                      <h4 className="font-headline text-[14px] font-bold leading-[1.35] text-primary group-hover:text-brand-red transition-colors line-clamp-3">
                        {parsed.title}
                      </h4>
                      <div className="text-[11px] text-meta mt-1">
                        {getRelativeTimeBangla(item.publishedAt)}
                      </div>
                    </div>
                    <div className="w-[72px] h-[72px] flex-shrink-0">
                      <LazyImage
                        src={item.coverImage?.url}
                        alt={item.title}
                        aspectRatio="aspect-square"
                      />
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>

          <div className="w-full flex justify-center pt-2">
            <AdBanner slot="bangladesh-right" size="300x250" />
          </div>
        </div>
      </div>
    </section>
  );
}
