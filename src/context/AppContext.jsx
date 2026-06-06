import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, newsAPI } from '../utils/api';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('np_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('np_token') || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [savedNews, setSavedNews] = useState(() => {
    const saved = localStorage.getItem('np_saved');
    return saved ? JSON.parse(saved) : [];
  });

  const [likedNews, setLikedNews] = useState(() => {
    const saved = localStorage.getItem('np_liked');
    return saved ? JSON.parse(saved) : [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('np_dark');
    if (saved) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('np_lang');
    return saved ? saved : 'hi';
  });

  // Update dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('np_dark', darkMode.toString());
  }, [darkMode]);

  // Update language
  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('np_lang', language);
  }, [language]);

  // Verify token on mount
  useEffect(() => {
    if (token && !user) {
      verifyToken();
    }
  }, []);

  const verifyToken = async () => {
    try {
      const response = await authAPI.getProfile();
      setUser(response.data);
      localStorage.setItem('np_user', JSON.stringify(response.data));
    } catch (err) {
      logout();
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.register({ name, email, password });
      const { token: newToken, user: userData } = response.data;
      
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('np_token', newToken);
      localStorage.setItem('np_user', JSON.stringify(userData));
      
      return { success: true, data: userData };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Registration failed';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login({ email, password });
      const { token: newToken, user: userData } = response.data;
      
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('np_token', newToken);
      localStorage.setItem('np_user', JSON.stringify(userData));
      
      return { success: true, data: userData };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Login failed';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setSavedNews([]);
    setLikedNews([]);
    localStorage.removeItem('np_token');
    localStorage.removeItem('np_user');
    localStorage.removeItem('np_saved');
    localStorage.removeItem('np_liked');
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

  const toggleSave = async (newsId) => {
    if (!user) {
      setError('Please login to save news');
      return;
    }

    try {
      await newsAPI.save(newsId);
      setSavedNews((prev) => {
        const updated = prev.includes(newsId) 
          ? prev.filter((id) => id !== newsId) 
          : [...prev, newsId];
        localStorage.setItem('np_saved', JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save news');
    }
  };

  const toggleLike = async (newsId) => {
    if (!user) {
      setError('Please login to like news');
      return;
    }

    try {
      await newsAPI.like(newsId);
      setLikedNews((prev) => {
        const updated = prev.includes(newsId) 
          ? prev.filter((id) => id !== newsId) 
          : [...prev, newsId];
        localStorage.setItem('np_liked', JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to like news');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'hi' ? 'en' : 'hi');
  };

  const clearError = () => setError(null);

  return (
    <AppContext.Provider value={{ 
      user, 
      token,
      loading,
      error,
      clearError,
      register,
      login, 
      logout,
      changePassword,
      savedNews, 
      toggleSave, 
      likedNews, 
      toggleLike,
      darkMode,
      toggleDarkMode,
      language,
      setLanguage,
      toggleLanguage,
      isAuthenticated: !!token && !!user
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
