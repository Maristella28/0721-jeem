import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';

// Axios global setup
axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.withCredentials = false;

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Clear invalid token
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

// Create Context
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const normalizeUser = (userData) => {
    if (!userData) return null;

    return {
      ...userData,
      profile: userData.profile ? {
        ...userData.profile,
        avatar: userData.profile?.avatar || '',
      } : null,
      has_profile: !!userData.profile
    };
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get('/user');
      const userData = res.data?.user || res.data;
      const normalized = normalizeUser(userData);
      setUser(normalized);
      console.log('[AuthContext] User fetched:', normalized);
    } catch (err) {
      console.error('[AuthContext] Not authenticated:', err?.response?.data || err.message);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const res = await axios.get('/profile'); // ✅ use /profile to get updated avatar
      
      // Handle case where user doesn't have a profile yet
      if (res.data?.has_profile === false) {
        console.log('[AuthContext] User has no profile yet');
        // Keep the existing user data but mark that there's no profile
        setUser({
          ...user,
          profile: null,
          has_profile: false
        });
        return;
      }

      const profileData = res.data?.user?.profile || res.data;

      const refreshed = normalizeUser({
        ...user, // retain existing user data (name/email)
        profile: profileData,
        has_profile: true
      });

      setUser(refreshed);
      console.log('[AuthContext] User refreshed (from /api/profile):', refreshed);
    } catch (err) {
      console.error('[AuthContext] Failed to refresh user:', err?.response?.data || err.message);
      // Don't clear the user on profile fetch failure, just log the error
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post('/login', { email, password });
      const token = res.data.token || res.data.access_token;
      if (!token) throw new Error('No token returned from API');
      
      localStorage.setItem('authToken', token);
      
      // Store user data in localStorage for immediate access
      if (res.data.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }
      
      await fetchUser();
    } catch (err) {
      console.error('[Login failed]', err?.response?.data || err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await axios.post('/logout');
    } catch (err) {
      console.error('[Logout failed]', err?.response?.data || err.message);
    } finally {
      localStorage.removeItem('authToken');
      setUser(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        login,
        logout,
        fetchUser,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
