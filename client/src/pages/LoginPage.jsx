import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Helmet>
        <title>লগইন | খবরঘর</title>
      </Helmet>
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="bg-white p-8 border border-hairline max-w-md w-full shadow-sm">
          <div className="text-center mb-6">
            <h2 className="font-headline text-2xl font-bold text-primary">
              খবরঘর অ্যাকাউন্টে প্রবেশ
            </h2>
            <p className="text-xs text-meta mt-1">
              প্রশাসনিক ও প্রতিবেদন ব্যবস্থাপনা সিস্টেমে লগইন করুন
            </p>
          </div>

          {error && (
            <div className="p-3 mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                ইমেইল ঠিকানা
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@khaborghor.com"
                className="w-full px-3 py-2 border border-input-border rounded text-sm focus:outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                পাসওয়ার্ড
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-input-border rounded text-sm focus:outline-none focus:border-brand-blue"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 bg-brand-red hover:bg-red-700 text-white font-semibold text-sm rounded transition-colors disabled:opacity-50"
            >
              {submitting ? 'যাচাই করা হচ্ছে...' : 'লগইন করুন'}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-meta">
            ডেমো অ্যাক্সেস: <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">admin@khaborghor.com</code> / <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">admin123456</code>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
