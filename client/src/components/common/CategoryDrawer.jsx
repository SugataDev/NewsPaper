import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Search, ChevronRight } from 'lucide-react';

export default function CategoryDrawer({ isOpen, onClose, categories = [] }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-xl z-50 flex flex-col transform transition-transform duration-300">
        {/* Header */}
        <div className="p-4 border-b border-hairline flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-headline text-2xl font-bold">
            <span className="text-primary">খবর</span>
            <span className="text-brand-red">ঘর</span>
            <span className="w-2 h-2 rounded-full bg-brand-red"></span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-black rounded-full hover:bg-gray-100 transition-colors"
            aria-label="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search inside drawer */}
        <div className="p-4 border-b border-hairline bg-[#F8F9FA]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const q = e.target.search.value;
              if (q.trim()) {
                onClose();
                navigate(`/search?q=${encodeURIComponent(q.trim())}`);
              }
            }}
            className="relative"
          >
            <input
              type="text"
              name="search"
              placeholder="সংবাদ অনুসন্ধান করুন..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-input-border rounded focus:outline-none focus:border-brand-blue"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </form>
        </div>

        {/* Categories list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <h3 className="text-xs font-semibold uppercase text-meta px-2 mb-2">বিভাগসমূহ</h3>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/${cat.slug}`}
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2.5 text-base font-semibold text-primary hover:text-brand-red hover:bg-[#FDF1EF] rounded transition-colors"
            >
              <span>{cat.nameBn}</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
          ))}
        </div>

        {/* Footer inside drawer */}
        <div className="p-4 border-t border-hairline bg-[#F8F9FA] text-xs text-meta text-center">
          © ২০২৬ খবরঘর অনলাইন সংস্করণ
        </div>
      </div>
    </div>
  );
}
