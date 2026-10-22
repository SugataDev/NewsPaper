import { chromium } from 'playwright';

async function measure() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

  const sections = await page.evaluate(() => {
    const list = [];
    const elements = document.querySelectorAll('header, [data-ad-slot], section, footer');
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const scrollY = window.scrollY;
      list.push({
        tag: el.tagName.toLowerCase(),
        id: el.id || el.getAttribute('aria-label') || el.className.slice(0, 30),
        text: el.innerText ? el.innerText.split('\n')[0].slice(0, 30) : '',
        top: Math.round(rect.top + scrollY),
        bottom: Math.round(rect.bottom + scrollY),
        height: Math.round(rect.height)
      });
    });
    return list;
  });

  console.log(JSON.stringify(sections, null, 2));
  await browser.close();
}

measure().catch(console.error);
