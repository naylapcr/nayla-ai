import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('luneve_user'));

  // Jika tidak ada data user di localStorage, lempar ke halaman login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}