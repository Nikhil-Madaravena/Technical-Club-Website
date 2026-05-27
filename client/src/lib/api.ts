// Centralized API client for the Technical Club backend
let API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
if (!API_BASE.endsWith('/api')) {
  API_BASE = API_BASE.endsWith('/') ? `${API_BASE}api` : `${API_BASE}/api`;
}

const getToken = () => localStorage.getItem('tc_admin_token');

const headers = (extra: Record<string, string> = {}) => ({
  'Content-Type': 'application/json',
  ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
  ...extra,
});

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const isFormData = options.body instanceof FormData;
  
  const reqHeaders: Record<string, string> = { ...headers(), ...(options.headers as Record<string, string> || {}) };
  if (isFormData) {
    delete reqHeaders['Content-Type'];
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: reqHeaders,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'API Error');
  return data;
}

// Auth
export const api = {
  auth: {
    login: (email: string, password: string) =>
      request<{ success: boolean; token: string; user: any }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    me: () => request<{ success: boolean; user: any }>('/auth/me'),
  },

  events: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return request<{ success: boolean; data: any[]; total: number }>(`/events${q}`);
    },
    getUpcoming: () => request<{ success: boolean; data: any[] }>('/events/upcoming'),
    getSumshodini: () => request<{ success: boolean; data: any[] }>('/events/sumshodini'),
    getById: (id: string) => request<{ success: boolean; data: any }>(`/events/${id}`),
    create: (formData: FormData) =>
      fetch(`${API_BASE}/events`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData,
      }).then(r => r.json()),
    update: (id: string, formData: FormData) =>
      fetch(`${API_BASE}/events/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData,
      }).then(r => r.json()),
    delete: (id: string) => request(`/events/${id}`, { method: 'DELETE' }),
  },

  gallery: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return request<{ success: boolean; data: any[]; total: number }>(`/gallery${q}`);
    },
    getAlbums: () => request<{ success: boolean; data: any[] }>('/gallery/albums'),
    upload: (formData: FormData) =>
      fetch(`${API_BASE}/gallery`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData,
      }).then(r => r.json()),
    update: (id: string, data: any) =>
      request(`/gallery/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request(`/gallery/${id}`, { method: 'DELETE' }),
    updateAlbum: (oldName: string, newName: string, year?: number) =>
      request('/gallery/albums/update', { method: 'PUT', body: JSON.stringify({ oldName, newName, year }) }),
    deleteAlbum: (name: string) => request(`/gallery/albums/${name}`, { method: 'DELETE' }),
  },

  team: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return request<{ success: boolean; data: any[] }>(`/team${q}`);
    },
    create: (formData: FormData) =>
      fetch(`${API_BASE}/team`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData,
      }).then(r => r.json()),
    update: (id: string, formData: FormData) =>
      fetch(`${API_BASE}/team/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData,
      }).then(r => r.json()),
    delete: (id: string) => request(`/team/${id}`, { method: 'DELETE' }),
  },

  contact: {
    submit: (data: any | FormData) =>
      request('/contact', { method: 'POST', body: data instanceof FormData ? data : JSON.stringify(data) }),
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return request<{ success: boolean; data: any[] }>(`/contact${q}`);
    },
    update: (id: string, data: any) =>
      request(`/contact/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (id: string) => request(`/contact/${id}`, { method: 'DELETE' }),
  },

  stats: {
    getDashboard: () => request<{ success: boolean; data: any }>('/stats'),
    getPublic: () => request<{ success: boolean; data: any }>('/stats/public'),
  },

  documents: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return request<{ success: boolean; data: any[] }>(`/documents${q}`);
    },
    create: (formData: FormData) =>
      fetch(`${API_BASE}/documents`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData,
      }).then(r => r.json()),
    delete: (id: string) => request(`/documents/${id}`, { method: 'DELETE' }),
  },
};
