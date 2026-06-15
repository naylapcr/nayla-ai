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
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const GuestDashboard = lazy(() => import("./pages/GuestDashboard"));
const ManagementHub = lazy(() => import('./pages/ManagementHub'));
const CustomerManagement = lazy(() => import('./pages/CustomerManagement'));
 // PERBAIKAN 1: Sudah dijadikan lazy import

// Import Layouts
import MainLayout from './layouts/MainLayout';

// Komponen AuthLayout pembungkus login/register
const AuthLayout = ({ children }) => <div className="min-h-screen bg-[#fffafb] flex items-center justify-center">{children}</div>;

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="flex h-screen items-center justify-center font-sans text-[#f8b4b4] italic animate-pulse">Loading Luneve...</div>}>
        <Routes>

          {/* PERBAIKAN 2: Landing Page ditaruh di rute utama "/" supaya langsung muncul pertama kali */}
          <Route path="/" element={<GuestDashboard />} />

          {/* Halaman Tanpa Sidebar */}
          <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
          <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
          
          {/* PERBAIKAN 3: Halaman Utama Admin dipindah ke "/admin" agar tidak bentrok dengan landing page */}
          <Route path="/admin" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="settings" element={<Settings />} />
            <Route path="customers" element={<CustomerManagement />} />

            {/* PERBAIKAN 4: Menghapus tanda "/" di depan products agar nested routing-nya aktif */}
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="management" element={<ManagementHub />} />
            
            {/* Rute Error */}
            <Route path="400" element={<BadRequest />} />
            <Route path="401" element={<Unauthorized />} />
            <Route path="403" element={<Forbidden />} />
          </Route>

          {/* Jika mengetik rute asal-asalan, otomatis dilempar ke Landing Page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;