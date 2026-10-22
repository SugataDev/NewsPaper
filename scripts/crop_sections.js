import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Let's create compare directory
const outDir = 'qa/compare';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// In reference/home.png (total height 7935):
// Let's crop key sections
const crops = [
  { name: '01-header', refY: 0, refH: 150, shotY: 0, shotH: 150 },
  { name: '02-ad-leaderboard', refY: 150, refH: 180, shotY: 150, shotH: 160 },
  { name: '03-hero', refY: 330, refH: 1250, shotY: 310, shotH: 1250 },
  { name: '04-ad-billboard', refY: 1580, refH: 350, shotY: 1560, shotH: 350 },
  { name: '05-trending', refY: 1930, refH: 100, shotY: 1910, shotH: 100 },
  { name: '06-video', refY: 2030, refH: 420, shotY: 2010, shotH: 420 },
  { name: '07-promo', refY: 2450, refH: 180, shotY: 2430, shotH: 180 },
  { name: '08-sports-mostread', refY: 2630, refH: 980, shotY: 2610, shotH: 980 },
  { name: '09-bangladesh', refY: 3610, refH: 950, shotY: 3590, shotH: 950 },
  { name: '10-world', refY: 4560, refH: 850, shotY: 4540, shotH: 850 },
  { name: '11-entertainment', refY: 5410, refH: 750, shotY: 5390, shotH: 750 },
  { name: '12-lifestyle', refY: 6160, refH: 700, shotY: 6140, shotH: 700 },
  { name: '13-opinion', refY: 6860, refH: 500, shotY: 6840, shotH: 500 },
  { name: '14-business', refY: 7360, refH: 575, shotY: 7340, shotH: 530 },
];

async function run() {
  for (const c of crops) {
    await sharp('reference/home.png')
      .extract({ left: 0, top: c.refY, width: 1920, height: c.refH })
      .toFile(path.join(outDir, `${c.name}-ref.png`));

    await sharp('qa/desktop-1920.png')
      .extract({ left: 0, top: c.shotY, width: 1920, height: c.shotH })
      .toFile(path.join(outDir, `${c.name}-shot.png`));

    console.log(`Cropped ${c.name}`);
  }
}

run().catch(console.error);
