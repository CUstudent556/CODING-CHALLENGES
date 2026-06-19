const API_BASE = '/api';
const STORAGE_KEY = 'weekly-code-user';

function getStoredUserId() {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return undefined;
  try {
    return JSON.parse(raw)?.id as string | undefined;
  } catch {
    return undefined;
  }
}

export function getCurrentUser() {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function request(endpoint: string, options: { method?: string; body?: any; userId?: string } = {}) {
  const headers: Record<string, string> = {};
  if (options.body) {
    headers['Content-Type'] = 'application/json';
  }
  const userId = options.userId ?? getStoredUserId();
  if (userId) {
    headers['x-user-id'] = userId;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: options.method ?? 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message || response.statusText || 'API request failed');
  }

  return data;
}

export async function login(email: string, password: string) {
  return request('/auth/login', { method: 'POST', body: { email, password } });
}

export async function signup(username: string, email: string, university: string, password: string) {
  return request('/auth/signup', { method: 'POST', body: { username, email, university, password } });
}

export async function loginWithProvider(provider: 'google' | 'github') {
  return request(`/auth/oauth/${provider}`, { method: 'POST' });
}

export async function fetchChallenges() {
  return request('/challenges');
}

export async function fetchChallengeById(id: string) {
  return request(`/challenges/${id}`);
}

export async function createChallenge(challenge: any, userId: string) {
  return request('/challenges', { method: 'POST', body: challenge, userId });
}

export async function updateChallenge(id: string, updates: any, userId: string) {
  return request(`/challenges/${id}`, { method: 'PATCH', body: updates, userId });
}

export async function deleteChallenge(id: string, userId: string) {
  return request(`/challenges/${id}`, { method: 'DELETE', userId });
}

export async function fetchSubmissions(userId?: string) {
  const query = userId ? `?userId=${encodeURIComponent(userId)}` : '';
  return request(`/submissions${query}`);
}

export async function createSubmission(data: any, userId: string) {
  return request('/submissions', { method: 'POST', body: data, userId });
}

export async function updateSubmissionStatus(submissionId: string, status: string, userId: string) {
  return request(`/submissions/${submissionId}`, { method: 'PATCH', body: { status }, userId });
}

export async function fetchUsers(userId: string) {
  return request('/users', { userId });
}

export async function fetchUserProgress(userId: string, targetUserId?: string) {
  return request(`/users/${targetUserId ?? userId}/progress`, { userId });
}
