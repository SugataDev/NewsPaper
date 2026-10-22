import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60">
      <div className="bg-white w-full max-w-2xl rounded p-6 shadow-2xl relative border border-hairline">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-bold font-headline mb-4 text-primary">সংবাদ অনুসন্ধান</h3>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="কী খুঁজতে চান? বিষয় বা কীওয়ার্ড লিখুন..."
              autoFocus
              className="w-full pl-10 pr-4 py-2.5 border border-input-border rounded text-base focus:outline-none focus:border-brand-blue"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-brand-blue hover:bg-blue-700 text-white font-semibold text-sm rounded transition-colors"
          >
            খুঁজুন
          </button>
        </form>
      </div>
    </div>
  );
}
