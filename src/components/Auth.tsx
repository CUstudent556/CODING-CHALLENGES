import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, GitBranch, Globe } from 'lucide-react';
import { login, signup, loginWithProvider } from '../api';

interface AuthProps {
  onLogin: (user: any) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    university: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const user = isLogin
        ? await login(formData.email, formData.password)
        : await signup(formData.username, formData.email, formData.university, formData.password);

      onLogin(user);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to authenticate.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-indigo-600 text-white rounded-2xl mb-4">
            <CodeIcon size={32} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">
            {isLogin ? 'Welcome Back' : 'Join the Challenge'}
          </h2>
          <p className="text-slate-500 mt-2">
            {isLogin ? 'Enter your credentials to access your account' : 'Start your coding journey today'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="University Email"
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  required
                />
              </div>
            </>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 disabled:opacity-70"
            disabled={isSubmitting}
          >
            {isSubmitting ? (isLogin ? 'Signing In...' : 'Creating Account...') : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        {error && (
          <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="mt-6">
          <div className="relative flex items-center py-3">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-slate-400 text-sm">Or continue with</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <button
              type="button"
              onClick={() => {
                // Redirect to backend OAuth endpoint which will redirect to Google
                window.location.href = 'http://localhost:4000/api/auth/oauth/google';
              }}
              className="flex items-center justify-center gap-2 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium text-slate-700"
            >
              <Globe size={20} />
              Google
            </button>
            <button
              type="button"
              onClick={() => {
                // Redirect to backend OAuth endpoint which will redirect to GitHub
                window.location.href = 'http://localhost:4000/api/auth/oauth/github';
              }}
              className="flex items-center justify-center gap-2 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium text-slate-700"
            >
              <GitBranch size={20} />
              GitHub
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-slate-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-indigo-600 font-semibold hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

const CodeIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);
