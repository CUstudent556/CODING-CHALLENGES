# Coding Challenges - Full Stack Application

A modern web application for managing and tracking coding challenges, submissions, and user progress with leaderboard and badge system.

## Features

- 🔐 **Authentication**: Email/password and OAuth (Google, GitHub)
- 📝 **Challenge Management**: Create, update, and track coding challenges
- 📊 **Leaderboard**: Real-time ranking system with points
- 🏆 **Badge System**: Unlock achievements and badges
- 👤 **User Profiles**: Track progress, submissions, and statistics
- 💬 **Forum**: Discussion and Q&A system
- 📜 **Certificates**: Generate certificates for achievements
- 👨‍💼 **Admin Panel**: Manage challenges, users, and submissions

## Tech Stack

**Frontend:**
- React 19.2.6
- TypeScript
- Tailwind CSS 4.1.17
- Vite
- React Router DOM
- Framer Motion
- Lucide Icons

**Backend:**
- Express.js
- Node.js
- CORS enabled
- OAuth integration (Google, GitHub)

## Prerequisites

- Node.js 18.x or 20.x
- npm or yarn
- Git

## Local Development

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd CODING-CHALLENGES
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
PORT=4000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development

# OAuth Configuration (optional for local development)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### 3. Run Development Servers

**Terminal 1 - Backend:**
```bash
npm run server
# Backend runs on http://localhost:4000
```

**Terminal 2 - Frontend:**
```bash
npm run dev
# Frontend runs on http://localhost:5173
```

The Vite dev server automatically proxies `/api` requests to the backend.

### 4. Test the Application

- Open http://localhost:5173
- Login with test credentials:
  - Email: `alex@university.edu`
  - Password: `password`

Or:
  - Email: `admin@weeklycode.com`
  - Password: `adminpass`

## Deployment to Vercel

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Fix: Complete production-ready application"
git push origin main
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Configure environment variables:
   - `FRONTEND_URL`: Your Vercel domain (will be filled automatically)
   - `GOOGLE_CLIENT_ID`: Your Google OAuth credentials
   - `GOOGLE_CLIENT_SECRET`: Your Google OAuth credentials
   - `GITHUB_CLIENT_ID`: Your GitHub OAuth credentials
   - `GITHUB_CLIENT_SECRET`: Your GitHub OAuth credentials
   - `NODE_ENV`: `production`

5. Click "Deploy"

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Step 3: Configure OAuth Providers

#### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable OAuth 2.0
4. Create credentials:
   - Application type: Web application
   - Authorized JavaScript origins: `https://your-domain.vercel.app`
   - Authorized redirect URIs: `https://your-domain.vercel.app/api/auth/oauth/google/callback`
5. Copy Client ID and Secret to Vercel environment variables

#### GitHub OAuth Setup

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create a new OAuth App
3. Set:
   - Authorization callback URL: `https://your-domain.vercel.app/api/auth/oauth/github/callback`
4. Copy Client ID and Secret to Vercel environment variables

### Step 4: Verify Deployment

1. Visit your Vercel deployment URL
2. Test login functionality
3. Test OAuth login
4. Create and submit challenges
5. Check leaderboard and badges

## Project Structure

```
CODING-CHALLENGES/
├── src/
│   ├── components/        # React components
│   ├── types/            # TypeScript interfaces
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main app component
│   ├── api.ts            # API client
│   ├── main.tsx          # React entry point
│   └── index.css         # Global styles
├── server.js             # Express backend
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Dependencies
├── vercel.json           # Vercel configuration
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/signup` - Create new account
- `GET /api/auth/oauth/google` - Google OAuth login
- `GET /api/auth/oauth/google/callback` - Google OAuth callback
- `GET /api/auth/oauth/github` - GitHub OAuth login
- `GET /api/auth/oauth/github/callback` - GitHub OAuth callback

### Users
- `GET /api/users/me` - Get current user
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id/progress` - Get user progress

### Challenges
- `GET /api/challenges` - Get all challenges
- `GET /api/challenges/:id` - Get specific challenge
- `POST /api/challenges` - Create challenge (admin only)
- `PATCH /api/challenges/:id` - Update challenge (admin only)
- `DELETE /api/challenges/:id` - Delete challenge (admin only)

### Submissions
- `GET /api/submissions` - Get submissions
- `POST /api/submissions` - Submit solution
- `PATCH /api/submissions/:id` - Update submission status (admin only)

### Badges
- `GET /api/badges` - Get badge definitions
- `GET /api/badges/:userId` - Get user badges

## Troubleshooting

### CORS Errors
- Ensure `FRONTEND_URL` is correctly set
- Check that the backend is running
- Verify API_BASE URL in `src/api.ts`

### OAuth Not Working
- Verify environment variables are set in Vercel
- Check OAuth app credentials are correct
- Ensure callback URLs match exactly

### Build Errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Delete .next/dist folders
- Ensure Node version is 18.x or 20.x

### Localhost Issues
- Kill port 4000: `lsof -ti:4000 | xargs kill -9` (Mac/Linux)
- Kill port 5173: `lsof -ti:5173 | xargs kill -9` (Mac/Linux)
- Restart dev servers

## Database

Currently uses in-memory storage. For production with persistent data:

1. MongoDB
```bash
npm install mongoose
# Configure MongoDB URL in .env
```

2. PostgreSQL
```bash
npm install pg sequelize
# Configure database URL in .env
```

3. Firebase
```bash
npm install firebase
# Configure Firebase credentials
```

## Performance Optimization

- ✅ Vite for fast builds
- ✅ Tree-shaking enabled
- ✅ CSS minification
- ✅ Code splitting for routes
- ✅ Lazy loading components

## Security

- ✅ Environment variables not exposed
- ✅ CORS properly configured
- ✅ Password not returned in API
- ✅ Admin-only endpoints protected
- ✅ OAuth integration secured

## Contributing

1. Create a feature branch
2. Commit changes
3. Push to GitHub
4. Create a pull request

## License

MIT License - feel free to use this project

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review GitHub issues
3. Create a new issue with details

## Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Email notifications
- [ ] Real-time chat
- [ ] Code execution engine
- [ ] Mobile app
- [ ] Advanced analytics
- [ ] Team collaboration features

---

**Deployed and ready to use!** 🚀
