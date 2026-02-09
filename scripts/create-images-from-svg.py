#!/usr/bin/env python3
import base64
import json
import os

# Base64 data from Node.js script
svg_content = """<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="219.000000pt" height="226.000000pt" viewBox="0 0 219.000000 226.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,226.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M945 1986 c-319 -63 -567 -301 -656 -631 -31 -114 -31 -326 0 -439
130 -478 621 -746 1072 -587 255 90 454 314 530 596 31 114 31 326 0 439 -28
103 -87 223 -152 309 -103 136 -282 255 -446 298 -101 26 -257 33 -348 15z
m76 -208 c4 -38 -27 -108 -47 -108 -21 0 -33 66 -18 104 7 19 63 22 65 4z
m268 -123 c68 -35 71 -172 4 -225 -19 -15 -39 -20 -75 -19 -69 3 -92 32 -85
110 6 64 27 103 72 130 36 23 48 23 84 4z m-299 -57 c0 -9 4 -8 10 2 7 11 8 7
6 -16 -2 -17 -7 -77 -11 -133 -5 -58 -13 -108 -21 -118 -12 -17 -13 -17 -14 4
0 12 -5 25 -11 29 -6 3 -9 15 -6 25 3 10 1 22 -4 25 -5 3 -9 39 -9 81 0 57 4
81 17 95 19 21 43 24 43 6z m283 -355 c3 -5 -1 -43 -8 -87 l-12 -78 48 5 c66
8 66 -14 -1 -45 l-50 -23 0 -85 c0 -54 5 -91 12 -98 7 -7 34 -12 61 -12 42 0
48 -2 37 -15 -15 -18 -71 -29 -105 -21 -34 9 -63 69 -71 150 -4 36 -11 66 -15
66 -15 0 -49 39 -49 55 0 10 10 15 29 15 28 0 30 3 36 48 8 57 22 91 50 114
22 19 32 22 38 11z m-391 -88 c-5 -57 9 -176 21 -172 6 2 14 14 17 28 6 26 53
54 75 45 8 -3 12 -12 9 -21 -5 -12 2 -15 38 -15 32 0 50 -6 62 -19 24 -26 12
-42 -24 -34 -26 5 -36 -1 -70 -36 -36 -37 -40 -46 -40 -94 -1 -28 -6 -62 -13
-75 -12 -21 -14 -18 -30 45 -9 38 -18 82 -21 98 -2 17 -3 -8 -2 -54 1 -97 -14
-118 -34 -44 -22 86 -32 103 -57 98 -13 -3 -34 -7 -47 -10 -17 -3 -29 -17 -41
-47 -19 -47 -40 -67 -72 -68 -35 0 -35 13 1 85 18 37 31 76 29 86 -4 14 0 19
14 19 14 0 32 24 68 91 53 102 78 132 103 127 12 -3 16 -12 14 -33z m636 -129
c3 -12 0 -16 -8 -11 -17 10 -60 -15 -60 -36 0 -10 15 -24 38 -34 20 -10 45
-24 55 -33 24 -21 21 -64 -5 -89 -41 -37 -148 -41 -148 -6 0 10 6 13 15 9 9
-3 23 -2 33 3 9 5 25 12 35 15 26 8 21 22 -13 36 -78 33 -102 94 -55 144 21
23 32 27 67 24 32 -2 44 -8 46 -22z"/>
<path d="M1211 1574 c-27 -34 -37 -89 -21 -109 18 -22 57 -18 74 7 16 23 21
83 10 112 -9 24 -40 19 -63 -10z"/>
<path d="M801 1017 c-15 -39 -14 -47 9 -47 21 0 25 20 10 55 -7 19 -9 18 -19
-8z"/>
</g>
</svg>"""

# Try to use PIL/Pillow to convert SVG to images
try:
    from PIL import Image
    from io import BytesIO
    import cairosvg
    
    # Convert SVG to PNG using cairosvg
    print("Converting SVG to images...")
    
    # OG image
    png_buffer = BytesIO()
    cairosvg.svg2png(bytestring=svg_content.encode(), write_to=png_buffer)
    png_buffer.seek(0)
    og_img = Image.open(png_buffer).resize((500, 500))
    
    # Create 1200x630 white background with logo
    og = Image.new('RGB', (1200, 630), 'white')
    og.paste(og_img, ((1200-500)//2, (630-500)//2))
    og.save('/vercel/share/v0-project/app/opengraph-image.jpg', 'JPEG', quality=90)
    print("Created opengraph-image.jpg")
    
    # Twitter image (same as OG)
    og.save('/vercel/share/v0-project/app/twitter-image.jpg', 'JPEG', quality=90)
    print("Created twitter-image.jpg")
    
    # Apple icon 180x180
    apple_img = Image.open(BytesIO(png_buffer.getvalue())).convert('RGBA').resize((180, 180))
    apple_bg = Image.new('RGBA', (180, 180), 'white')
    apple_bg.paste(apple_img, (0, 0), apple_img)
    apple_bg.save('/vercel/share/v0-project/app/apple-icon.png')
    print("Created apple-icon.png")
    
    # Favicon 32x32
    favicon = Image.open(BytesIO(png_buffer.getvalue())).convert('RGBA').resize((32, 32))
    favicon_bg = Image.new('RGBA', (32, 32), 'white')
    favicon_bg.paste(favicon, (0, 0), favicon)
    favicon_bg.save('/vercel/share/v0-project/app/icon.png')
    print("Created icon.png")
    
    # PWA icons
    icon192 = Image.open(BytesIO(png_buffer.getvalue())).convert('RGBA').resize((192, 192))
    icon192_bg = Image.new('RGBA', (192, 192), 'white')
    icon192_bg.paste(icon192, (0, 0), icon192)
    icon192_bg.save('/vercel/share/v0-project/public/icon-192.png')
    print("Created icon-192.png")
    
    icon512 = Image.open(BytesIO(png_buffer.getvalue())).convert('RGBA').resize((512, 512))
    icon512_bg = Image.new('RGBA', (512, 512), 'white')
    icon512_bg.paste(icon512, (0, 0), icon512)
    icon512_bg.save('/vercel/share/v0-project/public/icon-512.png')
    print("Created icon-512.png")
    
    print("All images created successfully!")
    
except Exception as e:
    print(f"Error: {e}")
    print("PIL/cairosvg not available, using Node.js generated files...")
