import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#fffafb] animate-in fade-in duration-700 font-sans">
      <div className="w-full max-w-md">
        <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-pink-50 shadow-[0_40px_80px_rgba(248,180,180,0.08)] text-center">
          
          <div className="mb-10">
            <h2 className="text-3xl font-light text-gray-800 tracking-tight">
              Create <span className="font-bold text-[#f8b4b4]">Account</span>
            </h2>
            <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] mt-3 font-bold">Start your journey with us</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <FaUser className="absolute left-6 top-1/2 -translate-y-1/2 text-pink-200 text-xs" />
              <input 
                type="text" 
                placeholder="Full name" 
                className="w-full pl-14 pr-8 py-5 rounded-full bg-[#fffafb] border-none outline-none text-sm font-medium focus:ring-2 focus:ring-pink-100 transition-all placeholder:text-gray-300"
              />
            </div>

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
                placeholder="Password" 
                className="w-full pl-14 pr-8 py-5 rounded-full bg-[#fffafb] border-none outline-none text-sm font-medium focus:ring-2 focus:ring-pink-100 transition-all placeholder:text-gray-300"
              />
            </div>

            <div className="pt-6">
              <Link 
                to="/" 
                className="w-full py-5 bg-black text-white rounded-full flex items-center justify-center text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#f8b4b4] transition-all shadow-xl shadow-gray-200"
              >
                Create Account
              </Link>
            </div>
          </form>

          <div className="mt-10">
            <p className="text-xs text-gray-400 font-medium">
              Already a member? {' '}
              <Link to="/login" className="text-[#f8b4b4] font-extrabold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}