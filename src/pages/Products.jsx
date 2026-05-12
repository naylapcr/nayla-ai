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
    <div className="space-y-8 animate-in fade-in zoom-in duration-700 font-sans pb-10">
      
      {/* 1. Header Section - Bold & High Contrast */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-2">
        <div>
          <h2 className="text-4xl font-black text-[#111827] tracking-tighter italic">
            Bloom <span className="text-[#6366f1]">Collection</span>
          </h2>
          <p className="text-gray-400 text-sm mt-1 font-medium italic">Manage your boutique inventory with elegance.</p>
        </div>
        <button className="group bg-[#111827] text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-[#6366f1] transition-all shadow-xl shadow-indigo-500/10">
          <FaPlus className="group-hover:rotate-90 transition-transform" /> Add New Product
        </button>
      </div>

      {/* 2. Filter Bar - Bento Style */}
      <div className="bg-white p-2 rounded-3xl border border-gray-100 flex flex-col lg:flex-row gap-4 items-center shadow-sm">
        <div className="relative flex-1 w-full">
          <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
          <input 
            type="text" 
            placeholder="Find something special..." 
            className="w-full pl-14 pr-8 py-4 rounded-2xl bg-gray-50 border-none outline-none text-sm font-medium focus:ring-2 focus:ring-[#6366f1]/10 transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-1 overflow-x-auto w-full lg:w-auto px-2 lg:px-0 no-scrollbar">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeCategory === cat 
                ? 'bg-[#6366f1] text-white shadow-lg shadow-indigo-200' 
                : 'text-gray-400 hover:text-[#6366f1]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Product Grid - Premium Card Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((p) => (
          <div 
            key={p.id} 
            onClick={() => navigate(`/products/${p.id}`)}
            className="group bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500 relative cursor-pointer"
          >
            
            {/* Stock Badge */}
            <div className={`absolute top-5 left-5 z-10 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest backdrop-blur-md ${
              p.stock === 0 ? 'bg-red-50 text-red-500' : 'bg-white/80 text-[#6366f1]'
            }`}>
              {p.stock === 0 ? 'Sold Out' : `${p.stock} in stock`}
            </div>

            {/* Favorite Button */}
            <button className="absolute top-5 right-5 z-10 w-10 h-10 bg-white border border-gray-50 rounded-full flex items-center justify-center text-gray-200 hover:text-red-400 shadow-sm transition-all hover:scale-110">
              <FaHeart />
            </button>

            {/* Image/Emoji Area */}
            <div className="h-56 bg-gray-50 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-700">
              {p.img}
            </div>

            {/* Content Area */}
            <div className="p-7 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-[#6366f1] uppercase tracking-[0.2em]">{p.cat}</span>
                <div className="flex items-center gap-1 text-[10px] font-black text-gray-400">
                  <FaStar className="text-amber-400" /> {p.rate}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-black text-[#111827] tracking-tight group-hover:text-[#6366f1] transition-colors">{p.name}</h4>
                <p className="text-[10px] text-gray-400 mt-0.5 font-bold uppercase tracking-widest">Premium Edition</p>
              </div>

              <div className="flex justify-between items-end pt-2">
                <div>
                  <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Price Tag</p>
                  <p className="text-lg font-black text-[#111827]">Rp {p.price.toLocaleString()}</p>
                </div>
                <button className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all ${
                  p.stock === 0 
                  ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
                  : 'bg-[#111827] text-white hover:bg-[#6366f1] shadow-lg shadow-indigo-500/10'
                }`}>
                  <FaShoppingBag className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Empty State */}
      {filteredProducts.length === 0 && (
        <div className="py-20 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-200 text-2xl mb-4 border border-gray-100">
            <FaSearch />
          </div>
          <h3 className="text-xl font-black text-[#111827]">No match found</h3>
          <p className="text-gray-400 text-sm mt-1 font-medium">Try another keyword or category.</p>
        </div>
      )}
    </div>
  );
}