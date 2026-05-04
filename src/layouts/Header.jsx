import React from 'react';
import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 flex justify-between items-center mb-8 p-4 rounded-[2rem] border border-white/20 shadow-sm">
      <div className="ml-4">
         <span className="text-[10px] font-black text-[#f8b4b4] uppercase tracking-[0.3em]">Administrator Panel</span>
      </div>
      <div className="flex items-center space-x-6 mr-4">
        <div className="relative cursor-pointer group">
            <FaBell className="text-gray-400 group-hover:text-[#f8b4b4] transition-colors" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </div>
        <div className="flex items-center space-x-3 pl-6 border-l border-pink-100">
          <div className="text-right">
            <p className="text-[10px] font-black text-gray-800 uppercase leading-none">Nayla Beauty</p>
            <p className="text-[9px] text-[#f8b4b4] font-bold">Main Owner</p>
          </div>
          <div className="w-10 h-10 bg-[#f8b4b4] rounded-2xl flex items-center justify-center text-white font-serif italic text-xl shadow-lg shadow-pink-100">N</div>
        </div>
      </div>
    </header>
  );
}