import React, { useState } from 'react';

export default function CategoryFilter({ activeCategory, onSelectCategory }) {
  const [internalActive, setInternalActive] = useState("All Data");
  const active = activeCategory !== undefined ? activeCategory : internalActive;

  const handleSelect = (cat) => {
    setInternalActive(cat);
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
  };

  return (
    <div className="flex bg-white rounded-full p-1 shadow-sm border border-gray-100 items-center">
      <span className="px-3 text-[10px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-100 mr-1">Filter</span>
      {["All Data", "Fashion", "Beauty", "Accessories"].map((cat) => (
        <button
          key={cat}
          onClick={() => handleSelect(cat)}
          className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
            active === cat ? 'bg-pink-500 text-white shadow-lg shadow-pink-200' : 'text-gray-500 hover:text-pink-500'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}