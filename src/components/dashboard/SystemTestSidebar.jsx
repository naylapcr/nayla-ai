import React from 'react';
import { FaBug } from 'react-icons/fa';

export default function SystemTestSidebar() {
  const errors = [400, 401, 403];

  return (
    <div className="mt-8 pt-6 border-t border-gray-100 px-4 hidden lg:block">
      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">
        System Test
      </span>
      <div className="space-y-1.5">
        {errors.map((err) => (
          <button
            key={err}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-gray-500 hover:text-red-500 hover:bg-red-50/50 transition-all group text-left"
          >
            <FaBug className="text-gray-300 group-hover:text-red-400 transition-colors" />
            <span>{err} Error Simulation</span>
          </button>
        ))}
      </div>
    </div>
  );
}