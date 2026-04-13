import React, { useState } from 'react';
import carData from './data.json'; 

export default function CarManager() {
  const [cars] = useState(carData);
  const [view, setView] = useState('guest'); 
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterTrans, setFilterTrans] = useState('');

  const filteredData = cars.filter((item) => {
    return (
      (item.car_name.toLowerCase().includes(search.toLowerCase()) || 
       item.brand.toLowerCase().includes(search.toLowerCase())) &&
      (filterCategory === '' || item.category === filterCategory) &&
      (filterTrans === '' || item.specifications.transmission === filterTrans)
    );
  });

  return (
    <div className="p-4 md:p-10 bg-[#F0F4F8] min-h-screen font-sans text-slate-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Navbar-style Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 bg-white/40 backdrop-blur-md p-6 rounded-[2.5rem] border border-white shadow-xl shadow-slate-200/40">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 rotate-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Velo<span className="text-indigo-600">Drive</span></h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Premium Fleet Management</p>
            </div>
          </div>
          
          <div className="flex bg-slate-100 rounded-2xl p-1.5 shadow-inner">
            <button 
              onClick={() => setView('guest')}
              className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-500 ${view === 'guest' ? 'bg-white text-indigo-600 shadow-md translate-y-[-2px]' : 'text-slate-400 hover:text-slate-600'}`}>
              Browse
            </button>
            <button 
              onClick={() => setView('admin')}
              className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-500 ${view === 'admin' ? 'bg-white text-indigo-600 shadow-md translate-y-[-2px]' : 'text-slate-400 hover:text-slate-600'}`}>
              Dashboard
            </button>
          </div>
        </header>

        {/* Search & Filter - Pill Shaped */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          <div className="flex-1 min-w-[300px] relative group">
            <input
              type="text"
              placeholder="Cari mobil impian Anda..."
              className="w-full bg-white border-none py-4 px-6 pr-12 rounded-[2rem] shadow-sm group-hover:shadow-md transition-all outline-none text-slate-600 font-medium"
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-indigo-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>
          
          <select 
            className="bg-white border-none py-4 px-6 rounded-[2rem] shadow-sm outline-none text-slate-500 font-bold text-sm cursor-pointer hover:shadow-md transition-all appearance-none"
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">Category: All</option>
            <option value="Electric">⚡ Electric</option>
            <option value="Luxury">💎 Luxury</option>
            <option value="Sport">🏁 Sport</option>
            <option value="SUV">🏔️ SUV</option>
          </select>

          <select 
            className="bg-white border-none py-4 px-6 rounded-[2rem] shadow-sm outline-none text-slate-500 font-bold text-sm cursor-pointer hover:shadow-md transition-all appearance-none"
            onChange={(e) => setFilterTrans(e.target.value)}
          >
            <option value="">Gear: All</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        {/* Content */}
        {view === 'guest' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredData.map((car) => (
              <div key={car.id} className="group bg-white rounded-[2.5rem] p-4 shadow-sm hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 border border-transparent hover:border-indigo-50">
                <div className="relative rounded-[2rem] overflow-hidden mb-6 h-48 bg-slate-100">
                  <img src={car.image} alt={car.car_name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md border border-white/20 shadow-lg ${car.status === 'Available' ? 'bg-emerald-400/80 text-white' : 'bg-slate-400/80 text-white'}`}>
                      {car.status}
                    </span>
                  </div>
                </div>
                
                <div className="px-3 pb-4">
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">{car.brand}</p>
                  <h3 className="font-bold text-xl text-slate-800 tracking-tight mb-4">{car.car_name}</h3>
                  
                  <div className="flex gap-4 mb-6">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                      <span className="text-xs font-bold">{car.specifications.transmission}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      <span className="text-xs font-bold">{car.specifications.seats} Seats</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg font-bold text-slate-900">Rp {car.price_per_day.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-400 font-bold block">per hari</span>
                    </div>
                    <button className="bg-indigo-600 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-100 hover:bg-slate-900 transition-all active:scale-95">
                      Rent
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-50">
                    <th className="p-6 text-[10px] font-black text-slate-300 uppercase tracking-widest">Model Info</th>
                    <th className="p-6 text-[10px] font-black text-slate-300 uppercase tracking-widest">Specs</th>
                    <th className="p-6 text-[10px] font-black text-slate-300 uppercase tracking-widest">Ownership</th>
                    <th className="p-6 text-[10px] font-black text-slate-300 uppercase tracking-widest">Status</th>
                    <th className="p-6 text-[10px] font-black text-slate-300 uppercase tracking-widest">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredData.map((car) => (
                    <tr key={car.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <img src={car.image} className="w-16 h-10 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform" />
                          <div>
                            <p className="font-bold text-slate-800 tracking-tight">{car.car_name}</p>
                            <p className="text-[10px] font-bold text-indigo-500">{car.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 text-[11px] font-bold text-slate-400">
                        {car.specifications.fuel_type} • {car.specifications.transmission}
                      </td>
                      <td className="p-6">
                        <p className="text-xs font-bold text-slate-700">{car.owner.name}</p>
                        <p className="text-[10px] text-amber-500 font-black">⭐ {car.owner.rating}</p>
                      </td>
                      <td className="p-6">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase ${car.status === 'Available' ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-50 text-slate-400'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${car.status === 'Available' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></span>
                          {car.status}
                        </span>
                      </td>
                      <td className="p-6 text-sm font-black text-slate-900 italic">
                        Rp {car.price_per_day.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center shadow-sm mb-6 border border-slate-100 text-slate-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800">Unit tidak tersedia</h3>
            <p className="text-slate-400 text-sm font-medium">Coba gunakan filter atau kata kunci lain.</p>
          </div>
        )}
      </div>
    </div>
  );
}