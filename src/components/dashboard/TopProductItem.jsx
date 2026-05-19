import React from 'react';

export default function TopProductItem({ name, earnings }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-gray-50/50 last:border-none last:pb-0">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-900"></span>
        <span className="text-xs font-bold text-gray-700">{name}</span>
      </div>
      <span className="text-xs font-black text-gray-900">${earnings.toLocaleString()}</span>
    </div>
  );
}