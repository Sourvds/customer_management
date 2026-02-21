# Vercel Deployment Configuration

## Environment Variables for Vercel

Add these environment variables in Vercel dashboard:

### Frontend (.env)
```
REACT_APP_API_URL=https://customer-management-api.vercel.app/api
```

### Backend (.env)
```
PORT=3001
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/customerDB
NODE_ENV=production
```

## Steps to Deploy

### 1. Frontend (React) on Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Select your `customer_management` repository
5. Configure:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. Add Environment Variables:
   - `REACT_APP_API_URL` = Your backend URL
7. Click "Deploy"

### 2. Backend (Node.js) on Vercel

**Note:** Vercel has limitations for long-running Node.js processes. For production backend, consider:
- **Railway.app** (Recommended - free tier with MongoDB)
- **Heroku** (Classic choice)
- **AWS EC2** (Scalable)
- **DigitalOcean** (Affordable)

For Vercel serverless functions:

1. Create `api/` directory at root
2. Create `api/index.js`:

```javascript
// api/index.js
const app = require('../server/server.js');
module.exports = app;
```

3. Update vercel.json for monorepo

### 3. MongoDB Atlas Setup (Recommended)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up free
3. Create a cluster
4. Get connection string
5. Add to backend .env: `MONGO_URI=...`

## Deployment Checklist

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed (Railway/Heroku/etc)
- [ ] MongoDB Atlas cluster created
- [ ] Environment variables configured
- [ ] API endpoint updated in frontend
- [ ] CORS updated with frontend URL
- [ ] Database seeded
- [ ] Testing in production

## Quick Deploy Commands

```bash
# Frontend only (easiest)
vercel

# With custom domain
vercel --prod
```

## Troubleshooting

**Problem:** "Failed to load customers" after deploy
**Solution:** Check API_URL in environment variables and CORS settings

**Problem:** Build fails
**Solution:** Check node_modules, ensure all dependencies in package.json

**Problem:** Database connection error
**Solution:** Verify MongoDB connection string, whitelist Vercel IPs

## Post-Deployment Testing

1. Visit: `https://your-project.vercel.app`
2. Try adding a customer
3. Search functionality
4. Dark mode toggle
5. Check browser console for errors

## Rollback

```bash
git revert <commit-hash>
git push
# Vercel auto-redeploys
```

---

See DEPLOYMENT.md for more detailed instructions.
