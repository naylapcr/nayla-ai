import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaSearch, FaHeart, FaShoppingBag, FaStar } from "react-icons/fa";
import { productsAPI } from '../services/productsAPI';

export default function Products() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const defaultProducts = [
    { id: 1, name: "Velvet Lip Tint", cat: "Lips", brand: "Luneve", stock: 120, price: 145000, img: "💄", rate: 4.9, description: "Hydrating matte finish lip tint." },
    { id: 2, name: "Glow Cushion Foundation", cat: "Face", brand: "Luneve", stock: 45, price: 210000, img: "🎨", rate: 4.8, description: "Lightweight dewy cushion foundation." },
    { id: 3, name: "Ethereal Eyeshadow Palette", cat: "Eyes", brand: "Luneve", stock: 15, price: 320000, img: "👁️", rate: 5.0, description: "9-color highly pigmented palette." },
    { id: 4, name: "Rose Dewy Serum", cat: "Skincare", brand: "Luneve", stock: 200, price: 185000, img: "🌸", rate: 4.7, description: "Rose infused deep hydration essence." },
    { id: 5, name: "Cloud Blush", cat: "Face", brand: "Luneve", stock: 88, price: 115000, img: "☁️", rate: 4.9, description: "Soft cloud-like powder blush." },
    { id: 6, name: "Silk Precision Eyeliner", cat: "Eyes", brand: "Luneve", stock: 35, price: 85000, img: "✒️", rate: 4.6, description: "Waterproof liquid eyeliner brush." },
  ];
  const [products, setProducts] = useState(defaultProducts);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    category: 'Lips',
    brand: '',
    price: '',
    stock: '',
    description: ''
  });

  const fetchProducts = () => {
    productsAPI.getAll().then(data => {
      if (data && data.length > 0) {
        const mapped = data.map(p => ({
          id: p.id,
          name: p.title,
          cat: p.category,
          brand: p.brand,
          price: p.price,
          stock: p.stock,
          img: p.img || '🛍️',
          rate: p.rate || 0.0,
          description: p.description
        }));
        setProducts(mapped);
      }
    }).catch(err => console.error("Error fetching products:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const catPrefixes = { Lips: "LP", Face: "FC", Eyes: "EY", Skincare: "SC" };
    const prefix = catPrefixes[newProduct.category] || "PR";
    const randomNum = Math.floor(100 + Math.random() * 900);
    const code = `LNV-${prefix}-${randomNum}`;
    
    const catEmojis = { Lips: "💄", Face: "🎨", Eyes: "👁️", Skincare: "🌸" };
    const img = catEmojis[newProduct.category] || "🛍️";

    const payload = {
      title: newProduct.title,
      code: code,
      category: newProduct.category,
      brand: newProduct.brand,
      price: parseInt(newProduct.price),
      stock: parseInt(newProduct.stock),
      img: img,
      rate: 4.5,
      description: newProduct.description
    };

    productsAPI.create(payload).then(() => {
      setIsAddModalOpen(false);
      setNewProduct({
        title: '',
        category: 'Lips',
        brand: '',
        price: '',
        stock: '',
        description: ''
      });
      fetchProducts();
    }).catch(err => console.error("Error creating product:", err));
  };

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
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-lg shadow-pink-500/20"
          >
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
              onClick={() => navigate(`/admin/products/${p.id}`)}
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

      {/* ADD PRODUCT DIALOG/MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div
            className="bg-white w-full max-w-md rounded-[2rem] border border-slate-100 shadow-2xl p-6 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Add New Product</h3>
                <p className="text-xs text-slate-400 font-medium">Insert a new item to Luneve inventory.</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <span className="text-xl">&times;</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs font-semibold text-slate-700">
              <div className="space-y-1">
                <label className="text-slate-400">Product Title</label>
                <input
                  type="text"
                  required
                  name="title"
                  value={newProduct.title}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                  placeholder="e.g. Velvet Lip Tint"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400">Category</label>
                  <select
                    name="category"
                    value={newProduct.category}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/20 font-bold"
                  >
                    <option value="Lips">Lips</option>
                    <option value="Face">Face</option>
                    <option value="Eyes">Eyes</option>
                    <option value="Skincare">Skincare</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Brand</label>
                  <input
                    type="text"
                    required
                    name="brand"
                    value={newProduct.brand}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                    placeholder="e.g. Bloom Beauty"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400">Price (IDR)</label>
                  <input
                    type="number"
                    required
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/20 font-bold"
                    placeholder="e.g. 145000"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Stock</label>
                  <input
                    type="number"
                    required
                    name="stock"
                    value={newProduct.stock}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/20 font-bold"
                    placeholder="e.g. 50"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Description</label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/20 font-medium text-slate-800"
                  placeholder="Tell us about the product..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-all font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-pink-500 text-white rounded-xl shadow-md shadow-pink-100 hover:bg-pink-600 transition-all font-bold"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}