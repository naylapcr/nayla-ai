import React, { useState, useEffect } from 'react';
import { 
  FaCircleInfo, 
  FaChevronDown, 
  FaRocket, 
  FaShieldHeart, 
  FaPalette 
} from 'react-icons/fa6';

export default function ManagementHub() {
  // --- STATE UNTUK KOMPONEN INTERAKTIF ---
  // 1. State untuk Accordion (Menyimpan ID item yang sedang terbuka)
  const [openAccordion, setOpenAccordion] = useState(null);

  // 2. State untuk Skeleton (Simulasi loading selama 2 detik)
  const [isLoading, setIsLoading] = useState(true);

  // 3. State untuk Progress Bar
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulasi loading data
    const timer = setTimeout(() => setIsLoading(false), 2000);
    
    // Simulasi animasi progress bar saat halaman dibuka
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
    <div className="p-6 md:p-10 max-w-[1200px] mx-auto space-y-10 font-sans text-slate-800 animate-in fade-in duration-700">
      
      {/* HEADER SECTION */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic">
          Management <span className="text-[#6366f1]">Hub</span>
        </h1>
        <p className="text-sm text-slate-400 font-medium italic">Operational center for Luneve digital ecosystem.</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        
        {/* KIRI: PROGRESS & SKELETON AREA */}
        <div className="col-span-12 lg:col-span-7 space-y-8">
          
          {/* KOMPONEN 1: SHADCN PROGRESS (Target Penjualan) */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-lg font-black text-slate-900">Monthly Sales Target</h3>
                <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest">Q4 2026 Objectives</p>
              </div>
              <span className="text-2xl font-black text-[#6366f1]">{progress}%</span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#6366f1] rounded-full transition-all duration-1000 ease-out shadow-lg shadow-indigo-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="flex gap-4 items-center p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
              <FaRocket className="text-[#6366f1]" />
              <p className="text-[11px] font-bold text-indigo-700 leading-relaxed">
                You are almost there! Reach <span className="underline">80%</span> to unlock the quarterly bonus for the team.
              </p>
            </div>
          </div>

          {/* KOMPONEN 2: SHADCN SKELETON (Simulasi Loading Data) */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Incoming Restock Data</h4>
            
            {isLoading ? (
              // Tampilan Saat Loading (Skeleton)
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white p-5 rounded-[2rem] border border-slate-50 flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-200 rounded-2xl animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-slate-200 rounded-full w-1/3 animate-pulse" />
                      <div className="h-2 bg-slate-100 rounded-full w-1/2 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Tampilan Setelah Data "Dimuat"
              <div className="space-y-3 animate-in fade-in zoom-in-95 duration-500">
                <div className="bg-white p-5 rounded-[2rem] border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center text-xl font-bold">L</div>
                  <div>
                    <h5 className="text-sm font-black text-slate-800">Lip Glow Serum</h5>
                    <p className="text-[10px] text-slate-400 font-bold">240 Units arrived at Warehouse</p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-[2rem] border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center text-xl font-bold">C</div>
                  <div>
                    <h5 className="text-sm font-black text-slate-800">Cushion Foundation</h5>
                    <p className="text-[10px] text-slate-400 font-bold">45 Units under quality control</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* KANAN: ACCORDION & SEPARATOR AREA */}
        <div className="col-span-12 lg:col-span-5 space-y-8">
          
          <div className="bg-[#111827] p-8 rounded-[3rem] text-white relative overflow-hidden shadow-2xl shadow-slate-200">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#6366f1]/20 rounded-full blur-3xl"></div>
            
            <h3 className="text-lg font-black tracking-tight relative z-10">Admin Guide</h3>
            
            {/* KOMPONEN 3: SHADCN SEPARATOR (Garis Pembatas Elegan) */}
            <div className="h-[1px] w-full bg-slate-700 my-5 relative z-10" />

            {/* KOMPONEN 4: SHADCN ACCORDION (Buka-Tutup FAQ) */}
            <div className="space-y-2 relative z-10">
              
              {/* Item 1 */}
              <div className="border-b border-slate-800/50 overflow-hidden">
                <button 
                  onClick={() => toggleAccordion(1)}
                  className="w-full flex justify-between items-center py-4 text-left hover:text-indigo-400 transition-colors"
                >
                  <span className="text-xs font-bold flex items-center gap-2">
                    <FaShieldHeart className="text-indigo-500" /> Security Protocol
                  </span>
                  <FaChevronDown size={10} className={`transition-transform duration-300 ${openAccordion === 1 ? 'rotate-180' : ''}`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out ${openAccordion === 1 ? 'max-h-32 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                    Always enable Two-Factor Authentication (2FA) and never share your admin credentials with unauthorized third-party apps.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="border-b border-slate-800/50 overflow-hidden">
                <button 
                  onClick={() => toggleAccordion(2)}
                  className="w-full flex justify-between items-center py-4 text-left hover:text-indigo-400 transition-colors"
                >
                  <span className="text-xs font-bold flex items-center gap-2">
                    <FaPalette className="text-indigo-500" /> Branding Assets
                  </span>
                  <FaChevronDown size={10} className={`transition-transform duration-300 ${openAccordion === 2 ? 'rotate-180' : ''}`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out ${openAccordion === 2 ? 'max-h-32 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                    Download the latest version of Luneve high-res logos and marketing banners from the shared Google Drive folder.
                  </p>
                </div>
              </div>

            </div>

            <div className="mt-8 flex justify-center">
              <div className="px-4 py-2 bg-slate-800/50 rounded-xl border border-slate-700 flex items-center gap-2">
                <FaCircleInfo className="text-indigo-400" size={12} />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">System v4.2 Stable</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}