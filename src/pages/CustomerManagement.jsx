import React, { useState } from 'react';
import { FaSearch, FaUserPlus, FaFilter, FaPen, FaTrashAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

export default function CustomerManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState('All');

  const [customers] = useState([
    { id: 'C001', name: 'Wonyoung Jang', email: 'wonyoung@luneve.com', phone: '+62 812-3456-7890', tier: 'VIP', totalOrders: 24, totalSpend: '8.450.000', joinDate: '12 Jan 2026', status: 'Active' },
    { id: 'C002', name: 'Somi Enomoto', email: 'somi.en@luneve.com', phone: '+62 813-9876-5432', tier: 'VIP', totalOrders: 18, totalSpend: '6.120.000', joinDate: '05 Feb 2026', status: 'Active' },
    { id: 'C003', name: 'Nayla Ramadhani', email: 'nayla@naylabeauty.id', phone: '+62 852-1122-3344', tier: 'Regular', totalOrders: 7, totalSpend: '1.850.000', joinDate: '20 Mar 2026', status: 'Active' },
  ]);

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = selectedTier === 'All' || c.tier === selectedTier;
    return matchesSearch && matchesTier;
  });

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-sans w-full p-6 md:p-10">
      <div className="max-w-[1600px] mx-auto space-y-8 w-full">
        
        {/* HEADER */}
        <div className="px-2 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Customer <span className="text-pink-500">Management</span>
            </h2>
            <p className="text-slate-400 text-xs mt-1">Manage and track your loyal customer base.</p>
          </div>
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-lg shadow-pink-500/20">
            <FaUserPlus className="inline mr-2" /> Add Customer
          </button>
        </div>

        {/* BENTO CARD */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
          
          {/* SEARCH & FILTER */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-64">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
              <input
                type="text"
                placeholder="Search name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 pl-9 pr-4 py-3 rounded-xl text-xs font-medium border-0 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all"
              />
            </div>
            
            <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-100">
              {['All', 'VIP', 'Regular'].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    selectedTier === tier ? "bg-white text-pink-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="pb-4 pl-2">Customer ID</th>
                  <th className="pb-4">Biodata</th>
                  <th className="pb-4">Contact</th>
                  <th className="pb-4">Tier</th>
                  <th className="pb-4 text-right">Total Spent</th>
                  <th className="pb-4 text-center">Status</th>
                  <th className="pb-4 text-right pr-2">Action</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-slate-50">
                {filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="py-5 pl-2 font-bold text-slate-900">{c.id}</td>
                    <td className="py-5 font-bold text-slate-700">{c.name}</td>
                    <td className="py-5 text-slate-500">
                      <div className="flex items-center gap-2"><FaEnvelope size={10}/> {c.email}</div>
                      <div className="flex items-center gap-2 mt-1"><FaPhoneAlt size={10}/> {c.phone}</div>
                    </td>
                    <td className="py-5">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${c.tier === 'VIP' ? 'bg-pink-50 text-pink-600' : 'bg-slate-100 text-slate-600'}`}>
                        {c.tier}
                      </span>
                    </td>
                    <td className="py-5 font-bold text-slate-900 text-right">Rp{c.totalSpend}</td>
                    <td className="py-5 text-center">
                      <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold">{c.status}</span>
                    </td>
                    <td className="py-5 pr-2 text-right">
                      <button className="p-2 text-slate-400 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all mr-1"><FaPen size={12} /></button>
                      <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"><FaTrashAlt size={12} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}