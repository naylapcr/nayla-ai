import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

export default function StatusDropdown() {
  return (
    <button className="text-xs font-bold text-gray-500 bg-gray-50 px-4 py-2 rounded-full flex items-center gap-2 border-none hover:bg-gray-100">
      Status <FaChevronDown size={8}/>
    </button>
  );
}