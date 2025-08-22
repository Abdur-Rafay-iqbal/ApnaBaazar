
# ApnaBaazar – Next.js Storefront (Amazon/Daraz-style, COD + WhatsApp)

Fully functional ecommerce starter built with **Next.js 14 (app router)** + **Tailwind**.

## Features
- Home, Category, Product, and Cart pages
- Search, category filter, sort (price/rating)
- Cart with quantity controls (localStorage persistence)
- Checkout via **WhatsApp** (COD-friendly, perfect for Markaz workflow)
- Clean, responsive UI with a dark theme

## Quick Start
```bash
npm i
npm run dev
```
Visit http://localhost:3000

## Configure
- Edit **lib/data.js**
  - `CONFIG.whatsappNumber` (format: +923XXXXXXXXX)
  - `CATEGORIES` and `PRODUCTS` (replace with your Markaz items)
- SEO: Update `app/layout.js` metadata.
- Favicon: replace `public/favicon.ico`

## Deploy
- Vercel: push to GitHub and import; or `vercel` CLI
- Netlify/Cloudflare: build command `next build`, output `.next`

## Notes
- This project uses client-side cart/checkout for simplicity (no backend server). For online payments, user accounts, or order database, add a backend (e.g., Supabase/Prisma API routes). For now orders are confirmed via WhatsApp and fulfilled on Markaz.
