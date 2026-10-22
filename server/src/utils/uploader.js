import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.resolve(__dirname, '../../uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.memoryStorage();

export const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('কেবলমাত্র ইমেজ ফাইল আপলোড করা যাবে'), false);
    }
  },
});

export async function processAndSaveImage(buffer, originalname) {
  const baseName = path.parse(originalname).name.replace(/[^a-zA-Z0-9_-]/g, '_');
  const timestamp = Date.now();
  const filenameBase = `${timestamp}-${baseName}`;

  const sizes = [
    { name: 'sm', width: 400 },
    { name: 'md', width: 800 },
    { name: 'lg', width: 1200 },
  ];

  const results = {};

  for (const size of sizes) {
    const filename = `${filenameBase}-${size.name}.webp`;
    const outputPath = path.join(uploadDir, filename);

    await sharp(buffer)
      .resize({ width: size.width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(outputPath);

    results[size.name] = `/uploads/${filename}`;
  }

  // Set the primary URL to md (800px) or lg
  return {
    url: results.md,
    variants: results,
  };
}
