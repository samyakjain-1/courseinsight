# 🎨 Favicon Setup Guide

Your UW Course Insights project is configured with a modern favicon system! Here's how to complete the setup:

## 📁 Current Files

✅ **favicon.svg** - Modern SVG favicon (works in most browsers)  
⚠️ **favicon.ico** - Needs to be converted from SVG  
⚠️ **favicon-32x32.png** - Needs to be converted from SVG  
⚠️ **favicon-16x16.png** - Needs to be converted from SVG  
⚠️ **apple-touch-icon.png** - Needs to be converted from SVG  
✅ **site.webmanifest** - Web app manifest for PWA support  

## 🛠️ Quick Setup Steps

### Option 1: Use Favicon.io (Recommended)
1. Go to [favicon.io/favicon-converter/](https://favicon.io/favicon-converter/)
2. Upload the `public/favicon.svg` file
3. Download the generated favicon package
4. Replace the placeholder files in `/public/` with the real ones:
   - `favicon.ico`
   - `favicon-16x16.png`
   - `favicon-32x32.png`
   - `apple-touch-icon.png`

### Option 2: Use ConvertICO
1. Go to [convertico.com/svg-to-ico/](https://convertico.com/svg-to-ico/)
2. Upload `public/favicon.svg`
3. Select multiple sizes: 16x16, 32x32, 180x180
4. Download and replace the placeholder files

## 🎨 Current Design

The favicon features:
- **Blue background** (#2563eb) matching your site's primary color
- **Book icon** representing course insights
- **Orange accent** (#f97316) for visual interest
- **Clean, modern design** that works at all sizes

## ✅ What's Already Working

- ✅ SVG favicon works in modern browsers
- ✅ Metadata is properly configured in `app/layout.tsx`
- ✅ Web manifest for PWA support
- ✅ Apple touch icon support
- ✅ Proper Next.js 14 App Router integration

## 🔧 Testing Your Favicon

After setting up the files:
1. Run `npm run build` and `npm start`
2. Check browser tab for the favicon
3. Bookmark the site to see if favicon appears
4. Test on mobile devices for Apple touch icon

## 📱 Browser Support

- **Modern browsers**: SVG favicon ✅
- **Safari/Older browsers**: ICO fallback ✅  
- **iOS devices**: Apple touch icon ✅
- **Android/PWA**: Web manifest icons ✅

Your favicon setup is ready to go once you convert the SVG to the other formats! 🚀 