import sharp from 'sharp';
import path from 'path';

const INPUT = path.resolve('public/logobig.png');
const APP_DIR = path.resolve('app');
const PUBLIC_DIR = path.resolve('public');

async function generateImages() {
  // Read original image
  const original = sharp(INPUT);
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

  await sharp({
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
    .toFile(path.join(APP_DIR, 'opengraph-image.png'));

  console.log('Created opengraph-image.png');

  // 2. Twitter image
  await sharp({
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
    .toFile(path.join(APP_DIR, 'twitter-image.png'));

  console.log('Created twitter-image.png');

  // 3. Apple touch icon (180x180)
  await sharp(circularImage)
    .resize(180, 180)
    .png()
    .toFile(path.join(APP_DIR, 'apple-icon.png'));

  console.log('Created apple-icon.png');

  // 4. Favicon (32x32 PNG)
  await sharp(circularImage)
    .resize(32, 32)
    .png()
    .toFile(path.join(APP_DIR, 'icon.png'));

  console.log('Created icon.png');

  // 5. PWA icon 192x192
  await sharp(circularImage)
    .resize(192, 192)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'icon-192.png'));

  console.log('Created icon-192.png');

  // 6. PWA icon 512x512
  await sharp(circularImage)
    .resize(512, 512)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'icon-512.png'));

  console.log('Created icon-512.png');

  console.log('All logo images generated successfully!');
}

generateImages().catch(console.error);
