import React from 'react';
import { FaChevronDown, FaArrowUp } from 'react-icons/fa';

export default function ProfitChart() {
  // s = Total Sales (Batang belakang/terang), r = Total Revenue (Batang depan/utama)
  const bars = [
    { day: 'Sun', s: 58, r: 45, active: false },
    { day: 'Mon', s: 78, r: 66, active: true }, // Senin dibuat aktif dengan tooltip
    { day: 'Tue', s: 48, r: 35, active: false },
    { day: 'Wed', s: 58, r: 46, active: false },
    { day: 'Thu', s: 72, r: 60, active: false },
    { day: 'Fri', s: 58, r: 45, active: false },
    { day: 'Sat', s: 48, r: 35, active: false }
  ];

  return (
    <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm relative h-full flex flex-col justify-between min-h-[360px]">
      
      {/* BAGIAN HEADER KARTU */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">Total Profit</h3>
          
          <div className="flex items-center gap-2.5 mt-2">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">$230,760</h2>
            <span className="bg-[#22c55e] text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
              +8.4% <FaArrowUp size={8} className="rotate-45" />
            </span>
          </div>
        </div>

        {/* Dropdown Durasi */}
        <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-xl border border-gray-100 transition-colors">
          Last 7 days <FaChevronDown size={8} className="text-gray-400" />
        </button>
      </div>

      {/* INDIKATOR LEGENDA (Total Sales & Total Revenue) */}
      <div className="flex justify-end gap-4 text-xs font-bold text-gray-500 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#93c5fd]"></span>
          <span>Total Sales</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4f46e5]"></span>
          <span>Total Revenue</span>
        </div>
      </div>

      {/* AREA GRAFIK UTAMA */}
      <div className="relative h-48 w-full mt-4 flex flex-col justify-between">
        
        {/* LAYERS 1: Garis Kisi Horizontal Putus-Putus (Y-Axis) */}
        <div className="absolute inset-0 flex flex-col justify-between text-[10px] font-bold text-gray-400 pointer-events-none z-0">
          {['100K', '80K', '60K', '40K', '20K', '0K'].map((label, idx) => (
            <div key={idx} className="flex items-center w-full gap-2">
              <span className="w-8 text-right shrink-0">{label}</span>
              {idx < 5 && <div className="w-full border-b border-dashed border-gray-200"></div>}
            </div>
          ))}
        </div>

        {/* LAYERS 2: Batang Diagram (Bars Layout) */}
        <div className="absolute inset-0 flex items-end justify-between pl-10 pr-2 pb-5 z-10">
          {bars.map((data, i) => (
            <div key={i} className="flex-1 flex flex-col items-center relative h-[84%] justify-end max-w-[52px]">
              
              {/* JIKA AKTIF (Senin/Mon): Tampilkan Tooltip Box & Dot Biru */}
              {data.active && (
                <div className="absolute bottom-[78%] left-1/2 -translate-x-1/2 flex flex-col items-center z-30 mb-1 animate-fade-in">
                  {/* Kotak Info Tooltip */}
                  <div className="bg-white px-3 py-2 rounded-xl shadow-xl border border-gray-100 text-[11px] font-bold text-gray-800 space-y-0.5 min-w-[90px]">
                    <p className="text-gray-400 text-[9px]">25 Dec, 2025</p>
                    <p className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#93c5fd]"></span>2,290</p>
                    <p className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#4f46e5]"></span>$120,900</p>
                  </div>
                  {/* Pin Dot di Atas Batang */}
                  <div className="w-2 h-2 rounded-full bg-[#4f46e5] border-2 border-white shadow-md mt-1"></div>
                </div>
              )}

              {/* Batang Grafik Komposit (Stacked Appearance) */}
              <div className="w-full h-full flex flex-col justify-end relative rounded-t-lg overflow-hidden group cursor-pointer">
                
                {/* Batang Atas (Total Sales) - Efek Arsiran Halus */}
                <div 
                  className="w-full rounded-t-lg transition-all"
                  style={{ 
                    height: `${data.s}%`,
                    backgroundImage: data.active 
                      ? 'linear-gradient(135deg, #bfdbfe 25%, #93c5fd 25%, #93c5fd 50%, #bfdbfe 50%, #bfdbfe 75%, #93c5fd 75%, #93c5fd 100%)' 
                      : 'linear-gradient(135deg, #f3f4f6 25%, #e5e7eb 25%, #e5e7eb 50%, #f3f4f6 50%, #f3f4f6 75%, #e5e7eb 75%, #e5e7eb 100%)',
                    backgroundSize: '12px 12px'
                  }}
                />

                {/* Batang Bawah (Total Revenue) - Menumpuk ke Atas */}
                <div 
                  className="w-full absolute bottom-0 left-0 rounded-t-lg transition-all"
                  style={{ 
                    height: `${data.r}%`,
                    backgroundImage: data.active
                      ? 'linear-gradient(135deg, #6366f1 25%, #4f46e5 25%, #4f46e5 50%, #6366f1 50%, #6366f1 75%, #4f46e5 75%, #4f46e5 100%)'
                      : 'linear-gradient(135deg, #e5e7eb 25%, #d1d5db 25%, #d1d5db 50%, #e5e7eb 50%, #e5e7eb 75%, #d1d5db 75%, #d1d5db 100%)',
                    backgroundSize: '12px 12px'
                  }}
                />
              </div>

              {/* Label Hari (X-Axis) */}
              <span className="absolute -bottom-6 text-xs font-bold text-gray-500">
                {data.day}
              </span>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}