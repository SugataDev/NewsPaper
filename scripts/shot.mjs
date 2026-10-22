import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const qaDir = path.resolve(__dirname, '../qa');

if (!fs.existsSync(qaDir)) {
  fs.mkdirSync(qaDir, { recursive: true });
}

async function takeScreenshots() {
  console.log('Launching browser for comprehensive Visual QA screenshots across all breakpoints...');
  const browser = await chromium.launch();

  const viewports = [
    { name: 'desktop-1920', width: 1920, height: 1080, isMobile: false },
    { name: 'desktop-1440', width: 1440, height: 900, isMobile: false },
    { name: 'desktop-1280', width: 1280, height: 800, isMobile: false },
    { name: 'tablet-768', width: 768, height: 1024, isMobile: false },
    { name: 'mobile-390', width: 390, height: 844, isMobile: true },
  ];

  try {
    for (const vp of viewports) {
      console.log(`Capturing ${vp.name} (${vp.width}x${vp.height})...`);
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: vp.isMobile ? 2 : 1,
        isMobile: vp.isMobile,
        hasTouch: vp.isMobile,
      });
      const page = await context.newPage();
      await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);

      const filePath = path.join(qaDir, `${vp.name}.png`);
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`Saved: ${filePath}`);
      await context.close();
    }

    console.log('--- All Visual QA screenshots captured successfully! ---');
  } catch (err) {
    console.error('Screenshot Error:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

takeScreenshots();
