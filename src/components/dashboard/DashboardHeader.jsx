import React from 'react';
import { FaCalendarAlt, FaDownload, FaChevronDown } from 'react-icons/fa';

export default function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Welcome, Nayla 👋</h1>
        <p className="text-gray-400 text-xs mt-1">Manage products, orders, and performance in one place.</p>
      </div>
      <div className="flex gap-3 w-full sm:w-auto">
        <button className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border border-gray-100 text-xs font-bold text-gray-600 shadow-sm hover:bg-gray-50 transition-colors">
          <FaCalendarAlt className="text-gray-400" /> 12 Sept - 20 Sept <FaChevronDown size={8} />
        </button>
        <button className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border border-gray-100 text-xs font-bold text-gray-600 shadow-sm hover:bg-gray-50 transition-colors">
          <FaDownload className="text-gray-400" /> Export Report
        </button>
      </div>
    </div>
  );
}