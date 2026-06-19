import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Trophy, 
  Flame, 
  TrendingUp 
} from 'lucide-react';
import { MOCK_CHALLENGES } from '../mockData';

export const Dashboard: React.FC = () => {
  const activeChallenge = MOCK_CHALLENGES.find(c => c.status === 'active');
  const completedChallenges = MOCK_CHALLENGES.filter(c => c.status === 'completed');
  
  return (
    <div className="space-y-8">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
            <Flame size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Current Streak</p>
            <p className="text-2xl font-bold text-slate-900">5 Days</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
            <Trophy size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Points</p>
            <p className="text-2xl font-bold text-slate-900">1,250 pts</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-xl">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Global Rank</p>
            <p className="text-2xl font-bold text-slate-900">#42</p>
          </div>
        </div>
      </div>

      {/* Active Challenge Card */}
      {activeChallenge && (
        <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-indigo-100 mb-4">
              <Clock size={18} />
              <span className="text-sm font-medium uppercase tracking-wider">Active Challenge</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">{activeChallenge.title}</h2>
            <p className="text-indigo-100 text-lg max-w-2xl mb-8">
              {activeChallenge.description}
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/50 rounded-full text-sm">
                <Trophy size={16} />
                <span>{activeChallenge.points} Points</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/50 rounded-full text-sm">
                <Calendar size={16} />
                <span>Deadline: {new Date(activeChallenge.deadline).toLocaleDateString()}</span>
              </div>
              <Link 
                to={`/challenges/${activeChallenge.id}`}
                className="ml-auto flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors"
              >
                Solve Now
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-indigo-400 rounded-full opacity-30 blur-2xl"></div>
        </div>
      )}

      {/* Previous Challenges */}
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-6">Your Activity</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {completedChallenges.map((challenge) => (
            <div key={challenge.id} className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center justify-between hover:border-indigo-300 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{challenge.title}</h4>
                  <p className="text-sm text-slate-500">{challenge.category} • Completed</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-slate-900">+{challenge.points}</p>
                <p className="text-xs text-slate-400">Points earned</p>
              </div>
            </div>
          ))}
          {completedChallenges.length === 0 && (
            <div className="col-span-2 text-center py-12 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 text-slate-500">
              No completed challenges yet. Start your first one!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
