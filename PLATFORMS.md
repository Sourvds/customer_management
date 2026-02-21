# Platform Configuration for Different Deployment Options

## Option 1: Railway.app (Recommended - Best for Backend)

Perfect for deploying both frontend and backend with MongoDB.

### Steps:
1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select `customer_management`
5. Railway auto-detects and creates services
6. Add MongoDB from Railway plugins
7. Set environment variables:
   ```
   PORT=8000
   MONGO_URI=auto-filled by Railway
   NODE_ENV=production
   ```
8. Deploy!

**Pros:** Free tier generous, easy MongoDB setup, good for Node.js
**Cost:** Free tier, then $5/month per service

---

## Option 2: Heroku (Classic)

Traditional choice for Node.js backends.

### Steps:
1. Go to https://www.heroku.com
2. Create account and app
3. Connect GitHub repo
4. Enable "Automatic Deploys"
5. Add MongoDB Atlas connection
6. Deploy!

**Pros:** Well-documented, reliable
**Cost:** Paid (no free tier after Nov 2022)

---

## Option 3: AWS (Scalable)

For production applications requiring scale.

### Frontend: CloudFront + S3
```bash
npm run build
# Upload dist/ to S3
```

### Backend: EC2 + RDS
- EC2 instance with Node.js
- RDS for MongoDB (or MongoDB Atlas)

**Pros:** Scalable, enterprise-ready
**Cost:** Pay-as-you-go

---

## Option 4: DigitalOcean (Affordable)

Budget-friendly with good performance.

### Steps:
1. Create Droplet (Ubuntu)
2. SSH and setup Node.js
3. Clone repo
4. Install dependencies
5. Setup PM2 for process management
6. Deploy!

**Pros:** Affordable, good docs
**Cost:** $4-6/month for starter

---

## Environment Variables by Platform

### Vercel
```
REACT_APP_API_URL=https://api.example.com
```

### Railway
```
PORT=8000
MONGO_URI=mongodb+srv://...
NODE_ENV=production
```

### Heroku
```
PORT=8000
MONGO_URI=mongodb+srv://...
NODE_ENV=production
```

---

## CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run build
      - run: vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

---

## Monitoring & Analytics

### After Deployment:

1. **Vercel Analytics**
   - Automatic performance monitoring
   - Visit: vercel.com/dashboard

2. **Error Tracking**
   - Setup Sentry for errors
   - Or use Datadog

3. **Uptime Monitoring**
   - Uptime Robot (free)
   - Better Stack
   - Pingdom

---

## Recommended Setup for Production

**Best Overall Setup:**
1. **Frontend:** Vercel (easiest, best performance)
2. **Backend:** Railway.app (great for Node.js)
3. **Database:** MongoDB Atlas (free 512MB tier)
4. **Domain:** Buy from Namecheap or Vercel Domains
5. **Email:** SendGrid (transactional emails)

**Cost:** ~$5-10/month for good production setup

---

## Database Migration

Before deployment:

```bash
# 1. Setup MongoDB Atlas free cluster
# 2. Get connection string
# 3. Update backend .env
# 4. Run seed script against production:
NODE_ENV=production npm run seed
```

---

## Final Checklist

- [ ] Code pushed to GitHub (main branch)
- [ ] vercel.json configured
- [ ] Environment variables documented
- [ ] .env files in .gitignore
- [ ] Build tested locally: `npm run build`
- [ ] Database configured (MongoDB Atlas)
- [ ] API CORS allows frontend domain
- [ ] Frontend points to correct backend URL
- [ ] Monitoring setup (optional)
- [ ] Domain configured (optional)
- [ ] SSL certificate (auto with Vercel)

---

**Status:** Ready to deploy! 🚀
