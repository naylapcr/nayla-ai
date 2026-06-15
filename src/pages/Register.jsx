import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaRegEnvelope, FaLock, FaRegEye, FaRegEyeSlash, FaRegUser } from 'react-icons/fa';
import { authAPI } from '../services/authAPI'; 

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const newUser = {
      name: name,
      email: email,
      password: password
    };

    try {
      await authAPI.register(newUser);
      setSuccessMsg('Yeay, akun berhasil dibuat! Pindah ke halaman login ya... ✨');
      setTimeout(() => {
        navigate('/login'); 
      }, 2000);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMsg(`Waduh, ${error.response.data.message} 🥺`);
      } else {
        setErrorMsg('Gagal daftar nih. Coba cek emailnya udah bener belum ya! 💔');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#FFF5F7] to-[#F3ECFF] flex items-center justify-center p-6 font-sans relative overflow-hidden">
      
      {/* Ornamen Background Pastel Girly */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-200/30 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-rose-200/30 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-100/20 rounded-full blur-[120px]"></div>

      {/* Register Card - Glassmorphism & Soft Borders */}
      <div className="max-w-[420px] w-full bg-white/80 backdrop-blur-xl border border-rose-100/50 rounded-[2.5rem] p-10 md:p-12 shadow-2xl shadow-rose-100/50 relative z-10">
        
        {/* Brand Header - Casual & Cute */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-200 to-rose-200 rounded-full flex items-center justify-center text-3xl shadow-lg shadow-rose-100 mb-5 hover:scale-110 transition-transform duration-300">
            💖
          </div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-300 tracking-tight">
            Luneve
          </h1>
          <p className="text-rose-300 text-sm mt-2 font-medium">
            Bikin akun dulu yuk! ✨
          </p>
        </div>

        {/* Inline Messages (Error / Success) */}
        {errorMsg && (
          <div className="mb-6 bg-red-50 text-red-400 px-5 py-3 rounded-2xl text-xs font-semibold text-center border border-red-100 animate-bounce">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mb-6 bg-emerald-50 text-emerald-500 px-5 py-3 rounded-2xl text-xs font-semibold text-center border border-emerald-100 animate-bounce">
            {successMsg}
          </div>
        )}

        {/* Form - Friendly Typography */}
        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-rose-400 ml-1">
              Nama Kamu
            </label>
            <div className="relative group">
              <FaRegUser className="absolute left-5 top-1/2 -translate-y-1/2 text-rose-200 group-focus-within:text-rose-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Nama panggilan kamu" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-rose-50/50 border border-rose-100 rounded-2xl text-sm text-gray-700 placeholder:text-rose-200 focus:bg-white focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all outline-none" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-rose-400 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <FaRegEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-rose-200 group-focus-within:text-rose-400 transition-colors" />
              <input 
                type="email" 
                placeholder="hello@luneve.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-rose-50/50 border border-rose-100 rounded-2xl text-sm text-gray-700 placeholder:text-rose-200 focus:bg-white focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all outline-none" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-rose-400 ml-1">
              Password
            </label>
            <div className="relative group">
              <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-rose-200 group-focus-within:text-rose-400 transition-colors" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Bikin password yang aman ya" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-rose-50/50 border border-rose-100 rounded-2xl text-sm text-gray-700 placeholder:text-rose-200 focus:bg-white focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all outline-none" 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer transition-colors text-rose-300 hover:text-rose-500"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-rose-300 to-violet-200 text-rose-700 rounded-2xl font-bold text-sm tracking-wide shadow-xl shadow-rose-100/50 hover:shadow-rose-200/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-wait mt-3 border border-rose-200/50"
          >
            {loading ? 'Bentar ya... ✨' : 'Daftar Akun 💖'}
          </button>
        </form>

        <p className="text-center mt-8 text-xs text-rose-300 font-medium">
          Udah punya akun? <Link to="/login" className="text-rose-500 font-bold hover:underline">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
}