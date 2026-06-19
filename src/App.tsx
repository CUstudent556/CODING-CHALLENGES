import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { Challenges } from './components/Challenges';
import { ChallengeDetail } from './components/Challenge';
import { Leaderboard } from './components/Leaderboard';
import { Forum } from './components/Forum';
import { Announcements } from './components/Announcements';
import { History } from './components/History';
import { Profile } from './components/Profile';
import { Admin } from './components/Admin';
import { Certificate } from './components/Certificate';
import { User } from './types';

const STORAGE_KEY = 'weekly-code-user';

// If OAuth redirected back with a base64-encoded user payload, decode and persist it
const oauthUserFromUrl = (() => {
  try {
    const params = new URLSearchParams(window.location.search);
    const payload = params.get('oauth_user');
    if (!payload) return null;
    const decoded = JSON.parse(atob(payload));
    // persist user so initial state picks it up
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(decoded));
    // remove the oauth_user param from URL
    const url = new URL(window.location.href);
    url.searchParams.delete('oauth_user');
    window.history.replaceState({}, '', url.toString());
    return decoded as User;
  } catch (err) {
    return null;
  }
})();

export default function App() {
  const [user, setUser] = useState<User | null>(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    try {
      return saved ? JSON.parse(saved) : oauthUserFromUrl;
    } catch {
      return oauthUserFromUrl || null;
    }
  });

  const handleLogin = (userData: User) => {
    const userWithBadges = {
      ...userData,
      badges: userData.badges || ['first-blood', 'consistency'],
    };
    setUser(userWithBadges);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(userWithBadges));
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={!user ? <Auth onLogin={handleLogin} /> : <Navigate to="/" />} 
        />
        
        <Route 
          path="/*" 
          element={
            user ? (
              <Layout user={user} onLogout={handleLogout}>
                <Routes>
                  <Route index element={<Dashboard />} />
                  <Route path="challenges" element={<Challenges />} />
                  <Route path="challenges/:id" element={<ChallengeDetail />} />
                  <Route path="leaderboard" element={<Leaderboard />} />
                  <Route path="forum" element={<Forum />} />
                  <Route path="announcements" element={<Announcements />} />
                  <Route path="history" element={<History />} />
                  <Route path="profile" element={<Profile user={user} />} />
                  <Route path="admin" element={user.role === 'admin' ? <Admin user={user} /> : <Navigate to="/" />} />
                  <Route path="certificate" element={
                    <Certificate 
                      userName={user.username} 
                      challengeName="Optimal Path Finder" 
                      date={new Date().toLocaleDateString()} 
                      rank="Gold" 
                    />
                  } />
                  <Route path="*" element={<Dashboard />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
      </Routes>
    </Router>
  );
}
