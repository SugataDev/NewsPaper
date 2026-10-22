import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { toBanglaDigits } from '../../utils/formatters';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [nameBn, setNameBn] = useState('');
  const [slug, setSlug] = useState('');
  const [order, setOrder] = useState(0);

  const fetchCats = () => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((d) => setCategories(d || []));
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!nameBn.trim()) return;

    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nameBn, slug, order }),
      });
      if (res.ok) {
        setNameBn('');
        setSlug('');
        setOrder(categories.length);
        fetchCats();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('বিভাগটি মুছে ফেলতে চান?')) return;
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
      if (res.ok) fetchCats();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl font-bold font-headline text-primary">বিভাগ ব্যবস্থাপনা</h1>
        <p className="text-xs text-meta">মেনু ও বিভাগসমূহের ক্রম ও প্রদর্শন নিয়ন্ত্রণ করুন</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Add Category Form */}
        <div className="bg-white p-4 border border-hairline rounded shadow-sm">
          <h3 className="font-headline font-bold text-sm mb-3">নতুন বিভাগ যোগ করুন</h3>
          <form onSubmit={handleAdd} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">বাংলা নাম *</label>
              <input
                type="text"
                required
                value={nameBn}
                onChange={(e) => setNameBn(e.target.value)}
                placeholder="যেমন: বিজ্ঞান"
                className="w-full px-3 py-1.5 border border-input-border rounded text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">স্লাগ (English)</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="যেমন: science"
                className="w-full px-3 py-1.5 border border-input-border rounded text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">ক্রম নম্বর</label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                className="w-full px-3 py-1.5 border border-input-border rounded text-xs"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-brand-red text-white text-xs font-semibold rounded hover:bg-red-700 transition-colors"
            >
              যোগ করুন
            </button>
          </form>
        </div>

        {/* Categories List */}
        <div className="md:col-span-2 bg-white border border-hairline rounded shadow-sm overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F8F9FA] border-b border-hairline text-meta font-semibold">
              <tr>
                <th className="py-2.5 px-3">ক্রম</th>
                <th className="py-2.5 px-3">নাম</th>
                <th className="py-2.5 px-3">স্লাগ</th>
                <th className="py-2.5 px-3 text-center">মুছুন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {categories.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-mono">{toBanglaDigits(c.order)}</td>
                  <td className="py-2 px-3 font-semibold text-primary">{c.nameBn}</td>
                  <td className="py-2 px-3 text-meta">{c.slug}</td>
                  <td className="py-2 px-3 text-center">
                    <button
                      onClick={() => handleDelete(c._id)}
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
