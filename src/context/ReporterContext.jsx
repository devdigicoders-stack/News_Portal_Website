import { createContext, useContext, useState } from 'react';
import { authAPI, newsAPI } from '../utils/api';

const ReporterContext = createContext();

export function ReporterProvider({ children }) {
  const [reporter, setReporter] = useState(() => {
    const saved = localStorage.getItem('np_reporter');
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('np_reporter_token') || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login({ email, password });
      const { token: newToken, user: userData } = response.data;
      
      if (userData.role !== 'reporter') {
        throw new Error('Unauthorized: Reporter access required');
      }
      
      setToken(newToken);
      setReporter(userData);
      localStorage.setItem('np_reporter_token', newToken);
      localStorage.setItem('np_reporter', JSON.stringify(userData));
      
      return { success: true, data: userData };
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || 'Login failed';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setReporter(null);
    setToken(null);
    localStorage.removeItem('np_reporter_token');
    localStorage.removeItem('np_reporter');
  };

  const getDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await newsAPI.reporterDashboard();
      return { success: true, data: response.data };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to load dashboard';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const getArticles = async (status) => {
    setLoading(true);
    setError(null);
    try {
      const response = await newsAPI.reporterArticles({ status });
      return { success: true, data: response.data };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to load articles';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const createArticle = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await newsAPI.create(data);
      return { success: true, data: response.data.article };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to create article';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const updateArticle = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await newsAPI.update(id, data);
      return { success: true, data: response.data.article };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to update article';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    setLoading(true);
    setError(null);
    try {
      await authAPI.changePassword({ oldPassword, newPassword });
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Password change failed';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <ReporterContext.Provider value={{
      reporter,
      token,
      loading,
      error,
      clearError,
      login,
      logout,
      getDashboard,
      getArticles,
      createArticle,
      updateArticle,
      changePassword,
      isAuthenticated: !!token && !!reporter
    }}>
      {children}
    </ReporterContext.Provider>
  );
}

export const useReporter = () => useContext(ReporterContext);
