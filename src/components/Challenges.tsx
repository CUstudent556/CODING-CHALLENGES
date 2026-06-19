import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Trophy, ChevronRight } from 'lucide-react';
import { MOCK_CHALLENGES } from '../mockData';

export const Challenges: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'scheduled'>('all');

  const filteredChallenges = MOCK_CHALLENGES
    .filter(c => {
      const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                           c.category.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'all' || c.status === filter;
      return matchesSearch && matchesFilter;
    });

  const getStatusStyle = (status: string) => {
    if (status === 'active') return 'bg-emerald-100 text-emerald-700';
    if (status === 'completed') return 'bg-slate-200 text-slate-700';
    return 'bg-blue-100 text-blue-700';
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">All Challenges</h1>
          <p className="text-slate-500 mt-1">Explore weekly problems and improve your skills.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search challenges..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              className="w-full pl-10 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
            />
          </div>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredChallenges.map((challenge) => {
          const isActive = challenge.status === 'active';
          return (
            <div key={challenge.id} className="group bg-white rounded-3xl border border-slate-200 p-6 hover:border-indigo-300 transition-all flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-slate-100 text-slate-600">
                    {challenge.category}
                  </span>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold uppercase tracking-widest rounded-full ${getStatusStyle(challenge.status)}`}>
                  {challenge.status}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{challenge.title}</h3>
              <p className="text-slate-500 line-clamp-3 mt-3 flex-grow">{challenge.description}</p>

              <div className="flex items-center gap-4 mt-6 pt-5 border-t border-slate-100 text-sm">
                <div className="flex items-center gap-2 text-slate-500">
                  <Trophy size={16} className="text-amber-500" /> {challenge.points} pts
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock size={16} /> {new Date(challenge.deadline).toLocaleDateString()}
                </div>
              </div>

              <Link 
                to={`/challenges/${challenge.id}`} 
                className={`mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 font-semibold rounded-2xl transition-all ${isActive ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
              >
                {isActive ? 'Solve Challenge' : 'View Details'} <ChevronRight size={18} />
              </Link>
            </div>
          );
        })}
      </div>

      {filteredChallenges.length === 0 && (
        <div className="text-center py-20 text-slate-400">No challenges match your search.</div>
      )}
    </div>
  );
};
