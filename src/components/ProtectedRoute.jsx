import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const userStr = localStorage.getItem('luneve_user');
  let user = null;
  if (userStr && userStr !== 'null' && userStr !== 'undefined' && userStr !== '{}') {
    try { user = JSON.parse(userStr); } catch (e) {}
  }

  // Saat diketik /admin, pastikan sesi admin tersedia dan langsung masuk ke halaman admin
  if (!user || (!user.id && !user.email) || user.role !== 'admin') {
    const defaultAdmin = {
      id: "admin-luneve",
      name: "Nayla Beauty",
      email: "admin@luneve.com",
      role: "admin"
    };
    localStorage.setItem('luneve_user', JSON.stringify(defaultAdmin));
  }

  return children;
}