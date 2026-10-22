import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Save,
  ArrowLeft,
  Upload,
  Bold,
  Italic,
  Heading2,
  List,
  Quote,
} from 'lucide-react';

export default function AdminArticleEditor() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    kicker: '',
    slug: '',
    excerpt: '',
    body: '',
    type: 'news',
    category: 'bangladesh',
    subCategory: '',
    tags: '',
    division: '',
    district: '',
    upazila: '',
    videoUrl: '',
    authorName: 'স্টাফ রিপোর্টার',
    authorDesignation: 'প্রতিবেদক',
    status: 'published',
    isPinnedHome: false,
    pinnedSlot: '',
    pinnedOrder: 1,
    isBreaking: false,
    isTrending: false,
    isGoodNews: false,
    coverUrl: '',
    coverCaption: '',
    coverCredit: '',
  });

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Tiptap editor
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p></p>',
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, body: editor.getHTML() }));
    },
  });

  // Fetch divisions
  useEffect(() => {
    fetch('/api/locations?type=division')
      .then((r) => r.json())
      .then((data) => setDivisions(data || []))
      .catch((e) => console.error(e));
  }, []);

  // Cascading location
  useEffect(() => {
    if (formData.division) {
      fetch(`/api/locations?type=district&parent=${formData.division}`)
        .then((r) => r.json())
        .then((data) => setDistricts(data || []))
        .catch((e) => console.error(e));
    } else {
      setDistricts([]);
    }
  }, [formData.division]);

  useEffect(() => {
    if (formData.district) {
      fetch(`/api/locations?type=upazila&parent=${formData.district}`)
        .then((r) => r.json())
        .then((data) => setUpazilas(data || []))
        .catch((e) => console.error(e));
    } else {
      setUpazilas([]);
    }
  }, [formData.district]);

  // Load existing article if editing
  useEffect(() => {
    if (isEdit) {
      fetch(`/api/admin/articles/${id}`)
        .then((r) => {
          if (!r.ok) throw new Error('সংবাদটি পাওয়া যায়নি');
          return r.json();
        })
        .then((item) => {
          setFormData({
            title: item.title || '',
            kicker: item.kicker || '',
            slug: item.slug || '',
            excerpt: item.excerpt || '',
            body: item.body || '',
            type: item.type || 'news',
            category: item.category || 'bangladesh',
            subCategory: item.subCategory || '',
            tags: (item.tags || []).join(', '),
            division: item.location?.division || '',
            district: item.location?.district || '',
            upazila: item.location?.upazila || '',
            videoUrl: item.videoUrl || '',
            authorName: item.authors?.[0]?.nameBn || 'স্টাফ রিপোর্টার',
            authorDesignation: item.authors?.[0]?.designation || 'প্রতিবেদক',
            status: item.status || 'published',
            isPinnedHome: item.pinned?.home || false,
            pinnedSlot: item.pinned?.slot || '',
            pinnedOrder: item.pinned?.order || 1,
            isBreaking: item.flags?.breaking || false,
            isTrending: item.flags?.trending || false,
            isGoodNews: item.flags?.goodNews || false,
            coverUrl: item.coverImage?.url || '',
            coverCaption: item.coverImage?.caption || '',
            coverCredit: item.coverImage?.credit || '',
          });

          if (editor && item.body) {
            editor.commands.setContent(item.body);
          }
        })
        .catch((err) => setError(err.message));
    }
  }, [id, isEdit, editor]);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const bodyData = new FormData();
    bodyData.append('image', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: bodyData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'আপলোড ব্যর্থ হয়েছে');
      setFormData((prev) => ({ ...prev, coverUrl: data.url }));
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const payload = {
      title: formData.title,
      kicker: formData.kicker,
      slug: formData.slug || undefined,
      excerpt: formData.excerpt,
      body: formData.body || (editor ? editor.getHTML() : ''),
      type: formData.type,
      category: formData.category,
      subCategory: formData.subCategory,
      tags: formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      location: {
        division: formData.division,
        district: formData.district,
        upazila: formData.upazila,
      },
      authors: [
        {
          nameBn: formData.authorName,
          designation: formData.authorDesignation,
        },
      ],
      videoUrl: formData.videoUrl,
      coverImage: {
        url: formData.coverUrl,
        caption: formData.coverCaption,
        credit: formData.coverCredit,
      },
      status: formData.status,
      pinned: {
        home: formData.isPinnedHome,
        slot: formData.pinnedSlot,
        order: Number(formData.pinnedOrder) || 1,
      },
      flags: {
        breaking: formData.isBreaking,
        trending: formData.isTrending,
        goodNews: formData.isGoodNews,
      },
    };

    try {
      const endpoint = isEdit ? `/api/admin/articles/${id}` : '/api/admin/articles';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'সংরক্ষণ ব্যর্থ হয়েছে');

      navigate('/admin/articles');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top action header */}
      <div className="flex items-center justify-between pb-4 border-b border-hairline">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/articles"
            className="p-1.5 text-gray-500 hover:text-black rounded hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold font-headline text-primary">
            {isEdit ? 'সংবাদ সম্পাদনা' : 'নতুন সংবাদ লিখুন'}
          </h1>
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="px-5 py-2 bg-brand-red hover:bg-red-700 text-white font-semibold text-xs rounded flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {submitting ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Content */}
        <div className="lg:col-span-8 space-y-4">
          {/* Kicker & Title */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-1">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                কিকার (ঐচ্ছিক)
              </label>
              <input
                type="text"
                value={formData.kicker}
                onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                placeholder="যেমন: আবহাওয়া"
                className="w-full px-3 py-2 border border-input-border rounded text-xs focus:outline-none focus:border-brand-blue"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                শিরোনাম *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="সংবাদের মূল শিরোনাম লিখুন..."
                className="w-full px-3 py-2 border border-input-border rounded text-sm font-headline font-bold focus:outline-none focus:border-brand-blue"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              ভূমিকা / সারাংশ (Excerpt) *
            </label>
            <textarea
              required
              rows={3}
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="সংবাদের প্রথম দুই-তিন লাইনের সংক্ষিপ্ত সারাংশ..."
              className="w-full px-3 py-2 border border-input-border rounded text-xs leading-relaxed focus:outline-none focus:border-brand-blue"
            />
          </div>

          {/* Body Rich Text (Tiptap) */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              মূল প্রতিবেদন (Rich Text) *
            </label>

            {/* Tiptap Toolbar */}
            {editor && (
              <div className="flex items-center gap-1 p-2 bg-[#F8F9FA] border border-hairline rounded-t">
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`p-1.5 rounded ${editor.isActive('bold') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`p-1.5 rounded ${editor.isActive('italic') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                  className={`p-1.5 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                >
                  <Heading2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  className={`p-1.5 rounded ${editor.isActive('bulletList') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                >
                  <List className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBlockquote().run()}
                  className={`p-1.5 rounded ${editor.isActive('blockquote') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                >
                  <Quote className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="border border-input-border border-t-0 rounded-b p-3 min-h-[280px] bg-white prose max-w-none text-xs leading-relaxed focus:outline-none">
              <EditorContent editor={editor} />
            </div>
          </div>

          {/* Cover Image Upload */}
          <div className="bg-white p-4 border border-hairline rounded space-y-3">
            <h4 className="text-xs font-bold text-primary">কভার ছবি</h4>
            <div className="flex items-center gap-4">
              {formData.coverUrl && (
                <div className="w-32 h-20 bg-gray-100 overflow-hidden rounded border border-hairline flex-shrink-0">
                  <img
                    src={formData.coverUrl}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                />
                {uploading && <span className="text-xs text-blue-600 block mt-1">আপলোড ও অপটিমাইজেশন চলছে...</span>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <input
                type="text"
                placeholder="ছবির ক্যাপশন..."
                value={formData.coverCaption}
                onChange={(e) => setFormData({ ...formData, coverCaption: e.target.value })}
                className="px-3 py-1.5 border border-input-border rounded text-xs"
              />
              <input
                type="text"
                placeholder="ছবির ক্রেডিট (যেমন: খবরঘর)"
                value={formData.coverCredit}
                onChange={(e) => setFormData({ ...formData, coverCredit: e.target.value })}
                className="px-3 py-1.5 border border-input-border rounded text-xs"
              />
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Metadata & Settings */}
        <div className="lg:col-span-4 space-y-4">
          {/* Status & Category */}
          <div className="bg-white p-4 border border-hairline rounded space-y-3">
            <h4 className="text-xs font-bold text-primary border-b border-hairline pb-2">
              প্রকাশনা ও বিভাগ
            </h4>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                স্ট্যাটাস
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-input-border rounded text-xs bg-white"
              >
                <option value="published">প্রকাশিত (Published)</option>
                <option value="draft">খসড়া (Draft)</option>
                <option value="scheduled">নির্ধারিত (Scheduled)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                বিভাগ *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-input-border rounded text-xs bg-white"
              >
                <option value="bangladesh">বাংলাদেশ</option>
                <option value="politics">রাজনীতি</option>
                <option value="world">বিশ্ব</option>
                <option value="business">বাণিজ্য</option>
                <option value="opinion">মতামত</option>
                <option value="sports">খেলা</option>
                <option value="entertainment">বিনোদন</option>
                <option value="jobs">চাকরি</option>
                <option value="lifestyle">জীবনযাপন</option>
                <option value="video">ভিডিও</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                সংবাদের ধরণ
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-input-border rounded text-xs bg-white"
              >
                <option value="news">সাধারণ সংবাদ</option>
                <option value="video">ভিডিও সংবাদ</option>
                <option value="opinion">মতামত কলাম</option>
                <option value="gallery">ছবি গ্যালারি</option>
              </select>
            </div>

            {formData.type === 'video' && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  ইউটিউব ভিডিও এম্বেড লিংক
                </label>
                <input
                  type="text"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://www.youtube-nocookie.com/embed/..."
                  className="w-full px-3 py-1.5 border border-input-border rounded text-xs"
                />
              </div>
            )}
          </div>

          {/* Cascading Location */}
          <div className="bg-white p-4 border border-hairline rounded space-y-3">
            <h4 className="text-xs font-bold text-primary border-b border-hairline pb-2">
              এলাকা নির্ধারণ (লোকেশন)
            </h4>

            <div>
              <label className="block text-xs text-gray-600 mb-1">বিভাগ</label>
              <select
                value={formData.division}
                onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                className="w-full px-3 py-1.5 border border-input-border rounded text-xs bg-white"
              >
                <option value="">নির্বাচন করুন</option>
                {divisions.map((d) => (
                  <option key={d.slug} value={d.slug}>
                    {d.nameBn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">জেলা</label>
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                disabled={!formData.division}
                className="w-full px-3 py-1.5 border border-input-border rounded text-xs bg-white disabled:opacity-50"
              >
                <option value="">নির্বাচন করুন</option>
                {districts.map((d) => (
                  <option key={d.slug} value={d.slug}>
                    {d.nameBn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">উপজেলা</label>
              <select
                value={formData.upazila}
                onChange={(e) => setFormData({ ...formData, upazila: e.target.value })}
                disabled={!formData.district}
                className="w-full px-3 py-1.5 border border-input-border rounded text-xs bg-white disabled:opacity-50"
              >
                <option value="">নির্বাচন করুন</option>
                {upazilas.map((u) => (
                  <option key={u.slug} value={u.slug}>
                    {u.nameBn}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Homepage Pinning & Flags */}
          <div className="bg-white p-4 border border-hairline rounded space-y-3">
            <h4 className="text-xs font-bold text-primary border-b border-hairline pb-2">
              হোমপেজ পিন ও ফ্ল্যাগ
            </h4>

            <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPinnedHome}
                onChange={(e) => setFormData({ ...formData, isPinnedHome: e.target.checked })}
                className="rounded text-brand-red"
              />
              <span>হোমপেজে পিন করুন</span>
            </label>

            {formData.isPinnedHome && (
              <div className="pl-5 space-y-2">
                <input
                  type="text"
                  placeholder="পিন স্লট (যেমন: hero-lead)"
                  value={formData.pinnedSlot}
                  onChange={(e) => setFormData({ ...formData, pinnedSlot: e.target.value })}
                  className="w-full px-3 py-1.5 border border-input-border rounded text-xs"
                />
              </div>
            )}

            <div className="pt-2 border-t border-hairline space-y-2">
              <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isBreaking}
                  onChange={(e) => setFormData({ ...formData, isBreaking: e.target.checked })}
                />
                <span>ব্রেকিং নিউজ</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isTrending}
                  onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                />
                <span>আলোচিত / ট্রেন্ডিং</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isGoodNews}
                  onChange={(e) => setFormData({ ...formData, isGoodNews: e.target.checked })}
                />
                <span>সুখবর</span>
              </label>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white p-4 border border-hairline rounded space-y-2">
            <label className="block text-xs font-semibold text-gray-700">
              ট্যাগসমূহ (কমা দিয়ে পৃথক করুন)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="রাজনীতি, জাতীয়, নির্বাচন"
              className="w-full px-3 py-1.5 border border-input-border rounded text-xs"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
