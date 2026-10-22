import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = 'qa/compare';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Precise sections mapping based on measure_sections
const sections = [
  {
    name: '01-header',
    ref: { top: 0, height: 140 },
    shot: { top: 0, height: 140 }
  },
  {
    name: '02-ad-leaderboard',
    ref: { top: 140, height: 160 },
    shot: { top: 140, height: 152 }
  },
  {
    name: '03-hero',
    ref: { top: 320, height: 1250 },
    shot: { top: 292, height: 880 }
  },
  {
    name: '04-ad-billboard-trending',
    ref: { top: 1570, height: 410 },
    shot: { top: 1172, height: 416 }
  },
  {
    name: '05-video-carousel',
    ref: { top: 1980, height: 420 },
    shot: { top: 1588, height: 426 }
  },
  {
    name: '06-promo-strip',
    ref: { top: 2400, height: 180 },
    shot: { top: 2014, height: 222 }
  },
  {
    name: '07-sports-mostread',
    ref: { top: 2580, height: 960 },
    shot: { top: 2236, height: 740 }
  },
  {
    name: '08-bangladesh',
    ref: { top: 3540, height: 960 },
    shot: { top: 3004, height: 680 }
  },
  {
    name: '09-world',
    ref: { top: 4500, height: 850 },
    shot: { top: 3708, height: 685 }
  },
  {
    name: '10-entertainment',
    ref: { top: 5350, height: 780 },
    shot: { top: 4420, height: 665 }
  },
  {
    name: '11-lifestyle',
    ref: { top: 6130, height: 690 },
    shot: { top: 5115, height: 430 }
  },
  {
    name: '12-opinion',
    ref: { top: 6820, height: 510 },
    shot: { top: 5570, height: 380 }
  },
  {
    name: '13-business',
    ref: { top: 7330, height: 605 },
    shot: { top: 5980, height: 630 }
  }
];

async function createComparisons() {
  for (const s of sections) {
    const refCrop = await sharp('reference/home.png')
      .extract({ left: 300, top: s.ref.top, width: 1320, height: s.ref.height })
      .toBuffer();

    const shotCrop = await sharp('qa/desktop-1920.png')
      .extract({ left: 300, top: s.shot.top, width: 1320, height: s.shot.height })
      .toBuffer();

    const maxHeight = Math.max(s.ref.height, s.shot.height);

    const refPadded = await sharp(refCrop)
      .resize({ width: 1320, height: maxHeight, fit: 'contain', background: { r: 250, g: 250, b: 250, alpha: 1 } })
      .toBuffer();

    const shotPadded = await sharp(shotCrop)
      .resize({ width: 1320, height: maxHeight, fit: 'contain', background: { r: 250, g: 250, b: 250, alpha: 1 } })
      .toBuffer();

    await sharp({
      create: {
        width: 1320 * 2 + 10,
        height: maxHeight,
        channels: 4,
        background: { r: 220, g: 220, b: 220, alpha: 1 }
      }
    })
    .composite([
      { input: refPadded, left: 0, top: 0 },
      { input: shotPadded, left: 1330, top: 0 }
    ])
    .toFile(path.join(outDir, `compare-${s.name}.png`));

    console.log(`Generated compare-${s.name}.png`);
  }
}

createComparisons().catch(console.error);
