import { Article } from '../models/Article.js';
import { Topic } from '../models/Topic.js';
import { Ad } from '../models/Ad.js';

let cachedHomeData = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 60 seconds

export function invalidateHomeCache() {
  cachedHomeData = null;
  lastCacheTime = 0;
}

export async function getHomepageData() {
  const now = Date.now();
  if (cachedHomeData && now - lastCacheTime < CACHE_TTL_MS) {
    return cachedHomeData;
  }

  // Set of used article IDs to ensure no duplicate stories anywhere on the page
  const usedIds = new Set();

  function pickArticles(candidates, count, filterFn = null) {
    const selected = [];
    for (const item of candidates) {
      if (selected.length >= count) break;
      const idStr = item._id.toString();
      if (!usedIds.has(idStr)) {
        if (!filterFn || filterFn(item)) {
          usedIds.add(idStr);
          selected.push(item);
        }
      }
    }
    return selected;
  }

  // 1. Fetch published articles
  const allArticles = await Article.find({
    status: 'published',
    publishedAt: { $lte: new Date() },
  })
    .sort({ 'pinned.home': -1, 'pinned.order': 1, publishedAt: -1 })
    .lean();

  // Helper to get articles by category
  function getByCategory(categorySlug) {
    return allArticles.filter((a) => a.category === categorySlug);
  }

  // 2. Top teasers (3 items for top header strip)
  const topTeasers = pickArticles(allArticles, 3);

  // 3. Hero Section
  // (a) Center Lead: 1 prominent article (preferably pinned or top breaking/lead)
  const heroLead = pickArticles(
    allArticles.filter((a) => a.pinned?.slot === 'hero-lead' || a.category === 'bangladesh' || a.category === 'national'),
    1
  )[0] || pickArticles(allArticles, 1)[0];

  // (b) Center Sub Horizontal: 2 articles
  const centerSubHorizontal = pickArticles(allArticles, 2);

  // (c) Center Sub Vertical: 3 articles
  const centerSubVertical = pickArticles(allArticles, 3);

  // (d) Center Text Only: 3 articles
  const centerTextOnly = pickArticles(allArticles, 3);

  // (e) Left Column: ~6 compact rows
  const heroLeft = pickArticles(allArticles, 6);

  // (f) Right Column: ~4 compact rows
  const heroRight = pickArticles(
    allArticles.filter((a) => a.category === 'opinion' || a.kicker),
    4
  );
  // If fewer than 4, fill with any available
  if (heroRight.length < 4) {
    const extra = pickArticles(allArticles, 4 - heroRight.length);
    heroRight.push(...extra);
  }

  // 4. Video Carousel: articles with type === 'video' or videoUrl
  const videoArticles = pickArticles(
    allArticles.filter((a) => a.type === 'video' || a.videoUrl),
    6
  );
  if (videoArticles.length < 6) {
    const extra = pickArticles(allArticles, 6 - videoArticles.length);
    videoArticles.push(...extra);
  }

  // 5. Promo Strip: 4 items
  const promoArticles = pickArticles(
    allArticles.filter((a) => a.flags?.trending || a.flags?.breaking),
    4
  );
  if (promoArticles.length < 4) {
    const extra = pickArticles(allArticles, 4 - promoArticles.length);
    promoArticles.push(...extra);
  }

  // 6. Most-Read + Sports
  // Most read articles (by views, shares, or flags)
  const mostRead = await Article.find({ status: 'published' })
    .sort({ 'stats.views': -1, publishedAt: -1 })
    .limit(5)
    .lean();

  const mostDiscussed = await Article.find({ status: 'published', 'flags.trending': true })
    .sort({ publishedAt: -1 })
    .limit(5)
    .lean();

  const goodNews = await Article.find({ status: 'published', 'flags.goodNews': true })
    .sort({ publishedAt: -1 })
    .limit(5)
    .lean();

  // Sports items (category: 'sports' or 'খেলা')
  const sportsPool = getByCategory('sports');
  const sportsLead = pickArticles(sportsPool, 1)[0] || pickArticles(allArticles, 1)[0];
  const sportsSub = pickArticles(sportsPool, 2);
  if (sportsSub.length < 2) {
    sportsSub.push(...pickArticles(allArticles, 2 - sportsSub.length));
  }
  const sportsRight = pickArticles(sportsPool, 3);
  if (sportsRight.length < 3) {
    sportsRight.push(...pickArticles(allArticles, 3 - sportsRight.length));
  }

  // 7. Bangladesh (বাংলাদেশ)
  const bdPool = getByCategory('bangladesh');
  const bangladeshLead = pickArticles(bdPool, 1)[0] || pickArticles(allArticles, 1)[0];
  const bangladeshMiddle = pickArticles(bdPool, 3);
  if (bangladeshMiddle.length < 3) {
    bangladeshMiddle.push(...pickArticles(allArticles, 3 - bangladeshMiddle.length));
  }
  const bangladeshRight = pickArticles(bdPool, 3);
  if (bangladeshRight.length < 3) {
    bangladeshRight.push(...pickArticles(allArticles, 3 - bangladeshRight.length));
  }

  // 8. World (বিশ্ব)
  const worldPool = getByCategory('world');
  const worldLead = pickArticles(worldPool, 1)[0] || pickArticles(allArticles, 1)[0];
  const worldGrid = pickArticles(worldPool, 4);
  if (worldGrid.length < 4) {
    worldGrid.push(...pickArticles(allArticles, 4 - worldGrid.length));
  }

  // 9. Entertainment (বিনোদন)
  const entPool = getByCategory('entertainment');
  const entCenter = pickArticles(entPool, 1)[0] || pickArticles(allArticles, 1)[0];
  const entLeft = pickArticles(entPool, 3);
  if (entLeft.length < 3) {
    entLeft.push(...pickArticles(allArticles, 3 - entLeft.length));
  }
  const entRight = pickArticles(entPool, 3);
  if (entRight.length < 3) {
    entRight.push(...pickArticles(allArticles, 3 - entRight.length));
  }

  // 10. Lifestyle (জীবনযাপন)
  const lifePool = getByCategory('lifestyle');
  const lifestyle = pickArticles(lifePool, 4);
  if (lifestyle.length < 4) {
    lifestyle.push(...pickArticles(allArticles, 4 - lifestyle.length));
  }

  // 11. Opinion (মতামত)
  const opinionPool = getByCategory('opinion');
  const opinionLead = pickArticles(opinionPool, 1)[0] || pickArticles(allArticles, 1)[0];
  const opinionList = pickArticles(opinionPool, 4);
  if (opinionList.length < 4) {
    opinionList.push(...pickArticles(allArticles, 4 - opinionList.length));
  }

  // 12. Business (বাণিজ্য)
  const bizPool = getByCategory('business');
  const bizLead = pickArticles(bizPool, 1)[0] || pickArticles(allArticles, 1)[0];
  const bizGrid = pickArticles(bizPool, 4);
  if (bizGrid.length < 4) {
    bizGrid.push(...pickArticles(allArticles, 4 - bizGrid.length));
  }

  // 13. Trending Topics
  const trendingTopics = await Topic.find({ isTrending: true })
    .sort({ order: 1 })
    .limit(16)
    .lean();

  // 14. Active Ads
  const ads = await Ad.find({ active: true }).lean();
  const adsBySlot = {};
  ads.forEach((ad) => {
    adsBySlot[ad.slot] = ad;
  });

  const payload = {
    topTeasers,
    hero: {
      left: heroLeft,
      centerLead: heroLead,
      centerSubHorizontal,
      centerSubVertical,
      centerTextOnly,
      right: heroRight,
    },
    trendingTopics,
    video: videoArticles,
    promoStrip: promoArticles,
    mostReadAndSports: {
      tabs: {
        read: mostRead,
        trending: mostDiscussed.length > 0 ? mostDiscussed : mostRead,
        goodNews: goodNews.length > 0 ? goodNews : mostRead,
      },
      sports: {
        lead: sportsLead,
        sub: sportsSub,
        right: sportsRight,
      },
    },
    bangladesh: {
      lead: bangladeshLead,
      middle: bangladeshMiddle,
      right: bangladeshRight,
    },
    world: {
      lead: worldLead,
      grid: worldGrid,
    },
    entertainment: {
      lead: entCenter,
      left: entLeft,
      right: entRight,
    },
    lifestyle,
    opinion: {
      lead: opinionLead,
      list: opinionList,
    },
    business: {
      lead: bizLead,
      grid: bizGrid,
    },
    ads: adsBySlot,
  };

  cachedHomeData = payload;
  lastCacheTime = now;
  return payload;
}
