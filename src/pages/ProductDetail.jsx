import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaStar, FaBox, FaChartLine, FaEdit, FaTrashAlt } from 'react-icons/fa';
import productsDatabase from '../data/data.json';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();


  // Cari produk berdasarkan ID dari parameter URL
  const product = productsDatabase.find((p) => p.id === parseInt(id));

  // Jika produk tidak ditemukan di database
  if (!product) {
    return (
      <div className="py-20 text-center flex flex-col items-center font-sans">
        <h3 className="text-2xl font-black text-[#111827]">Product Not Found</h3>
        <p className="text-gray-400 text-sm mt-2">The product ID may be incorrect or has been removed.</p>
        <button onClick={() => navigate('/products')} className="mt-6 bg-[#6366f1] text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest">
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
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-50 border border-gray-100 text-[#111827] px-5 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all">
            <FaEdit /> Edit Item
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-red-50 text-red-500 px-5 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-red-100 transition-all">
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

    </div>
  );
}