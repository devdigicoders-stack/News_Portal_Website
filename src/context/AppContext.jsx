import { createContext, useContext, useState } from 'react';

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

  return (
    <AppContext.Provider value={{ user, login, logout, savedNews, toggleSave, likedNews, toggleLike }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
