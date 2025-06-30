# Environment Variables Setup

This document explains how to configure environment variables for the exam practice service.

## Quick Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and set your values:
   ```bash
   OPENAI_API_KEY=your_actual_openai_api_key_here
   ADMIN_PASSWORD=your_secure_admin_password
   ```

## Environment Variables

### OPENAI_API_KEY
- **Required for**: Essay question grading
- **How to get**: Visit [OpenAI Platform](https://platform.openai.com/api-keys)
- **Format**: `sk-...` (starts with `sk-`)

### ADMIN_PASSWORD
- **Required for**: Admin panel access
- **Default**: `admin123`
- **Recommendation**: Use a strong password in production

## Deployment Options

### Option 1: Static File Server with .env
If you're serving the HTML file with a web server that can read .env files:

1. Place `.env` file in the same directory as `index.html`
2. Ensure your server can serve the `.env` file (note: this may be a security risk)

### Option 2: Build-Time Environment Variable Injection

#### Using Vite
```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    'process.env.OPENAI_API_KEY': JSON.stringify(process.env.OPENAI_API_KEY),
    'process.env.ADMIN_PASSWORD': JSON.stringify(process.env.ADMIN_PASSWORD)
  }
})
```

#### Using Webpack
```javascript
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.OPENAI_API_KEY': JSON.stringify(process.env.OPENAI_API_KEY),
      'process.env.ADMIN_PASSWORD': JSON.stringify(process.env.ADMIN_PASSWORD)
    })
  ]
};
```

### Option 3: Manual Input
If environment variables are not available, users can still manually input their API key through the web interface.

## Security Notes

⚠️ **Important Security Considerations:**

1. **Never commit `.env` files** to version control (already in `.gitignore`)
2. **Use build-time injection** for production deployments
3. **Don't expose `.env` files** via web server in production
4. **Use strong admin passwords** in production environments
5. **Consider using a proxy server** for API calls to hide keys from client-side code

## Production Deployment

For production deployments, it's recommended to:

1. Set environment variables in your hosting platform (Vercel, Netlify, etc.)
2. Use build-time injection to embed values into the JavaScript
3. Never expose sensitive keys in client-side code
4. Consider using a backend API proxy for OpenAI calls

## Troubleshooting

### API Key Not Loading
- Check browser console for error messages
- Verify `.env` file format (no spaces around `=`)
- Ensure file is in the correct directory
- Check if web server can serve `.env` files

### Build-Time Variables Not Working
- Verify build tool configuration
- Check if environment variables are set in build environment
- Restart development server after changing `.env`

### Manual Input Not Working
- Clear browser localStorage: `localStorage.clear()`
- Refresh the page
- Check for JavaScript errors in console