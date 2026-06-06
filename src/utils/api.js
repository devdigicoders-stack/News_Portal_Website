import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('np_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('np_token');
      localStorage.removeItem('np_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/me'),
  changePassword: (data) => api.post('/auth/change-password', data),
};

// News APIs
export const newsAPI = {
  getAll: (params) => api.get('/news', { params }),
  getById: (id) => api.get(`/news/${id}`),
  create: (data) => api.post('/news', data),
  update: (id, data) => api.put(`/news/${id}`, data),
  approve: (id, data) => api.put(`/news/${id}/approve`, data),
  reject: (id, data) => api.put(`/news/${id}/reject`, data),
  schedule: (id, data) => api.put(`/news/${id}/schedule`, data),
  delete: (id) => api.delete(`/news/${id}`),
  addComment: (id, data) => api.post(`/news/${id}/comments`, data),
  deleteComment: (id, commentId) => api.delete(`/news/${id}/comments/${commentId}`),
  getAllComments: () => api.get('/news/comments/all'),
  like: (id) => api.post(`/news/${id}/like`),
  save: (id) => api.post(`/news/${id}/save`),
  reporterDashboard: () => api.get('/news/reporter/dashboard'),
  reporterArticles: (params) => api.get('/news/reporter/articles', { params }),
  editorHistory: () => api.get('/news/editor/history'),
};

// Users APIs
export const usersAPI = {
  getAll: (params) => api.get('/users', { params }),
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.put(`/users/${id}`, data),
  updateRole: (id, role) => api.put(`/users/${id}/role`, { role }),
  approve: (id, isApproved) => api.put(`/users/${id}/approve`, { isApproved }),
  delete: (id) => api.delete(`/users/${id}`),
  getDashboardStats: () => api.get('/users/dashboard-stats'),
};

// Categories APIs
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  create: (data) => api.post('/categories', data),
  delete: (name) => api.delete(`/categories/${name}`),
};

// Activities APIs
export const activitiesAPI = {
  getAll: () => api.get('/activities'),
};

export default api;
