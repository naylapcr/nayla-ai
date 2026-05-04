import React from 'react';

export default function StatCard({ title, value, icon: Icon, trend }) {
  return (
    <div className="admin-card group cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <div className="bg-[#fff5f5] p-4 rounded-2xl group-hover:bg-[#f8b4b4] transition-colors duration-300">
          <Icon className="text-[#f8b4b4] group-hover:text-white text-xl" />
        </div>
        {trend && (
          <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">{trend}</span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      <p className="text-gray-400 text-xs font-medium uppercase tracking-[0.2em] mt-1">{title}</p>
    </div>
  );
}