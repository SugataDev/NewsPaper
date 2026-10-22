import sharp from 'sharp';
import path from 'path';

const outDir = 'qa/compare';

async function cropPrecise() {
  const list = [
    { name: 'trending', ref: { top: 1790, height: 80 }, shot: { top: 1890, height: 80 } },
    { name: 'video', ref: { top: 1860, height: 480 }, shot: { top: 1970, height: 460 } },
    { name: 'promo', ref: { top: 2350, height: 200 }, shot: { top: 2430, height: 200 } },
    { name: 'sports', ref: { top: 2550, height: 950 }, shot: { top: 2630, height: 950 } },
    { name: 'bangladesh', ref: { top: 3550, height: 950 }, shot: { top: 3580, height: 950 } },
    { name: 'world', ref: { top: 4500, height: 850 }, shot: { top: 4530, height: 850 } },
    { name: 'entertainment', ref: { top: 5350, height: 800 }, shot: { top: 5380, height: 800 } },
    { name: 'lifestyle', ref: { top: 6150, height: 680 }, shot: { top: 6180, height: 680 } },
    { name: 'opinion', ref: { top: 6830, height: 500 }, shot: { top: 6860, height: 500 } },
    { name: 'business', ref: { top: 7330, height: 550 }, shot: { top: 7360, height: 520 } },
  ];

  for (const item of list) {
    await sharp('reference/home.png')
      .extract({ left: 320, top: item.ref.top, width: 1280, height: item.ref.height })
      .toFile(path.join(outDir, `${item.name}-ref.png`));

    await sharp('qa/desktop-1920.png')
      .extract({ left: 320, top: item.shot.top, width: 1280, height: item.shot.height })
      .toFile(path.join(outDir, `${item.name}-shot.png`));

    console.log(`Cropped precise ${item.name}`);
  }
}

cropPrecise().catch(console.error);
