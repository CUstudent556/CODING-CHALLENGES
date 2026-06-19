import React from 'react';
import { Trophy, Medal, Flame } from 'lucide-react';
import { MOCK_USERS } from '../mockData';

export const Leaderboard: React.FC = () => {
  const sortedUsers = [...MOCK_USERS].sort((a, b) => b.points - a.points);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex p-4 bg-indigo-100 text-indigo-600 rounded-full mb-2">
          <Trophy size={40} />
        </div>
        <h1 className="text-4xl font-bold text-slate-900">Hall of Fame</h1>
        <p className="text-slate-500 max-w-xl mx-auto">
          Celebrating the best coding talents. Keep solving challenges to climb the ranks!
        </p>
      </div>

      {/* Top 3 Podiums */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-end">
        {/* Second Place */}
        <div className="order-2 md:order-1 flex flex-col items-center p-6 bg-white rounded-3xl border-2 border-slate-100 shadow-sm hover:border-slate-200 transition-all group">
          <div className="relative">
            <img src={sortedUsers[1]?.avatar} alt="User" className="w-20 h-20 rounded-full border-4 border-slate-200 mb-4 group-hover:scale-105 transition-transform" />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-200 text-slate-600 px-2 py-1 rounded-md text-xs font-bold">
              #2
            </div>
          </div>
          <h3 className="font-bold text-slate-900 text-lg">{sortedUsers[1]?.username}</h3>
          <p className="text-slate-500 text-sm mb-4">{sortedUsers[1]?.university}</p>
          <div className="text-2xl font-black text-indigo-600">{sortedUsers[1]?.points} pts</div>
        </div>

        {/* First Place */}
        <div className="order-1 md:order-2 flex flex-col items-center p-8 bg-white rounded-3xl border-4 border-indigo-500 shadow-xl hover:shadow-indigo-100 transition-all group relative">
          <div className="absolute -top-6 bg-indigo-500 text-white p-2 rounded-full shadow-lg">
            <Medal size={24} />
          </div>
          <div className="relative">
            <img src={sortedUsers[0]?.avatar} alt="User" className="w-28 h-28 rounded-full border-4 border-indigo-100 mb-4 group-hover:scale-110 transition-transform" />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-3 py-1 rounded-md text-sm font-bold">
              #1
            </div>
          </div>
          <h3 className="font-bold text-slate-900 text-xl">{sortedUsers[0]?.username}</h3>
          <p className="text-slate-500 text-sm mb-4">{sortedUsers[0]?.university}</p>
          <div className="text-3xl font-black text-indigo-600">{sortedUsers[0]?.points} pts</div>
        </div>

        {/* Third Place */}
        <div className="order-3 md:order-3 flex flex-col items-center p-6 bg-white rounded-3xl border-2 border-slate-100 shadow-sm hover:border-slate-200 transition-all group">
          <div className="relative">
            <img src={sortedUsers[2]?.avatar} alt="User" className="w-20 h-20 rounded-full border-4 border-slate-200 mb-4 group-hover:scale-105 transition-transform" />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-200 text-slate-600 px-2 py-1 rounded-md text-xs font-bold">
              #3
            </div>
          </div>
          <h3 className="font-bold text-slate-900 text-lg">{sortedUsers[2]?.username}</h3>
          <p className="text-slate-500 text-sm mb-4">{sortedUsers[2]?.university}</p>
          <div className="text-2xl font-black text-indigo-600">{sortedUsers[2]?.points} pts</div>
        </div>
      </div>

      {/* All Users Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">University</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Points</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Streak</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedUsers.map((user, index) => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <span className={`
                    flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold
                    ${index === 0 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}
                  `}>
                    {index + 1}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.username} className="w-8 h-8 rounded-full" />
                    <span className="font-semibold text-slate-900">{user.username}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-500 text-sm">{user.university}</td>
                <td className="px-6 py-4 font-bold text-indigo-600">{user.points}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-orange-500 font-medium">
                    <Flame size={14} />
                    {user.streak}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
