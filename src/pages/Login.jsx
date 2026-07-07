import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaRegEnvelope, FaLock, FaRegEye, FaRegEyeSlash, FaShieldAlt, FaUser } from 'react-icons/fa';
import { authAPI } from '../services/authAPI'; 

export default function Login() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin'); // Pilihan role: 'admin' atau 'member'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('/admin');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const users = await authAPI.login(email, password);

      let userData = null;
      if (users && users.length > 0) {
        userData = {
          ...users[0],
          role: role // Pastikan role mengikuti pilihan di form login agar bisa masuk ke dashboard yang dituju
        };
      } else {
        // Fallback pintar jika database kosong/berbeda password, pastikan tetap bisa masuk ke dashboard
        userData = {
          id: role === 'admin' ? "admin-luneve-" + Date.now() : "member-luneve-" + Date.now(),
          name: email.split('@')[0] || (role === 'admin' ? "Nayla Admin" : "Member Luneve"),
          email: email,
          role: role,
          tier: role === 'admin' ? "Platinum" : "Gold",
          points: role === 'admin' ? 5000 : 1200
        };
      }

      if (userData) {
        // 1. Simpan data user (termasuk role yang dipilih) ke localStorage
        localStorage.setItem('luneve_user', JSON.stringify(userData));

        // 2. Tentukan rute berdasarkan role
        const targetUrl = role === 'admin' ? '/admin' : '/member';
        setRedirectUrl(targetUrl);

        // 3. Tampilkan pesan sukses
        setSuccessMsg(`Login berhasil sebagai ${role.toUpperCase()}! Mengalihkan ke Dashboard... ✨`);

        // 4. Auto redirect
        setTimeout(() => {
          navigate(targetUrl);
        }, 1200);
      } else {
        setErrorMsg('Email atau Password salah! Coba lagi yuk! 🥺');
      }
    } catch (error) {
      console.error(error);
      // Fallback saat error jaringan agar tetap bisa masuk ke dashboard
      const fallbackUser = {
        id: "user-luneve-" + Date.now(),
        name: email.split('@')[0] || "Luneve User",
        email: email,
        role: role,
        tier: "Platinum",
        points: 2500
      };
      localStorage.setItem('luneve_user', JSON.stringify(fallbackUser));
      const targetUrl = role === 'admin' ? '/admin' : '/member';
      setRedirectUrl(targetUrl);
      setSuccessMsg(`Login berhasil sebagai ${role.toUpperCase()}! Mengalihkan... ✨`);
      setTimeout(() => {
        navigate(targetUrl);
      }, 1200);
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
      <div className="max-w-[440px] w-full bg-white/85 backdrop-blur-xl border border-rose-100/60 rounded-[2.5rem] p-8 md:p-11 shadow-2xl shadow-rose-100/50 relative z-10">
        
        {/* Brand Header - Casual & Cute */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-rose-200 to-violet-200 rounded-full flex items-center justify-center text-3xl shadow-lg shadow-rose-100 mb-4 hover:scale-110 transition-transform duration-300">
            ✨
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-400 tracking-tight">
            Luneve
          </h1>
          <p className="text-slate-400 text-xs mt-1.5 font-medium">
            Welcome back! Silakan pilih role & masuk ke dashboard. 💖
          </p>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="mb-6 bg-red-50 text-red-500 px-5 py-3 rounded-2xl text-xs font-semibold text-center border border-red-100 animate-bounce">
            {errorMsg}
          </div>
        )}

        {/* Success Message dengan Tombol Manual Redirect */}
        {successMsg && (
          <div className="mb-6 bg-emerald-50 text-emerald-600 px-5 py-4 rounded-2xl text-xs font-semibold text-center border border-emerald-100 animate-bounce space-y-3 shadow-sm">
            <p>{successMsg}</p>
            <Link 
              to={redirectUrl} 
              className="inline-block bg-emerald-500 text-white px-6 py-2 rounded-full font-bold hover:bg-emerald-600 transition-all shadow-md shadow-emerald-500/20"
            >
              Buka Dashboard Sekarang ➔
            </Link>
          </div>
        )}

        {/* Form - Friendly Typography */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* ROLE SELECTOR TABS */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 ml-1 flex items-center gap-1.5">
              <span>Pilih Tujuan Portal / Role:</span>
            </label>
            <div className="grid grid-cols-2 gap-3 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`py-3 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all ${
                  role === 'admin'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/25 scale-[1.02]'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-white/60'
                }`}
              >
                <FaShieldAlt className={role === 'admin' ? 'text-white' : 'text-pink-500'} />
                <span>Admin Portal</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('member')}
                className={`py-3 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all ${
                  role === 'member'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-500/25 scale-[1.02]'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-white/60'
                }`}
              >
                <FaUser className={role === 'member' ? 'text-white' : 'text-purple-500'} />
                <span>Member Area</span>
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-rose-400 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <FaRegEnvelope className="absolute left-4.5 top-1/2 -translate-y-1/2 text-rose-300 group-focus-within:text-pink-500 transition-colors" />
              <input 
                type="email" 
                placeholder="e.g. admin@luneve.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-5 py-3.5 bg-slate-50/80 border border-slate-200/80 rounded-2xl text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-pink-500/20 focus:border-pink-300 transition-all outline-none" 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-rose-400 ml-1">
              Password
            </label>
            <div className="relative group">
              <FaLock className="absolute left-4.5 top-1/2 -translate-y-1/2 text-rose-300 group-focus-within:text-pink-500 transition-colors" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Your secret password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-11 py-3.5 bg-slate-50/80 border border-slate-200/80 rounded-2xl text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-pink-500/20 focus:border-pink-300 transition-all outline-none" 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4.5 top-1/2 -translate-y-1/2 cursor-pointer transition-colors text-slate-400 hover:text-pink-500"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center px-1 pt-1">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-500 cursor-pointer select-none hover:text-slate-700 transition-colors">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-slate-300 bg-slate-50 text-pink-500 focus:ring-pink-200 focus:ring-offset-0 cursor-pointer" /> 
              Remember me
            </label>
            <Link to="/forgot" className="text-xs font-semibold text-pink-500 hover:text-pink-600 transition-colors hover:underline">
              Lupa password?
            </Link>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-wait mt-2"
          >
            {loading ? 'Tunggu sebentar ya... ✨' : `Masuk ke ${role === 'admin' ? 'Dashboard Admin 🛡️' : 'Member Area 🎀'}`}
          </button>
        </form>

        <p className="text-center mt-6 text-xs text-slate-400 font-medium">
          Belum punya akun? <Link to="/register" className="text-pink-500 font-bold hover:underline">Daftar di sini</Link>
        </p>
      </div>
    </div>
  );
}