import React, { useState } from 'react';
import { FaBox, FaCheckCircle, FaTruck, FaClock, FaEllipsisV, FaSearch } from "react-icons/fa";

export default function Orders() {
  const [activeTab, setActiveTab] = useState("All");

  const orders = [
    { id: "#LV-9921", user: "Giselle A.", item: "Velvet Lip Tint", date: "2 Mins ago", total: "145.000", status: "Processing", icon: <FaClock className="text-amber-400" />, bg: "bg-amber-50" },
    { id: "#LV-9920", user: "Karina J.", item: "Glow Cushion + 2 Masks", date: "1 Hour ago", total: "260.000", status: "Shipped", icon: <FaTruck className="text-blue-400" />, bg: "bg-blue-50" },
    { id: "#LV-9919", user: "Ningning V.", item: "Ethereal Palette", date: "3 Hours ago", total: "320.000", status: "Delivered", icon: <FaCheckCircle className="text-emerald-400" />, bg: "bg-emerald-50" },
    { id: "#LV-9918", user: "Winter K.", item: "Rose Dewy Mask", date: "Yesterday", total: "25.000", status: "Delivered", icon: <FaCheckCircle className="text-emerald-400" />, bg: "bg-emerald-50" },
  ];

  const filteredOrders = orders.filter(o => activeTab === "All" || o.status === activeTab);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-700 font-sans pb-10">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-2">
        <div>
          <h2 className="text-4xl font-light text-gray-800 tracking-tight">
            Order <span className="font-bold text-[#f8b4b4]">History</span>
          </h2>
          <p className="text-gray-400 text-sm mt-2 font-medium">Tracking your boutique's journey to customers.</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-full border border-pink-50 shadow-sm">
          {["All", "Processing", "Shipped", "Delivered"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest transition-all ${
                activeTab === tab ? "bg-black text-white shadow-lg" : "text-gray-400 hover:text-[#f8b4b4]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Search Bar Minimalist */}
      <div className="relative max-w-md">
        <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-pink-200" />
        <input 
          type="text" 
          placeholder="Find order ID or customer name..." 
          className="w-full pl-16 pr-8 py-4 rounded-[2rem] bg-white border border-pink-50 outline-none text-sm font-medium focus:ring-2 focus:ring-[#f8b4b4]/20 transition-all shadow-sm"
        />
      </div>

      {/* 3. Orders List Style */}
      <div className="space-y-4">
        {filteredOrders.map((order, i) => (
          <div 
            key={i} 
            className="group bg-white p-6 md:p-8 rounded-[3rem] border border-pink-50/50 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-[0_20px_40px_rgba(248,180,180,0.1)] transition-all duration-500"
          >
            {/* Order Info */}
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className={`${order.bg} w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-2xl`}>
                {order.icon}
              </div>
              <div>
                <p className="text-[10px] font-black text-[#f8b4b4] uppercase tracking-[0.2em] mb-1">{order.id}</p>
                <h4 className="text-lg font-bold text-gray-800">{order.user}</h4>
                <p className="text-xs text-gray-400 font-medium">{order.item}</p>
              </div>
            </div>

            {/* Middle Section: Time & Total */}
            <div className="flex flex-1 justify-around w-full md:w-auto border-y md:border-y-0 md:border-x border-pink-50 py-4 md:py-0">
              <div className="text-center">
                <p className="text-[9px] font-extrabold text-gray-300 uppercase tracking-widest mb-1">Total Amount</p>
                <p className="text-sm font-black text-gray-800 tracking-tight">Rp {order.total}</p>
              </div>
              <div className="text-center">
                <p className="text-[9px] font-extrabold text-gray-300 uppercase tracking-widest mb-1">Ordered At</p>
                <p className="text-sm font-medium text-gray-500">{order.date}</p>
              </div>
            </div>

            {/* Actions & Status */}
            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
              <div className="px-6 py-2 rounded-full border border-pink-50 text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:border-[#f8b4b4] group-hover:text-[#f8b4b4] transition-all">
                {order.status}
              </div>
              <button className="w-12 h-12 rounded-2xl bg-[#fffafb] flex items-center justify-center text-gray-300 hover:bg-black hover:text-white transition-all">
                <FaEllipsisV />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Small Summary Card */}
      <div className="bg-[#fff5f5] p-10 rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-8 border border-pink-100/50 mt-12">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center text-3xl shadow-sm text-[#f8b4b4]">
            <FaBox />
          </div>
          <div>
            <h5 className="text-xl font-bold text-gray-800">Ready to pack?</h5>
            <p className="text-sm text-[#f8b4b4] font-medium italic">There are 12 orders waiting for your touch.</p>
          </div>
        </div>
        <button className="bg-white text-black px-10 py-4 rounded-full text-[11px] font-extrabold uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-xl shadow-pink-200/20">
          Go to Warehouse
        </button>
      </div>
    </div>
  );
}