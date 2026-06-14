import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillCheckCircleFill, BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { authAPI } from "../services/authAPI";

export default function Forgot() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // 1. Cek dulu apakah email ada di database Supabase
      const emailCheck = await authAPI.checkEmailExists(email);

      if (!emailCheck || emailCheck.length === 0) {
        setError("Email tersebut tidak terdaftar di sistem kami!");
        setLoading(false);
        return;
      }

      // 2. Jika ada, lakukan update password baru menggunakan metode PATCH
      await authAPI.resetPassword(email, newPassword);

      setSuccess("Password berhasil diubah di database Supabase! Mengalihkan...");
      
      setTimeout(() => {
        navigate("/login"); // ALUR: Setelah berhasil ganti sandi kembali ke login
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Gagal mereset sandi. Silakan coba beberapa saat lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#050505] font-sans flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-[400px] bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl z-10 flex flex-col items-center">
        <h1 className="text-[26px] font-black text-white mb-2 text-center italic tracking-tighter">Reset Password</h1>
        <p className="text-xs text-gray-400 mb-6 text-center">Ubah kata sandi akun Supabase Bloom Anda.</p>

        {error && (
          <div className="w-full mb-4 p-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl flex items-center gap-2 text-[12px] font-medium">
            <BsFillExclamationDiamondFill className="shrink-0" /> {error}
          </div>
        )}

        {success && (
          <div className="w-full mb-4 p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl flex items-center gap-2 text-[12px] font-medium">
            <BsFillCheckCircleFill className="shrink-0" /> {success}
          </div>
        )}

        <form onSubmit={handleResetPassword} className="w-full space-y-4">
          <input
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan Email Terdaftar" 
            className="w-full px-5 py-4 bg-white/[0.05] border border-white/10 rounded-2xl text-sm text-white outline-none focus:ring-2 focus:ring-[#6366f1]/30 placeholder:text-gray-500"
            required 
          />
          <input
            type="password" 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Masukkan Password Baru" 
            className="w-full px-5 py-4 bg-white/[0.05] border border-white/10 rounded-2xl text-sm text-white outline-none focus:ring-2 focus:ring-[#6366f1]/30 placeholder:text-gray-500"
            required 
          />

          <button
            type="submit" 
            disabled={loading}
            className="w-full bg-[#6366f1] hover:bg-indigo-700 text-white font-black py-4 rounded-2xl mt-4 shadow-xl shadow-[#6366f1]/20 transition-all flex justify-center items-center text-sm"
          >
            {loading ? <ImSpinner2 className="animate-spin text-lg" /> : "Update Password"}
          </button>
        </form>

        <div className="mt-8 text-[13px] text-gray-500 font-bold uppercase tracking-widest">
          Remember password? <Link to="/login" className="text-[#6366f1] hover:underline">Login back</Link>
        </div>
      </div>
    </div>
  );
}