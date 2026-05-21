import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('np_user');
    return saved ? JSON.parse(saved) : null;
  });

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
    // Fallback to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('np_lang');
    return saved ? saved : 'hi';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('np_dark', darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('np_lang', language);
  }, [language]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('np_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('np_user');
  };

  const toggleSave = (newsId) => {
    setSavedNews((prev) => {
      const updated = prev.includes(newsId) ? prev.filter((id) => id !== newsId) : [...prev, newsId];
      localStorage.setItem('np_saved', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleLike = (newsId) => {
    setLikedNews((prev) => {
      const updated = prev.includes(newsId) ? prev.filter((id) => id !== newsId) : [...prev, newsId];
      localStorage.setItem('np_liked', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'hi' ? 'en' : 'hi');
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      login, 
      logout, 
      savedNews, 
      toggleSave, 
      likedNews, 
      toggleLike,
      darkMode,
      toggleDarkMode,
      language,
      setLanguage,
      toggleLanguage
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);

