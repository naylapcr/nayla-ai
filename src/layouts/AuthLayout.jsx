import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#050505] selection:bg-[#6366f1]/30 selection:text-white">
      <main>
        <Outlet />
      </main>
    </div>
  );
}