import React, { useState } from 'react';
import dataInventaris from './data.json'; // Pastikan file json tersedia

const InventoryApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [viewMode, setViewMode] = useState('guest'); // 'guest' atau 'admin'

  // Logika Filter dan Search
  const filteredData = dataInventaris.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || item.category === filterCategory;
    const matchesStatus = filterStatus === '' || item.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Logistics Asset Management</h1>
        
        {/* Kontrol Navigasi & Filter */}
        <div className="bg-white p-4 rounded-xl shadow-md mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2 bg-gray-200 p-1 rounded-lg">
            <button 
              onClick={() => setViewMode('guest')}
              className={`px-4 py-2 rounded-md ${viewMode === 'guest' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
            >Guest View</button>
            <button 
              onClick={() => setViewMode('admin')}
              className={`px-4 py-2 rounded-md ${viewMode === 'admin' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
            >Admin View</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Cari aset..." 
              className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select className="border p-2 rounded-lg" onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="">Semua Kategori</option>
              <option value="Heavy Equipment">Heavy Equipment</option>
              <option value="Storage">Storage</option>
            </select>
            <select className="border p-2 rounded-lg" onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="">Semua Status</option>
              <option value="Available">Available</option>
              <option value="In Stock">In Stock</option>
            </select>
          </div>
        </div>

        {/* Render Tampilan */}
        {viewMode === 'guest' ? (
          /* TAMPILAN GUEST (GRID CARD) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105">
                <img src={item.image} alt={item.name} className="h-48 w-full object-cover" />
                <div className="p-4">
                  <span className="text-xs font-semibold text-blue-600 uppercase">{item.category}</span>
                  <h3 className="text-lg font-bold mt-1">{item.name}</h3>
                  <div className="mt-3 text-sm text-gray-600">
                    <p>📍 {item.location.city} - {item.location.warehouse}</p>
                    <p>🛠 Spec: {item.specifications.brand} ({item.specifications.capacity})</p>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">{item.status}</span>
                    <button className="text-blue-600 font-semibold text-sm">Details →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* TAMPILAN ADMIN (TABLE) */
          <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="p-4">ID</th>
                  <th className="p-4">Asset Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Specifications</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Supplier</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-mono text-sm">{item.id}</td>
                    <td className="p-4 font-semibold">{item.name}</td>
                    <td className="p-4">{item.category}</td>
                    <td className="p-4 text-xs">
                      {item.specifications.brand} | {item.specifications.capacity}
                    </td>
                    <td className="p-4 text-xs">
                      {item.location.warehouse} (Shelf {item.location.shelf})
                    </td>
                    <td className="p-4 text-xs">
                      {item.supplier.name} ⭐{item.supplier.rating}
                    </td>
                    <td className="p-4">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold uppercase">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryApp;