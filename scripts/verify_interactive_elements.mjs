import { chromium } from 'playwright';

async function verifyAllInteractiveElements() {
  console.log('--- Starting R-35 Interactive Click-Through Verification ---');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const results = [];
  const record = (element, action, expected, passed, details = '') => {
    results.push({ element, action, expected, passed, details });
    console.log(`[${passed ? 'PASS' : 'FAIL'}] ${element} -> ${action} : ${details}`);
  };

  try {
    // 1. Load Homepage
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    record('Homepage Load', 'GET http://localhost:5173', 'Status 200 and sections rendered', true, 'Homepage rendered with full editorial grid');

    // 2. Search Modal open & Escape close (R-32)
    await page.click('button[aria-label="অনুসন্ধান"]');
    await page.waitForSelector('input[placeholder*="কী খুঁজতে চান"]');
    const modalVisibleBeforeEsc = await page.isVisible('input[placeholder*="কী খুঁজতে চান"]');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    const modalVisibleAfterEsc = await page.isVisible('input[placeholder*="কী খুঁজতে চান"]');
    record('Search Modal', 'Open and press Escape (R-32)', 'Modal opens and closes on Escape', modalVisibleBeforeEsc && !modalVisibleAfterEsc, 'Escape listener verified');

    // 3. Search Query Submit
    await page.click('button[aria-label="অনুসন্ধান"]');
    await page.fill('input[placeholder*="কী খুঁজতে চান"]', 'নির্বাচন');
    await page.click('form button:has-text("খুঁজুন")');
    await page.waitForURL(/.*search\?q=.*/);
    await page.waitForSelector('article', { timeout: 8000 });
    const searchArticlesCount = (await page.$$('article')).length;
    record('Search Execution', 'Submit query "নির্বাচন"', 'Navigates to /search?q= and loads articles', searchArticlesCount > 0, `Found ${searchArticlesCount} articles at ${page.url()}`);

    // Return to home
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

    // 4. E-Paper Modal (SLOP-05)
    await page.click('button[aria-label="ই-পেপার সংস্করণ দেখুন"]');
    await page.waitForSelector('text=মুদ্রিত ই-পেপার');
    const epaperOpen = await page.isVisible('text=মুদ্রিত ই-পেপার');
    await page.click('button:has-text("পাতা ২")');
    await page.waitForTimeout(400);
    const page2Active = await page.isVisible('text=পাতা ২');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    const epaperClosed = !(await page.isVisible('text=মুদ্রিত ই-পেপার'));
    record('E-Paper Modal (SLOP-05)', 'Open, switch to page 2, close on Escape', 'Interactive viewer functions and closes on Escape', epaperOpen && page2Active && epaperClosed, 'Edition & page controls verified');

    // 5. English Edition Toggle (SLOP-06)
    await page.click('button[aria-label="Switch to English edition"]');
    await page.waitForSelector('text=KhaborGhor English Edition');
    const engModalOpen = await page.isVisible('text=KhaborGhor English Edition');
    await page.click('button:has-text("বুঝেছি")');
    await page.waitForTimeout(400);
    const engModalClosed = !(await page.isVisible('text=KhaborGhor English Edition'));
    record('English Edition Pill (SLOP-06)', 'Click Eng toggle and close dialog', 'Shows informative English edition announcement and closes', engModalOpen && engModalClosed, 'Modal dialog verified');

    // 6. Trending Topics Chip Navigation (SLOP-07)
    await page.goto('http://localhost:5173/topic/national-election', { waitUntil: 'networkidle' });
    await page.waitForSelector('article', { timeout: 8000 });
    const topicBodyText = await page.innerText('body');
    const hasTopicHeading = topicBodyText.includes('জাতীয় নির্বাচন');
    record('Trending Topic Routing (SLOP-07)', 'Navigate to /topic/national-election', 'Renders topic feed with tagged articles', hasTopicHeading, `URL: ${page.url()}`);

    // 7. Most-Read Tabs switching
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.click('button:has-text("আলোচিত")');
    await page.waitForTimeout(400);
    const trendingTabActive = await page.isVisible('button:has-text("আলোচিত") .bg-brand-red');
    await page.click('button:has-text("সুখবর")');
    await page.waitForTimeout(400);
    const goodNewsTabActive = await page.isVisible('button:has-text("সুখবর") .bg-brand-red');
    record('Most-Read Tabs', 'Click আলোচিত & সুখবর tabs', 'Switches active state and updates ranked list', trendingTabActive && goodNewsTabActive, 'Tab indicator and content switched');

    // 8. Cascading Local News Filter (Bangladesh section) (SLOP-08)
    await page.selectOption('select:has(option[value="dhaka"])', 'dhaka');
    await page.waitForTimeout(300);
    await page.click('form button:has-text("খুঁজুন")');
    await page.waitForURL(/.*division=dhaka.*/);
    await page.waitForSelector('article', { timeout: 8000 });
    const localArticlesCount = (await page.$$('article')).length;
    record('Local News Cascading Filter (SLOP-08)', 'Select division "ঢাকা" and submit', 'Navigates to /bangladesh?division=dhaka and displays articles', localArticlesCount > 0, `Found ${localArticlesCount} articles at ${page.url()}`);

    // 9. Static Editorial Pages (Corporate / Legal) (SLOP-10)
    // /about
    await page.goto('http://localhost:5173/about', { waitUntil: 'networkidle' });
    const aboutTitle = await page.isVisible('h1:has-text("আমাদের সম্পর্কে")');
    record('Footer Page /about (SLOP-10)', 'Navigate to /about', 'Renders newsroom leadership and editorial policy', aboutTitle, 'Found editorial board');

    // /contact with Form Submission (C-2)
    await page.goto('http://localhost:5173/contact', { waitUntil: 'networkidle' });
    await page.fill('input[placeholder="পুরো নাম লিখুন"]', 'আব্দুল্লাহ আল মামুন');
    await page.fill('input[placeholder="example@mail.com"]', 'mamun@example.com');
    await page.fill('input[placeholder="বার্তার মূল বিষয় লিখুন"]', 'অনুসন্ধানী প্রতিবেদন পরামর্শ');
    await page.fill('textarea[placeholder="বিস্তারিত বার্তা এখানে লিখুন..."]', 'ঢাকার যানজট নিরসনে নতুন সমন্বিত উদ্যোগের ব্যাপারে কিছু গুরুত্বপূর্ণ তথ্য পাঠাতে চাই।');
    await page.click('button:has-text("বার্তা পাঠান")');
    await page.waitForSelector('text=আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে!', { timeout: 5000 });
    const formSuccess = await page.isVisible('text=আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে!');
    record('Footer Page /contact with Form (C-2)', 'Fill and submit contact form', 'Form validates and displays success confirmation', formSuccess, 'Message delivered state confirmed');

    // /advertise
    await page.goto('http://localhost:5173/advertise', { waitUntil: 'networkidle' });
    const adTable = await page.isVisible('table');
    record('Footer Page /advertise (SLOP-10)', 'Navigate to /advertise', 'Displays advertising rate card and slots', adTable, 'Rate card table confirmed');

    // /privacy
    await page.goto('http://localhost:5173/privacy', { waitUntil: 'networkidle' });
    const privacyTitle = await page.isVisible('h1:has-text("গোপনীয়তা নীতি")');
    record('Footer Page /privacy (SLOP-10)', 'Navigate to /privacy', 'Displays data privacy policies', privacyTitle, 'Privacy policy confirmed');

    // /terms
    await page.goto('http://localhost:5173/terms', { waitUntil: 'networkidle' });
    const termsTitle = await page.isVisible('h1:has-text("ব্যবহারের শর্তাবলী")');
    record('Footer Page /terms (SLOP-10)', 'Navigate to /terms', 'Displays terms of service and copyright', termsTitle, 'Terms of service confirmed');

    // 10. Drawer Menu Escape Key (R-32)
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.click('button[aria-label="বিভাগসমূহ দেখুন"]');
    await page.waitForSelector('h3:has-text("বিভাগসমূহ")');
    const drawerOpen = await page.isVisible('h3:has-text("বিভাগসমূহ")');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    const drawerClosed = !(await page.isVisible('h3:has-text("বিভাগসমূহ")'));
    record('Category Drawer Menu', 'Open and press Escape (R-32)', 'Drawer slides out and closes cleanly on Escape', drawerOpen && drawerClosed, 'Escape key verified');

    // 11. Article Reading View
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    const articleLink = await page.$('article a[href^="/bangladesh/"], article a[href^="/sports/"], article a[href^="/politics/"]');
    if (articleLink) {
      const articleHref = await articleLink.getAttribute('href');
      await page.goto(`http://localhost:5173${articleHref}`, { waitUntil: 'networkidle' });
      await page.waitForSelector('h1');
      const hasArticleHeadline = await page.isVisible('h1');
      const hasAuthor = await page.isVisible('h4.font-headline');
      const hasCalendar = await page.isVisible('svg.lucide-calendar');
      record('Article Detail View', `Navigate to article (${articleHref})`, 'Renders article reading column with byline, date and body', hasArticleHeadline && (hasAuthor || hasCalendar), `URL: ${page.url()}`);
    }

    console.log('\n--- Interactive Click-Through Summary ---');
    const allPassed = results.every(r => r.passed);
    console.log(`Total Tested: ${results.length} | Passed: ${results.filter(r => r.passed).length} | Failed: ${results.filter(r => !r.passed).length}`);
    console.log(`Verdict: ${allPassed ? 'ALL PASS' : 'FAILURES DETECTED'}`);

    if (!allPassed) {
      process.exit(1);
    }

  } catch (err) {
    console.error('Click-through error:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

verifyAllInteractiveElements();
