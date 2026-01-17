# Domain Setup Guide for ioarts.ink

This guide will help you connect your custom domain `ioarts.ink` to your Vercel deployment with SSL certificate.

## Prerequisites Completed ✅

Your site is now prepared with:
- ✅ Dynamic sitemap generation (`/sitemap.xml`)
- ✅ Robots.txt configuration (`/robots.txt`)
- ✅ Comprehensive SEO metadata (Open Graph, Twitter Cards)
- ✅ Canonical URL support
- ✅ Mobile-optimized viewport settings
- ✅ Structured data (JSON-LD) for products

## Steps to Connect Domain on Vercel

### 1. Add Domain in Vercel Dashboard

1. Go to your project on Vercel: https://vercel.com/dashboard
2. Navigate to **Settings** → **Domains**
3. Click **Add Domain**
4. Enter: `ioarts.ink`
5. Click **Add**

### 2. Configure DNS Records

Vercel will provide you with DNS records to add. You'll need to add these records at your domain registrar (where you purchased ioarts.ink):

**Option A: Using Vercel Nameservers (Recommended)**
- Change your nameservers to Vercel's nameservers
- Vercel will automatically manage all DNS records and SSL certificates
- This is the easiest option and ensures automatic SSL renewal

**Option B: Using CNAME/A Records**
Add these records at your DNS provider:

For root domain (`ioarts.ink`):
\`\`\`
Type: A
Name: @
Value: 76.76.21.21
\`\`\`

For www subdomain (`www.ioarts.ink`):
\`\`\`
Type: CNAME
Name: www
Value: cname.vercel-dns.com
\`\`\`

### 3. SSL Certificate Generation

Once DNS is configured correctly:

1. **Automatic SSL**: Vercel automatically provisions SSL certificates using Let's Encrypt
2. **Verification**: SSL uses HTTP-01 or DNS-01 challenge (DNS-01 requires proper DNS zone configuration)
3. **Propagation**: Wait 24-48 hours for DNS propagation
4. **Status Check**: Monitor SSL status in Vercel dashboard under Domains

**Troubleshooting DNS Zone Error:**

If you see "DNS zone not enabled" error:
- Ensure DNS records are correctly configured at your registrar
- Wait for DNS propagation (can take up to 48 hours)
- Verify records using: `dig ioarts.ink` or `nslookup ioarts.ink`
- Consider using Vercel nameservers for automatic management

### 4. Update Environment Variables

Add this environment variable in Vercel:

\`\`\`
NEXT_PUBLIC_SITE_URL=https://ioarts.ink
\`\`\`

**How to add:**
1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add variable for all environments (Production, Preview, Development)
3. Redeploy your application

### 5. Verify Setup

After DNS propagation and deployment:

1. **SSL Certificate**: Visit https://ioarts.ink - should show secure connection
2. **Sitemap**: Check https://ioarts.ink/sitemap.xml
3. **Robots**: Check https://ioarts.ink/robots.txt
4. **SEO**: Use [Google Rich Results Test](https://search.google.com/test/rich-results)
5. **SSL**: Use [SSL Labs](https://www.ssllabs.com/ssltest/) to verify SSL configuration

## SEO Optimization Checklist

### Already Implemented ✅
- [x] Dynamic XML sitemap with all products and collections
- [x] Robots.txt with proper crawl directives
- [x] Meta descriptions for all pages
- [x] Open Graph tags for social sharing
- [x] Twitter Card metadata
- [x] Canonical URLs
- [x] Structured data (JSON-LD) for products
- [x] Mobile-responsive viewport
- [x] Semantic HTML with proper heading hierarchy
- [x] Alt text for images
- [x] ISR (Incremental Static Regeneration) for dynamic pages

### Post-Launch Recommendations

1. **Google Search Console**
   - Add and verify your property
   - Submit sitemap: `https://ioarts.ink/sitemap.xml`
   - Monitor indexing status

2. **Analytics** (Optional)
   - Add Google Analytics or Vercel Analytics
   - Track conversions and user behavior

3. **Performance**
   - Already optimized with AVIF/WebP images
   - Using Next.js 16 with Turbopack
   - ISR enabled for optimal performance

4. **Social Meta Images**
   - Consider adding a default Open Graph image
   - Create product-specific social sharing images

## SSL Certificate Technical Details

Vercel uses **Let's Encrypt** for SSL certificates with these features:

- **Automatic provisioning**: Certificates are issued automatically
- **Auto-renewal**: Certificates renew automatically before expiration
- **ACME Protocol**: Uses dns-01 or http-01 challenge
- **Wildcard support**: Supports wildcard certificates if needed
- **Zero configuration**: Works out of the box once DNS is configured

**Common Issues:**

1. **"DNS zone not enabled"**: DNS records not propagated or incorrect
   - Solution: Verify DNS configuration, wait for propagation
   
2. **"Certificate pending"**: Waiting for DNS verification
   - Solution: Wait 24-48 hours for DNS propagation
   
3. **"Invalid configuration"**: DNS records pointing elsewhere
   - Solution: Ensure A/CNAME records point to Vercel

## Next Steps

1. Configure DNS records at your domain registrar
2. Wait for DNS propagation (24-48 hours)
3. Add environment variable in Vercel
4. Verify SSL certificate is active
5. Submit sitemap to Google Search Console
6. Monitor indexing and performance

## Support Resources

- [Vercel Domain Documentation](https://vercel.com/docs/projects/domains)
- [Vercel SSL Documentation](https://vercel.com/docs/security/encryption)
- [Next.js Metadata Documentation](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)

Your site is now fully prepared for production deployment on ioarts.ink! 🚀
