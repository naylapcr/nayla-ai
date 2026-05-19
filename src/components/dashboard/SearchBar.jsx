import React from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar() {
  return (
    <div className="relative">
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
      <input type="text" placeholder="Search..." className="pl-9 pr-4 py-2 bg-gray-50 border-none rounded-full text-xs w-40 focus:outline-none focus:ring-1 focus:ring-indigo-200" />
    </div>
  );
}