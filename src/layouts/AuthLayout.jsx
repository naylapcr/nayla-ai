import React from 'react';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff5f5]">
      <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-pink-50 w-full max-w-md">
        {children}
      </div>
    </div>
  );
}