# Quick Start Guide

Get up and running in 5 minutes!

## For Local Development

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Create Environment File
```bash
cp .env.example .env
```

### Step 3: Start Backend (Terminal 1)
```bash
npm run server
```
Backend runs at: `http://localhost:4000`

### Step 4: Start Frontend (Terminal 2)
```bash
npm run dev
```
Frontend runs at: `http://localhost:5173`

### Step 5: Login
- Email: `alex@university.edu`
- Password: `password`

Or admin account:
- Email: `admin@weeklycode.com`
- Password: `adminpass`

## For Vercel Deployment

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for production"
git push origin main
```

### Step 2: Create Vercel Account
Go to https://vercel.com and sign up

### Step 3: Import Project
1. Click "New Project"
2. Select your GitHub repository
3. Click "Import"

### Step 4: Add Environment Variables
In Vercel dashboard, go to Settings → Environment Variables and add:
```
FRONTEND_URL=https://your-app-name.vercel.app
NODE_ENV=production
```

### Step 5: Deploy
Click "Deploy" button - wait 2-5 minutes

### Step 6: Test
Visit your Vercel URL and test the application

## Getting OAuth Credentials (Optional)

### Google OAuth
1. Go to https://console.cloud.google.com
2. Create new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized origins: `https://your-domain.vercel.app`
6. Copy Client ID and Secret to Vercel environment variables

### GitHub OAuth
1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Set:
   - Homepage URL: `https://your-domain.vercel.app`
   - Authorization callback: `https://your-domain.vercel.app/api/auth/oauth/github/callback`
4. Copy Client ID and Secret to Vercel environment variables

## Test Accounts

All test users use password: `password`

```
Admin:
- Email: admin@weeklycode.com
- Password: adminpass

Student 1:
- Email: alex@university.edu
- Username: AlexCode

Student 2:
- Email: sarah@university.edu
- Username: SarahDev
```

## Common Commands

```bash
# Development
npm run dev              # Start frontend dev server
npm run server           # Start backend server
npm install              # Install dependencies

# Production
npm run build            # Build for production
npm run preview          # Preview production build
vercel --prod            # Deploy to Vercel (with Vercel CLI)

# Troubleshooting
npm install              # Reinstall dependencies
rm -rf dist              # Clear build
npm run build            # Rebuild
```

## Folder Structure

```
src/
├── components/          # React components
├── types/              # TypeScript types
├── utils/              # Helper functions
├── api.ts              # API client
├── App.tsx             # Main app
└── main.tsx            # Entry point

server.js               # Express backend
vite.config.ts          # Vite config
```

## Features Available

- ✅ User authentication (email & OAuth)
- ✅ Challenge management
- ✅ Leaderboard & ranking
- ✅ Badge system
- ✅ User profiles
- ✅ Submission tracking
- ✅ Admin dashboard
- ✅ Forum discussions
- ✅ Announcements
- ✅ Certificates

## Troubleshooting

**Port already in use?**
```bash
# Kill port 4000
lsof -ti:4000 | xargs kill -9

# Kill port 5173
lsof -ti:5173 | xargs kill -9
```

**CORS errors?**
- Ensure backend is running
- Check FRONTEND_URL in .env

**Build fails?**
```bash
rm -rf node_modules
npm install
npm run build
```

**OAuth not working?**
- Verify credentials are correct
- Check callback URLs match exactly
- Ensure environment variables are set

## Next Steps

1. ✅ Get app running locally
2. ✅ Test all features
3. ✅ Get OAuth credentials (optional)
4. ✅ Push to GitHub
5. ✅ Deploy to Vercel
6. ✅ Share with users!

## Support

See `README.md` and `DEPLOYMENT.md` for more detailed information.

---

**Happy coding!** 🚀
