import axios from 'axios';
import { API_BASE_URL } from '@env';
import { store } from '../store';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to every request automatically
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

// Log every response
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(
      `📡 [${response.config.method?.toUpperCase()}] ${response.config.url}`,
      JSON.stringify(response.data, null, 2)
    );
    return response;
  },
  (error) => {
    console.log(
      `❌ [${error.config?.method?.toUpperCase()}] ${error.config?.url}`,
      error.message
    );
    return Promise.reject(error);
  }
);

export default axiosInstance;
