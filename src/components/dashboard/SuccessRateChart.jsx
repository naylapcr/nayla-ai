import React from 'react';
import { FaChevronDown, FaArrowTrendUp, FaDollarSign } from 'react-icons/fa6';

export default function SuccessRateChart() {
  // Jumlah segmen dibuat ideal (35 batang) agar kerapatan lengkungannya mulus seperti contoh
  const totalSegments = 35;
  const segments = Array.from({ length: totalSegments });
  const successPercentage = 78.6;

  return (
    <div className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm h-full flex flex-col justify-between min-h-[440px] font-sans">
      
      {/* 1. HEADER */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-base font-bold text-slate-900 tracking-tight">Success Rate</h3>
        <button className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors">
          Last 7 days <FaChevronDown size={8} />
        </button>
      </div>

      {/* 2. DYNAMIC GAUGE AREA (Semicircle Tunnel) */}
      <div className="relative flex flex-col items-center justify-center py-4 my-auto">
        
        {/* Floating Percentage Badge - Posisi disesuaikan tepat di atas busur bagian kiri */}
        <div className="absolute top-0 left-4 bg-white shadow-md border border-slate-100 px-2 py-1 rounded-lg z-20 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1]"></span>
          <span className="text-[10px] font-black text-slate-700">{successPercentage}%</span>
        </div>

        {/* Container Busur Setengah Lingkaran */}
        <div className="relative w-64 h-36 flex justify-center items-end overflow-hidden">
          
          {/* Render Batang Segmen Melingkar */}
          {segments.map((_, i) => {
            // Rentang rotasi dari -180 derajat (kiri) sampai 0 derajat (kanan) untuk membuat kubah penuh
            const startAngle = -180;
            const endAngle = 0;
            const angleStep = (endAngle - startAngle) / (totalSegments - 1);
            const rotation = startAngle + i * angleStep;

            // Menentukan segmen mana saja yang masuk ke area 78.6%
            const isActive = i / (totalSegments - 1) <= successPercentage / 100;

            return (
              <div
                key={i}
                className="absolute bottom-0 w-[5px] rounded-full origin-bottom transition-all duration-1000"
                style={{
                  height: '32px', // Panjang batang segmen
                  transform: `rotate(${rotation}deg) translateY(-85px)`, // Radius kubah lingkaran ditolak ke atas
                  backgroundColor: isActive ? '#6366f1' : '#e2e8f0', // Biru indigo cerah vs Abu-abu lembut
                }}
              />
            );
          })}

          {/* Label Tengah Teks */}
          <div className="text-center pb-2 z-10">
            <p className="text-4xl font-black text-slate-900 tracking-tight">{successPercentage}%</p>
            <p className="text-[11px] font-bold text-slate-400 tracking-wide mt-1">Sales Growth</p>
          </div>
        </div>

      </div>

      {/* 3. METRIC CARDS (Bawah) */}
      <div className="grid grid-cols-2 gap-3.5 mt-2">
        
        {/* Card: Sales Number */}
        <div className="bg-slate-50/60 p-4 rounded-[1.8rem] border border-slate-100/50 flex flex-col justify-between gap-3">
          <div className="w-8 h-8 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-700 border border-slate-100">
            <FaArrowTrendUp size={13} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 tracking-wider">Sales Number</p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-base font-black text-slate-900 tracking-tight">2,550</span>
              <span className="flex items-center gap-0.5 bg-[#dcfce7] text-[#156534] text-[9px] font-black px-1.5 py-0.5 rounded-md">
                +6.4%
              </span>
            </div>
          </div>
        </div>

        {/* Card: Total Revenue */}
        <div className="bg-slate-50/60 p-4 rounded-[1.8rem] border border-slate-100/50 flex flex-col justify-between gap-3">
          <div className="w-8 h-8 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-700 border border-slate-100">
            <FaDollarSign size={13} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 tracking-wider">Total Revenue</p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-base font-black text-slate-900 tracking-tight">$68,760</span>
              <span className="flex items-center gap-0.5 bg-[#ffedd5] text-[#9a3412] text-[9px] font-black px-1.5 py-0.5 rounded-md">
                +4.4%
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}