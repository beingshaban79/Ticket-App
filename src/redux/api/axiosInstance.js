import axios from 'axios';
import { store } from '../store';

const BASE_URL = 'https://conductor.arizolve.com';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach token to every request automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — log every response for debugging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`📡 [${response.config.method?.toUpperCase()}] ${response.config.url}`, JSON.stringify(response.data, null, 2));
    return response;
  },
  (error) => {
    console.log(`❌ [${error.config?.method?.toUpperCase()}] ${error.config?.url}`, error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
