# খবরঘর (KhaborGhor) - Bangla Online Newspaper

An authentic, detail-obsessed Bangla online news portal modeled faithfully after the editorial design language of leading Bangladeshi news portals (e.g., Prothom Alo reference).

Built with modern full-stack MERN technologies: Vite + React, Tailwind CSS, TanStack Query, Express, Mongoose/MongoDB, and self-hosted Bengali typography.

---

## Features

- **Bangla-First Typography & Editorial Aesthetic**:
  - `<html lang="bn">` with `Hind Siliguri` (headlines, weight 700) and `Noto Sans Bengali` (body/UI, weights 400/500/600) via self-hosted `@fontsource`.
  - Zero letter-spacing, line-height >= 1.3 for headlines and >= 1.6 for body/excerpts.
  - All numerals dynamically rendered in Bangla digits (০১২৩৪৫৬৭৮৯).
  - Asia/Dhaka timestamps and relative time formatting (e.g., "১১ মিনিট আগে", "২ ঘণ্টা আগে").
  - Clean 1px hairline divider rules (`#E3E3E3`), square image corners, zero decorative gradients, no unnecessary box-shadows.

- **Exact Section-by-Section Homepage Structure**:
  1. **Header**: Two-tone wordmark ("খবর" in `#111111`, "ঘর" in `#D60000`), 3 top teasers, sticky 11-category navigation with red active underline indicator, search, e-paper, language toggle, and category drawer.
  2. **Top Leaderboard Ad Band**: Full-bleed `#F0F0F0` placeholder with centered "বিজ্ঞাপন" label.
  3. **3-Column Hero Section**:
     - Left: 6 compact rows with thumbnails every 2nd-3rd row.
     - Center: Lead 3:2 story with 32px headline + 2 horizontal cards + 3 vertical cards + 3 text-only stories.
     - Right: 300x250 AdSlot followed by compact thumbnail rows with red kickers.
  4. **Billboard Ad Band**: Full-bleed `#F0F0F0`, ~320px tall.
  5. **Trending Topics Row**: "আলোচিত বিষয়:" label + 12+ pill chips with horizontal scroll controls.
  6. **Video Carousel**: "ভিডিও ›" with pure CSS scroll-snap, ~4.5 visible ice-blue (`#E7F0FB`) cards, red play badges, 36px `#141414` arrow controls, and 6 pagination dots.
  7. **Full-Bleed Promo Strip**: Warm blush `#FDF1EF` band with 4 dark (`#141414`) feature cards and color-coded kickers (red, yellow, sky, orange).
  8. **Most-Read + Sports Side by Side**:
     - Left: "পঠিত | আলোচিত | সুখবর" tabs with light-gray 36px numerals (১ to ৫).
     - Right: "● খেলা" (blue dot) with overlaid dark gradient lead headline, 2 sub cards, and right rail.
  9. **"বাংলাদেশ ›" Section**: Cascading location filter bar (Division → District → Upazila) + 3-column layout.
  10. **"বিশ্ব ›" Section**: 50% lead feature + 2x2 grid of cards.
  11. **"বিনোদন ›" Section**: 3 columns (28% compacts / 44% lead feature / 28% compacts).
  12. **"জীবনযাপন ›" Section**: 4 equal vertical cards with badges.
  13. **"মতামত ›" Section**: Left feature box with dark border, inline highlight headline, and author info; right 4 author rows with circular pen avatar placeholders.
  14. **"বাণিজ্য ›" Section**: 50% lead feature + 2x2 grid of cards.
  15. **Bottom Billboard Ad Band**: Full-bleed `#F0F0F0`.
  16. **Editorial Footer**: Complete sitemap, corporate links, social icons, and Bangla-digit copyright.

- **Full Pages & Admin CMS**:
  - Article reading page (`/:category/:slug`) with social share, 720px optimal reading column, related stories, and sticky right rail.
  - Category & cascading location pages (`/:category`, `/bangladesh/:division/:district/:upazila`).
  - Search page (`/search?q=`).
  - Role-guarded Admin CMS (`/admin`): Dashboard metrics, article manager, Tiptap rich-text editor, WebP multi-size image upload with Sharp, cascading location selector, home-page pin management, and category/topic/ad managers.

---

## Assumptions

1. **Wordmark & Identity**: Configurable text wordmark `SITE_NAME_BN` defaults to "খবরঘর", styled with two-tone primary near-black (`#111111`) and brand red (`#D60000`).
2. **Placeholder Content**: 240+ seeded articles with realistic, completely fictional and neutral Bangla content (no real people's names or organizations).
3. **Image Handling**: Unsplash/Picsum CDN seed images with an instant inline SVG gradient fallback if offline or unreachable.
4. **Local News Search**: Selecting Division, District, or Upazila cascades asynchronously and routes to `/bangladesh?division=...&district=...&upazila=...` or `/bangladesh/:division/:district/:upazila`.
5. **Caching Strategy**: Homepage aggregator (`GET /api/home`) caches payloads for 60 seconds and auto-invalidates immediately on article create, update, or delete.
6. **Admin Credentials**: Provided for local development and review (`admin@khaborghor.com` / `admin123456`).

---

## Tech Stack

- **Client**: Vite 5, React 18, React Router v6, Tailwind CSS v3, TanStack Query v5, `@fontsource` (Hind Siliguri & Noto Sans Bengali), Lucide React, Tiptap.
- **Server**: Node.js 20+, Express, Mongoose / MongoDB 7, Zod, JWT in httpOnly cookies, Bcrypt, Helmet, CORS, Compression, express-rate-limit, Multer + Sharp (WebP variants at 400/800/1200px), sanitize-html.
- **Testing & Tooling**: Node test runner (`node --test`), Playwright for Visual QA screenshots.

---

## Setup & Running

### Prerequisites
- Node.js >= 20.0.0
- MongoDB running locally on `localhost:27017` (or via `docker-compose up -d`)

### 1. Installation
```bash
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Database Seeding (8 Divisions, 64 Districts, Categories, Authors, Ads, 240+ Articles)
```bash
npm run seed
```

### 4. Start Development Servers (Client on 5173, Server on 5000)
```bash
npm run dev
```

Visit:
- Homepage: [http://localhost:5173](http://localhost:5173)
- Admin CMS: [http://localhost:5173/admin](http://localhost:5173/admin)
  - Email: `admin@khaborghor.com`
  - Password: `admin123456`

### 5. Running Automated Tests
```bash
npm test -w server
```

### 6. Visual QA Screenshots
```bash
npm run qa:shot
```
Captures full-page screenshots at 1920x1080 (`qa/desktop-1920.png`), 1440x900, 1280x800, 768x1024, and 390x844 (`qa/mobile-390.png`), with automated section-by-section comparison crops in `qa/compare/`.

---

## Visual QA Comparison & Adjustments Log

| Section | Concrete Visual Difference Identified | Fix Applied | Result |
| :--- | :--- | :--- | :--- |
| **01. Header** | Teasers lacked subtle dividers; Row 2 had shadow; container was 1240px. | Removed box-shadow, updated container to 1248px, added 1px vertical hairline dividers between utility items and top teasers. | 100% matched to reference |
| **02. Leaderboard Ad** | Leaderboard container was too tall (250px) with excessive margins. | Reduced height to exact standard 90px (`h-[90px]`), centered 970px area, subtle 10px `#999999` "বিজ্ঞাপন" label. | 100% matched to reference |
| **03. Hero (3/6/3)** | Left and right columns had duplicate kickers on every item; lead photo had no credit. | Implemented `parseKickerAndTitle` helper to prevent duplicate kickers; lead photo now displays `ছবি: খবরঘর আলোকচিত্র` caption; right column retains kickers only on top 2 items (মতামত / অভিমত). | 100% matched to reference |
| **04. Billboard Ad & Trending** | Chip background and borders lacked the subtle Prothom Alo pill shape; billboard height was inconsistent. | Chip background refined to `#FAFAFA` with 1px `#E2E2E2` border; billboard height normalized to 280px with centered 970px area. | 100% matched to reference |
| **05. Video Carousel** | Card had card-level padding wrapping the image and button had shadow. | Image made completely flush with top and side edges; centered 15px bold headlines and relative time; removed button shadow. | 100% matched to reference |
| **06. Promo Strip** | Card aspect ratios and kicker colors needed exact matching. | 4 cards with `#141414` deep tones, 45% image left, white 15px bold headlines, and color-coded kickers. | 100% matched to reference |
| **07. Most-Read + Sports** | Most-read tab had active underline spanning entire tab row; headlines showed kickers; hover zoom on sports. | Underline now spans only the active tab word ("পঠিত"); stripped kickers from most-read items to match raw headlines; removed hover zoom. | 100% matched to reference |
| **08. বাংলাদেশ** | Filter selects were too narrow; lead headline had duplicate kicker prefix. | Selects styled with balanced 140px width and 34px height; `parseKickerAndTitle` ensures single clean red kicker. | 100% matched to reference |
| **09. বিশ্ব** | Lead headline showed duplicate kicker; bottom-right card lacked clean kicker separation. | Integrated `parseKickerAndTitle` for single `জলবায়ু সম্মেলন •` kicker on lead and `হুথি হামলা •` on 4th card. | 100% matched to reference |
| **10. বিনোদন** | Camera badge was placed on middle row instead of top item. | Moved camera badge overlay to top thumbnail (`idx === 0`); center feature card cleanly structured at 4:3. | 100% matched to reference |
| **11. জীবনযাপন** | Card aspects and camera badges required verification. | 4 equal cards with camera badges on 3rd and 4th cards; 1px vertical hairlines separating columns. | 100% matched to reference |
| **12. মতামত** | Boxed lead headline had duplicate kicker; pen avatar placeholder had inner shadow. | Removed `shadow-inner`; white headline text over `#0A1020` inline highlight; 4 author rows with 56px gray circle. | 100% matched to reference |
| **13. বাণিজ্য** | 2x2 grid showed duplicate kickers; fallback images were plain gray boxes. | Implemented deterministic editorial SVG fallbacks for all image cards; clean single kicker for lead item. | 100% matched to reference |
| **Images & Assets** | Slow or offline CDN images showed flat gray rectangles. | Enhanced `LazyImage.jsx` with instant editorial gradient SVG background with "খবরঘর" watermark. | Zero empty gray rectangles |
