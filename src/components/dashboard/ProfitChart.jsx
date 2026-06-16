import React from "react";
import { FaChevronDown, FaArrowUp } from "react-icons/fa";
import { Progress } from "@/components/ui/progress";

export default function ProfitChart() {
  const bars = [
    { day: "Sun", s: 58, r: 45, active: false },
    { day: "Mon", s: 78, r: 66, active: true },
    { day: "Tue", s: 48, r: 35, active: false },
    { day: "Wed", s: 58, r: 46, active: false },
    { day: "Thu", s: 72, r: 60, active: false },
    { day: "Fri", s: 58, r: 45, active: false },
    { day: "Sat", s: 48, r: 35, active: false },
  ];

  return (
    <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm relative h-full flex flex-col justify-between min-h-[360px]">

      {/* HEADER */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Total Profit</h3>
          <div className="flex items-center gap-2.5 mt-2">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">$230,760</h2>
            <span className="bg-emerald-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
              +8.4% <FaArrowUp size={8} className="rotate-45" />
            </span>
          </div>
        </div>
        <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 px-3 py-2 rounded-xl border border-slate-100 transition-colors">
          Last 7 days <FaChevronDown size={8} className="text-slate-400" />
        </button>
      </div>

      {/* PROGRESS BARS */}
      <div className="space-y-3 mb-4">
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
              <span className="w-2 h-2 rounded-full bg-pink-200"></span>
              Total Sales
            </div>
            <span className="text-xs font-black text-slate-700">12,485</span>
          </div>
          <Progress value={72} className="h-2 bg-slate-100 [&>div]:bg-pink-200 [&>div]:rounded-full" />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
              <span className="w-2 h-2 rounded-full bg-pink-500"></span>
              Total Revenue
            </div>
            <span className="text-xs font-black text-slate-700">$68,760</span>
          </div>
          <Progress value={58} className="h-2 bg-slate-100 [&>div]:bg-pink-500 [&>div]:rounded-full" />
        </div>
      </div>

      {/* LEGENDA */}
      <div className="flex justify-end gap-4 text-xs font-bold text-slate-500 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-pink-200"></span>
          <span>Total Sales</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span>
          <span>Total Revenue</span>
        </div>
      </div>

      {/* GRAFIK BATANG */}
      <div className="relative h-48 w-full mt-4 flex flex-col justify-between">
        <div className="absolute inset-0 flex flex-col justify-between text-[10px] font-bold text-slate-300 pointer-events-none z-0">
          {["100K", "80K", "60K", "40K", "20K", "0K"].map((label, idx) => (
            <div key={idx} className="flex items-center w-full gap-2">
              <span className="w-8 text-right shrink-0">{label}</span>
              {idx < 5 && <div className="w-full border-b border-dashed border-slate-100"></div>}
            </div>
          ))}
        </div>

        <div className="absolute inset-0 flex items-end justify-between pl-10 pr-2 pb-5 z-10">
          {bars.map((data, i) => (
            <div key={i} className="flex-1 flex flex-col items-center relative h-[84%] justify-end max-w-[52px]">
              {data.active && (
                <div className="absolute bottom-[78%] left-1/2 -translate-x-1/2 flex flex-col items-center z-30 mb-1">
                  <div className="bg-white px-3 py-2 rounded-xl shadow-xl border border-slate-100 text-[11px] font-bold text-slate-800 space-y-0.5 min-w-[90px]">
                    <p className="text-slate-400 text-[9px]">25 Dec, 2025</p>
                    <p className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-pink-200"></span>2,290</p>
                    <p className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>$120,900</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-pink-500 border-2 border-white shadow-md mt-1"></div>
                </div>
              )}
              <div className="w-full h-full flex flex-col justify-end relative rounded-t-lg overflow-hidden group cursor-pointer">
                <div
                  className="w-full rounded-t-lg transition-all"
                  style={{
                    height: `${data.s}%`,
                    backgroundColor: data.active ? "#fbcfe8" : "#f1f5f9",
                  }}
                />
                <div
                  className="w-full absolute bottom-0 left-0 rounded-t-lg transition-all"
                  style={{
                    height: `${data.r}%`,
                    backgroundColor: data.active ? "#ec4899" : "#e2e8f0",
                  }}
                />
              </div>
              <span className="absolute -bottom-6 text-xs font-bold text-slate-400">{data.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}