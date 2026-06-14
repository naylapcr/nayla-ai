import React, { useState } from 'react';
import { FaSearch, FaUserPlus, FaFilter, FaEllipsisV, FaTrashAlt, FaPen, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

export default function CustomerManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState('All');

  // Data dummy pelanggan premium Luneve Boutique
  const [customers, setCustomers] = useState([
    { id: 'C001', name: 'Wonyoung Jang', email: 'wonyoung@luneve.com', phone: '+62 812-3456-7890', tier: 'VIP', totalOrders: 24, totalSpend: '8.450.000', joinDate: '12 Jan 2026', status: 'Active' },
    { id: 'C002', name: 'Somi Enomoto', email: 'somi.en@luneve.com', phone: '+62 813-9876-5432', tier: 'VIP', totalOrders: 18, totalSpend: '6.120.000', joinDate: '05 Feb 2026', status: 'Active' },
    { id: 'C003', name: 'Nayla Ramadhani', email: 'nayla@naylabeauty.id', phone: '+62 852-1122-3344', tier: 'Regular', totalOrders: 7, totalSpend: '1.850.000', joinDate: '20 Mar 2026', status: 'Active' },
    { id: 'C004', name: 'Karina Putri', email: 'karina.p@gmail.com', phone: '+62 821-5566-7788', tier: 'VIP', totalOrders: 31, totalSpend: '11.200.000', joinDate: '01 Apr 2026', status: 'Active' },
    { id: 'C005', name: 'Winter Aurelia', email: 'winter.aur@yahoo.com', phone: '+62 878-4433-2211', tier: 'Regular', totalOrders: 3, totalSpend: '550.000', joinDate: '14 May 2026', status: 'Inactive' },
  ]);

  // Filter logika pencarian dan tier
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = selectedTier === 'All' || customer.tier === selectedTier;
    return matchesSearch && matchesTier;
  });

  return (
    <div className="p-6 space-y-6 bg-[#fcf9f9] min-h-screen font-sans">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Data Pelanggan</h1>
          <p className="text-xs font-medium text-slate-400 italic mt-0.5">Kelola data pelanggan setia, riwayat transaksi, dan status keanggotaan VIP.</p>
        </div>
        <button className="bg-[#6366f1] hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide flex items-center gap-2 shadow-md shadow-indigo-500/10 transition-all">
          <FaUserPlus className="text-sm" /> Tambah Pelanggan
        </button>
      </div>

      {/* STATS SUMMARY (MATCHING LAYOUT ADMIN) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Total Pelanggan</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-slate-900">{customers.length}</span>
            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded-md">+2 Bulan Ini</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Member VIP</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-slate-900">{customers.filter(c => c.tier === 'VIP').length}</span>
            <span className="text-[10px] font-bold text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded-md">Tier Premium</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Pelanggan Aktif</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-slate-900">{customers.filter(c => c.status === 'Active').length}</span>
            <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded-md">92% Rasio Retensi</span>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-80 group">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#6366f1] transition-colors" />
          <input
            type="text"
            placeholder="Cari nama, email, atau ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-transparent focus:border-slate-200 outline-none text-xs font-medium text-slate-700 transition-all placeholder:text-slate-300"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5"><FaFilter /> Tier:</span>
          {['All', 'VIP', 'Regular'].map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedTier === tier 
                  ? 'bg-[#111827] text-white' 
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* DATA TABLE (MATCHING TEMPLATE PRODUCTS/ORDERS) */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">ID Pelanggan</th>
                <th className="py-4 px-6">Biodata</th>
                <th className="py-4 px-6">Kontak</th>
                <th className="py-4 px-6 text-center">Tier</th>
                <th className="py-4 px-6 text-center">Total Order</th>
                <th className="py-4 px-6 text-right">Total Belanja</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs font-medium text-slate-600">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-slate-50/40 transition-colors">
                    {/* ID */}
                    <td className="py-4 px-6 font-mono font-bold text-slate-400">{customer.id}</td>
                    
                    {/* Nama & Join Date */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900 text-sm">{customer.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">Bergabung: {customer.joinDate}</div>
                    </td>
                    
                    {/* Kontak */}
                    <td className="py-4 px-6 space-y-0.5">
                      <div className="flex items-center gap-1.5 text-slate-500"><FaEnvelope className="text-[10px] text-slate-300" /> {customer.email}</div>
                      <div className="flex items-center gap-1.5 text-slate-400 text-[11px]"><FaPhoneAlt className="text-[10px] text-slate-300" /> {customer.phone}</div>
                    </td>
                    
                    {/* Tier Badge */}
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-black tracking-wider uppercase ${
                        customer.tier === 'VIP' 
                          ? 'bg-amber-50 text-amber-600 border border-amber-100' 
                          : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                      }`}>
                        {customer.tier}
                      </span>
                    </td>
                    
                    {/* Total Orders */}
                    <td className="py-4 px-6 text-center font-bold text-slate-700">{customer.totalOrders}x</td>
                    
                    {/* Total Spend */}
                    <td className="py-4 px-6 text-right font-black text-slate-900">Rp {customer.totalSpend}</td>
                    
                    {/* Status */}
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        customer.status === 'Active' 
                          ? 'bg-emerald-50 text-emerald-600' 
                          : 'bg-slate-100 text-slate-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${customer.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                        {customer.status === 'Active' ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    
                    {/* Actions */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-[#6366f1] transition-all" title="Edit">
                          <FaPen className="text-[10px]" />
                        </button>
                        <button className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-red-500 transition-all" title="Hapus">
                          <FaTrashAlt className="text-[10px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-slate-400 italic bg-slate-50/20">
                    Tidak ada data pelanggan yang cocok dengan pencarian Anda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}