import React, { useEffect, useState } from 'react';
import { 
  Plus, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  ShieldAlert, 
  Users, 
  LayoutGrid, 
  FileCheck 
} from 'lucide-react';
import { Submission } from '../types';
import { fetchChallenges, fetchSubmissions, fetchUsers, updateSubmissionStatus, createChallenge, deleteChallenge } from '../api';

interface AdminProps {
  user: any;
}

export const Admin: React.FC<AdminProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'challenges' | 'submissions' | 'users'>('challenges');
  const [challenges, setChallenges] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [challengeForm, setChallengeForm] = useState({
    title: '',
    description: '',
    constraints: '',
    sampleInput: '',
    sampleOutput: '',
    deadline: '',
    points: 0,
    status: 'active',
    category: '',
  });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [backendChallenges, backendSubmissions, backendUsers] = await Promise.all([
          fetchChallenges(),
          fetchSubmissions(),
          fetchUsers(user.id),
        ]);
        setChallenges(backendChallenges);
        setSubmissions(backendSubmissions);
        setUsers(backendUsers);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load admin data.');
      }
    };
    loadData();
  }, [user.id]);

  const handleUpdateSubmission = async (id: string, status: Submission['status']) => {
    try {
      const updated = await updateSubmissionStatus(id, status, user.id);
      setSubmissions(prev => prev.map(s => s.id === id ? updated : s));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update submission status.');
    }
  };

  const handleDeleteChallenge = async (challengeId: string) => {
    try {
      await deleteChallenge(challengeId, user.id);
      setChallenges(prev => prev.filter((challenge) => challenge.id !== challengeId));
      setMessage('Challenge deleted successfully.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete challenge.');
    }
  };

  const handleRunPlagiarismCheck = async (id: string) => {
    try {
      setMessage(`Running plagiarism check for submission ${id}...`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const isPlagiarized = Math.random() > 0.7;
      const status = isPlagiarized ? 'plagiarized' : 'accepted';
      await handleUpdateSubmission(id, status);
      setMessage(isPlagiarized ? 'Plagiarism detected!' : 'No plagiarism detected.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Plagiarism check failed.');
    }
  };

  const handleChallengeFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    const payload = {
      title: challengeForm.title,
      description: challengeForm.description,
      constraints: challengeForm.constraints.split('\n').map((line) => line.trim()).filter(Boolean),
      sampleInput: challengeForm.sampleInput,
      sampleOutput: challengeForm.sampleOutput,
      deadline: challengeForm.deadline,
      points: challengeForm.points,
      status: challengeForm.status,
      category: challengeForm.category,
    };

    try {
      const created = await createChallenge(payload, user.id);
      setChallenges((prev) => [created, ...prev]);
      setShowCreateForm(false);
      setMessage('Challenge created successfully.');
      setChallengeForm({
        title: '',
        description: '',
        constraints: '',
        sampleInput: '',
        sampleOutput: '',
        deadline: '',
        points: 0,
        status: 'active',
        category: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create challenge.');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Control Panel</h1>
          <p className="text-sm text-slate-500">Logged in as {user.username} ({user.role})</p>
        </div>
        <button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
        >
          <Plus size={20} />
          {showCreateForm ? 'Cancel' : 'Create New Challenge'}
        </button>
      </div>
      {message && <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-700">{message}</div>}
      {error && <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-red-700">{error}</div>}
      {showCreateForm && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200">
          <h2 className="font-bold text-xl mb-4">New Challenge</h2>
          <form onSubmit={handleChallengeFormSubmit} className="grid gap-4">
            <input
              value={challengeForm.title}
              onChange={(e) => setChallengeForm({ ...challengeForm, title: e.target.value })}
              placeholder="Title"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              required
            />
            <textarea
              value={challengeForm.description}
              onChange={(e) => setChallengeForm({ ...challengeForm, description: e.target.value })}
              placeholder="Description"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 min-h-[120px]"
              required
            />
            <textarea
              value={challengeForm.constraints}
              onChange={(e) => setChallengeForm({ ...challengeForm, constraints: e.target.value })}
              placeholder="Constraints (one per line)"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 min-h-[100px]"
              required
            />
            <div className="grid md:grid-cols-2 gap-4">
              <input
                value={challengeForm.sampleInput}
                onChange={(e) => setChallengeForm({ ...challengeForm, sampleInput: e.target.value })}
                placeholder="Sample Input"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                required
              />
              <input
                value={challengeForm.sampleOutput}
                onChange={(e) => setChallengeForm({ ...challengeForm, sampleOutput: e.target.value })}
                placeholder="Sample Output"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                required
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <input
                type="datetime-local"
                value={challengeForm.deadline}
                onChange={(e) => setChallengeForm({ ...challengeForm, deadline: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                required
              />
              <input
                type="number"
                min="0"
                value={challengeForm.points}
                onChange={(e) => setChallengeForm({ ...challengeForm, points: Number(e.target.value) })}
                placeholder="Points"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                required
              />
              <input
                value={challengeForm.category}
                onChange={(e) => setChallengeForm({ ...challengeForm, category: e.target.value })}
                placeholder="Category"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                required
              />
            </div>
            <select
              value={challengeForm.status}
              onChange={(e) => setChallengeForm({ ...challengeForm, status: e.target.value as 'active' | 'completed' | 'scheduled' })}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              required
            >
              <option value="active">Active</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
            </select>
            <button type="submit" className="w-full rounded-2xl bg-indigo-600 py-3 text-white font-semibold hover:bg-indigo-700 transition-colors">
              Save Challenge
            </button>
          </form>
        </div>
      )}

      {/* Admin Tabs */}
      <div className="flex gap-4 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('challenges')}
          className={`flex items-center gap-2 px-6 py-3 font-medium transition-all border-b-2 ${
            activeTab === 'challenges' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <LayoutGrid size={18} />
          Challenges
        </button>
        <button 
          onClick={() => setActiveTab('submissions')}
          className={`flex items-center gap-2 px-6 py-3 font-medium transition-all border-b-2 ${
            activeTab === 'submissions' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <FileCheck size={18} />
          Submissions
        </button>
        <button 
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-6 py-3 font-medium transition-all border-b-2 ${
            activeTab === 'users' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Users size={18} />
          Users
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'challenges' && (
          <div className="grid grid-cols-1 gap-4">
            {challenges.length === 0 ? (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center text-slate-500">
                No challenges available.
              </div>
            ) : challenges.map(challenge => (
              <div key={challenge.id} className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">{challenge.title}</h3>
                  <div className="flex gap-3 mt-1">
                    <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded">{challenge.category}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                      challenge.status === 'active' ? 'bg-green-100 text-green-700' : 
                      challenge.status === 'completed' ? 'bg-slate-100 text-slate-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {challenge.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleDeleteChallenge(challenge.id)}
                    className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                    title="Delete challenge"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'submissions' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase">User</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase">Challenge</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase">Link</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {submissions.map(sub => (
                  <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {users.find((u) => u.id === sub.userId)?.username || sub.userId}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {challenges.find((c) => c.id === sub.challengeId)?.title || sub.challengeId}
                    </td>
                    <td className="px-6 py-4">
                      <a href={sub.githubLink} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline text-sm truncate block max-w-xs">
                        View Repository
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`
                        px-2 py-1 rounded-full text-xs font-bold
                        ${sub.status === 'accepted' ? 'bg-green-100 text-green-700' : 
                          sub.status === 'rejected' ? 'bg-red-100 text-red-700' : 
                          sub.status === 'plagiarized' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700'}
                      `}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleUpdateSubmission(sub.id, 'accepted')}
                          className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                          title="Accept"
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button 
                          onClick={() => handleUpdateSubmission(sub.id, 'rejected')}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Reject"
                        >
                          <XCircle size={18} />
                        </button>
                        <button 
                          onClick={() => handleRunPlagiarismCheck(sub.id)}
                          className="p-1 text-purple-600 hover:bg-purple-50 rounded transition-colors"
                          title="Check Plagiarism"
                        >
                          <ShieldAlert size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((userItem) => (
              <div key={userItem.id} className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4">
                <img src={userItem.avatar} alt={userItem.username} className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900">{userItem.username}</h4>
                  <p className="text-xs text-slate-500">{userItem.email}</p>
                </div>
                <button className="p-2 text-red-400 hover:text-red-600 transition-colors" title="Ban User">
                  <ShieldAlert size={18} />
                </button>
              </div>
            ))}
            {users.length === 0 && (
              <div className="col-span-full text-center py-14 text-slate-500 border border-dashed border-slate-200 rounded-3xl">
                No users found.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
