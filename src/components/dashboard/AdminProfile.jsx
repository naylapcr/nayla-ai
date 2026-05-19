import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

export default function AdminProfile() {
  return (
    <div className="flex items-center gap-3 bg-white pr-4 pl-1 py-1 rounded-full border border-gray-100 shadow-sm">
      <img src="https://ui-avatars.com/api/?name=Nayla&background=6366f1&color=fff" className="w-9 h-9 rounded-full" alt="profile" />
      <div className="hidden md:block">
        <p className="text-xs font-bold text-gray-900 leading-none">Nayla</p>
        <p className="text-[9px] text-gray-400 font-bold uppercase mt-1">Super Admin</p>
      </div>
      <FaChevronDown className="text-gray-400 text-[10px] ml-1" />
    </div>
  );
}