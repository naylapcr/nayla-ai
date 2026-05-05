import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaRegEnvelope, FaLock, FaRegEyeSlash, FaRegUser } from 'react-icons/fa';

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Simulasi registrasi berhasil
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#6366f1]/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]"></div>

      <div className="max-w-[500px] w-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 md:p-14 shadow-2xl relative z-10">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-14 h-14 bg-[#6366f1] rounded-2xl flex items-center justify-center text-white font-black italic text-2xl shadow-lg shadow-[#6366f1]/20 mb-4">B</div>
          <h1 className="text-3xl font-black text-white tracking-tighter italic">Join Bloom.</h1>
          <p className="text-gray-400 text-sm mt-3 font-medium">Start your journey to business excellence today..!</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
            <div className="relative group">
              <FaRegUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#6366f1] transition-colors" />
              <input type="text" placeholder="Enter your Full Name" required className="w-full pl-12 pr-6 py-4 bg-white/[0.05] border border-white/10 rounded-2xl text-sm text-white focus:ring-2 focus:ring-[#6366f1]/30 transition-all outline-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative group">
              <FaRegEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#6366f1] transition-colors" />
              <input type="email" placeholder="Enter your Email" required className="w-full pl-12 pr-6 py-4 bg-white/[0.05] border border-white/10 rounded-2xl text-sm text-white focus:ring-2 focus:ring-[#6366f1]/30 transition-all outline-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Password</label>
            <div className="relative group">
              <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#6366f1] transition-colors" />
              <input type="password" placeholder="Create a Password" required className="w-full pl-12 pr-12 py-4 bg-white/[0.05] border border-white/10 rounded-2xl text-sm text-white focus:ring-2 focus:ring-[#6366f1]/30 transition-all outline-none" />
              <FaRegEyeSlash className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer" />
            </div>
          </div>

          <button type="submit" className="w-full py-4 bg-[#6366f1] text-white rounded-2xl font-black text-sm shadow-xl shadow-[#6366f1]/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
            Create Account
          </button>
        </form>

        <p className="text-center mt-10 text-[11px] text-gray-500 font-bold uppercase tracking-widest">
          Already have an account? <Link to="/login" className="text-[#6366f1] hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}