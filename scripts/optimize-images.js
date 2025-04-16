import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Images to optimize
const imagesToOptimize = [
  { src: '../public/images/city.jpg', width: 1920 },
  { src: '../public/images/bulb.jpg', width: 1920 },
  { src: '../public/images/logo.png', width: 600 },
  { src: '../public/images/helping.jpg', width: 1200 },
  { src: '../public/images/women3.jpg', width: 1200 },
  { src: '../public/images/women1.jpg', width: 1200 },
  { src: '../public/images/women2.jpg', width: 1200 },
];

// Create optimized directory if it doesn't exist
const optimizedDir = path.join(__dirname, '../public/images/optimized');
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

// Process each image
async function optimizeImages() {
  for (const image of imagesToOptimize) {
    const inputPath = path.join(__dirname, image.src);
    const filename = path.basename(inputPath);
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
    const outputPathWebP = path.join(optimizedDir, `${nameWithoutExt}.webp`);
    const outputPathAvif = path.join(optimizedDir, `${nameWithoutExt}.avif`);
    
    console.log(`Optimizing ${filename}...`);
    
    try {
      // Create WebP version
      await sharp(inputPath)
        .resize(image.width)
        .webp({ quality: 80 })
        .toFile(outputPathWebP);
      
      // Create AVIF version (higher quality but smaller file size)
      await sharp(inputPath)
        .resize(image.width)
        .avif({ quality: 65 })
        .toFile(outputPathAvif);
      
      // Get file sizes for comparison
      const originalSize = (fs.statSync(inputPath).size / 1024).toFixed(2);
      const webpSize = (fs.statSync(outputPathWebP).size / 1024).toFixed(2);
      const avifSize = (fs.statSync(outputPathAvif).size / 1024).toFixed(2);
      
      console.log(`${filename}: Original: ${originalSize} KB, WebP: ${webpSize} KB (${Math.round((1 - webpSize/originalSize) * 100)}% smaller), AVIF: ${avifSize} KB (${Math.round((1 - avifSize/originalSize) * 100)}% smaller)`);
    } catch (error) {
      console.error(`Error processing ${filename}:`, error);
    }
  }
}

// Use top-level await in ES modules
await optimizeImages();
console.log('Image optimization complete!');
