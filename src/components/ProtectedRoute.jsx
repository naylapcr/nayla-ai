import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const userStr = localStorage.getItem('luneve_user');
  let user = null;
  if (userStr && userStr !== 'null' && userStr !== 'undefined' && userStr !== '{}') {
    try { user = JSON.parse(userStr); } catch (e) {}
  }

  // Jika tidak ada data user yang valid di localStorage, lempar ke halaman login
  if (!user || (!user.id && !user.email)) {
    return <Navigate to="/login" replace />;
  }

  // Jika user bukan admin, lempar ke halaman member
  if (user.role !== 'admin') {
    return <Navigate to="/member" replace />;
  }

  return children;
}