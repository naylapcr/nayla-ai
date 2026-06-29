import React, { useState, useEffect } from 'react';
import { 
  FaCircleInfo, 
  FaChevronDown, 
  FaRocket, 
  FaShieldHeart, 
  FaPalette,
  FaBoxesStacked,
  FaBookOpen
} from 'react-icons/fa6';

export default function ManagementHub() {
  // --- STATE UNTUK KOMKONEN INTERAKTIF ---
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulasi loading data masuk gudang
    const timer = setTimeout(() => setIsLoading(false), 2000);
    
    // Simulasi progress data target penjualan bulanan
    const progressTimer = setTimeout(() => setProgress(74), 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(progressTimer);
    };
  }, []);

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="p-6 md:p-10 max-w-[1400px] mx-auto space-y-10 font-sans text-slate-800 animate-in fade-in duration-700 w-full overflow-hidden">
      
      {/* HEADER SECTION - Identitas Utama Halaman */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic">
            Management <span className="text-[#6366f1]">Hub</span>
          </h1>
          <p className="text-sm text-slate-400 font-medium italic mt-1">Operational control center & internal data synchronization.</p>
        </div>
        <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center gap-2">
          <FaCircleInfo className="text-indigo-500" size={12} />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">System v4.2 Stable</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        
        {/* KIRI: MONITORING DATA & TARGET PROGRES */}
        <div className="col-span-12 lg:col-span-6 space-y-8">
          
          {/* FUNGSI 1: TARGET MONITORING (Shadcn Progress) */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-bold uppercase tracking-wider">Metrics Monitor</span>
                <h3 className="text-lg font-black text-slate-900 mt-2">Monthly Sales Target</h3>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Real-time Q4 Objectives</p>
              </div>
              <span className="text-3xl font-black text-[#6366f1] tracking-tight">{progress}%</span>
            </div>

            {/* Progress Bar Track */}
            <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-[#6366f1] rounded-full transition-all duration-1000 ease-out shadow-md"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="flex gap-4 items-center p-4 bg-indigo-50/40 rounded-2xl border border-indigo-100/50">
              <FaRocket className="text-[#6366f1] flex-shrink-0" size={14} />
              <p className="text-[11px] font-medium text-indigo-700 leading-relaxed">
                You are almost there! Reach <span className="font-bold underline">80%</span> to unlock the quarterly system bonus multiplier for the active fulfillment team.
              </p>
            </div>
          </div>

          {/* FUNGSI 2: LOGISTIK MONITORING (Shadcn Skeleton Loading) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <FaBoxesStacked size={12} className="text-slate-400" />
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Incoming Stock Tracking</h4>
            </div>
            
            {isLoading ? (
              /* State Skeleton Animasi Loading */
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-white p-5 rounded-[2rem] border border-slate-50 flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-2xl animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-slate-200 rounded-full w-1/3 animate-pulse" />
                      <div className="h-2 bg-slate-100 rounded-full w-1/2 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* State Tampilan Data Selesai Di-Sync */
              <div className="space-y-3 animate-in fade-in zoom-in-95 duration-500">
                <div className="bg-white p-5 rounded-[2rem] border border-slate-100 flex items-center justify-between gap-4 hover:shadow-md transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-sm font-black shadow-inner">L</div>
                    <div>
                      <h5 className="text-sm font-black text-slate-800">Lip Glow Serum</h5>
                      <p className="text-[10px] text-slate-400 font-bold">240 Units arrived safely at Main Warehouse</p>
                    </div>
                  </div>
                  <span className="text-[9px] px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-lg uppercase tracking-wider">Restocked</span>
                </div>

                <div className="bg-white p-5 rounded-[2rem] border border-slate-100 flex items-center justify-between gap-4 hover:shadow-md transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-sm font-black shadow-inner">C</div>
                    <div>
                      <h5 className="text-sm font-black text-slate-800">Cushion Foundation</h5>
                      <p className="text-[10px] text-slate-400 font-bold">45 Units under standard quality review</p>
                    </div>
                  </div>
                  <span className="text-[9px] px-2.5 py-1 bg-amber-50 text-amber-700 font-bold rounded-lg uppercase tracking-wider">QC Check</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* KANAN: DOKUMENTASI INTERNAL & STANDARD OPERATING PROCEDURE */}
        <div className="col-span-12 lg:col-span-6 space-y-8">
          
          {/* FUNGSI 3 & 4: FAQ & POLICY CENTER (Shadcn Accordion) */}
          <div className="bg-[#111827] p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-xl border border-slate-800">
            <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#6366f1]/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex items-center gap-2 mb-2">
              <FaBookOpen className="text-indigo-400" size={13} />
              <span className="text-[9px] text-indigo-400 font-black uppercase tracking-widest">Internal Resource</span>
            </div>
            <h3 className="text-lg font-black tracking-tight relative z-10">Admin & Regulatory Guide</h3>
            <p className="text-[11px] text-slate-400 mt-1">Operational legal compliance rules and system workflow.</p>
            
            {/* Shadcn Separator Line */}
            <div className="h-[1px] w-full bg-slate-800 my-5 relative z-10" />

            {/* Accordion Wrapper */}
            <div className="space-y-1.5 relative z-10">
              
              {/* Item Accordion 1 */}
              <div className="border-b border-slate-800/60 overflow-hidden transition-colors">
                <button 
                  onClick={() => toggleAccordion(1)}
                  className="w-full flex justify-between items-center py-4 text-left hover:text-indigo-400 transition-all group"
                >
                  <span className="text-xs font-bold flex items-center gap-2.5">
                    <FaShieldHeart className="text-indigo-400 group-hover:scale-110 transition-transform" /> Security Protocol
                  </span>
                  <FaChevronDown size={9} className={`text-slate-500 transition-transform duration-300 ${openAccordion === 1 ? 'rotate-180 text-indigo-400' : ''}`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out ${openAccordion === 1 ? 'max-h-32 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed bg-slate-900/40 p-3 rounded-xl border border-slate-800/30">
                    Always enforce multi-factor device authentication checks (2FA) and never provide or connect system credentials to dangerous third-party script utilities.
                  </p>
                </div>
              </div>

              {/* Item Accordion 2 */}
              <div className="border-b border-slate-800/60 overflow-hidden transition-colors">
                <button 
                  onClick={() => toggleAccordion(2)}
                  className="w-full flex justify-between items-center py-4 text-left hover:text-indigo-400 transition-all group"
                >
                  <span className="text-xs font-bold flex items-center gap-2.5">
                    <FaPalette className="text-indigo-400 group-hover:scale-110 transition-transform" /> Branding Assets Usage
                  </span>
                  <FaChevronDown size={9} className={`text-slate-500 transition-transform duration-300 ${openAccordion === 2 ? 'rotate-180 text-indigo-400' : ''}`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out ${openAccordion === 2 ? 'max-h-32 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed bg-slate-900/40 p-3 rounded-xl border border-slate-800/30">
                    Download official digital typography, raw assets packages, and design requirements metrics for product branding on the storage repository link.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}