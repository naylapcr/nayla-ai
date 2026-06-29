import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaStar, FaBox, FaChartLine, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { productsAPI } from '../services/productsAPI';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState({
    title: '',
    category: 'Lips',
    brand: '',
    price: '',
    stock: '',
    description: ''
  });

  const fetchProduct = () => {
    setLoading(true);
    productsAPI.getById(id).then(data => {
      if (data && data.length > 0) {
        setProduct(data[0]);
        setEditProduct({
          title: data[0].title,
          category: data[0].category,
          brand: data[0].brand,
          price: data[0].price,
          stock: data[0].stock,
          description: data[0].description
        });
      } else {
        setProduct(null);
      }
      setLoading(false);
    }).catch(err => {
      console.error("Error fetching product:", err);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: editProduct.title,
      category: editProduct.category,
      brand: editProduct.brand,
      price: parseInt(editProduct.price),
      stock: parseInt(editProduct.stock),
      description: editProduct.description
    };
    productsAPI.update(id, payload).then(() => {
      setIsEditModalOpen(false);
      fetchProduct();
    }).catch(err => console.error("Error updating product:", err));
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      productsAPI.delete(id).then(() => {
        navigate('/admin/products');
      }).catch(err => console.error("Error deleting product:", err));
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center flex h-screen items-center justify-center font-sans text-pink-500 italic animate-pulse">
        Loading product details...
      </div>
    );
  }

  // Jika produk tidak ditemukan di database
  if (!product) {
    return (
      <div className="py-20 text-center flex flex-col items-center font-sans">
        <h3 className="text-2xl font-black text-[#111827]">Product Not Found</h3>
        <p className="text-gray-400 text-sm mt-2">The product ID may be incorrect or has been removed.</p>
        <button onClick={() => navigate('/admin/products')} className="mt-6 bg-[#6366f1] text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest">
          Return to Products
        </button>
      </div>
    );
  }

  // Kalkulasi Dummy untuk Laporan Analitik Keuangan Produk
  const salesThisMonth = Math.floor(product.stock * 1.5) + 12;
  const revenueThisMonth = salesThisMonth * product.price;

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-700 font-sans pb-10 px-4 md:px-0">
      
      {/* 1. Navigasi Atas */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-sm font-black text-gray-400 hover:text-[#111827] transition-colors uppercase tracking-widest text-[10px]"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Catalog
        </button>
        
        {/* Modul Aksi Admin */}
        <div className="flex gap-2 w-full sm:w-auto">
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-50 border border-gray-100 text-[#111827] px-5 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all"
          >
            <FaEdit /> Edit Item
          </button>
          <button 
            onClick={handleDelete}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-red-50 text-red-500 px-5 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-red-100 transition-all"
          >
            <FaTrashAlt /> Delete
          </button>
        </div>
      </div>

      {/* 2. Tata Letak Utama Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sisi Kiri: Gambar Produk (col-span-5) */}
        <div className="lg:col-span-5 bg-white rounded-[2.5rem] border border-gray-100 p-8 flex flex-col justify-center items-center relative shadow-sm h-[350px] lg:h-auto">
          <span className="absolute top-6 left-6 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-indigo-50 text-[#6366f1]">
            {product.code}
          </span>
          <div className="text-[8rem] select-none transform hover:scale-110 transition-transform duration-500">
            {product.img}
          </div>
        </div>

        {/* Sisi Kanan: Spesifikasi Data Produk (col-span-7) */}
        <div className="lg:col-span-7 bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-10 shadow-sm space-y-6">
          <div>
            <span className="text-[10px] font-black text-[#6366f1] uppercase tracking-[0.2em]">{product.category}</span>
            <h2 className="text-3xl font-black text-[#111827] tracking-tight mt-1">{product.title}</h2>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Brand: {product.brand}</p>
          </div>

          {/* Badge Indikator Status */}
          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-xl text-[11px] font-black text-amber-600">
              <FaStar className="text-amber-400" /> {product.rate} <span className="text-gray-400 font-normal">(Verified Metric)</span>
            </div>
            <div className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-black ${product.stock > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
              <FaBox className={product.stock > 0 ? 'text-emerald-400' : 'text-red-400'} /> 
              {product.stock > 0 ? `${product.stock} Units In Stock` : 'Out of Stock'}
            </div>
          </div>

          <hr className="border-gray-50" />

          {/* Deskripsi */}
          <div className="space-y-1">
            <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Description</h4>
            <p className="text-sm text-gray-600 leading-relaxed font-medium">{product.description}</p>
          </div>

          {/* Komponen Price Tag */}
          <div className="bg-gray-50 p-5 rounded-2xl flex justify-between items-center border border-gray-100/50">
            <div>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Asset Price</p>
              <p className="text-2xl font-black text-[#111827]">Rp {product.price.toLocaleString()}</p>
            </div>
            <span className="text-[9px] font-black uppercase text-[#6366f1] bg-[#6366f1]/10 px-3 py-1.5 rounded-lg tracking-wider">
              Premium Tier
            </span>
          </div>

        </div>
      </div>

      {/* 3. Analitik Performa Finansial (Bento Bawah) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#111827] text-white p-6 md:p-8 rounded-[2rem] flex items-center justify-between relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#6366f1]/10 rounded-full blur-[50px]"></div>
          <div className="space-y-1 relative z-10">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Volume Penjualan Bulan Ini</p>
            <h4 className="text-2xl font-black tracking-tight">{salesThisMonth} <span className="text-xs font-medium text-gray-400">Pcs Terjual</span></h4>
          </div>
          <div className="w-11 h-11 bg-[#6366f1] rounded-xl flex items-center justify-center text-lg shadow-lg shadow-indigo-500/20">
            <FaChartLine />
          </div>
        </div>

        <div className="bg-white border border-gray-100 p-6 md:p-8 rounded-[2rem] flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Kontribusi Omset</p>
            <h4 className="text-2xl font-black text-[#111827] tracking-tight">Rp {revenueThisMonth.toLocaleString()}</h4>
          </div>
          <div className="w-11 h-11 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center text-lg">
            <FaChartLine />
          </div>
        </div>
      </div>

      {/* EDIT PRODUCT DIALOG/MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div
            className="bg-white w-full max-w-md rounded-[2rem] border border-slate-100 shadow-2xl p-6 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Edit Product</h3>
                <p className="text-xs text-slate-400 font-medium">Modify inventory item details.</p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <span className="text-xl">&times;</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs font-semibold text-slate-700">
              <div className="space-y-1">
                <label className="text-slate-400">Product Title</label>
                <input
                  type="text"
                  required
                  name="title"
                  value={editProduct.title}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/20 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400">Category</label>
                  <select
                    name="category"
                    value={editProduct.category}
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
                    value={editProduct.brand}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
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
                    value={editProduct.price}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/20 font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Stock</label>
                  <input
                    type="number"
                    required
                    name="stock"
                    value={editProduct.stock}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/20 font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Description</label>
                <textarea
                  name="description"
                  value={editProduct.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/20 font-medium text-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-all font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-pink-500 text-white rounded-xl shadow-md shadow-pink-100 hover:bg-pink-600 transition-all font-bold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}