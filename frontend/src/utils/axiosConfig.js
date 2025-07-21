import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api';

const instance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

// ✅ Automatically attach Bearer token from localStorage
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ✅ Remove default Content-Type if FormData (let browser handle it)
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  error => {
    console.error("❌ Axios request error:", error);
    return Promise.reject(error);
  }
);

// ✅ Global error handler for authentication & permission issues
instance.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;

    if (status === 401) {
      const isAuthRoute = ['/login', '/register'].some(path =>
        window.location.pathname.startsWith(path)
      );

      if (!isAuthRoute) {
        console.warn('⛔ Unauthorized — redirecting to /login...');
        localStorage.removeItem('authToken'); // Optional: clear token
        window.location.href = '/login';
      }
    }

    if (status === 403) {
      console.error('🚫 Forbidden — you do not have access to this resource.');
    }

    return Promise.reject(error);
  }
);

export default instance;
