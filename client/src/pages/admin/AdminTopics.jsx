import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { toBanglaDigits } from '../../utils/formatters';

export default function AdminTopics() {
  const [topics, setTopics] = useState([]);
  const [nameBn, setNameBn] = useState('');
  const [slug, setSlug] = useState('');
  const [isTrending, setIsTrending] = useState(true);

  const fetchTopics = () => {
    fetch('/api/admin/topics')
      .then((r) => r.json())
      .then((d) => setTopics(d || []));
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!nameBn.trim()) return;

    try {
      const res = await fetch('/api/admin/topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nameBn, slug, isTrending, order: topics.length }),
      });
      if (res.ok) {
        setNameBn('');
        setSlug('');
        fetchTopics();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('বিষয়টি মুছে ফেলতে চান?')) return;
    try {
      const res = await fetch(`/api/admin/topics/${id}`, { method: 'DELETE' });
      if (res.ok) fetchTopics();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl font-bold font-headline text-primary">আলোচিত বিষয় (Trending Topics)</h1>
        <p className="text-xs text-meta">হোমপেজের আলোচিত বিষয় চিপস ও ট্রেন্ডিং টপিকস পরিচালনা করুন</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 border border-hairline rounded shadow-sm">
          <h3 className="font-headline font-bold text-sm mb-3">নতুন টপিক যোগ করুন</h3>
          <form onSubmit={handleAdd} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">টপিকের নাম (বাংলা) *</label>
              <input
                type="text"
                required
                value={nameBn}
                onChange={(e) => setNameBn(e.target.value)}
                placeholder="যেমন: বিশ্বকাপ ২০২৬"
                className="w-full px-3 py-1.5 border border-input-border rounded text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">স্লাগ</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="বিশ্বকাপ-২০২৬"
                className="w-full px-3 py-1.5 border border-input-border rounded text-xs"
              />
            </div>
            <label className="flex items-center gap-2 text-xs text-gray-700">
              <input
                type="checkbox"
                checked={isTrending}
                onChange={(e) => setIsTrending(e.target.checked)}
              />
              <span>ট্রেন্ডিং হিসেবে হোমপেজে দেখান</span>
            </label>
            <button
              type="submit"
              className="w-full py-2 bg-brand-red text-white text-xs font-semibold rounded hover:bg-red-700 transition-colors"
            >
              টপিক যোগ করুন
            </button>
          </form>
        </div>

        <div className="md:col-span-2 bg-white border border-hairline rounded shadow-sm overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F8F9FA] border-b border-hairline text-meta font-semibold">
              <tr>
                <th className="py-2.5 px-3">নাম</th>
                <th className="py-2.5 px-3">স্লাগ</th>
                <th className="py-2.5 px-3">ট্রেন্ডিং</th>
                <th className="py-2.5 px-3 text-center">মুছুন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {topics.map((t) => (
                <tr key={t._id} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-primary">{t.nameBn}</td>
                  <td className="py-2 px-3 text-meta">{t.slug}</td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${t.isTrending ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                      {t.isTrending ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
