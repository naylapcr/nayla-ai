import React, { useState } from 'react';
import { FaBox, FaCheckCircle, FaTruck, FaClock, FaEllipsisV, FaSearch } from "react-icons/fa";

export default function Orders() {
  const [activeTab, setActiveTab] = useState("All");

  const orders = [
    { id: "#LV-9921", user: "Giselle A.", item: "Velvet Lip Tint", date: "2 Mins ago", total: "145.000", status: "Processing", icon: <FaClock className="text-amber-500" />, bg: "bg-amber-50" },
    { id: "#LV-9920", user: "Karina J.", item: "Glow Cushion + 2 Masks", date: "1 Hour ago", total: "260.000", status: "Shipped", icon: <FaTruck className="text-[#6366f1]" />, bg: "bg-indigo-50" },
    { id: "#LV-9919", user: "Ningning V.", item: "Ethereal Palette", date: "3 Hours ago", total: "320.000", status: "Delivered", icon: <FaCheckCircle className="text-emerald-500" />, bg: "bg-emerald-50" },
    { id: "#LV-9918", user: "Winter K.", item: "Rose Dewy Mask", date: "Yesterday", total: "25.000", status: "Delivered", icon: <FaCheckCircle className="text-emerald-500" />, bg: "bg-emerald-50" },
  ];

  const filteredOrders = orders.filter(o => activeTab === "All" || o.status === activeTab);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700 font-sans pb-10 px-4 md:px-0">
      
      {/* 1. Header Section - Clean & Bold */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-[#111827] tracking-tighter italic">
            Order <span className="text-[#6366f1]">History</span>
          </h2>
          <p className="text-gray-400 text-sm mt-1 font-medium italic">Tracking your business journey to customers.</p>
        </div>

        {/* Tab Navigation - Pill Style */}
        <div className="flex bg-gray-100 p-1 rounded-full border border-gray-200">
          {["All", "Processing", "Shipped", "Delivered"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab ? "bg-[#6366f1] text-white shadow-lg" : "text-gray-400 hover:text-[#6366f1]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* 2. Search Bar - Minimalist Bloom Style */}
      <div className="relative max-w-md group">
        <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#6366f1] transition-colors" />
        <input 
          type="text" 
          placeholder="Search order ID or customer name..." 
          className="w-full pl-14 pr-8 py-4 rounded-2xl bg-white border border-gray-100 outline-none text-sm font-medium focus:ring-4 focus:ring-[#6366f1]/10 focus:border-[#6366f1]/50 transition-all shadow-sm"
        />
      </div>

      {/* 3. Orders List Style - Bento Card Style */}
      <div className="grid gap-4">
        {filteredOrders.map((order, i) => (
          <div 
            key={i} 
            className="group bg-white p-6 rounded-[2rem] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
          >
            {/* Order Info */}
            <div className="flex items-center gap-5 w-full md:w-auto">
              <div className={`${order.bg} w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110 duration-300`}>
                {order.icon}
              </div>
              <div>
                <p className="text-[10px] font-black text-[#6366f1] uppercase tracking-[0.2em] mb-0.5">{order.id}</p>
                <h4 className="text-lg font-black text-[#111827] tracking-tight">{order.user}</h4>
                <p className="text-xs text-gray-400 font-medium">{order.item}</p>
              </div>
            </div>

            {/* Middle Section: Time & Total */}
            <div className="flex flex-1 justify-around w-full md:w-auto md:border-x border-gray-100 py-2 md:py-0">
              <div className="text-center">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
                <p className="text-sm font-black text-[#111827]">Rp {order.total}</p>
              </div>
              <div className="text-center">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Ordered At</p>
                <p className="text-sm font-medium text-gray-500">{order.date}</p>
              </div>
            </div>

            {/* Status & Action */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <div className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border border-gray-100 group-hover:border-[#6366f1]/30 transition-all ${
                order.status === 'Delivered' ? 'text-emerald-500' : 'text-[#6366f1]'
              }`}>
                {order.status}
              </div>
              <button className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#111827] hover:text-white transition-all">
                <FaEllipsisV className="text-xs" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Small Summary Card - Dark Contrast Style */}
      <div className="bg-[#111827] p-8 md:p-12 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden mt-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#6366f1]/10 rounded-full blur-[80px]"></div>
        
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-16 h-16 bg-[#6366f1] rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg shadow-indigo-500/20">
            <FaBox />
          </div>
          <div>
            <h5 className="text-xl font-black text-white tracking-tight">Ready to pack?</h5>
            <p className="text-sm text-gray-400 font-medium italic">There are 12 orders waiting for your touch.</p>
          </div>
        </div>

        <button className="relative z-10 bg-[#6366f1] text-white px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-[#111827] transition-all shadow-xl shadow-indigo-500/20">
          Go to Warehouse
        </button>
      </div>
    </div>
  );
}