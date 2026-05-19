import React from 'react';
import { FaEye } from 'react-icons/fa';

export default function RecentOrderRow({ id, product, icon, meta, customer, amount, status }) {
  return (
    <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
      <td className="py-4 pl-4 font-bold text-gray-900">{id}</td>
      <td className="py-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">{icon}</div>
        <div className="leading-tight">
          <p className="font-bold text-gray-900 text-xs">{product}</p>
          <p className="text-[9px] text-gray-400 font-bold">{meta}</p>
        </div>
      </td>
      <td className="py-4 text-gray-600 font-medium">{customer}</td>
      <td className="py-4 font-black text-gray-900">${amount}</td>
      <td className="py-4">
        <span className={`px-2.5 py-1 rounded-xl font-black text-[9px] uppercase tracking-wider ${
          status === 'In Progress' ? 'bg-indigo-50 text-indigo-500' : 'bg-orange-50 text-orange-500'
        }`}>
          {status}
        </span>
      </td>
      <td className="py-4 pr-4"><FaEye className="text-gray-300 hover:text-indigo-500 cursor-pointer" size={14} /></td>
    </tr>
  );
}