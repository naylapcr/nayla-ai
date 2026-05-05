import React from 'react';
import { FaBell, FaSearch, FaChevronDown } from "react-icons/fa";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center mb-8 py-4 px-2 bg-[#fffafb]/80 backdrop-blur-md">
      
      {/* 1. Area Pencarian (Sesuai gaya Behance) */}
      <div className="relative group w-96">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs group-focus-within:text-emerald-500 transition-colors" />
        <input 
          type="text" 
          placeholder="Search for anything..." 
          className="w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-100 transition-all shadow-sm placeholder:text-gray-300"
        />
      </div>

      {/* 2. Navigasi Kanan (Notifikasi & Profil) */}
      <div className="flex items-center gap-6">
        
        {/* Tombol Notifikasi Minimalis */}
        <button className="relative p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-gray-900 hover:shadow-md transition-all">
          <FaBell size={18} />
          <span className="absolute top-3 right-3.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Separator Tipis */}
        <div className="h-8 w-[1px] bg-gray-100 mx-1"></div>

        {/* Profil User yang Elegan */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right">
            <p className="text-sm font-bold text-gray-900 leading-none group-hover:text-emerald-600 transition-colors">Nayla Beauty</p>
            <p className="text-[10px] text-gray-400 font-medium mt-1 uppercase tracking-wider">Main Owner</p>
          </div>
          
          <div className="relative">
            <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white overflow-hidden shadow-lg shadow-gray-200 transition-transform group-hover:scale-105">
              {/* Kamu bisa ganti FaUserCircle dengan <img> jika ada foto */}
              <img 
                src="https://ui-avatars.com/api/?name=Nayla+Beauty&background=111827&color=fff" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Indikator Online */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-[#fffafb]"></div>
          </div>
          
          <FaChevronDown className="text-[10px] text-gray-300 group-hover:text-gray-600 transition-all" />
        </div>
      </div>
    </header>
  );
}