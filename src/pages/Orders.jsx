import React, { useState, useEffect, useRef } from 'react';
import { FaBox, FaMagnifyingGlass } from "react-icons/fa6";
import { ordersAPI } from '../services/ordersAPI';

export default function Orders() {
  const [activeTab, setActiveTab] = useState("All");
  const [globalFilter, setGlobalFilter] = useState("");
  const defaultOrders = [
    { id: "#LV-8521", dbId: "1", user: "Nabila Syakieb", item: "Luneve Lip Glow Serum +2 other items", date: "30 Jun 2026", total: "320.000", status: "In Progress" },
    { id: "#LV-8784", dbId: "2", user: "Aurelia Putri", item: "Glow Cushion Foundation +1 other item", date: "29 Jun 2026", total: "450.000", status: "In Progress" },
    { id: "#LV-8689", dbId: "3", user: "Clarissa Dewi", item: "Ethereal Eyeshadow Palette +3 other items", date: "28 Jun 2026", total: "280.000", status: "Completed" },
    { id: "#LV-8901", dbId: "4", user: "Jessica Mila", item: "Rose Dewy Serum", date: "27 Jun 2026", total: "185.000", status: "Completed" },
    { id: "#LV-8912", dbId: "5", user: "Amanda Rawles", item: "Cloud Blush +1 other item", date: "25 Jun 2026", total: "230.000", status: "Pending" },
  ];
  const [orders, setOrders] = useState(defaultOrders);
  const searchInputRef = useRef(null);

  const fetchOrders = () => {
    ordersAPI.getAll().then(data => {
      if (data && data.length > 0) {
        const mapped = data.map(o => {
          const itemNames = o.order_items?.map(i => i.product_name) || [];
          const firstItem = itemNames[0] || "No items";
          const metaText = itemNames.length > 1 ? `+${itemNames.length - 1} other products` : "";
          return {
            id: `#LV-${o.id.slice(0, 4).toUpperCase()}`,
            dbId: o.id,
            user: o.users?.name || 'Guest',
            item: firstItem + (metaText ? ` ${metaText}` : ""),
            date: new Date(o.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
            total: o.total.toLocaleString('id-ID'),
            status: o.status
          };
        });
        setOrders(mapped);
      }
    }).catch(err => console.error("Error loading orders:", err));
  };

  useEffect(() => {
    fetchOrders();
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    ordersAPI.updateStatus(orderId, newStatus).then(() => {
      fetchOrders();
    }).catch(err => console.error("Error updating order status:", err));
  };

  const filteredOrders = orders.filter(o => {
    const matchesTab = activeTab === "All" || o.status === activeTab;
    const matchesSearch = 
      o.user.toLowerCase().includes(globalFilter.toLowerCase()) || 
      o.id.toLowerCase().includes(globalFilter.toLowerCase()) ||
      o.item.toLowerCase().includes(globalFilter.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-sans w-full">
      <div className="flex-1 p-6 md:p-10 max-w-[1600px] mx-auto space-y-8 w-full">
        
        {/* HEADER */}
        <div className="px-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Order <span className="text-pink-500">History</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">Tracking your business journey to customers.</p>
        </div>

        {/* BENTO CARD */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
          
          {/* TOP BAR: TABS & SEARCH */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-100">
              {["All", "Processing", "Shipped", "Delivered"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === tab ? "bg-white text-pink-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <FaMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
              <input
                type="text"
                placeholder="Search ID or customer..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="w-full bg-slate-50 pl-9 pr-4 py-2.5 rounded-xl text-xs font-medium border-0 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="pb-4 pl-2">Order ID</th>
                  <th className="pb-4">Customer</th>
                  <th className="pb-4">Item</th>
                  <th className="pb-4">Date</th>
                  <th className="pb-4">Total</th>
                  <th className="pb-4 pr-2">Status</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-slate-50">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="py-5 pl-2 font-bold text-slate-900">{order.id}</td>
                    <td className="py-5 font-bold text-slate-700">{order.user}</td>
                    <td className="py-5 font-medium text-slate-600">{order.item}</td>
                    <td className="py-5 text-slate-400">{order.date}</td>
                    <td className="py-5 font-bold text-slate-900">Rp{order.total}</td>
                    <td className="py-5 pr-2">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.dbId, e.target.value)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide border-0 outline-none cursor-pointer ${
                          order.status === "Delivered" 
                            ? "bg-emerald-50 text-emerald-600" 
                            : order.status === "Shipped" 
                              ? "bg-indigo-50 text-indigo-600" 
                              : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        <option value="Processing" className="bg-white text-slate-800">Processing</option>
                        <option value="Shipped" className="bg-white text-slate-800">Shipped</option>
                        <option value="Delivered" className="bg-white text-slate-800">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SUMMARY CARD */}
        <div className="bg-slate-900 p-8 md:p-10 rounded-[2.5rem] flex items-center justify-between gap-8 relative overflow-hidden">
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-14 h-14 bg-pink-500 rounded-2xl flex items-center justify-center text-white">
              <FaBox size={20} />
            </div>
            <div>
              <h5 className="text-lg font-black text-white tracking-tight">Ready to pack?</h5>
              <p className="text-xs text-slate-400 font-medium">There are {orders.filter(o => o.status === 'Processing').length} orders waiting for your action.</p>
            </div>
          </div>
          <button className="bg-white text-slate-900 px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-pink-50 transition-all">
            Warehouse
          </button>
        </div>
      </div>

    </div>
  );
}