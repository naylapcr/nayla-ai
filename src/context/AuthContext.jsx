import React, { createContext, useState, useEffect } from 'react';
import { authAPI } from '../services/authAPI';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cek local storage saat aplikasi dimuat
    const savedUser = localStorage.getItem('luneve_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const users = await authAPI.login(email, password);
    if (users && users.length > 0) {
      setUser(users[0]);
      localStorage.setItem('luneve_user', JSON.stringify(users[0]));
      return true;
    }
    return false;
  };

  const register = async (newUser) => {
    await authAPI.register(newUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('luneve_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};