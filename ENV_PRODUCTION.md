# Environment Variables for Deployment

## Frontend Environment Variables

Create file: `.env.production`

```env
# API endpoint for production
REACT_APP_API_URL=https://your-backend-url.com/api

# Optional: analytics
REACT_APP_ANALYTICS_ID=your-analytics-id
```

For Vercel, add directly in project settings:
- Settings → Environment Variables
- Add `REACT_APP_API_URL`

---

## Backend Environment Variables

Create file: `server/.env.production`

```env
# Server Port (Vercel/Railway will override, but needed for local)
PORT=8000

# MongoDB Connection (use MongoDB Atlas in production)
MONGO_URI=mongodb+srv://username:password@cluster-name.mongodb.net/customerDB?retryWrites=true&w=majority

# Node Environment
NODE_ENV=production

# Optional: API Logging
LOG_LEVEL=info

# Optional: CORS Origins (add your frontend domain)
CORS_ORIGIN=https://your-frontend.vercel.app
```

### MongoDB Atlas Connection String

1. Go to https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Add database user
4. Click "Connect" → "Connect your application"
5. Copy connection string
6. Replace `<password>` and `<dbname>`

Example:
```
mongodb+srv://admin:myPassword123@cluster0.abc123.mongodb.net/customerDB?retryWrites=true&w=majority
```

---

## Platform-Specific Setup

### Vercel Setup

1. Dashboard → Settings → Environment Variables
2. Add variables:

| Name | Value |
|------|-------|
| REACT_APP_API_URL | https://api.example.com |

3. Click "Save"
4. Redeploy

### Railway Setup

1. Dashboard → Your Project
2. Click "Variables" (each service)
3. Add environment variables
4. Deploy

Example for Backend:
```
PORT=8000
MONGO_URI=mongodb+srv://...
NODE_ENV=production
```

### Heroku Setup

```bash
# Set variables via CLI
heroku config:set MONGO_URI=mongodb+srv://...
heroku config:set NODE_ENV=production

# Or via dashboard:
# Settings → Reveal Config Vars
# Add key-value pairs
```

---

## Common Issues

### "Failed to load customers" after deployment

**Check:**
1. Is backend running?
2. Is database connected?
3. Is API_URL correct in frontend?
4. Is CORS configured?

**Fix:**
```bash
# Check backend logs
# Verify MONGO_URI connection
# Update CORS in backend:
```

```javascript
// server/server.js
app.use(cors({
  origin: ['https://your-vercel-app.vercel.app', 'http://localhost:5173'],
  credentials: true,
}));
```

### Database Connection Timeout

**Cause:** MongoDB Atlas IP whitelist
**Fix:**
1. Go to MongoDB Atlas
2. Network Access → Add IP Address
3. Add: 0.0.0.0/0 (allows all IPs)
4. Or add specific Vercel/Railway IPs

### Build Fails

**Common causes:**
- Missing dependencies
- TypeScript errors
- Env variables not set

**Debug:**
```bash
npm run build
# Check output for errors
```

---

## Production Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Connection string obtained
- [ ] Frontend API_URL configured
- [ ] Backend MONGO_URI configured
- [ ] Backend CORS updated
- [ ] Build succeeds locally: `npm run build`
- [ ] Environment variables set in Vercel/Railway
- [ ] Database seeded in production
- [ ] SSL certificate (auto with Vercel)
- [ ] Domain configured (optional)
- [ ] Monitoring setup (optional)

---

## Scaling Notes

### For more traffic:
1. Upgrade MongoDB Atlas tier
2. Use Redis for caching
3. Add API rate limiting
4. Setup CDN (Cloudflare)

### For more features:
1. Add authentication (JWT)
2. Add image upload (AWS S3)
3. Add email notifications (SendGrid)
4. Add activity logging

---

**Ready to deploy! 🚀**
