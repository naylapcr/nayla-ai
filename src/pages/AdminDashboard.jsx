import React from 'react';
import { 
  FaShoppingCart, FaStar, FaHeart, FaEye, 
  FaArrowRight, FaEllipsisH 
} from "react-icons/fa";

export default function AdminDashboard() {
  const stats = [
    { label: "New Sales", val: "128", icon: <FaShoppingCart />, bg: "bg-[#fff5f5]", color: "text-[#f8b4b4]" },
    { label: "Wishlist", val: "4.8k", icon: <FaHeart />, bg: "bg-[#fdf2f8]", color: "text-pink-400" },
    { label: "Store Views", val: "12.4k", icon: <FaEye />, bg: "bg-[#f0f9ff]", color: "text-blue-400" },
    { label: "Reviews", val: "450", icon: <FaStar />, bg: "bg-[#fffbeb]", color: "text-yellow-400" },
  ];

  const chartData = [
    { day: 'M', h: '40%' }, { day: 'T', h: '65%' }, { day: 'W', h: '45%' }, 
    { day: 'T', h: '90%' }, { day: 'F', h: '55%' }, { day: 'S', h: '80%' }, { day: 'S', h: '70%' }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 font-sans pb-10">
      
      {/* 1. Header Sapaan yang Lebih Santai */}
      <div className="flex justify-between items-center px-2">
        <div>
          <h2 className="text-4xl font-light text-gray-800 tracking-tight">
            Hello, <span className="font-bold text-[#f8b4b4]">Nayla!</span> ✨
          </h2>
          <p className="text-gray-400 text-sm mt-2 tracking-wide font-medium">
            Everything is looking <span className="italic">lovely</span> today.
          </p>
        </div>
        <div className="hidden md:flex gap-2">
           <div className="h-12 w-12 rounded-full border border-pink-100 flex items-center justify-center text-pink-300 hover:bg-pink-50 cursor-pointer transition-all">
              <FaEye />
           </div>
           <button className="bg-black text-white px-6 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
              Live Preview
           </button>
        </div>
      </div>

      {/* 2. Stats Cards - Float Style */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <div key={i} className="group relative bg-white p-8 rounded-[3rem] border border-pink-50/50 hover:border-[#f8b4b4] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(248,180,180,0.15)]">
            <div className={`${s.bg} ${s.color} w-14 h-14 rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:rotate-12 transition-transform duration-500`}>
              {s.icon}
            </div>
            <p className="text-4xl font-extrabold text-gray-800 tracking-tighter mb-1">{s.val}</p>
            <p className="text-[10px] font-extrabold text-gray-300 uppercase tracking-[0.2em]">{s.label}</p>
          </div>
        ))}
      </div>

      {/* 3. Main Display Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sales Chart - Soft Minimalist */}
        <div className="lg:col-span-8 bg-white p-10 rounded-[4rem] border border-pink-50/50 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-center mb-12 px-2">
            <h3 className="text-xl font-bold text-gray-800">Weekly Activity</h3>
            <div className="flex gap-4 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#f8b4b4]"></span> Sales</span>
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-gray-100"></span> Visits</span>
            </div>
          </div>

          <div className="flex items-end justify-between h-56 px-6 mb-4">
            {chartData.map((data, i) => (
              <div key={i} className="flex flex-col items-center group h-full justify-end">
                {/* Bar */}
                <div 
                  className="w-10 md:w-16 bg-[#fff5f5] rounded-3xl group-hover:bg-[#f8b4b4] transition-all duration-700 relative flex items-end justify-center overflow-hidden"
                  style={{ height: data.h }}
                >
                    <div className="w-full h-1/3 bg-[#f8b4b4] opacity-0 group-hover:opacity-100 transition-all"></div>
                </div>
                <span className="text-[11px] font-bold text-gray-300 mt-6 group-hover:text-[#f8b4b4] transition-colors">{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign / Highlight Card */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-gradient-to-br from-[#f8b4b4] to-[#ffceda] p-10 rounded-[4rem] text-white shadow-2xl shadow-pink-100 relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] opacity-80 mb-4">Current Campaign</p>
              <h4 className="text-3xl font-light italic leading-tight mb-8">Spring <br/><span className="font-bold">Collection 2026</span></h4>
              <button className="bg-white text-[#f8b4b4] p-4 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-lg">
                <FaArrowRight />
              </button>
           </div>

           <div className="bg-white p-8 rounded-[3rem] border border-pink-50 flex items-center justify-between group cursor-pointer hover:bg-gray-50 transition-all">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-all">
                    <FaEllipsisH />
                 </div>
                 <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">All Reports</p>
              </div>
              <FaArrowRight className="text-gray-200 group-hover:translate-x-2 transition-transform"/>
           </div>
        </div>

      </div>
    </div>
  );
}