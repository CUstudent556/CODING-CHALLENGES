# Vercel Deployment Guide

Complete step-by-step guide to deploy your Coding Challenges application to Vercel.

## Pre-Deployment Checklist

- [ ] All files committed to GitHub
- [ ] No `.env` file in repository (only `.env.example`)
- [ ] package.json properly configured
- [ ] vercel.json configured
- [ ] All dependencies installed locally
- [ ] Local testing completed
- [ ] No console errors in browser
- [ ] Backend and frontend communication working

## Deployment Steps

### 1. GitHub Setup

Ensure your code is on GitHub:

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Production-ready coding challenges app"

# Add remote (if not already added)
git remote add origin https://github.com/YOUR_USERNAME/CODING-CHALLENGES.git

# Push to main branch
git push -u origin main
```

### 2. Vercel Deployment

#### Method A: Vercel Dashboard (Recommended for beginners)

1. **Go to Vercel.com**
   - Sign in or create account
   - Link your GitHub account

2. **Import Project**
   - Click "New Project" or "Import Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project**
   - **Root Directory**: `.` (default)
   - **Framework**: Vite (should auto-detect)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add the following variables for **Production**:

```
FRONTEND_URL = https://your-app-name.vercel.app
NODE_ENV = production
GOOGLE_CLIENT_ID = your_google_client_id
GOOGLE_CLIENT_SECRET = your_google_client_secret
GITHUB_CLIENT_ID = your_github_client_id
GITHUB_CLIENT_SECRET = your_github_client_secret
```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (2-5 minutes)
   - You'll get a deployment URL

#### Method B: Vercel CLI (For advanced users)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to your Vercel account
vercel login

# Deploy to production
vercel --prod

# Follow prompts to configure
```

### 3. Get OAuth Credentials

#### Google OAuth Setup

1. **Go to Google Cloud Console**
   - URL: https://console.cloud.google.com
   - Create a new project named "Coding Challenges"

2. **Enable APIs**
   - Search for "Google+ API"
   - Click "Enable"

3. **Create OAuth Credentials**
   - Go to "Credentials" in left menu
   - Click "Create Credentials" → "OAuth client ID"
   - Choose "Web application"
   - Set authorized origins:
     - `https://your-domain.vercel.app`
     - `http://localhost:3000` (for local testing)
   - Set authorized redirect URIs:
     - `https://your-domain.vercel.app/api/auth/oauth/google/callback`
     - `http://localhost:4000/api/auth/oauth/google/callback` (for local testing)
   - Copy Client ID and Secret

4. **Add to Vercel**
   - Go to your Vercel project settings
   - Environment Variables
   - Add:
     - `GOOGLE_CLIENT_ID` = (your client ID)
     - `GOOGLE_CLIENT_SECRET` = (your secret)

#### GitHub OAuth Setup

1. **Go to GitHub Settings**
   - URL: https://github.com/settings/developers
   - Click "New OAuth App"

2. **Configure App**
   - Application name: "Coding Challenges"
   - Homepage URL: `https://your-domain.vercel.app`
   - Authorization callback URL: `https://your-domain.vercel.app/api/auth/oauth/github/callback`
   - Click "Create OAuth App"

3. **Get Credentials**
   - Copy Client ID
   - Click "Generate a new client secret" and copy it

4. **Add to Vercel**
   - Go to your Vercel project settings
   - Environment Variables
   - Add:
     - `GITHUB_CLIENT_ID` = (your client ID)
     - `GITHUB_CLIENT_SECRET` = (your secret)

5. **Redeploy**
   - After adding environment variables, click "Deployments"
   - Click the latest deployment
   - Click "Redeploy"

### 4. Post-Deployment Testing

After deployment, test these features:

**Basic Functionality**
- [ ] Visit your deployed app
- [ ] Page loads without errors
- [ ] All components render correctly

**Authentication**
- [ ] Login with test account (alex@university.edu / password)
- [ ] Logout works
- [ ] Session persists after page refresh

**OAuth (if credentials configured)**
- [ ] Google login button appears
- [ ] GitHub login button appears
- [ ] OAuth login redirects correctly
- [ ] User data loads after OAuth

**Application Features**
- [ ] View challenges
- [ ] View leaderboard
- [ ] Access dashboard
- [ ] Submit challenge (creates submission)
- [ ] Admin panel accessible (if admin user)

**Error Handling**
- [ ] Network errors handled gracefully
- [ ] Invalid credentials show error message
- [ ] Missing environment variables show helpful errors

### 5. Troubleshooting Deployment

**Issue: Build Fails**

```
Solution:
1. Check build command: npm run build
2. Verify no TypeScript errors: npx tsc --noEmit
3. Check Vercel logs for specific errors
4. Delete node_modules and reinstall: npm install
```

**Issue: CORS Errors**

```
Solution:
1. Verify FRONTEND_URL environment variable is set
2. Check that it matches your Vercel domain exactly
3. Redeploy after changing environment variables
4. Check server.js CORS configuration
```

**Issue: OAuth Not Working**

```
Solution:
1. Verify GOOGLE_CLIENT_ID and GITHUB_CLIENT_ID are set
2. Check redirect URIs in OAuth app settings match exactly
3. Ensure callback URLs include https:// (not http://)
4. Check Vercel deployment logs for OAuth errors
5. Test in browser DevTools network tab
```

**Issue: 404 Errors on Routes**

```
Solution:
1. Check vercel.json has correct rewrites
2. Ensure vite.config.ts is correct
3. Verify output directory is 'dist'
4. Clear Vercel cache and redeploy
```

**Issue: API Requests Failing**

```
Solution:
1. Check backend is serving on correct port (4000)
2. Verify API_BASE in src/api.ts matches deployment
3. Check CORS headers in server.js
4. Test API directly: curl https://your-domain.vercel.app/api/challenges
```

### 6. Monitoring & Logs

**View Deployment Logs**
- Go to your Vercel dashboard
- Click on your project
- Click "Deployments"
- Click on a deployment to see build logs
- Click "Runtime Logs" to see production errors

**Monitor Performance**
- Vercel provides analytics automatically
- Check page load times
- Monitor API response times
- Check error rate

### 7. Updating Your App

When you make changes and push to GitHub:

1. Vercel automatically detects changes
2. Builds and deploys automatically
3. You can view deployment progress in Vercel dashboard
4. After deployment completes, check your live site

**Manual Redeployment**
- Go to Vercel dashboard
- Click "Deployments"
- Find the deployment you want
- Click "Redeploy"

### 8. Performance Optimization

After deployment, optimize performance:

1. **Enable Caching**
   - Vercel caches automatically
   - Configure in vercel.json if needed

2. **Monitor Bundle Size**
   - Check Vercel dashboard for bundle analysis
   - Use Lighthouse for performance audits

3. **Content Delivery**
   - Vercel uses global CDN
   - Your app is automatically distributed worldwide

### 9. Security Checklist

- [ ] No `.env` file in GitHub
- [ ] Environment variables secure in Vercel
- [ ] OAuth secrets not exposed
- [ ] HTTPS enforced (Vercel does this automatically)
- [ ] CORS properly configured
- [ ] Admin endpoints protected
- [ ] User passwords never returned

### 10. Custom Domain Setup (Optional)

If you want a custom domain:

1. **In Vercel Dashboard**
   - Go to project settings
   - Click "Domains"
   - Add your domain
   - Add DNS records (Vercel provides instructions)

2. **Update OAuth Providers**
   - Google: Add custom domain to authorized origins
   - GitHub: Update callback URL to custom domain

3. **Update Environment Variables**
   - Change FRONTEND_URL to your custom domain

### 11. Rollback Plan

If something goes wrong:

1. **Go to Vercel Dashboard**
2. **Click Deployments**
3. **Find the last working deployment**
4. **Click the three dots menu**
5. **Select "Promote to Production"**

Or revert code on GitHub:

```bash
git revert <commit-hash>
git push origin main
```

### 12. Support Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Vercel Community**: https://vercel.com/support
- **GitHub Issues**: Open an issue in your repo
- **Error Codes**: Check Vercel logs for detailed error information

## Success! 🎉

Your application is now live! Share your deployment URL with users.

**Your app URL**: `https://your-app-name.vercel.app`

---

For production applications, consider:
- Setting up error monitoring (Sentry)
- Database integration (MongoDB Atlas)
- Email service (SendGrid)
- Analytics (Google Analytics, Mixpanel)
