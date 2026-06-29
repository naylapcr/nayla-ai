import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar'; // atau nama komponen sidebar-mu
import Header from './Header';   // atau nama komponen header-mu

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* 1. Sidebar tetap muncul di semua halaman */}
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* 2. JIKA PATH BUKAN '/' (DASHBOARD UTAMA), TAMPILKAN HEADER BAWAAN LAYOUT */}
        {location.pathname !== '/' && <Header />}
        
        {/* 3. Konten halaman akan dirender di sini */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}