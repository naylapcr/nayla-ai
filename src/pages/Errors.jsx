import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaLock, FaUserShield, FaArrowLeft } from 'react-icons/fa';

// Komponen Pembungkus Utama (Layout Error)
const ErrorBase = ({ code, title, desc, icon }) => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 animate-in fade-in zoom-in duration-700 font-sans">
    <div className="w-24 h-24 bg-[#fff5f5] rounded-[2.5rem] flex items-center justify-center text-[#f8b4b4] text-4xl mb-8 shadow-sm">
      {icon}
    </div>
    <h1 className="text-[120px] font-black text-[#f8b4b4]/10 leading-none absolute -z-10 select-none">
      {code}
    </h1>
    <h2 className="text-3xl font-light text-gray-800 tracking-tight">
      {title} <span className="font-bold text-[#f8b4b4]">Ouch!</span>
    </h2>
    <p className="text-gray-400 text-sm mt-4 max-w-xs leading-relaxed font-medium">
      {desc}
    </p>
    <Link 
      to="/" 
      className="mt-10 flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#f8b4b4] transition-all shadow-xl shadow-gray-100 group"
    >
      <FaArrowLeft className="group-hover:-translate-x-2 transition-transform" /> Back to Dashboard
    </Link>
  </div>
);

// Halaman 400 - Bad Request
export const BadRequest = () => (
  <ErrorBase 
    code="400"
    title="Bad Request."
    desc="Something went wrong with the request. Let's try going back home."
    icon={<FaExclamationTriangle />}
  />
);

// Halaman 401 - Unauthorized
export const Unauthorized = () => (
  <ErrorBase 
    code="401"
    title="Wait a sec."
    desc="You need to sign in before you can access this archive."
    icon={<FaLock />}
  />
);

// Halaman 403 - Forbidden
export const Forbidden = () => (
  <ErrorBase 
    code="403"
    title="Restricted."
    desc="You don't have the key to enter this specific room, darling."
    icon={<FaUserShield />}
  />
);