import React from 'react';

export default function SalesOverview() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-black text-gray-900 text-xs uppercase tracking-widest">Sales Overview</h3>
        <span className="text-[10px] font-bold text-gray-400">Last 7 days ▾</span>
      </div>
      <div className="flex justify-between mb-4">
         <div className="text-center"><p className="text-emerald-500 text-[9px] font-black uppercase mb-0.5">● Successful</p><h4 className="text-lg font-black">47.05%</h4></div>
         <div className="text-center"><p className="text-orange-400 text-[9px] font-black uppercase mb-0.5">● Pending</p><h4 className="text-lg font-black">32.48%</h4></div>
         <div className="text-center"><p className="text-rose-400 text-[9px] font-black uppercase mb-0.5">● Cancelled</p><h4 className="text-lg font-black">20.47%</h4></div>
      </div>
      <div className="flex gap-1.5 h-2 w-full rounded-full overflow-hidden bg-gray-50">
         <div className="bg-emerald-500 w-[47%]"></div>
         <div className="bg-orange-400 w-[32%]"></div>
         <div className="bg-rose-400 w-[21%]"></div>
      </div>
    </div>
  );
}