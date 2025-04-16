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

// Check if video file exists
if (!fs.existsSync(videoPath)) {
  console.error(`Error: Video file not found at ${videoPath}`);
  process.exit(1);
}

// Get original file size
const originalSize = fs.statSync(videoPath).size / (1024 * 1024);
console.log(`Original video size: ${originalSize.toFixed(2)} MB`);

// Function to compress video using ffmpeg
function compressVideo() {
  console.log('Compressing video to MP4...');
  console.log(`Input path: ${videoPath}`);
  console.log(`Output path: ${outputPath}`);
  
  // Command to compress MP4 with good quality but smaller size
  // Using a higher CRF (30) for more compression and faster preset for quicker encoding
  const mp4Command = `ffmpeg -i "${videoPath}" -vf "scale=1280:-1" -c:v libx264 -crf 30 -preset faster -c:a aac -b:a 96k -movflags +faststart "${outputPath}"`;
  
  console.log(`Running command: ${mp4Command}`);
  
  // Execute the command
  exec(mp4Command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error compressing MP4: ${error.message}`);
      console.error(stderr);
      return;
    }
    
    if (!fs.existsSync(outputPath)) {
      console.error(`Error: Output file not created at ${outputPath}`);
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
  console.log(`Output WebM path: ${webmOutputPath}`);
  
  // Command to create WebM version with VP9 codec for better compression
  // Using a higher CRF (35) for more compression
  const webmCommand = `ffmpeg -i "${outputPath}" -vf "scale=1280:-1" -c:v libvpx-vp9 -crf 35 -b:v 0 -c:a libopus -b:a 64k "${webmOutputPath}"`;
  
  console.log(`Running command: ${webmCommand}`);
  
  // Execute the command
  exec(webmCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error creating WebM: ${error.message}`);
      console.error(stderr);
      return;
    }
    
    if (!fs.existsSync(webmOutputPath)) {
      console.error(`Error: WebM file not created at ${webmOutputPath}`);
      return;
    }
    
    // Get WebM file size
    const webmSize = fs.statSync(webmOutputPath).size / (1024 * 1024);
    console.log(`WebM size: ${webmSize.toFixed(2)} MB`);
    console.log(`Reduction: ${((1 - webmSize / originalSize) * 100).toFixed(2)}%`);
    
    console.log('Video optimization complete!');
    
    // Update the OurStory component to use the optimized videos
    updateOurStoryComponent();
  });
}

// Function to update OurStory component to use optimized videos
function updateOurStoryComponent() {
  console.log('Updating OurStory component to use optimized videos...');
  
  const ourStoryPath = path.join(__dirname, '../src/components/sections/OurStory.tsx');
  
  if (!fs.existsSync(ourStoryPath)) {
    console.error(`Error: OurStory component not found at ${ourStoryPath}`);
    return;
  }
  
  let content = fs.readFileSync(ourStoryPath, 'utf8');
  
  // Replace the video source with optimized versions
  content = content.replace(
    /<source src=\"\/images\/helpingvid\.mp4\" type=\"video\/mp4\" \/>/,
    `{/* WebM format for modern browsers - better compression */}\n                  <source src="/images/optimized/helpingvid.webm" type="video/webm" />\n                  {/* MP4 fallback for older browsers */}\n                  <source src="/images/optimized/helpingvid.mp4" type="video/mp4" />`
  );
  
  // Update poster to use WebP version
  content = content.replace(
    /poster=\"\/images\/helping\.jpg\"/,
    'poster="/images/optimized/helping.webp"'
  );
  
  fs.writeFileSync(ourStoryPath, content);
  console.log('OurStory component updated successfully!');
}

// Start compression
compressVideo();
