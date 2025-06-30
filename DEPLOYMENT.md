# Vercel Deployment Guide

This guide will help you deploy the exam practice service to Vercel for free.

## 🚀 Quick Deployment

### Option 1: Deploy from GitHub (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/show-exam.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your repository
   - Click "Deploy"

### Option 2: Deploy with Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

## ⚙️ Environment Variables

Set these environment variables in your Vercel dashboard:

1. Go to your project in Vercel
2. Navigate to "Settings" → "Environment Variables"
3. Add the following:

```env
OPENAI_API_KEY=your_openai_api_key_here
ADMIN_PASSWORD=your_secure_admin_password
```

## 📁 Project Structure

```
show-exam/
├── api/
│   └── problem-sets.js     # Serverless API for CRUD operations
├── data/
│   ├── index.json         # Problem sets index
│   ├── math_basic.json    # Built-in math problems
│   └── physics_basic.json # Built-in physics problems
├── index.html             # Main application
├── vercel.json           # Vercel configuration
├── package.json          # Project dependencies
└── .env.example          # Environment variables template
```

## 🔧 How It Works

### File-Based Storage System
- **Problem sets** are stored as JSON files in the `data/` directory
- **Index file** (`data/index.json`) tracks all available problem sets
- **Serverless API** (`api/problem-sets.js`) handles CRUD operations
- **Built-in problem sets** cannot be deleted (safety measure)

### API Endpoints

- `GET /api/problem-sets` - Get all problem sets index
- `GET /api/problem-sets?key=math_basic` - Get specific problem set
- `POST /api/problem-sets` - Create new problem set
- `PUT /api/problem-sets?key=custom_set` - Update existing problem set
- `DELETE /api/problem-sets?key=custom_set` - Delete problem set

### Storage Limitations
- **Vercel free tier**: 100GB bandwidth/month, 10GB storage
- **File system**: Read-only in serverless functions (except `/tmp`)
- **Persistence**: Files persist across deployments when committed to git

## 🛠️ Development

### Local Development
```bash
npm install
npm run dev
```

This starts Vercel's development server with serverless function simulation.

### Testing the API
```bash
# Get all problem sets
curl https://your-app.vercel.app/api/problem-sets

# Get specific problem set
curl https://your-app.vercel.app/api/problem-sets?key=math_basic

# Create new problem set (requires admin authentication in the app)
curl -X POST https://your-app.vercel.app/api/problem-sets \
  -H "Content-Type: application/json" \
  -d '{"key": "new_set", "data": {...}}'
```

## 📊 Free Tier Considerations

### Vercel Free Limits
- ✅ **Bandwidth**: 100GB/month (sufficient for most use cases)
- ✅ **Serverless Functions**: 100GB-hours/month
- ✅ **Edge Network**: Global CDN included
- ✅ **Custom Domains**: Supported
- ✅ **SSL Certificates**: Automatic

### Best Practices
1. **Optimize file sizes**: Keep JSON files reasonably small
2. **Cache management**: Vercel handles static file caching automatically
3. **API rate limiting**: Consider implementing if needed
4. **Monitoring**: Use Vercel analytics to track usage

## 🔒 Security

### Admin Authentication
- Admin password is set via environment variables
- Never commit passwords to git
- Use strong passwords in production

### API Security
- CORS is enabled for frontend access
- Input validation on all endpoints
- Built-in problem sets are protected from modification

## 🐛 Troubleshooting

### Common Issues

1. **API functions not working**
   - Check `vercel.json` configuration
   - Ensure `api/` directory structure is correct
   - Check function logs in Vercel dashboard

2. **Problem sets not loading**
   - Verify `data/index.json` format
   - Check individual JSON file syntax
   - Ensure files are committed to git

3. **Environment variables not working**
   - Redeploy after setting environment variables
   - Check variable names match exactly
   - Verify values are set in Vercel dashboard

4. **File not found errors**
   - Check file paths in `data/index.json`
   - Ensure all referenced files exist
   - Verify file names match exactly

### Debug Mode
Enable debug logging by adding to your environment variables:
```env
DEBUG=1
```

## 📈 Scaling

### If you outgrow the free tier:
1. **Vercel Pro** ($20/month): Higher limits, team features
2. **External database**: Integrate with MongoDB Atlas, Supabase, etc.
3. **CDN optimization**: For larger file sizes
4. **Custom backend**: Migrate to dedicated server if needed

## 🔄 Updates and Maintenance

### Adding New Problem Sets
1. Admin can add through web interface
2. New files are created in `data/` directory
3. Index is automatically updated

### Updating Built-in Problem Sets
1. Edit files in `data/` directory
2. Commit changes to git
3. Redeploy to Vercel

### Backup and Recovery
- All data is version-controlled in git
- Vercel keeps deployment history
- Export custom problem sets via admin panel if needed