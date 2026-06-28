# Pink'n Green Chatbot

AI-powered bilingual (Arabic/English) chatbot for pinkngreens.com
Built with Shopify Storefront API + Vercel

## Setup

### 1. Environment Variables (set in Vercel dashboard)
```
SHOPIFY_STOREFRONT_TOKEN=your_storefront_token_here
```

### 2. Deploy to Vercel
- Push this repo to GitHub
- Import in Vercel dashboard
- Add environment variable
- Deploy!

### 3. Embed on Shopify
Add before `</body>` in your theme.liquid:
```html
<script>
  window.PNGChatConfig = {
    apiUrl: 'https://YOUR-VERCEL-URL.vercel.app/api/chat',
    botName: "Pink'n Green Assistant",
    primaryColor: '#d4537e'
  };
</script>
<script src="https://YOUR-VERCEL-URL.vercel.app/widget.js" async></script>
```

## Features
- Bilingual Arabic + English (auto-detect)
- Symptom-based product recommendations
- Live Shopify product data
- Email routing to Customerservice@pinkngreens.com
- Mobile responsive
- RTL Arabic support
