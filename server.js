import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).json({ message: 'Internal server error. Please try again later.' });
});

// Badge system definitions
const badgeDefinitions = {
  'first-blood': {
    name: 'First Blood',
    description: 'Complete your first challenge',
    icon: '🩸',
    color: 'red',
    requirement: { type: 'submission', count: 1 },
    points: 0,
  },
  'starter': {
    name: 'Starter',
    description: 'Earn 100 points',
    icon: '🚀',
    color: 'blue',
    requirement: { type: 'points', value: 100 },
    points: 100,
  },
  'rising-star': {
    name: 'Rising Star',
    description: 'Earn 500 points',
    icon: '⭐',
    color: 'yellow',
    requirement: { type: 'points', value: 500 },
    points: 500,
  },
  'master-coder': {
    name: 'Master Coder',
    description: 'Earn 1000 points',
    icon: '👑',
    color: 'purple',
    requirement: { type: 'points', value: 1000 },
    points: 1000,
  },
  'legendary': {
    name: 'Legendary',
    description: 'Earn 2000 points',
    icon: '🔥',
    color: 'orange',
    requirement: { type: 'points', value: 2000 },
    points: 2000,
  },
  'consistency': {
    name: 'Consistency',
    description: 'Maintain a 3+ day streak',
    icon: '📈',
    color: 'green',
    requirement: { type: 'streak', value: 3 },
    points: 0,
  },
  'unstoppable': {
    name: 'Unstoppable',
    description: 'Maintain a 7+ day streak',
    icon: '💪',
    color: 'green',
    requirement: { type: 'streak', value: 7 },
    points: 0,
  },
  'polyglot': {
    name: 'Polyglot',
    description: 'Solve challenges in 3 different languages',
    icon: '🗣️',
    color: 'cyan',
    requirement: { type: 'languages', count: 3 },
    points: 0,
  },
  'speed-demon': {
    name: 'Speed Demon',
    description: 'Complete 10 challenges',
    icon: '⚡',
    color: 'lime',
    requirement: { type: 'challenges', count: 10 },
    points: 0,
  },
  'bug-hunter': {
    name: 'Bug Hunter',
    description: 'Complete 5 challenges successfully',
    icon: '🐛',
    color: 'brown',
    requirement: { type: 'accepted', count: 5 },
    points: 0,
  },
  'perfect-score': {
    name: 'Perfect Score',
    description: 'Score 100+ points in one challenge',
    icon: '💯',
    color: 'gold',
    requirement: { type: 'perfect', value: 100 },
    points: 0,
  },
  'connected-social': {
    name: 'Connected',
    description: 'Sign in with Google or GitHub',
    icon: '🔗',
    color: 'indigo',
    requirement: { type: 'oauth', provider: 'any' },
    points: 0,
  },
};

const users = [
  {
    id: 'u1',
    username: 'AlexCode',
    email: 'alex@university.edu',
    university: 'Tech University',
    points: 1250,
    streak: 5,
    role: 'student',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    badges: ['first-blood', 'starter', 'rising-star', 'master-coder', 'consistency', 'polyglot', 'bug-hunter', 'perfect-score'],
    password: 'password',
  },
  {
    id: 'u2',
    username: 'SarahDev',
    email: 'sarah@university.edu',
    university: 'State College',
    points: 1100,
    streak: 3,
    role: 'student',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    badges: ['first-blood', 'starter', 'rising-star', 'master-coder', 'consistency', 'bug-hunter'],
    password: 'password',
  },
  {
    id: 'u3',
    username: 'Admin',
    email: 'admin@weeklycode.com',
    university: 'Global Academy',
    points: 0,
    streak: 0,
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    badges: [],
    password: 'adminpass',
  },
];

const challenges = [
  {
    id: 'c1',
    title: 'Optimal Path Finder',
    description: 'Find the shortest path between two nodes in a weighted graph with constraints on the maximum number of edges used.',
    constraints: [
      'Number of nodes N <= 10^5',
      'Number of edges M <= 2*10^5',
      'Weights are positive integers',
    ],
    sampleInput: '4 4\n1 2 10\n2 3 5\n1 3 20\n3 4 2\n1 4',
    sampleOutput: '17',
    deadline: '2026-12-31T23:59:59Z',
    points: 100,
    status: 'active',
    category: 'Graphs',
  },
  {
    id: 'c2',
    title: 'String Compression Pro',
    description: 'Implement a custom compression algorithm that reduces space by 30% while maintaining O(n) time complexity for decompression.',
    constraints: [
      'String length up to 10^6 characters',
      'Charset: ASCII',
    ],
    sampleInput: 'aaabbccccd',
    sampleOutput: 'a3b2c4d1',
    deadline: '2026-12-20T23:59:59Z',
    points: 50,
    status: 'completed',
    category: 'Strings',
  },
  {
    id: 'c3',
    title: 'Quantum Sorting',
    description: 'Sort a list of floating point numbers with extreme precision using a modified mergesort approach.',
    constraints: [
      'Precision up to 15 decimal places',
      'List size up to 10^5',
    ],
    sampleInput: '3.14, 1.59, 2.65, 0.58',
    sampleOutput: '0.58, 1.59, 2.65, 3.14',
    deadline: '2027-01-05T23:59:59Z',
    points: 150,
    status: 'scheduled',
    category: 'Sorting',
  },
];

const submissions = [
  {
    id: 's1',
    challengeId: 'c1',
    userId: 'u1',
    githubLink: 'https://github.com/AlexCode/optimal-path',
    submittedAt: '2026-12-25T10:00:00Z',
    status: 'accepted',
    score: 100,
    remarks: 'Perfect implementation of Dijkstra.',
    language: 'Python',
  },
  {
    id: 's2',
    challengeId: 'c1',
    userId: 'u2',
    githubLink: 'https://github.com/SarahDev/path-finder',
    submittedAt: '2026-12-25T11:00:00Z',
    status: 'pending',
    score: 0,
    remarks: '',
    language: 'C++',
  },
  {
    id: 's3',
    challengeId: 'c2',
    userId: 'u1',
    githubLink: 'https://github.com/AlexCode/string-compress',
    submittedAt: '2026-12-18T15:00:00Z',
    status: 'accepted',
    score: 50,
    remarks: 'Efficient approach.',
    language: 'Java',
  },
];

function generateId(prefix = 'id') {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}_${Date.now()}`;
}

function sanitizeUser(user) {
  const { password, ...rest } = user;
  return rest;
}

function getUserFromHeader(req) {
  const userId = req.header('x-user-id');
  return users.find((user) => user.id === userId);
}

function requireAdmin(req, res, next) {
  const user = getUserFromHeader(req);
  if (!user) {
    return res.status(401).json({ message: 'Authentication required.' });
  }
  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required.' });
  }
  req.user = user;
  next();
}

// Badge checking function
function checkAndAwardBadges(user) {
  const userSubmissions = submissions.filter((s) => s.userId === user.id);
  const acceptedSubmissions = userSubmissions.filter((s) => s.status === 'accepted');
  const uniqueLanguages = new Set(userSubmissions.map((s) => s.language));
  const uniqueChallenges = new Set(userSubmissions.map((s) => s.challengeId));
  const maxSingleScore = Math.max(...userSubmissions.map((s) => s.score || 0), 0);

  const newBadges = [];

  // Check each badge condition
  Object.entries(badgeDefinitions).forEach(([badgeId, badge]) => {
    if (user.badges.includes(badgeId)) return; // Already have this badge

    let shouldAward = false;

    switch (badge.requirement.type) {
      case 'points':
        shouldAward = user.points >= badge.requirement.value;
        break;
      case 'submission':
        shouldAward = userSubmissions.length >= badge.requirement.count;
        break;
      case 'accepted':
        shouldAward = acceptedSubmissions.length >= badge.requirement.count;
        break;
      case 'challenges':
        shouldAward = uniqueChallenges.size >= badge.requirement.count;
        break;
      case 'streak':
        shouldAward = user.streak >= badge.requirement.value;
        break;
      case 'languages':
        shouldAward = uniqueLanguages.size >= badge.requirement.count;
        break;
      case 'perfect':
        shouldAward = maxSingleScore >= badge.requirement.value;
        break;
      case 'oauth':
        shouldAward = user.provider && user.provider !== 'local';
        break;
      default:
        break;
    }

    if (shouldAward) {
      newBadges.push(badgeId);
    }
  });

  // Award new badges
  if (newBadges.length > 0) {
    user.badges.push(...newBadges);
  }

  return newBadges;
}

app.get('/api/ping', (req, res) => {
  res.json({ uptime: process.uptime(), message: 'pong' });
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    res.json(sanitizeUser(user));
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed. Please try again.' });
  }
});

app.post('/api/auth/signup', (req, res) => {
  try {
    const { username, email, university, password } = req.body;
    if (!username || !email || !university || !password) {
      return res.status(400).json({ message: 'Username, email, university, and password are required.' });
    }
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return res.status(409).json({ message: 'Email already exists.' });
    }

    const newUser = {
      id: generateId('u'),
      username,
      email: email.toLowerCase(),
      university,
      points: 0,
      streak: 0,
      role: 'student',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(username)}`,
      badges: [],
      password,
      provider: 'local',
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    res.status(201).json(sanitizeUser(newUser));
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Signup failed. Please try again.' });
  }
});

app.post('/api/auth/oauth/:provider', (req, res) => {
  try {
    const provider = req.params.provider.toLowerCase();
    if (!['google', 'github'].includes(provider)) {
      return res.status(400).json({ message: 'Unsupported OAuth provider.' });
    }

    // Legacy demo endpoint (keeps backward compatibility for dev/testing)
    const providerUser = {
      google: {
        username: 'GoogleCoder',
        email: 'google-user@weeklycode.com',
        university: 'Google University',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GoogleCoder',
      },
      github: {
        username: 'GitHubCoder',
        email: 'github-user@weeklycode.com',
        university: 'GitHub University',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GitHubCoder',
      },
    }[provider];

    let user = users.find((u) => u.email.toLowerCase() === providerUser.email.toLowerCase());
    if (!user) {
      user = {
        id: generateId('u'),
        username: providerUser.username,
        email: providerUser.email,
        university: providerUser.university,
        points: 0,
        streak: 0,
        role: 'student',
        avatar: providerUser.avatar,
        badges: ['connected-social'],
        password: '',
        provider,
        createdAt: new Date().toISOString(),
      };
      users.push(user);
    }

    res.json(sanitizeUser(user));
  } catch (error) {
    console.error('OAuth login error:', error);
    res.status(500).json({ message: 'OAuth login failed. Please try again.' });
  }
});

// Production-style OAuth redirect endpoints (require provider credentials in .env)
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

app.get('/api/auth/oauth/google', (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = `${req.protocol}://${req.get('host')}/api/auth/oauth/google/callback`;
  if (!clientId) return res.status(500).send('Google client id not configured');
  const scope = encodeURIComponent('openid email profile');
  const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&access_type=offline&prompt=consent`;
  res.redirect(url);
});

app.get('/api/auth/oauth/google/callback', async (req, res) => {
  try {
    const code = String(req.query.code || '');
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${req.protocol}://${req.get('host')}/api/auth/oauth/google/callback`;
    if (!code) return res.status(400).send('Missing code');
    const tokenResp = await axios.post('https://oauth2.googleapis.com/token', new URLSearchParams({
      code,
      client_id: clientId || '',
      client_secret: clientSecret || '',
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }).toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    const accessToken = tokenResp.data.access_token;
    const userInfo = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const profile = userInfo.data;
    let user = users.find((u) => u.email.toLowerCase() === profile.email.toLowerCase());
    if (!user) {
      user = {
        id: generateId('u'),
        username: profile.name || profile.email.split('@')[0],
        email: profile.email,
        university: '',
        points: 0,
        streak: 0,
        role: 'student',
        avatar: profile.picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(profile.email)}`,
        badges: ['connected-social'],
        password: '',
        provider: 'google',
        createdAt: new Date().toISOString(),
      };
      users.push(user);
    }

    // Redirect to frontend with user data encoded in fragment
    const payload = Buffer.from(JSON.stringify(sanitizeUser(user))).toString('base64');
    res.redirect(`${FRONTEND_URL}/?oauth_user=${payload}`);
  } catch (err) {
    console.error('Google OAuth callback error:', err?.toString?.() || err);
    res.status(500).send('Google OAuth failed');
  }
});

app.get('/api/auth/oauth/github', (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = `${req.protocol}://${req.get('host')}/api/auth/oauth/github/callback`;
  if (!clientId) return res.status(500).send('GitHub client id not configured');
  const scope = encodeURIComponent('read:user user:email');
  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
  res.redirect(url);
});

app.get('/api/auth/oauth/github/callback', async (req, res) => {
  try {
    const code = String(req.query.code || '');
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    if (!code) return res.status(400).send('Missing code');
    const tokenResp = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }, { headers: { Accept: 'application/json' } });
    const accessToken = tokenResp.data.access_token;
    const userResp = await axios.get('https://api.github.com/user', { headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' } });
    const emailsResp = await axios.get('https://api.github.com/user/emails', { headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' } });
    const primaryEmail = (emailsResp.data || []).find((e) => e.primary === true)?.email || userResp.data.email || '';
    const profile = userResp.data;
    let user = users.find((u) => u.email.toLowerCase() === primaryEmail.toLowerCase());
    if (!user) {
      user = {
        id: generateId('u'),
        username: profile.login || primaryEmail.split('@')[0],
        email: primaryEmail,
        university: '',
        points: 0,
        streak: 0,
        role: 'student',
        avatar: profile.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(primaryEmail)}`,
        badges: ['connected-social'],
        password: '',
        provider: 'github',
        createdAt: new Date().toISOString(),
      };
      users.push(user);
    }

    const payload = Buffer.from(JSON.stringify(sanitizeUser(user))).toString('base64');
    res.redirect(`${FRONTEND_URL}/?oauth_user=${payload}`);
  } catch (err) {
    console.error('GitHub OAuth callback error:', err?.toString?.() || err);
    res.status(500).send('GitHub OAuth failed');
  }
});

app.get('/api/users/me', (req, res) => {
  const user = getUserFromHeader(req);
  if (!user) {
    return res.status(401).json({ message: 'Authentication required.' });
  }
  res.json(sanitizeUser(user));
});

app.get('/api/users', requireAdmin, (req, res) => {
  res.json(users.map(sanitizeUser));
});

app.get('/api/users/:id/progress', (req, res) => {
  const targetUser = users.find((u) => u.id === req.params.id);
  if (!targetUser) {
    return res.status(404).json({ message: 'User not found.' });
  }
  const userSubmissions = submissions.filter((submission) => submission.userId === targetUser.id);
  const acceptedCount = userSubmissions.filter((s) => s.status === 'accepted').length;
  const totalScore = userSubmissions.reduce((sum, submission) => sum + submission.score, 0);
  const attemptedChallenges = [...new Set(userSubmissions.map((s) => s.challengeId))].length;

  res.json({
    user: sanitizeUser(targetUser),
    progress: {
      submissions: userSubmissions,
      acceptedCount,
      totalScore,
      attemptedChallenges,
      points: targetUser.points,
      streak: targetUser.streak,
    },
  });
});

app.get('/api/challenges', (req, res) => {
  res.json(challenges);
});

app.get('/api/challenges/:id', (req, res) => {
  const challenge = challenges.find((c) => c.id === req.params.id);
  if (!challenge) {
    return res.status(404).json({ message: 'Challenge not found.' });
  }
  res.json(challenge);
});

app.post('/api/challenges', requireAdmin, (req, res) => {
  const { title, description, constraints, sampleInput, sampleOutput, deadline, points, status, category } = req.body;
  if (!title || !description || !Array.isArray(constraints) || !deadline || !points || !status || !category) {
    return res.status(400).json({ message: 'All challenge fields are required.' });
  }

  const newChallenge = {
    id: generateId('c'),
    title,
    description,
    constraints,
    sampleInput,
    sampleOutput,
    deadline,
    points,
    status,
    category,
  };
  challenges.push(newChallenge);
  res.status(201).json(newChallenge);
});

app.patch('/api/challenges/:id', requireAdmin, (req, res) => {
  const challenge = challenges.find((c) => c.id === req.params.id);
  if (!challenge) {
    return res.status(404).json({ message: 'Challenge not found.' });
  }
  Object.assign(challenge, req.body);
  res.json(challenge);
});

app.delete('/api/challenges/:id', requireAdmin, (req, res) => {
  const index = challenges.findIndex((c) => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Challenge not found.' });
  }
  challenges.splice(index, 1);
  res.status(204).send();
});

app.get('/api/submissions', (req, res) => {
  const userId = req.query.userId;
  if (userId) {
    return res.json(submissions.filter((submission) => submission.userId === userId));
  }
  res.json(submissions);
});

app.post('/api/submissions', (req, res) => {
  const user = getUserFromHeader(req);
  if (!user) {
    return res.status(401).json({ message: 'Authentication required.' });
  }
  const { challengeId, githubLink, language } = req.body;
  if (!challengeId || !githubLink || !language) {
    return res.status(400).json({ message: 'challengeId, githubLink and language are required.' });
  }
  const challenge = challenges.find((c) => c.id === challengeId);
  if (!challenge) {
    return res.status(404).json({ message: 'Challenge not found.' });
  }

  const newSubmission = {
    id: generateId('s'),
    challengeId,
    userId: user.id,
    githubLink,
    submittedAt: new Date().toISOString(),
    status: 'pending',
    score: 0,
    remarks: '',
    language,
  };
  submissions.push(newSubmission);
  res.status(201).json(newSubmission);
});

app.patch('/api/submissions/:id', requireAdmin, (req, res) => {
  const submission = submissions.find((s) => s.id === req.params.id);
  if (!submission) {
    return res.status(404).json({ message: 'Submission not found.' });
  }

  const wasAccepted = submission.status === 'accepted';
  const newStatus = req.body.status;
  const newScore = req.body.score || submission.score;

  // Update submission
  Object.assign(submission, req.body);

  // Award points if newly accepted
  if (!wasAccepted && newStatus === 'accepted') {
    const user = users.find((u) => u.id === submission.userId);
    if (user) {
      user.points += newScore;
      // Check and award badges
      const newBadges = checkAndAwardBadges(user);
      if (newBadges.length > 0) {
        console.log(`User ${user.username} earned badges:`, newBadges.join(', '));
      }
    }
  }

  res.json(submission);
});

app.get('/api/badges', (req, res) => {
  // Return badge definitions with localization support
  res.json(
    Object.entries(badgeDefinitions).map(([id, badge]) => ({
      id,
      ...badge,
    }))
  );
});

app.get('/api/badges/:userId', (req, res) => {
  const user = users.find((u) => u.id === req.params.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  const userBadges = user.badges.map((badgeId) => ({
    id: badgeId,
    ...badgeDefinitions[badgeId],
    unlockedAt: new Date().toISOString(), // In production, track unlock date
  }));

  res.json(userBadges);
});

app.listen(PORT, () => {
  console.log(`Backend API is running on http://localhost:${PORT}`);
});
