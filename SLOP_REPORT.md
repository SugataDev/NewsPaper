# খবরঘর (KhaborGhor) - Anti-Slop Audit & Transformation Report

> **Antislop Status**: Completed Pass  
> **Active Mode**: `during (global preference)`  
> **Platform / Environment**: Node.js v24, Express, MongoDB, Vite, React 18, Tailwind CSS, Playwright  
> **Reference Standard**: Authentic Bangladeshi digital journalism (Prothom Alo editorial aesthetic matching `reference/home.png`)  
> **Timestamp**: 2026-10-22

---

## 1. Executive Summary

This report documents the end-to-end anti-slop pass performed on **খবরঘর (KhaborGhor)**. The codebase had established an accurate structural layout matching the editorial reference (`reference/home.png`), but displayed multiple classic signs of AI-generated demo slop:
1. **Mechanical Content**: 170 seeded articles created by repeating 34 templates 5 times with identical repetitive suffixes (`', বাস্তবায়নে গুরুত্বারোপ'`) and identical 4-line cookie-cutter bodies ("রাজধানীসহ দেশের বিভিন্ন প্রান্ত থেকে প্রাপ্ত তথ্যে জানা গেছে...").
2. **Accessibility Failure**: Metadata timestamps, captions, and bylines rendered in `#8A8A8A` on `#FFFFFF` (contrast ratio 3.45:1, failing the WCAG AA 4.5:1 requirement).
3. **Ghost Links & Dead Ends**: Top header contained a dead `#epaper` link and a non-clickable static `Eng` pill. Trending topic chips (`/topic/:slug`) and corporate footer links (`/about`, `/contact`, `/privacy`, `/terms`, `/advertise`) routed to unhandled or empty views.
4. **Cascading Filter Disconnect**: Location select inputs passed English slugs (`dhaka`, `chattogram`) while the database stored Bengali strings (`ঢাকা`, `চট্টগ্রাম`), resulting in 0 articles returned upon filtering regional news.
5. **Keyboard Inaccessibility**: Modals and slide-out drawers failed to respond to the `Escape` key (violating rule R-32).
6. **Synthwave Vector Fallbacks**: Image error fallbacks rendered neon gradients with polygon mountainscapes and circles instead of authentic editorial photography placeholders.

Every identified issue has been systematically resolved while strictly maintaining the full-stack architecture, API contracts, and the reference-matched 1248px editorial layout.

---

## 2. Before vs. After Quantitative Comparison

| Metric / Attribute | Demo State (Before) | Authentic Newsroom State (After) | Governing Antislop Rule |
| :--- | :--- | :--- | :--- |
| **Unique Journalistic Articles** | 34 templates repeated 5x (170 total) | **204 original, category-specific articles** | R-38 (Real Content or Honest Placeholder) |
| **Article Body Quality** | Identical generic 4-line boilerplate across all categories | **Rich, multi-paragraph reporting** with quotes, datelines, and data | R-16, R-38 |
| **Repetitive Headline Suffixes** | Mechanical repetition (`suffix: ', বাস্তবায়নে গুরুত্বারোপ'`) | **Zero mechanical suffixes**; organic editorial kickers & headlines | R-16, R-38 |
| **Reporting Datelines** | None (generic placeholder) | **Authentic datelines** ("ঢাকা", "চট্টগ্রাম", "সিলেট", "কক্সবাজার", "লন্ডন", "ওয়াশিংটন") | R-38 |
| **Em Dash Characters (`—`)** | Tested (0 present) | **0 present** (strictly preserved) | R-02 (Copywriting ban on em dashes) |
| **Meta Text Contrast Ratio** | 3.45:1 (`#8A8A8A` on `#FFFFFF` - **FAILS AA**) | **5.74:1** (`#666666` on `#FFFFFF` - **PASSES WCAG AA**) | R-25 (Color Contrast) |
| **Ad Label Contrast Ratio** | 2.5:1 (`#999999` on `#F0F0F0` - **FAILS AA**) | **4.95:1** (`#666666` on `#F0F0F0` - **PASSES WCAG AA**) | R-25 (Color Contrast) |
| **Keyboard Focus Ring** | None (`outline: none` without replacement) | **High-contrast 2px red ring** with 2px offset (`:focus-visible`) | R-32 (Keyboard Accessibility) |
| **Modal Escape Key Handling** | None (modals remained open on `Escape`) | **Full `Escape` key listeners** with event cleanup on all modals/drawers | R-32 (Keyboard Accessibility) |
| **E-Paper Feature** | Dead `#epaper` link jumping nowhere | **Interactive E-Paper Viewer** with edition switch, page flip & PDF download | R-24, R-26 (Interactive Elements) |
| **Language Toggle** | Dead `<span cursor-default>Eng</span>` | **Interactive announcement modal** for upcoming English digital edition | R-26 (Interactive Elements) |
| **Header Top Dateline** | Missing date in header row | **Live Bengali dateline** ("ঢাকা • বৃহস্পতিবার, ২২ অক্টোবর ২০২৬") | C-1, C-3 |
| **Trending Topic Links** | Navigated to unhandled route / 404 | **Dedicated topic feed** with topic header and tagged articles | R-24, R-26 |
| **Cascading Location Search** | Empty results (slug vs. nameBn mismatch) | **Dynamic resolution** supporting both slug & nameBn; returns matching regional news | C-2 (Functional Completeness) |
| **Corporate / Footer Pages** | 404 / Empty category pages | **5 full editorial pages** (`/about`, `/contact`, `/advertise`, `/privacy`, `/terms`) | R-24, R-38 |
| **Image Fallback Graphics** | Neon polygon gradients (synthwave mountains) | **Clean editorial photography placeholder** in `#F0F2F5` | R-01, R-07 |
| **Automated Tests** | 10 passing | **13 passing** (added topic, location, ad slot tests) | R-35 (Verify Before You Deliver) |

---

## 3. Detailed Inventory of Slop Remediations

### 3.1 SLOP-01 & SLOP-02: Boilerplate Articles & Mechanical Suffixes
- **Violations**: R-16 (Marketing Buzzwords/Formulaic Patterns), R-38 (Real Content or Honest Placeholder), C-1 (Intentionality).
- **Remediation**: Completely rebuilt `server/src/seed/articlesGenerator.js`. Authored 204 unique, category-native journalistic articles spanning politics, national affairs across all 8 divisions, international diplomacy, macroeconomic reports (forex reserves, DSE indices, RMG exports, remittances), sports match reports with quotes and statistics, cultural reviews, lifestyle guides, public policy essays, and career circulars. Removed all mechanical string concatenations.

### 3.2 SLOP-04: Language Inconsistency in Header
- **Violations**: R-02, C-1.
- **Remediation**: The top utility bar displayed the English word "Login" on an otherwise Bengali portal. Replaced with authentic Bengali "লগইন" accompanied by user status indicator.

### 3.3 SLOP-05 & SLOP-06: Dead E-Paper Link and Static "Eng" Pill
- **Violations**: R-24 (Navigation), R-26 (Interactive Elements).
- **Remediation**: 
  - Created `client/src/components/common/EpaperModal.jsx`, an interactive reader allowing users to switch between the Dhaka and Chattogram editions, browse pages (পাতা ১ to ৮) with thumbnail selector, toggle zoom levels, and trigger PDF download.
  - Converted the `Eng` pill into an interactive button that opens an informative modal outlining KhaborGhor's upcoming English edition.

### 3.4 SLOP-07: Broken Trending Topic Routing
- **Violations**: R-24, R-26.
- **Remediation**: Added `<Route path="/topic/:slug" element={<CategoryPage />} />` to `client/src/App.jsx`. Enhanced `server/src/routes/topics.js` with `GET /api/topics/:slug` and `server/src/routes/articles.js` with topic-slug-to-nameBn resolution, rendering a dedicated topic feed with headline "আলোচিত বিষয়: [বিষয়]".

### 3.5 SLOP-08 & SLOP-09: Cascading Location Filter Disconnect
- **Violations**: C-2 (Functional Completeness), R-26.
- **Remediation**: 
  - Updated `server/src/routes/articles.js` to look up locations dynamically: if `division`, `district`, or `upazila` is provided as an English slug (e.g., `'dhaka'`) or Bengali name (e.g., `'ঢাকা'`), the query matches both `location.divisionSlug` and `location.division`.
  - Added `BangladeshRouteDispatcher` in `App.jsx` to distinguish between division feeds (`/bangladesh/dhaka`) and article permalinks (`/bangladesh/:slug`), ensuring zero routing collisions.

### 3.6 SLOP-10: Missing Footer Editorial & Corporate Pages
- **Violations**: R-24, R-38.
- **Remediation**: Created `client/src/pages/StaticEditorialPage.jsx` serving `/about`, `/contact`, `/advertise`, `/privacy`, and `/terms`. Includes full newsroom leadership, physical office address at Motijheel, telephone and email contacts, an interactive reader inquiry form with instant submission feedback, digital advertising rate cards, and legal terms.

### 3.7 SLOP-11 & SLOP-12: Sub-Standard Contrast Ratios
- **Violations**: R-25 (Color Contrast).
- **Remediation**: 
  - Changed `--color-meta` in `client/src/index.css` from `#8A8A8A` (ratio 3.45:1) to `#666666` (ratio 5.74:1), passing the WCAG AA 4.5:1 threshold.
  - Adjusted advertisement badges from `#999999` to `#666666` (ratio 4.95:1 on `#F0F0F0`).

### 3.8 SLOP-13 & SLOP-14: Keyboard Inaccessibility
- **Violations**: R-32 (Keyboard Accessibility).
- **Remediation**:
  - Implemented `Escape` key event listeners with automatic cleanup in `SearchModal.jsx`, `CategoryDrawer.jsx`, and `EpaperModal.jsx`.
  - Added visible `:focus-visible` outline styles in `client/src/index.css` (`2px solid var(--color-brand-red)`, `outline-offset: 2px`).

### 3.9 SLOP-15: Synthwave SVG Illustration Fallbacks
- **Violations**: R-01 (Color & Gradients), R-07 (Decorative Elements).
- **Remediation**: Replaced neon geometric mountainscapes in `client/src/components/common/LazyImage.jsx` with a clean, neutral editorial photography placeholder (`#F0F2F5`) containing a minimalist camera glyph and subtle "খবরঘর আলোকচিত্র" attribution.

---

## 4. Delivery Gate: Interactive Click-Through Evidence (R-35)

As mandated by rule R-35, every interactive control was tested in a headless browser via Playwright (`scripts/verify_interactive_elements.mjs`). All 15 automated actions succeeded:

| Step # | Interactive Element Tested | Action Performed | Expected Behavior | Result | Evidence / Details |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **01** | Homepage Root | `GET http://localhost:5173` | Status 200, full editorial grid | **PASS** | Layout rendered with 13 homepage sections |
| **02** | Search Button & Modal | Open and press `Escape` | Modal opens and closes on Escape (R-32) | **PASS** | Escape key listener verified |
| **03** | Search Execution | Submit query `"নির্বাচন"` | Navigates to `/search?q=` with results | **PASS** | Found matching articles at `/search?q=...` |
| **04** | E-Paper Modal | Click button, switch page, press `Escape` | Interactive viewer functions and closes on Escape | **PASS** | Edition & page controls verified |
| **05** | English Edition Toggle | Click `Eng` pill, close dialog | Displays modal announcement and closes | **PASS** | Modal dialog verified |
| **06** | Trending Topic Chip | Click chip (`/topic/national-election`) | Navigates to `/topic/:slug` and renders feed | **PASS** | Tagged articles rendered with topic header |
| **07** | Most-Read Tabs | Click `"আলোচিত"` & `"সুখবর"` | Switches active tab underline and list | **PASS** | Tab indicators and content switched |
| **08** | Local News Filter | Select `"ঢাকা"` and submit | Navigates to `/bangladesh?division=dhaka` | **PASS** | Found 13 filtered articles |
| **09** | Footer Page `/about` | Navigate to `/about` | Displays newsroom board & editorial policy | **PASS** | Editorial board rendered |
| **10** | Footer Page `/contact` | Fill and submit contact form | Form validates and displays confirmation | **PASS** | "আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে!" |
| **11** | Footer Page `/advertise` | Navigate to `/advertise` | Displays advertising rate card table | **PASS** | Rate card table confirmed |
| **12** | Footer Page `/privacy` | Navigate to `/privacy` | Displays reader data privacy policies | **PASS** | Privacy policy confirmed |
| **13** | Footer Page `/terms` | Navigate to `/terms` | Displays terms of service and copyright | **PASS** | Terms of service confirmed |
| **14** | Category Drawer Menu | Open and press `Escape` | Drawer slides out and closes on Escape (R-32) | **PASS** | Escape key verified |
| **15** | Article Detail Permalinks | Navigate to `/:category/:slug` | Displays reading column, byline, dateline, body | **PASS** | Full article view rendered without 404 |

**Click-Through Verdict**: **15 / 15 PASSED (100%)**

---

## 5. Visual QA & Pixel Alignment Verification

Fresh screenshots were captured across 5 standard device viewports and section-by-section comparison crops were verified against `reference/home.png`:
- `qa/desktop-1920.png` (1920x7320 px)
- `qa/desktop-1440.png` (1440x900 px)
- `qa/desktop-1280.png` (1280x800 px)
- `qa/tablet-768.png` (768x1024 px)
- `qa/mobile-390.png` (390x844 px)

All 13 section crops in `qa/compare/` confirm strict adherence to visual geometry:
- Header 140px height with crisp hairlines.
- 1248px centered container with 24px column gutters.
- Hero 3/6/3 column proportions.
- Video carousel ice-blue cards (`#E7F0FB`) with 36px `#141416` arrow controls.
- Promo strip blush background (`#FDF1EF`) with 4 dark cards (`#141414`).
- Sports lead with overlay headline alongside 1-5 most-read numerals (`#C4C4C4`).
- 1px hairline dividers (`#E3E3E3`) maintained across all sections.

---

## 6. Assumptions Recorded

1. **Wordmark & Identity**: Retained the primary text wordmark "খবরঘর" (KhaborGhor) styled in two-tone near-black (`#111111`) and brand red (`#D60000`).
2. **Typography**: Kept `Hind Siliguri` (headlines, weight 700) and `Noto Sans Bengali` (body, weights 400/500/600) with zero letter-spacing as verified from reference pixel sampling.
3. **Bangla Numerals**: All numbers, timestamps, pagination counters, and ranking digits render exclusively in Bengali digits (০১২৩৪৫৬৭৮৯).
4. **Timezone**: Real-time relative and formatted timestamps are anchored to Asia/Dhaka time.
5. **No Em Dashes**: Confirmed zero em dash characters (`—`) in all newly authored copy.
