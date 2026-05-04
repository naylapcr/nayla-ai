import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[#fffafb]">
      <Sidebar />
      <div className="flex-1 flex flex-col p-8 overflow-y-auto">
        <Header />
        <main>
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}