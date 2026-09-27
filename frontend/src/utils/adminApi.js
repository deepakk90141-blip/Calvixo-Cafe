import axios from 'axios';
import { getAdminToken } from './adminAuth';

const API_BASE = `${import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'}/api/admin`;

export const adminApi = axios.create({
  baseURL: API_BASE,
});

adminApi.interceptors.request.use((config) => {
  const token = getAdminToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
