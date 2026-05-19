import React, { useState } from 'react';

export default function CategoryFilter() {
  const [active, setActive] = useState("All Data");
  return (
    <div className="flex bg-white rounded-full p-1 shadow-sm border border-gray-100 items-center">
      <span className="px-3 text-[10px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-100 mr-1">Filter</span>
      {["All Data", "Fashion", "Beauty", "Accessories"].map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
            active === cat ? 'bg-[#6366f1] text-white shadow-lg shadow-indigo-100' : 'text-gray-500 hover:text-[#6366f1]'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}