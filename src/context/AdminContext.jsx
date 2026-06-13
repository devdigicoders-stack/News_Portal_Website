import { createContext, useContext, useState } from 'react';
import { authAPI, usersAPI, newsAPI, categoriesAPI, activitiesAPI } from '../utils/api';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('np_admin');
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('np_admin_token') || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login({ email, password });
      const { token: newToken, user: userData } = response.data;
      
      if (userData.role !== 'admin' && userData.role !== 'editor') {
        throw new Error('Unauthorized: Admin or Editor access required');
      }
      
      setToken(newToken);
      setAdmin(userData);
      localStorage.setItem('np_admin_token', newToken);
      localStorage.setItem('np_admin', JSON.stringify(userData));
      
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
    setAdmin(null);
    setToken(null);
    localStorage.removeItem('np_admin_token');
    localStorage.removeItem('np_admin');
  };

  const updateProfile = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await usersAPI.update(admin._id, data);
      const updated = response.data.user;
      setAdmin(updated);
      localStorage.setItem('np_admin', JSON.stringify(updated));
      return { success: true, data: updated };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Update failed';
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

  const getDashboardStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await usersAPI.getDashboardStats();
      return { success: true, data: response.data };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to load dashboard';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const getUsers = async (params) => {
    setLoading(true);
    setError(null);
    try {
      const response = await usersAPI.getAll(params);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to load users';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await usersAPI.create(data);
      return { success: true, data: response.data.user };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to create user';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await usersAPI.update(id, data);
      return { success: true, data: response.data.user };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to update user';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await usersAPI.delete(id);
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to delete user';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const approveUser = async (id, isApproved) => {
    setLoading(true);
    setError(null);
    try {
      const response = await usersAPI.approve(id, isApproved);
      return { success: true, data: response.data.user };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to update user status';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const getPendingNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await newsAPI.getAll({ status: 'pending' });
      return { success: true, data: response.data };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to load pending news';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const approveNews = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await newsAPI.approve(id, data);
      return { success: true, data: response.data.article };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to approve news';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const rejectNews = async (id, reason) => {
    setLoading(true);
    setError(null);
    try {
      const response = await newsAPI.reject(id, { reason });
      return { success: true, data: response.data.article };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to reject news';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await categoriesAPI.getAll();
      return { success: true, data: response.data };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to load categories';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (category) => {
    setLoading(true);
    setError(null);
    try {
      const response = await categoriesAPI.create({ category });
      return { success: true, data: response.data.categories };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to create category';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (name) => {
    setLoading(true);
    setError(null);
    try {
      const response = await categoriesAPI.delete(name);
      return { success: true, data: response.data.categories };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to delete category';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const getActivities = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await activitiesAPI.getAll();
      return { success: true, data: response.data };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to load activities';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <AdminContext.Provider value={{
      admin,
      token,
      loading,
      error,
      clearError,
      login,
      logout,
      updateProfile,
      changePassword,
      getDashboardStats,
      getUsers,
      createUser,
      updateUser,
      deleteUser,
      approveUser,
      getPendingNews,
      approveNews,
      rejectNews,
      getCategories,
      createCategory,
      deleteCategory,
      getActivities,
      isAuthenticated: !!token && !!admin
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
