# Design Notes & Visual Specifications

This document records the visual specifications, pixel measurements, and design decisions derived from the reference screenshot (`reference/home.png` - 1920x7935 px).

---

## 1. Pixel Sampling & Color Palette Analysis

Using direct pixel sampling from `reference/home.png`:
- **Page Background**: `#FFFFFF` (pure white, clean editorial aesthetic)
- **Primary Body Text**: `#111111` (rich near-black for high legibility)
- **Excerpt / Secondary Text**: `#555555` (neutral dark gray, line-height 1.6)
- **Meta / Timestamps**: `#8A8A8A` (subdued neutral gray with 12px clock icon)
- **Brand Red**: `#D60000` / `#E2262D`
  - Sampled peak value in screenshot: `#D60000`
  - Used for: kicker labels, red bullets `•` after kickers, section arrow `›`, video play badge, photo gallery camera badge, wordmark accent, headline hover color.
- **Brand Blue**: `#2172BF` / `#1F63D9`
  - Sampled in screenshot: `#2172BF` (local-news "খুঁজুন" button, "● খেলা" blue dot, interactive focus states).
- **Blue Tint**: `#E3F2FD` / `#E7F0FB`
  - Sampled in screenshot: `#E3F2FD` (video card container background, local-news location filter bar).
- **Pink Tint**: `#FDF4F3` / `#FDF1EF`
  - Sampled in screenshot: `#FDF4F3` (full-bleed promotional strip background).
- **Ink / Dark Card**: `#141416` / `#141414`
  - Used for: dark promo cards with white text, carousel 36px navigation arrow buttons.
- **Ad Placeholders**: `#F0F0F0` / `#F3F3F3`
  - Sampled in screenshot: `#F3F3F3` with a small `#999999` "বিজ্ঞাপন" label.
- **Hairlines & Dividers**: `#E0E0E0` / `#E3E3E3` (crisp 1px borders between columns and rows).
- **Form Controls & Inputs**: `#CFCFCF` border, `#FFFFFF` bg, 2-4px radius.
- **Trending Numerals**: `#C4C4C4` (weight 300, 36px tall light gray Bangla numerals ১ to ৫).
- **Pill Chips**: `#F5F5F5` background, `#D9D9D9` border, pill rounded-full radius.

---

## 2. Layout, Grid & Column Ratios

- **Full Screen Width**: 1920px
- **Content Container**: 1248px (centered: left margin 336px, right margin 336px).
- **Container Max-Width**: 1240px (1248px with 16px padding on mobile/tablet).
- **Column Gutter**: 24px with a centered 1px hairline rule (`#E3E3E3`).
- **Section Spacing**: 36-40px vertical margin between homepage sections with hairline rule tops.
- **Row Padding**: 12px vertical padding on compact list rows with 1px hairline horizontal divider.

### Section Column Distributions:
1. **Hero**: 3 columns (3 / 6 / 3 of 12) -> ~25% / 50% / 25% (~295px / 600px / 295px)
2. **Most-Read + Sports**: ~25% (tabs + 1-5 ranked items) / ~75% (Sports lead 2/3 + 1/3 right rail)
3. **Bangladesh**: Filter bar full-width (1248px), then 3 columns: ~45% lead feature, ~30% middle stacked, ~25% right column
4. **World (বিশ্ব)**: 50% lead feature / 50% 2x2 grid of cards
5. **Entertainment (বিনোদন)**: 3 columns: 28% left compact / 44% center feature / 28% right compact
6. **Lifestyle (জীবনযাপন)**: 4 equal vertical cards (25% each, ~290px each)
7. **Opinion (মতামত)**: 34% left feature box (with dark border + author highlight) / 66% right (4 author rows with pen avatars)
8. **Business (বাণিজ্য)**: 50% lead feature / 50% 2x2 grid

---

## 3. Typography & Font Decision

- **Body / Navigation / Meta Font**: `Noto Sans Bengali` (weights 400, 500, 600)
- **Headline Font**: `Hind Siliguri` (weight 700)
- **Comparison & Verification**:
  - Examining the reference lead headline "এবার পুকুরের মাঝেও মাইনফিল্ড":
  - The letters have open counters, modern sans-serif terminals, and uniform stroke contrast.
  - Hind Siliguri 700 matches the geometry, stroke weights, and matra alignments perfectly.
  - No serifs or high-contrast calligraphy strokes are present in general news headlines; Hind Siliguri is the exact aesthetic match for contemporary Bangladeshi digital journalism.
- **Bangla Typography Safeguards**:
  - No letter-spacing (`tracking-normal` / `letter-spacing: 0`)
  - No uppercase transforms
  - `line-height` >= 1.3 for headlines, >= 1.6 for body/excerpts
  - Full-fidelity conjunct rendering with `font-display: swap`

---

## 4. Section Inventory (Top to Bottom)

1. **Header**:
   - Row 1: Wordmark ("খবরঘর" with red accent dot) + Top teasers (3 thumbnail items with red "●" prefix)
   - Row 2: Sticky navigation (11 category links, red hover/active indicator) + Utilities (Search, E-paper, Eng, Login, Hamburger drawer)
2. **Leaderboard Ad Band**: Full-bleed `#F0F0F0`, ~90px height
3. **Hero Section (3 Columns)**:
   - Left: 6 compact rows with thumbnails
   - Center: Lead story (image + 32px headline + excerpt) + 2 horizontal cards + 3 vertical cards + 3 text items
   - Right: 300x250 Ad + compact rows with red kickers
4. **Billboard Ad Band**: Full-bleed `#F0F0F0`, ~320px height
5. **Trending Topics**: "আলোচিত বিষয়:" + scrollable pill chips + arrow buttons
6. **Video Carousel**: "ভিডিও ›", 4.5 cards visible, ice blue card bg (`#E7F0FB`), red play badge, 36px navigation buttons, dot pagination
7. **Promo Band**: Full-bleed pink tint (`#FDF1EF`), 4 dark promo cards (`#141414`), colored kickers
8. **Most-Read + Sports**:
   - Left: Tabs (পঠিত, আলোচিত, সুখবর) with light gray 36px numerals (১ to ৫)
   - Right: "● খেলা" (blue dot), lead with dark overlay headline, 2 sub-cards, right ad & compacts
9. **Bangladesh**: Local news selector bar (Division > District > Upazila) + 3 columns
10. **World (বিশ্ব)**: Lead 50% + 2x2 card grid 50%
11. **Entertainment (বিনোদন)**: 3 columns: left list (28%), center feature (44%), right list (28%)
12. **Lifestyle (জীবনযাপন)**: 4 equal vertical cards (square image, badge, headline, excerpt)
13. **Opinion (মতামত)**: 34% boxed feature + 66% 4 author list rows with circular pen icons
14. **Business (বাণিজ্য)**: Lead 50% + 2x2 card grid 50%
15. **Bottom Ad Band**: Full-bleed `#F0F0F0`, ~320px height
16. **Footer**: Conventional editorial footer on `#F5F5F5` with category sitemap, corporate links, social channels, publisher info, and Bangla copyright.
