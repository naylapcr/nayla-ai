import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaRegEnvelope, FaLock, FaRegEyeSlash } from 'react-icons/fa';
import { authAPI } from '../services/authAPI'; 

export default function Login() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const users = await authAPI.login(email, password);

      if (users && users.length > 0) {
        alert(`Selamat datang kembali, ${users[0].name}!`);
        navigate('/admin'); // ALUR: Sukses login langsung diarahkan ke /admin
      } else {
        alert('Login Gagal: Email atau Password salah!');
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan jaringan atau konfigurasi Supabase.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Ornamen Background Elegan Soft */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px]"></div>

      {/* Bento Card Putih Bersih */}
      <div className="max-w-[460px] w-full bg-white border border-slate-100 rounded-[2.5rem] p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative z-10">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black italic text-2xl shadow-lg shadow-indigo-600/20 mb-4">
            L
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic">
            Luneve<span className="text-emerald-500">.</span>
          </h1>
          <p className="text-slate-400 text-xs mt-2 font-medium">
            All your boutique magic, in one workspace.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Email Address
            </label>
            <div className="relative group">
              <FaRegEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                type="email" 
                placeholder="name@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-6 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none" 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Password
            </label>
            <div className="relative group">
              <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter your password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none" 
              />
              <FaRegEyeSlash 
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer transition-colors ${showPassword ? "text-indigo-600" : "text-slate-400"}`} 
              />
            </div>
          </div>

          <div className="flex justify-between items-center px-1 pt-1">
            <label className="flex items-center gap-2 text-[11px] font-bold text-slate-400 cursor-pointer select-none">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-200 bg-slate-50 text-indigo-600 focus:ring-0" /> 
              Remember me
            </label>
            <Link to="/forgot" className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 underline">
              Forgot Password?
            </Link>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-600/10 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 mt-2"
          >
            {loading ? 'Verifying Account...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-8 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          Don't have an account? <Link to="/register" className="text-indigo-600 hover:underline">Register now</Link>
        </p>
      </div>
    </div>
  );
}