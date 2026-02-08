import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

// Write to both local output and project paths
const PROJECT_APP = '/vercel/share/v0-project/app';
const PROJECT_PUBLIC = '/vercel/share/v0-project/public';
const LOCAL_OUT = 'generated-logos';
fs.mkdirSync(LOCAL_OUT, { recursive: true });

const LOGO_URL = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logobig-ORQY9sJRvA2sVb5R0V1XVnUwx9tcCB.png';

async function generateImages() {
  // Fetch the original image from blob URL
  const response = await fetch(LOGO_URL);
  const inputBuffer = Buffer.from(await response.arrayBuffer());

  const original = sharp(inputBuffer);
  const metadata = await original.metadata();
  const size = Math.min(metadata.width, metadata.height);

  // Create a square crop centered on the image
  const left = Math.round((metadata.width - size) / 2);
  const top = Math.round((metadata.height - size) / 2);

  const cropped = await original
    .extract({ left, top, width: size, height: size })
    .toBuffer();

  // Create circular black border SVG overlay
  const borderThickness = Math.round(size * 0.04);
  const cx = size / 2;
  const cy = size / 2;
  const radius = (size / 2) - borderThickness;

  const circleSvg = Buffer.from(`
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${cx}" cy="${cy}" r="${radius}" 
        fill="none" stroke="black" stroke-width="${borderThickness}" />
    </svg>
  `);

  // Compose the cropped image with the circle border
  const withCircle = await sharp(cropped)
    .composite([{ input: circleSvg, top: 0, left: 0 }])
    .png()
    .toBuffer();

  // Create circular mask to clip the image into a circle (for favicon/apple-touch)
  const maskRadius = size / 2;
  const circleMask = Buffer.from(`
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${cx}" cy="${cy}" r="${maskRadius}" fill="white" />
    </svg>
  `);

  const circularImage = await sharp(cropped)
    .composite([
      { input: circleMask, blend: 'dest-in' },
      { input: circleSvg, top: 0, left: 0 }
    ])
    .png()
    .toBuffer();

  // 1. OpenGraph image (1200x630) - white bg with logo centered
  const ogWidth = 1200;
  const ogHeight = 630;
  const logoSize = 500;

  const logoResized = await sharp(withCircle)
    .resize(logoSize, logoSize, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .toBuffer();

  const ogBuffer = await sharp({
    create: {
      width: ogWidth,
      height: ogHeight,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
    .composite([{
      input: logoResized,
      left: Math.round((ogWidth - logoSize) / 2),
      top: Math.round((ogHeight - logoSize) / 2),
    }])
    .png()
    .toBuffer();

  // 3. Apple touch icon (180x180)
  const appleIconBuffer = await sharp(circularImage)
    .resize(180, 180)
    .png()
    .toBuffer();

  // 4. Favicon (32x32 PNG)
  const iconBuffer = await sharp(circularImage)
    .resize(32, 32)
    .png()
    .toBuffer();

  // 5. PWA icon 192x192
  const icon192Buffer = await sharp(circularImage)
    .resize(192, 192)
    .png()
    .toBuffer();

  // 6. PWA icon 512x512
  const icon512Buffer = await sharp(circularImage)
    .resize(512, 512)
    .png()
    .toBuffer();

  // Write to project app directory
  const appFiles = {
    'opengraph-image.png': ogBuffer,
    'twitter-image.png': ogBuffer,
    'apple-icon.png': appleIconBuffer,
    'icon.png': iconBuffer,
  };
  for (const [name, buf] of Object.entries(appFiles)) {
    try {
      fs.writeFileSync(path.join(PROJECT_APP, name), buf);
      console.log(`Written to project: app/${name}`);
    } catch (e) {
      fs.writeFileSync(path.join(LOCAL_OUT, name), buf);
      console.log(`Written to local: ${LOCAL_OUT}/${name}`);
    }
  }

  // Write to project public directory
  const publicFiles = {
    'icon-192.png': icon192Buffer,
    'icon-512.png': icon512Buffer,
  };
  for (const [name, buf] of Object.entries(publicFiles)) {
    try {
      fs.writeFileSync(path.join(PROJECT_PUBLIC, name), buf);
      console.log(`Written to project: public/${name}`);
    } catch (e) {
      fs.writeFileSync(path.join(LOCAL_OUT, name), buf);
      console.log(`Written to local: ${LOCAL_OUT}/${name}`);
    }
  }

  console.log('All logo images generated successfully!');
}

generateImages().catch(console.error);
