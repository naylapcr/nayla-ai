import React from 'react';
import { FaBell } from 'react-icons/fa';

export default function NotificationBell() {
  return (
    <button className="relative w-11 h-11 bg-white rounded-full border border-gray-100 shadow-sm text-gray-400 flex items-center justify-center hover:bg-gray-50">
      <FaBell size={16} />
      <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
    </button>
  );
}