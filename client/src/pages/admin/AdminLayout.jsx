import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  FolderTree,
  Hash,
  Users,
  Image as ImageIcon,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const { user, loading, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return <div className="p-8 text-center text-sm">যাচাই করা হচ্ছে...</div>;
  }

  if (!user || !['admin', 'editor', 'reporter'].includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 border border-hairline text-center max-w-sm">
          <h3 className="font-bold text-lg mb-2">অনুমতি প্রয়োজন</h3>
          <p className="text-xs text-gray-600 mb-4">
            অ্যাডমিন প্যানেল ব্যবহারের জন্য আপনার অনুমতি নেই। অনুগ্রহ করে লগইন করুন।
          </p>
          <Link
            to="/login"
            className="px-4 py-2 bg-brand-red text-white text-xs font-semibold rounded inline-block"
          >
            লগইন পেজে যান
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navLinks = [
    { label: 'ড্যাশবোর্ড', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'সংবাদ তালিকা', path: '/admin/articles', icon: FileText, exact: true },
    { label: 'নতুন সংবাদ', path: '/admin/articles/new', icon: PlusCircle },
    { label: 'বিভাগসমূহ', path: '/admin/categories', icon: FolderTree },
    { label: 'আলোচিত বিষয়', path: '/admin/topics', icon: Hash },
    { label: 'বিজ্ঞাপন স্লট', path: '/admin/ads', icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col font-body text-primary">
      {/* Top Navbar */}
      <header className="h-14 bg-white border-b border-hairline px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1 font-headline text-xl font-bold">
            <span className="text-primary">খবর</span>
            <span className="text-brand-red">ঘর</span>
            <span className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-600 font-normal">
              CMS
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            target="_blank"
            className="text-xs text-gray-600 hover:text-brand-red flex items-center gap-1"
          >
            <span>লাইভ সাইট দেখুন</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
          <div className="h-4 w-px bg-gray-300"></div>
          <span className="text-xs font-semibold text-gray-800">
            {user.name} ({user.role})
          </span>
          <button
            onClick={handleLogout}
            className="text-xs text-red-600 hover:underline flex items-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            লগআউট
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-56 bg-white border-r border-hairline py-4 flex flex-col justify-between">
          <nav className="space-y-0.5 px-3">
            {navLinks.map((item) => {
              const active = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);

              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded transition-colors ${
                    active
                      ? 'bg-brand-red text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="px-6 py-2 text-[11px] text-gray-400">
            খবরঘর সংস্করণ ২.০
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
