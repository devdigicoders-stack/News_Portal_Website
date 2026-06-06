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
  const clearError = () => setError(null);
  const [articles, setArticles] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);

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

  // Fetch articles on mount
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setNewsLoading(true);
    try {
      const res = await newsAPI.getAll({ status: 'approved' });
      setArticles(res.data || []);
    } catch (err) {
      console.error('Failed to fetch articles:', err);
    } finally {
      setNewsLoading(false);
    }
  };

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
      if (response.data.savedNews) {
        setSavedNews(response.data.savedNews);
        localStorage.setItem('np_saved', JSON.stringify(response.data.savedNews));
      }
      if (response.data.likedNews) {
        setLikedNews(response.data.likedNews);
        localStorage.setItem('np_liked', JSON.stringify(response.data.likedNews));
      }
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
      if (userData.savedNews) {
        setSavedNews(userData.savedNews);
        localStorage.setItem('np_saved', JSON.stringify(userData.savedNews));
      }
      if (userData.likedNews) {
        setLikedNews(userData.likedNews);
        localStorage.setItem('np_liked', JSON.stringify(userData.likedNews));
      }
      
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
      if (userData.savedNews) {
        setSavedNews(userData.savedNews);
        localStorage.setItem('np_saved', JSON.stringify(userData.savedNews));
      }
      if (userData.likedNews) {
        setLikedNews(userData.likedNews);
        localStorage.setItem('np_liked', JSON.stringify(userData.likedNews));
      }
      
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
      const res = await newsAPI.like(newsId);
      setLikedNews((prev) => {
        const updated = prev.includes(newsId) 
          ? prev.filter((id) => id !== newsId) 
          : [...prev, newsId];
        localStorage.setItem('np_liked', JSON.stringify(updated));
        return updated;
      });
      if (res.data && res.data.likes !== undefined) {
        setArticles(prev => prev.map(art => art.id === newsId ? { ...art, likes: res.data.likes } : art));
      }
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

  const resolveMediaURL = (path) => {
    if (!path) return 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800';
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    return `${backendUrl}${path.startsWith('/') ? '' : '/'}${path}`;
  };

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
      isAuthenticated: !!token && !!user,
      articles,
      newsLoading,
      fetchArticles,
      resolveMediaURL
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
