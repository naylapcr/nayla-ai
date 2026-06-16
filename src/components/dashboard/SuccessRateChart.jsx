import React from 'react';
import { FaChevronDown, FaArrowTrendUp, FaDollarSign } from 'react-icons/fa6';

export default function SuccessRateChart() {
  const totalSegments = 35;
  const segments = Array.from({ length: totalSegments });
  const successPercentage = 78.6;

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm h-full flex flex-col justify-between min-h-[440px] font-sans">
      
      {/* 1. HEADER */}
      <div className="flex justify-between items-start mb-6">
        <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Success</h3>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Rate</h3>
        </div>
        <button className="flex items-center gap-2 text-[10px] font-black text-slate-500 bg-slate-50 px-4 py-2.5 rounded-2xl hover:bg-slate-100 transition-colors uppercase tracking-widest">
          Last 7 days <FaChevronDown size={8} />
        </button>
      </div>

      {/* 2. DYNAMIC GAUGE AREA - Dibuat lebih kecil agar tidak keluar garis */}
      <div className="relative flex flex-col items-center justify-center my-auto">
        <div className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl mb-4 flex items-center gap-2 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-pink-500"></span>
          <span className="text-xs font-black text-slate-700">{successPercentage}%</span>
        </div>

        <div className="relative w-56 h-28 flex justify-center items-end overflow-hidden">
          {segments.map((_, i) => {
            const rotation = -180 + i * (180 / (totalSegments - 1));
            const isActive = i / (totalSegments - 1) <= successPercentage / 100;
            return (
              <div
                key={i}
                className="absolute bottom-0 w-[4px] rounded-full origin-bottom transition-all duration-1000"
                style={{
                  height: '24px',
                  transform: `rotate(${rotation}deg) translateY(-70px)`,
                  backgroundColor: isActive ? '#ec4899' : '#e2e8f0',
                }}
              />
            );
          })}
          <div className="absolute bottom-0 text-center pb-1 z-10">
            <p className="text-3xl font-black text-slate-900 tracking-tight">{successPercentage}%</p>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Sales Growth</p>
          </div>
        </div>
      </div>

      {/* 3. METRIC CARDS */}
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div className="bg-slate-50 p-5 rounded-[2rem] border border-slate-100 flex flex-col items-center text-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-700 shadow-sm border border-slate-100">
            <FaArrowTrendUp size={14} />
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Sales</p>
            <p className="text-sm font-black text-slate-900 mt-0.5">2,550</p>
            <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg mt-1 inline-block">+6.4%</span>
          </div>
        </div>

        <div className="bg-slate-50 p-5 rounded-[2rem] border border-slate-100 flex flex-col items-center text-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-700 shadow-sm border border-slate-100">
            <FaDollarSign size={14} />
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Revenue</p>
            <p className="text-sm font-black text-slate-900 mt-0.5">$68,760</p>
            <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg mt-1 inline-block">+4.4%</span>
          </div>
        </div>
      </div>
    </div>
  );
}