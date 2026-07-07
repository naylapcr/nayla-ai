import React, { useState } from 'react';

export default function SalesOverview() {
  const [period, setPeriod] = useState('7d');
  const [activeSegment, setActiveSegment] = useState(null);

  const data = {
    '7d': {
      successful: { pct: 47.05, count: '1,240 orders', color: 'bg-emerald-500', text: 'text-emerald-500', label: 'Successful' },
      pending: { pct: 32.48, count: '856 orders', color: 'bg-amber-400', text: 'text-amber-500', label: 'Pending' },
      cancelled: { pct: 20.47, count: '540 orders', color: 'bg-rose-400', text: 'text-rose-500', label: 'Cancelled' }
    },
    '30d': {
      successful: { pct: 68.20, count: '4,850 orders', color: 'bg-emerald-500', text: 'text-emerald-500', label: 'Successful' },
      pending: { pct: 18.50, count: '1,310 orders', color: 'bg-amber-400', text: 'text-amber-500', label: 'Pending' },
      cancelled: { pct: 13.30, count: '945 orders', color: 'bg-rose-400', text: 'text-rose-500', label: 'Cancelled' }
    },
    'all': {
      successful: { pct: 82.40, count: '18,420 orders', color: 'bg-emerald-500', text: 'text-emerald-500', label: 'Successful' },
      pending: { pct: 11.10, count: '2,480 orders', color: 'bg-amber-400', text: 'text-amber-500', label: 'Pending' },
      cancelled: { pct: 6.50, count: '1,450 orders', color: 'bg-rose-400', text: 'text-rose-500', label: 'Cancelled' }
    }
  };

  const current = data[period];

  return (
    <div className="space-y-4">
      {/* Header & Interactive Period Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest">Sales Overview</h3>
        <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
          {[
            { id: '7d', label: '7 Days' },
            { id: '30d', label: '30 Days' },
            { id: 'all', label: 'All Time' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setPeriod(tab.id); setActiveSegment(null); }}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                period === tab.id
                  ? 'bg-white text-pink-600 shadow-2xs font-black'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Numbers */}
      <div className="grid grid-cols-3 gap-2 py-1">
        {Object.entries(current).map(([key, item]) => (
          <div
            key={key}
            onClick={() => setActiveSegment(activeSegment === key ? null : key)}
            onMouseEnter={() => setActiveSegment(key)}
            onMouseLeave={() => setActiveSegment(null)}
            className={`p-2 rounded-xl text-center transition-all cursor-pointer ${
              activeSegment === key ? 'bg-slate-50 shadow-2xs scale-105' : 'hover:bg-slate-50/50'
            }`}
          >
            <p className={`${item.text} text-[9px] font-black uppercase mb-0.5 flex items-center justify-center gap-1`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current inline-block"></span>
              {item.label}
            </p>
            <h4 className="text-base font-black text-slate-900">{item.pct}%</h4>
            <span className="text-[9px] font-semibold text-slate-400 block mt-0.5">{item.count}</span>
          </div>
        ))}
      </div>

      {/* Interactive Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex gap-1.5 h-3 w-full rounded-full overflow-hidden bg-slate-100 p-0.5">
          <div
            className={`bg-emerald-500 rounded-full transition-all duration-500 ease-out cursor-pointer ${
              activeSegment === 'successful' ? 'opacity-100 ring-2 ring-emerald-500/30' : activeSegment ? 'opacity-40' : 'opacity-90 hover:opacity-100'
            }`}
            style={{ width: `${current.successful.pct}%` }}
            onClick={() => setActiveSegment(activeSegment === 'successful' ? null : 'successful')}
          ></div>
          <div
            className={`bg-amber-400 rounded-full transition-all duration-500 ease-out cursor-pointer ${
              activeSegment === 'pending' ? 'opacity-100 ring-2 ring-amber-400/30' : activeSegment ? 'opacity-40' : 'opacity-90 hover:opacity-100'
            }`}
            style={{ width: `${current.pending.pct}%` }}
            onClick={() => setActiveSegment(activeSegment === 'pending' ? null : 'pending')}
          ></div>
          <div
            className={`bg-rose-400 rounded-full transition-all duration-500 ease-out cursor-pointer ${
              activeSegment === 'cancelled' ? 'opacity-100 ring-2 ring-rose-400/30' : activeSegment ? 'opacity-40' : 'opacity-90 hover:opacity-100'
            }`}
            style={{ width: `${current.cancelled.pct}%` }}
            onClick={() => setActiveSegment(activeSegment === 'cancelled' ? null : 'cancelled')}
          ></div>
        </div>
        
        {activeSegment && (
          <div className="text-[10px] font-bold text-center text-slate-600 bg-slate-50 py-1 px-3 rounded-lg animate-in fade-in duration-200">
            Showing details for <span className="text-pink-600 font-black">{current[activeSegment].label}</span>: {current[activeSegment].count} ({current[activeSegment].pct}%)
          </div>
        )}
      </div>
    </div>
  );
}