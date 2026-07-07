// src/App.jsx
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { BadRequest, Unauthorized, Forbidden } from './pages/Errors';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

const Dashboard = lazy(() => import('./pages/AdminDashboard'));
const Products = lazy(() => import('./pages/Products'));
const Orders = lazy(() => import('./pages/Orders'));
const Reviews = lazy(() => import('./pages/Reviews'));
const Settings = lazy(() => import('./pages/Settings'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const GuestDashboard = lazy(() => import("./pages/GuestDashboard"));
const MemberDashboard = lazy(() => import("./pages/MemberDashboard")); // BUAT BARU
const ManagementHub = lazy(() => import('./pages/ManagementHub'));
const CustomerManagement = lazy(() => import('./pages/CustomerManagement'));
const Users = lazy(() => import('./pages/Users'));

import MainLayout from './layouts/MainLayout';

const AuthLayout = ({ children }) => <div className="min-h-screen bg-[#fffafb] flex items-center justify-center">{children}</div>;

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="flex h-screen items-center justify-center font-sans text-[#f8b4b4] italic animate-pulse">Loading Luneve...</div>}>
        <Routes>

          <Route path="/" element={<GuestDashboard />} />

          <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
          <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
          
          <Route path="/member" element={<MemberDashboard />} />

          {/* HALAMAN ADMIN */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<Orders />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="settings" element={<Settings />} />
            <Route path="customers" element={<CustomerManagement />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="management" element={<ManagementHub />} />
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