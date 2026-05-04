import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 1. Import komponen Error secara langsung (JANGAN pakai lazy lagi untuk ini)
import { BadRequest, Unauthorized, Forbidden } from './pages/Errors';

// 2. Import komponen lain tetap pakai lazy (biar kenceng)
const Dashboard = lazy(() => import('./pages/AdminDashboard'));
const Products = lazy(() => import('./pages/Products'));
const Orders = lazy(() => import('./pages/Orders'));
const Reviews = lazy(() => import('./pages/Reviews'));
const Settings = lazy(() => import('./pages/Settings'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

// Import Layouts
import MainLayout from './layouts/MainLayout';
// Jika kamu tidak punya AuthLayout, hapus saja dan bungkus Login/Register dengan div biasa
const AuthLayout = ({ children }) => <div className="min-h-screen bg-[#fffafb] flex items-center justify-center">{children}</div>;

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="flex h-screen items-center justify-center font-sans text-[#f8b4b4] italic animate-pulse">Loading Luneve...</div>}>
        <Routes>
          {/* Halaman Tanpa Sidebar */}
          <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
          <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />

          {/* Halaman Utama Dengan Sidebar */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="settings" element={<Settings />} />
            
            {/* Rute Error - Sekarang pasti jalan! */}
            <Route path="400" element={<BadRequest />} />
            <Route path="401" element={<Unauthorized />} />
            <Route path="403" element={<Forbidden />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;