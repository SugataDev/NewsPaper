import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext";

// Route-level code splitting
const HomePage = lazy(() => import("./pages/HomePage"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Admin CMS
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminArticlesList = lazy(() => import("./pages/admin/AdminArticlesList"));
const AdminArticleEditor = lazy(
  () => import("./pages/admin/AdminArticleEditor"),
);
const AdminCategories = lazy(() => import("./pages/admin/AdminCategories"));
const AdminTopics = lazy(() => import("./pages/admin/AdminTopics"));
const AdminAds = lazy(() => import("./pages/admin/AdminAds"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
  },
});

function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-brand-red border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Bangladesh Cascading Location Routes */}
              <Route
                path="/bangladesh/:division/:district/:upazila"
                element={<CategoryPage />}
              />
              <Route
                path="/bangladesh/:division/:district"
                element={<CategoryPage />}
              />
              <Route path="/bangladesh/:division" element={<CategoryPage />} />

              {/* Admin CMS */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="articles" element={<AdminArticlesList />} />
                <Route path="articles/new" element={<AdminArticleEditor />} />
                <Route
                  path="articles/:id/edit"
                  element={<AdminArticleEditor />}
                />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="topics" element={<AdminTopics />} />
                <Route path="ads" element={<AdminAds />} />
              </Route>

              {/* Article Page (must come before generic category) */}
              <Route path="/:category/:slug" element={<ArticlePage />} />

              {/* Category Page */}
              <Route path="/:category" element={<CategoryPage />} />

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
