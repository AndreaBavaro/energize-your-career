import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Video to optimize
const videoPath = path.join(__dirname, '../public/images/helpingvid.mp4');
const outputDir = path.join(__dirname, '../public/images/optimized');
const outputPath = path.join(outputDir, 'helpingvid.mp4');
const webmOutputPath = path.join(outputDir, 'helpingvid.webm');

// Create optimized directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get original file size
const originalSize = fs.statSync(videoPath).size / (1024 * 1024);
console.log(`Original video size: ${originalSize.toFixed(2)} MB`);

// Function to compress video using ffmpeg
function compressVideo() {
  console.log('Compressing video to MP4...');
  
  // Command to compress MP4 with good quality but smaller size
  const mp4Command = `ffmpeg -i "${videoPath}" -vf "scale=1280:-1" -c:v libx264 -crf 28 -preset medium -c:a aac -b:a 128k "${outputPath}"`;
  
  // Execute the command
  exec(mp4Command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error compressing MP4: ${error.message}`);
      return;
    }
    
    // Get compressed file size
    const compressedSize = fs.statSync(outputPath).size / (1024 * 1024);
    console.log(`Compressed MP4 size: ${compressedSize.toFixed(2)} MB`);
    console.log(`Reduction: ${((1 - compressedSize / originalSize) * 100).toFixed(2)}%`);
    
    // Now create WebM version for even better compression
    createWebMVersion();
  });
}

// Function to create WebM version for modern browsers
function createWebMVersion() {
  console.log('Creating WebM version...');
  
  // Command to create WebM version
  const webmCommand = `ffmpeg -i "${videoPath}" -vf "scale=1280:-1" -c:v libvpx-vp9 -crf 32 -b:v 0 -c:a libopus -b:a 96k "${webmOutputPath}"`;
  
  // Execute the command
  exec(webmCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error creating WebM: ${error.message}`);
      return;
    }
    
    // Get WebM file size
    const webmSize = fs.statSync(webmOutputPath).size / (1024 * 1024);
    console.log(`WebM size: ${webmSize.toFixed(2)} MB`);
    console.log(`Reduction: ${((1 - webmSize / originalSize) * 100).toFixed(2)}%`);
    
    console.log('Video optimization complete!');
  });
}

// Start compression
compressVideo();
