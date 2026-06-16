import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaRegEnvelope, FaLock, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { authAPI } from '../services/authAPI'; 

export default function Login() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('/member'); // Default redirect

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const users = await authAPI.login(email, password);

      if (users && users.length > 0) {
        const userData = users[0];
        
        // 1. Simpan data user (termasuk role) ke localStorage
        localStorage.setItem('luneve_user', JSON.stringify(userData));

        // 2. Tentukan rute berdasarkan role
        const targetUrl = userData.role === 'admin' ? '/admin' : '/member';
        setRedirectUrl(targetUrl);

        // 3. Tampilkan pesan sukses
        setSuccessMsg('Login berhasil! Mengalihkan... ✨');

        // 4. Auto redirect
        setTimeout(() => {
          navigate(targetUrl);
        }, 1500);
      } else {
        setErrorMsg('Email atau Password salah! Coba lagi yuk! 🥺');
      }
    } catch (error) {
      console.error(error);
      setErrorMsg('Waduh, ada error jaringan. Coba lagi ntar ya! 💔');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#FFF5F7] to-[#F3ECFF] flex items-center justify-center p-6 font-sans relative overflow-hidden">
      
      {/* Ornamen Background Pastel Girly */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-rose-200/30 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-violet-200/30 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-100/20 rounded-full blur-[120px]"></div>

      {/* Login Card - Glassmorphism & Soft Borders */}
      <div className="max-w-[420px] w-full bg-white/80 backdrop-blur-xl border border-rose-100/50 rounded-[2.5rem] p-10 md:p-12 shadow-2xl shadow-rose-100/50 relative z-10">
        
        {/* Brand Header - Casual & Cute */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-rose-200 to-violet-200 rounded-full flex items-center justify-center text-3xl shadow-lg shadow-rose-100 mb-5 hover:scale-110 transition-transform duration-300">
            ✨
          </div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-300 tracking-tight">
            Luneve
          </h1>
          <p className="text-rose-300 text-sm mt-2 font-medium">
            Welcome back, Glam Squad! 💖
          </p>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="mb-6 bg-red-50 text-red-400 px-5 py-3 rounded-2xl text-xs font-semibold text-center border border-red-100 animate-bounce">
            {errorMsg}
          </div>
        )}

        {/* Success Message dengan Tombol Manual Redirect */}
        {successMsg && (
          <div className="mb-6 bg-emerald-50 text-emerald-500 px-5 py-4 rounded-2xl text-xs font-semibold text-center border border-emerald-100 animate-bounce space-y-3">
            <p>{successMsg}</p>
            <Link 
              to={redirectUrl} 
              className="inline-block bg-emerald-100 text-emerald-600 px-5 py-2 rounded-full font-bold hover:bg-emerald-200 transition-all"
            >
              Lanjutkan
            </Link>
          </div>
        )}

        {/* Form - Friendly Typography */}
        <form onSubmit={handleLogin} className="space-y-6">
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
                placeholder="Your secret password" 
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

          <div className="flex justify-between items-center px-1">
            <label className="flex items-center gap-2 text-xs font-medium text-rose-300 cursor-pointer select-none hover:text-rose-400 transition-colors">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-rose-200 bg-rose-50 text-rose-400 focus:ring-rose-200 focus:ring-offset-0 cursor-pointer" /> 
              Remember me
            </label>
            <Link to="/forgot" className="text-xs font-semibold text-rose-400 hover:text-rose-600 transition-colors hover:underline">
              Lupa password?
            </Link>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-rose-300 to-violet-200 text-rose-700 rounded-2xl font-bold text-sm tracking-wide shadow-xl shadow-rose-100/50 hover:shadow-rose-200/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-wait border border-rose-200/50"
          >
            {loading ? 'Tunggu sebentar ya... ✨' : 'Masuk ke Akun 💖'}
          </button>
        </form>

        <p className="text-center mt-8 text-xs text-rose-300 font-medium">
          Belum punya akun? <Link to="/register" className="text-rose-500 font-bold hover:underline">Daftar di sini</Link>
        </p>
      </div>
    </div>
  );
}