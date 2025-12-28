import axios from 'axios';

// API URL Configuration:
// - Production: Uses REACT_APP_API_URL environment variable
// - Docker: Uses /api (nginx proxies to backend)
// - Local dev: Uses localhost:8080
const getBaseURL = () => {
  // Check for environment variable first (production)
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  // Docker setup (port 3000 with nginx proxy)
  if (window.location.hostname === 'localhost' && window.location.port === '3000') {
    return '/api';
  }
  // Local development
  return 'http://localhost:8080/api';
};

const API = axios.create({
  baseURL: getBaseURL()
});

// Add token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);

// Task APIs
export const getTasks = () => API.get('/tasks');
export const getTasksPaginated = (page = 0, size = 10) => API.get(`/tasks/paginated?page=${page}&size=${size}`);
export const createTask = (data) => API.post('/tasks', data);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

export default API;
