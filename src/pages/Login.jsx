import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaEnvelope, FaLock } from 'react-icons/fa';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#fffafb] animate-in fade-in duration-700 font-sans">
      <div className="w-full max-w-md relative">
        
        {/* Soft Glow Background */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#f8b4b4]/10 rounded-full blur-3xl"></div>
        
        {/* Card Utama */}
        <div className="relative bg-white p-12 md:p-16 rounded-[4rem] border border-pink-50 shadow-[0_40px_80px_rgba(248,180,180,0.08)] text-center">
          
          {/* Logo Luneve - Sesuai Gambar */}
          <div className="mb-12">
            <h1 className="text-5xl font-light italic text-[#f8b4b4] tracking-tight mb-2">
              Luneve
            </h1>
            <div className="h-[1px] w-8 bg-pink-100 mx-auto mb-6"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">
              Welcome to the archive
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <FaEnvelope className="absolute left-6 top-1/2 -translate-y-1/2 text-pink-200 text-xs" />
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full pl-14 pr-8 py-5 rounded-full bg-[#fffafb] border-none outline-none text-sm font-medium focus:ring-2 focus:ring-pink-100 transition-all placeholder:text-gray-300"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-6 top-1/2 -translate-y-1/2 text-pink-200 text-xs" />
              <input 
                type="password" 
                placeholder="Secret password" 
                className="w-full pl-14 pr-8 py-5 rounded-full bg-[#fffafb] border-none outline-none text-sm font-medium focus:ring-2 focus:ring-pink-100 transition-all placeholder:text-gray-300"
              />
            </div>

            <div className="text-right px-4 pb-4">
              <a href="#" className="text-[9px] font-black text-gray-300 uppercase tracking-widest hover:text-[#f8b4b4] transition-colors">Forgot?</a>
            </div>

            <Link 
              to="/" 
              className="w-full py-5 bg-black text-white rounded-full flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#f8b4b4] transition-all shadow-xl shadow-gray-200 group"
            >
              Enter Dashboard <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </form>

          <div className="mt-12">
            <p className="text-xs text-gray-400 font-medium">
              Don't have an account? {' '}
              <Link to="/register" className="text-[#f8b4b4] font-extrabold border-b border-pink-100 hover:border-[#f8b4b4] transition-all pb-1">
                Join Luneve
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}