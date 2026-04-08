import React, { useState } from 'react';
import carData from './data.json'; // Pastikan file JSON kamu bernama cars.json

export default function CarManager() {
  const [cars] = useState(carData);
  const [view, setView] = useState('guest'); // 'guest' atau 'admin'
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterTrans, setFilterTrans] = useState('');

  // Logika Filtering: Mencari berdasarkan Nama Mobil atau Brand
  const filteredData = cars.filter((item) => {
    return (
      (item.car_name.toLowerCase().includes(search.toLowerCase()) || 
       item.brand.toLowerCase().includes(search.toLowerCase())) &&
      (filterCategory === '' || item.category === filterCategory) &&
      (filterTrans === '' || item.specifications.transmission === filterTrans)
    );
  });

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & View Switcher */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800">DriveEase <span className="text-blue-600">Rental</span></h1>
            <p className="text-slate-500 text-sm">Manajemen Armada Kendaraan Premium</p>
          </div>
          <div className="flex bg-white rounded-xl p-1 shadow-sm border border-slate-200">
            <button 
              onClick={() => setView('guest')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${view === 'guest' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}>
              Guest View
            </button>
            <button 
              onClick={() => setView('admin')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${view === 'admin' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}>
              Admin View
            </button>
          </div>
        </header>

        {/* Search & Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Cari Mobil</label>
            <input
              type="text"
              placeholder="Cari model atau brand..."
              className="p-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 border-slate-200"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Kategori</label>
            <select 
              className="p-2.5 border rounded-xl outline-none bg-slate-50 border-slate-200 focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">Semua Kategori</option>
              <option value="Electric">Electric</option>
              <option value="Luxury">Luxury</option>
              <option value="Sport">Sport</option>
              <option value="SUV">SUV</option>
              <option value="Offroad">Offroad</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Transmisi</label>
            <select 
              className="p-2.5 border rounded-xl outline-none bg-slate-50 border-slate-200 focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFilterTrans(e.target.value)}
            >
              <option value="">Semua Transmisi</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
        </div>

        {/* Tampilan Konten */}
        {view === 'guest' ? (
          /* GUEST VIEW: GRID CARD */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map((car) => (
              <div key={car.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
                <div className="relative">
                  <img src={car.image} alt={car.car_name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase shadow-sm ${car.status === 'Available' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {car.status}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">{car.brand}</p>
                      <h3 className="font-bold text-lg text-slate-800 leading-tight">{car.car_name}</h3>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-4 text-slate-500 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="bg-slate-100 p-1.5 rounded-md">⚙️ {car.specifications.transmission}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="bg-slate-100 p-1.5 rounded-md">👤 {car.specifications.seats} Kursi</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-50">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Harga/Hari</p>
                      <span className="font-extrabold text-slate-900 text-lg">Rp {car.price_per_day.toLocaleString()}</span>
                    </div>
                    <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors">
                      Sewa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ADMIN VIEW: TABLE */
          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-200">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-4 border-b text-xs font-bold text-slate-400 uppercase">ID</th>
                  <th className="p-4 border-b text-xs font-bold text-slate-400 uppercase">Mobil</th>
                  <th className="p-4 border-b text-xs font-bold text-slate-400 uppercase">Kategori</th>
                  <th className="p-4 border-b text-xs font-bold text-slate-400 uppercase">Spesifikasi</th>
                  <th className="p-4 border-b text-xs font-bold text-slate-400 uppercase">Owner</th>
                  <th className="p-4 border-b text-xs font-bold text-slate-400 uppercase">Status</th>
                  <th className="p-4 border-b text-xs font-bold text-slate-400 uppercase">Harga</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.map((car) => (
                  <tr key={car.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-4 text-slate-400 font-mono text-sm">#{car.id}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={car.image} className="w-12 h-9 rounded-md object-cover shadow-sm" />
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{car.car_name}</p>
                          <p className="text-xs text-slate-500">{car.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm">
                      <span className="px-2 py-1 bg-slate-100 rounded text-slate-600">{car.category}</span>
                    </td>
                    <td className="p-4 text-xs text-slate-600">
                      {car.specifications.fuel_type} | {car.specifications.transmission}
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-medium">{car.owner.name}</p>
                      <p className="text-[10px] text-yellow-500">⭐ {car.owner.rating}</p>
                    </td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${car.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {car.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-blue-600 text-sm">Rp {car.price_per_day.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-400 font-medium">Mobil yang kamu cari tidak ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
}