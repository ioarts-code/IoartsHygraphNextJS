import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const svgPath = '/vercel/share/v0-project/public/logo-icon.svg';
const outputBase = '/vercel/share/v0-project';

async function convertSvgToImages() {
  try {
    // Read SVG file
    const svgBuffer = fs.readFileSync(svgPath);

    // 1. OpenGraph image (1200x630) - white background with logo centered
    const ogImage = await sharp(svgBuffer)
      .resize(500, 500, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .toBuffer();

    const ogComposite = await sharp({
      create: {
        width: 1200,
        height: 630,
        channels: 3,
        background: { r: 255, g: 255, b: 255 }
      }
    })
      .composite([{
        input: ogImage,
        left: (1200 - 500) / 2,
        top: (630 - 500) / 2,
      }])
      .jpeg({ quality: 90 })
      .toBuffer();

    fs.writeFileSync(path.join(outputBase, 'app/opengraph-image.jpg'), ogComposite);
    console.log('Created opengraph-image.jpg');

    // 2. Twitter image (same as OG)
    fs.writeFileSync(path.join(outputBase, 'app/twitter-image.jpg'), ogComposite);
    console.log('Created twitter-image.jpg');

    // 3. Apple touch icon (180x180)
    const appleIcon = await sharp(svgBuffer)
      .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .png()
      .toBuffer();

    fs.writeFileSync(path.join(outputBase, 'app/apple-icon.png'), appleIcon);
    console.log('Created apple-icon.png');

    // 4. Favicon (32x32)
    const favicon = await sharp(svgBuffer)
      .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .png()
      .toBuffer();

    fs.writeFileSync(path.join(outputBase, 'app/icon.png'), favicon);
    console.log('Created icon.png');

    // 5. PWA icon 192x192
    const icon192 = await sharp(svgBuffer)
      .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .png()
      .toBuffer();

    fs.writeFileSync(path.join(outputBase, 'public/icon-192.png'), icon192);
    console.log('Created icon-192.png');

    // 6. PWA icon 512x512
    const icon512 = await sharp(svgBuffer)
      .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .png()
      .toBuffer();

    fs.writeFileSync(path.join(outputBase, 'public/icon-512.png'), icon512);
    console.log('Created icon-512.png');

    console.log('All images created successfully!');
  } catch (error) {
    console.error('Error converting SVG:', error.message);
    process.exit(1);
  }
}

convertSvgToImages();
