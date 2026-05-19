import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

export default function StatCard({ title, value, percentage, isPositive }) {
  return (
    <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{title}</span>
        <div className="p-2 bg-gray-50 rounded-xl text-gray-400 text-[10px]"><FaArrowUp className="rotate-45" /></div>
      </div>
      <h2 className="text-2xl font-black text-gray-900 mb-2">{value}</h2>
      <div className={`text-[10px] font-black ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
        {isPositive ? '▲' : '▼'} {percentage} <span className="text-gray-400 font-medium ml-1">vs Last Week</span>
      </div>
    </div>
  );
}