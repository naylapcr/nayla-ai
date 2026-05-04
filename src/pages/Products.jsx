import React, { useState } from 'react';
import { FaPlus, FaSearch, FaFilter, FaHeart, FaShoppingBag, FaStar } from "react-icons/fa";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const products = [
    { id: 1, name: "Velvet Lip Tint", cat: "Lips", stock: 120, price: 145000, img: "💄", rate: 4.9 },
    { id: 2, name: "Glow Cushion", cat: "Face", stock: 45, price: 210000, img: "🎨", rate: 4.8 },
    { id: 3, name: "Ethereal Palette", cat: "Eyes", stock: 15, price: 320000, img: "👁️", rate: 5.0 },
    { id: 4, name: "Rose Dewy Mask", cat: "Skincare", stock: 200, price: 25000, img: "🌸", rate: 4.7 },
    { id: 5, name: "Cloud Blush", cat: "Face", stock: 88, price: 115000, img: "☁️", rate: 4.9 },
    { id: 6, name: "Silk Eyeliner", cat: "Eyes", stock: 0, price: 85000, img: "✒️", rate: 4.6 },
  ];

  const categories = ["All", "Lips", "Face", "Eyes", "Skincare"];

  const filteredProducts = products.filter(p => 
    (activeCategory === "All" || p.cat === activeCategory) &&
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-in fade-in zoom-in duration-700 font-sans pb-10">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-2">
        <div>
          <h2 className="text-4xl font-light text-gray-800 tracking-tight">
            Curated <span className="font-bold text-[#f8b4b4]">Collection</span>
          </h2>
          <p className="text-gray-400 text-sm mt-2 font-medium">Manage your boutique inventory with elegance.</p>
        </div>
        <button className="group bg-black text-white px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-[#f8b4b4] transition-all shadow-xl shadow-gray-200">
          <FaPlus className="group-hover:rotate-90 transition-transform" /> Add New Product
        </button>
      </div>

      {/* 2. Search & Filter Bar - Glassmorphism Soft */}
      <div className="bg-white/60 backdrop-blur-md p-3 rounded-[3rem] border border-pink-50 flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-pink-200" />
          <input 
            type="text" 
            placeholder="Search our products..." 
            className="w-full pl-16 pr-8 py-4 rounded-full bg-[#fffafb] border-none outline-none text-sm font-medium placeholder:text-gray-300 focus:ring-2 focus:ring-[#f8b4b4]/20 transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto w-full lg:w-auto px-2 lg:px-0 no-scrollbar">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-4 rounded-full text-[10px] font-extrabold uppercase tracking-widest transition-all whitespace-nowrap ${
                activeCategory === cat 
                ? 'bg-[#f8b4b4] text-white shadow-lg shadow-pink-100' 
                : 'bg-transparent text-gray-400 hover:text-[#f8b4b4]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((p) => (
          <div key={p.id} className="group bg-white rounded-[3.5rem] border border-pink-50/50 overflow-hidden hover:shadow-[0_30px_60px_rgba(248,180,180,0.12)] transition-all duration-500 relative">
            
            {/* Tag Out of Stock */}
            {p.stock === 0 && (
              <div className="absolute top-6 left-6 z-10 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-gray-400">
                Sold Out
              </div>
            )}

            {/* Favorite Button */}
            <button className="absolute top-6 right-6 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-200 hover:text-pink-400 shadow-sm transition-colors">
              <FaHeart />
            </button>

            {/* Image Area */}
            <div className="h-64 bg-[#fffafb] flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-700 select-none">
              {p.img}
            </div>

            {/* Content Area */}
            <div className="p-8 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-extrabold text-[#f8b4b4] uppercase tracking-[0.2em]">{p.cat}</span>
                <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                  <FaStar className="text-yellow-400" /> {p.rate}
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-bold text-gray-800 tracking-tight group-hover:text-[#f8b4b4] transition-colors">{p.name}</h4>
                <p className="text-xs text-gray-400 mt-1 font-medium italic">Collection 2026</p>
              </div>

              <div className="flex justify-between items-end pt-4">
                <div>
                  <p className="text-[9px] font-extrabold text-gray-300 uppercase tracking-widest mb-1">Price</p>
                  <p className="text-lg font-black text-gray-800 leading-none">Rp {p.price.toLocaleString()}</p>
                </div>
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all ${p.stock === 0 ? 'bg-gray-50 text-gray-200' : 'bg-black text-white hover:bg-[#f8b4b4] cursor-pointer'}`}>
                  <FaShoppingBag className="text-sm" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Empty State */}
      {filteredProducts.length === 0 && (
        <div className="py-20 text-center flex flex-col items-center animate-in fade-in slide-in-from-top-4">
          <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center text-pink-200 text-3xl mb-4">
            <FaSearch />
          </div>
          <h3 className="text-xl font-bold text-gray-800">No products found</h3>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
}