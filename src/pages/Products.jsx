import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaSearch, FaHeart, FaShoppingBag, FaStar } from "react-icons/fa";

export default function Products() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const products = [
    { id: 1, name: "Velvet Lip Tint", cat: "Lips", stock: 120, price: 145000, img: "💄", rate: 4.9 },
    { id: 2, name: "Glow Cushion", cat: "Face", stock: 45, price: 210000, img: "🎨", rate: 4.8 },
    { id: 3, name: "Ethereal Palette", cat: "Eyes", stock: 15, price: 320000, img: "👁️", rate: 5.0 },
  ];

  const categories = ["All", "Lips", "Face", "Eyes", "Skincare"];
  const filteredProducts = products.filter(p => 
    (activeCategory === "All" || p.cat === activeCategory) &&
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-sans w-full p-6 md:p-10">
      <div className="max-w-[1600px] mx-auto space-y-8 w-full">
        
        {/* HEADER */}
        <div className="px-2 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Bloom <span className="text-pink-500">Collection</span>
            </h2>
            <p className="text-slate-400 text-xs mt-1">Manage your boutique inventory with elegance.</p>
          </div>
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-lg shadow-pink-500/20">
            <FaPlus className="inline mr-2" /> Add Product
          </button>
        </div>

        {/* FILTER & SEARCH */}
        <div className="bg-white p-2 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col lg:flex-row gap-2 items-center">
          <div className="relative flex-1 w-full">
            <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
            <input 
              type="text" 
              placeholder="Find something special..." 
              className="w-full pl-14 pr-8 py-4 rounded-3xl bg-slate-50 border-0 outline-none text-xs font-medium text-slate-900 focus:ring-2 focus:ring-pink-500/20 transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-1 overflow-x-auto w-full lg:w-auto px-4 lg:px-0">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeCategory === cat 
                  ? 'bg-pink-500 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-pink-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <div 
              key={p.id} 
              onClick={() => navigate(`/products/${p.id}`)}
              className="bg-white p-6 rounded-[2.5rem] border border-slate-100 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="h-40 bg-slate-50 rounded-[2rem] flex items-center justify-center text-5xl mb-6 group-hover:scale-105 transition-transform">
                {p.img}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest">{p.cat}</span>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                    <FaStar className="text-amber-400" /> {p.rate}
                  </div>
                </div>
                <h4 className="text-md font-black text-slate-900 tracking-tight">{p.name}</h4>
                <div className="flex justify-between items-center pt-2">
                  <p className="text-sm font-black text-slate-900">Rp {p.price.toLocaleString()}</p>
                  <button className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-pink-500 transition-colors">
                    <FaShoppingBag size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}