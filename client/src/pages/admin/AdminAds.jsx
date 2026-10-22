import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function AdminAds() {
  const [ads, setAds] = useState([]);
  const [slot, setSlot] = useState('leaderboard');
  const [title, setTitle] = useState('');
  const [size, setSize] = useState('970x90');
  const [imageUrl, setImageUrl] = useState('');
  const [targetUrl, setTargetUrl] = useState('#');

  const fetchAds = () => {
    fetch('/api/admin/ads')
      .then((r) => r.json())
      .then((d) => setAds(d || []));
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slot, title, size, imageUrl, targetUrl, active: true }),
      });
      if (res.ok) {
        setTitle('');
        setImageUrl('');
        setTargetUrl('#');
        fetchAds();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('বিজ্ঞাপনটি মুছে ফেলতে চান?')) return;
    try {
      const res = await fetch(`/api/admin/ads/${id}`, { method: 'DELETE' });
      if (res.ok) fetchAds();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl font-bold font-headline text-primary">বিজ্ঞাপন স্লট ব্যবস্থাপনা</h1>
        <p className="text-xs text-meta">হোমপেজের ব্যানার, সাইডবার ও বিলবোর্ড বিজ্ঞাপন নিয়ন্ত্রণ করুন</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 border border-hairline rounded shadow-sm">
          <h3 className="font-headline font-bold text-sm mb-3">নতুন বিজ্ঞাপন যোগ করুন</h3>
          <form onSubmit={handleAdd} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">স্লট নাম *</label>
              <select
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
                className="w-full px-3 py-1.5 border border-input-border rounded text-xs bg-white"
              >
                <option value="leaderboard">শীর্ষ লিডারবোর্ড (970x90)</option>
                <option value="billboard">বিলবোর্ড ১ (970x250/320)</option>
                <option value="hero-right">হিরো ডান সাইডবার (300x250)</option>
                <option value="sports-right">খেলাধুলা সাইডবার (300x250)</option>
                <option value="bangladesh-right">বাংলাদেশ সাইডবার (300x250)</option>
                <option value="bottom-billboard">নিচের বিলবোর্ড (970x320)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">বিজ্ঞাপনের শিরোনাম</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="ক্লায়েন্টের নাম বা অফার"
                className="w-full px-3 py-1.5 border border-input-border rounded text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">টার্গেট লিংক (URL)</label>
              <input
                type="text"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-1.5 border border-input-border rounded text-xs"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-brand-red text-white text-xs font-semibold rounded hover:bg-red-700 transition-colors"
            >
              বিজ্ঞাপন সংরক্ষণ করুন
            </button>
          </form>
        </div>

        <div className="md:col-span-2 bg-white border border-hairline rounded shadow-sm overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F8F9FA] border-b border-hairline text-meta font-semibold">
              <tr>
                <th className="py-2.5 px-3">স্লট</th>
                <th className="py-2.5 px-3">শিরোনাম</th>
                <th className="py-2.5 px-3">সাইজ</th>
                <th className="py-2.5 px-3 text-center">মুছুন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {ads.map((a) => (
                <tr key={a._id} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-primary">{a.slot}</td>
                  <td className="py-2 px-3 text-gray-700">{a.title || 'বিজ্ঞাপন'}</td>
                  <td className="py-2 px-3 font-mono text-meta">{a.size}</td>
                  <td className="py-2 px-3 text-center">
                    <button
                      onClick={() => handleDelete(a._id)}
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
