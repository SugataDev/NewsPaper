import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = 'qa/compare';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Measured dynamic sections matching reference/home.png and desktop-1920.png
const crops = [
  { name: '01-header', refY: 0, refH: 140, shotY: 0, shotH: 140 },
  { name: '02-ad-leaderboard', refY: 140, refH: 150, shotY: 140, shotH: 150 },
  { name: '03-hero', refY: 300, refH: 900, shotY: 290, shotH: 900 },
  { name: '04-ad-billboard', refY: 1200, refH: 300, shotY: 1200, shotH: 300 },
  { name: '06-video', refY: 1600, refH: 420, shotY: 1600, shotH: 420 },
  { name: '07-promo', refY: 2030, refH: 180, shotY: 2030, shotH: 180 },
  { name: '08-sports-mostread', refY: 2250, refH: 740, shotY: 2250, shotH: 740 },
  { name: '09-bangladesh', refY: 3020, refH: 650, shotY: 3020, shotH: 650 },
  { name: '10-world', refY: 3700, refH: 660, shotY: 3700, shotH: 660 },
  { name: '11-entertainment', refY: 4390, refH: 640, shotY: 4390, shotH: 640 },
  { name: '12-lifestyle', refY: 5070, refH: 450, shotY: 5070, shotH: 450 },
  { name: '13-opinion', refY: 5550, refH: 370, shotY: 5550, shotH: 370 },
  { name: '14-business', refY: 5950, refH: 600, shotY: 5950, shotH: 600 },
];

async function run() {
  for (const c of crops) {
    try {
      await sharp('reference/home.png')
        .extract({ left: 0, top: c.refY, width: 1920, height: c.refH })
        .toFile(path.join(outDir, `${c.name}-ref.png`));

      await sharp('qa/desktop-1920.png')
        .extract({ left: 0, top: c.shotY, width: 1920, height: c.shotH })
        .toFile(path.join(outDir, `${c.name}-shot.png`));

      console.log(`Cropped ${c.name}`);
    } catch (e) {
      console.warn(`Could not crop ${c.name}:`, e.message);
    }
  }
}

run().catch(console.error);
