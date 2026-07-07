import React, { useState } from 'react';

export default function TopProductItem({ name, earnings, category = "Beauty", icon = "✨", sales = "500+ sold", trend = "+10%", share = 60 }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="p-3 rounded-2xl border border-transparent hover:border-pink-100 hover:bg-pink-50/40 transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-50 group-hover:bg-white border border-slate-100 group-hover:border-pink-200 flex items-center justify-center text-lg shadow-2xs group-hover:scale-105 transition-all">
            {icon}
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 group-hover:text-pink-600 transition-colors leading-tight">
              {name}
            </h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] font-semibold text-slate-400">{sales}</span>
              <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                {trend}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs font-black text-slate-900 group-hover:text-pink-600 transition-colors block">
            Rp {earnings ? earnings.toLocaleString('id-ID') : '0'}
          </span>
          <span className="text-[9px] font-bold text-slate-400">{category}</span>
        </div>
      </div>

      {/* Mini Popularity Bar */}
      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1.5">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isHovered ? 'bg-pink-500 shadow-xs shadow-pink-200' : 'bg-slate-300 group-hover:bg-pink-400'
          }`}
          style={{ width: `${share}%` }}
        ></div>
      </div>
    </div>
  );
}