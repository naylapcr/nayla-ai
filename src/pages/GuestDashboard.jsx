import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Ditambahkan useNavigate untuk redirect
import { FaSearch, FaShoppingBag, FaStar, FaHeart, FaRegHeart, FaTruck, FaUndo, FaShieldAlt, FaWhatsapp, FaChevronDown, FaLeaf, FaHandSparkles, FaCertificate, FaThumbsUp, FaRegThumbsUp, FaCheckCircle } from "react-icons/fa";
import { leadsAPI } from '../services/leadsAPI';

export default function GuestDashboard() {
  const navigate = useNavigate(); // Hook untuk navigasi programatis
  const [currentUser, setCurrentUser] = useState(null);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [isLeadSubmitting, setIsLeadSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [likedProducts, setLikedProducts] = useState({});
  const [selectedShades, setSelectedShades] = useState({});
  const [toast, setToast] = useState({ show: false, message: "" });

  useEffect(() => {
    const userStr = localStorage.getItem('luneve_user');
    if (userStr && userStr !== 'null' && userStr !== 'undefined' && userStr !== '{}') {
      try {
        const parsed = JSON.parse(userStr);
        if (parsed && (parsed.id || parsed.email) && parsed.role) {
          setCurrentUser(parsed);
        } else {
          setCurrentUser(null);
        }
      } catch (e) {
        console.error(e);
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
  }, []);

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!leadName || !leadEmail) return;
    setIsLeadSubmitting(true);
    try {
      await leadsAPI.create({ nama: leadName, email: leadEmail });
      setToast({ show: true, message: "Terima kasih! Data prospek Anda berhasil disimpan. 🎉" });
      setLeadName("");
      setLeadEmail("");
    } catch (err) {
      console.error(err);
      setToast({ show: true, message: "Gagal mengirim formulir. Silakan coba lagi! 🥺" });
    } finally {
      setIsLeadSubmitting(false);
    }
  };
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState(null);
  
  // Voucher States
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherMsg, setVoucherMsg] = useState({ type: "", text: "" });

  // Flash Sale & Review Interactive States
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [likedReviews, setLikedReviews] = useState({});
  const [reviewCounts, setReviewCounts] = useState({ r1: 24, r2: 18, r3: 32, r4: 15 });
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) searchInputRef.current.focus();
  }, []);

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => setToast({ show: false, message: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 2);
    targetDate.setHours(23, 59, 59);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Jika tamu klik Add to Bag, langsung lempar ke halaman Login
  const handleAddToBag = () => {
    navigate('/login');
  };

  const toggleLike = (id) => {
    setLikedProducts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const selectShade = (productId, shadeIndex) => {
    setSelectedShades(prev => ({ ...prev, [productId]: shadeIndex }));
  };

  const handleApplyVoucher = (e) => {
    e.preventDefault();
    const code = voucherCode.toUpperCase();
    if (code === "GLAM20") {
      setVoucherMsg({ type: "success", text: "Yay! 20% discount applied! 💖" });
      setToast({ show: true, message: "Voucher GLAM20 applied! 🎉" });
    } else if (code === "LUNEVE50K") {
      setVoucherMsg({ type: "success", text: "Rp 50.000 discount applied! 🎀" });
      setToast({ show: true, message: "Voucher LUNEVE50K applied! 🎉" });
    } else {
      setVoucherMsg({ type: "error", text: "Invalid code. Try again! 🥺" });
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleReviewLike = (id) => {
    setLikedReviews(prev => ({...prev, [id]: !prev[id]}));
    setReviewCounts(prev => ({
      ...prev,
      [id]: prev[id] + (likedReviews[id] ? -1 : 1)
    }));
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if(email) {
      setIsSubscribed(true);
      setToast({ show: true, message: "Welcome to the Glam Squad! 💌" });
    }
  };

  const categories = [
    { name: "All", emoji: "✨" },
    { name: "Lips", img: "https://romandbeauty.com/cdn/shop/files/01_COCO_NUDE_1.jpg?v=1772314338&width=1000" },
    { name: "Eyes", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWZu4BCb6-uBMsbgAKL-otVhh5dO4U3SzEwpoxNyUIQw&s=10" },
    { name: "Face", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS85ctTe5qDrSLm1Mskt5C60zTtzwpbUB083hz59X3HYw&s=10" },
    { name: "Skincare", img: "https://koreanskincare.com/cdn/shop/files/456342975_493038056699752_86034341173070273_n.jpg?v=1737452462" },
  ];

  const featuredProducts = [
    { 
      id: "P1", name: "Velvet Matte Lip", category: "Lips", price: "185.000", originalPrice: "250.000", rating: 5, 
      image: "https://romandbeauty.com/cdn/shop/files/01_POMELOCO_1.jpg?v=1771900266&width=700", 
      desc: "Long-lasting matte lipstick with a plush velvet finish.", 
      shades: [{name: "Devil Red", hex: "#B6252E"}, {name: "Nude Blush", hex: "#D4775C"}, {name: "Plum Wine", hex: "#8C1E3D"}],
      isBestSeller: true, isFlashSale: true, stock: 12, totalStock: 50
    },
    { 
      id: "P2", name: "Dewy Tinted Gloss", category: "Lips", price: "145.000", originalPrice: null, rating: 4.8, 
      image: "https://romandbeauty.com/cdn/shop/files/06_grape_fig_1.jpg?v=1779126384&width=700", 
      desc: "Glossy, non-sticky formula for that perfect glass lip look.", 
      shades: [{name: "Berry Crush", hex: "#8B5FBF"}, {name: "Peach Fuzz", hex: "#F5C6AA"}, {name: "Clear Ice", hex: "#F0E6D2"}],
      isBestSeller: false, isFlashSale: false
    },
    { 
      id: "P3", name: "Silk Glow Cushion", category: "Face", price: "310.000", originalPrice: null, rating: 4.9, 
      image: "https://romandbeauty.com/cdn/shop/files/ZO_UZH01_cloudwhite1.jpg?v=1768171273&width=1000", 
      desc: "Super flawless dew finish cushion for that instant glass skin.", 
      shades: [{name: "Porcelain", hex: "#F5E0D0"}, {name: "Natural", hex: "#E0C8A8"}, {name: "Honey", hex: "#C8A882"}],
      isBestSeller: true, isFlashSale: false
    },
    { 
      id: "P4", name: "Peach Blush Duo", category: "Face", price: "210.000", originalPrice: "280.000", rating: 4.7, 
      image: "https://romandbeauty.com/cdn/shop/files/01_RARE_APPLE_1.jpg?v=1770657185&width=1000", 
      desc: "Matte and shimmer blush combo for a sun-kissed glow.", 
      shades: [{name: "Coral Sun", hex: "#F08080"}, {name: "Rose Bud", hex: "#D4A2C2"}],
      isBestSeller: false, isFlashSale: true, stock: 5, totalStock: 50
    },
    { 
      id: "P5", name: "Nude Eyeshadow Palette", category: "Eyes", price: "420.000", originalPrice: null, rating: 4.8, 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv-Z0sfNp3KVt7KsKJgZqHognovBrclYxc9Xr0w_vEjrhjlpuCKhu65B8&s=10", 
      desc: "High pigmentation eyeshadow palette with zero fallouts.", 
      shades: [{name: "Champagne", hex: "#D4C1A1"}, {name: "Smoky", hex: "#6B4E3D"}, {name: "Midnight", hex: "#2C2421"}],
      isBestSeller: true, isFlashSale: false
    },
    { 
      id: "P6", name: "Volume Lash Mascara", category: "Eyes", price: "165.000", originalPrice: null, rating: 4.6, 
      image: "https://romandbeauty.com/cdn/shop/files/01_brow_cara_grace_taupe_0.jpg?v=1770160570&width=1000", 
      desc: "Smudge-proof, clump-free mascara for voluminous lashes.", 
      shades: [{name: "Jet Black", hex: "#1A1A1A"}, {name: "Dark Brown", hex: "#4A3B2A"}],
      isBestSeller: false, isFlashSale: false
    },
  ];

  const reviewsData = [
    { id: "r1", name: "Wonyoung J.", avatar: "W", skinType: "Combination", product: "Velvet Matte Lip", rating: 5, text: "Absolute game changer! My lips stay hydrated and the color doesn't budge even after eating. Obsessed with the Nude Blush shade! 💖", bgAvatar: "bg-rose-200 text-rose-600" },
    { id: "r2", name: "Somi E.", avatar: "S", skinType: "Oily", product: "Silk Glow Cushion", rating: 5, text: "Finally, a cushion that doesn't slide off my oily skin! The dewy finish lasts all day without looking greasy. Highly recommend. ✨", bgAvatar: "bg-violet-200 text-violet-600" },
    { id: "r3", name: "Nayla K.", avatar: "N", skinType: "Sensitive", product: "Glow Serum Primer", rating: 4, text: "So gentle on my sensitive skin! It gives this instant brightening effect. Just wish the bottle was a bit bigger. 🥺", bgAvatar: "bg-amber-200 text-amber-600" },
    { id: "r4", name: "Jisoo P.", avatar: "J", skinType: "Dry", product: "Peach Blush Duo", rating: 5, text: "The shimmer in this blush is so fine and elegant! Makes me look like I'm glowing from within. My absolute everyday go-to! 🎀", bgAvatar: "bg-teal-200 text-teal-600" },
  ];

  const faqs = [
    { q: "Are your products cruelty-free and halal? 🐰", a: "Yes! 💖 All Luneve products are 100% cruelty-free, never tested on animals, and halal-certified so you can glam up with peace of mind." },
    { q: "How do I find my perfect shade online? 🎨", a: "We have a detailed shade description! You can also chat with our beauty advisor via the WhatsApp button for a personalized recommendation." },
    { q: "What is your return policy? 📦", a: "If the product is unopened and in its original condition, we accept returns within 14 days of delivery. For damaged items, send us a photo and we'll send a replacement ASAP!" },
    { q: "How long does shipping usually take? 🚚", a: "Standard shipping takes 2-4 business days. Express shipping (1-2 business days) is also available at checkout!" }
  ];

  const filteredProducts = featuredProducts
    .filter(p => activeCategory === "All" || p.category === activeCategory)
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="bg-[#FFFAFB] min-h-screen font-sans antialiased text-gray-800 selection:bg-rose-200/50 relative">
      
      {/* TOAST NOTIFICATION */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ${toast.show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="bg-rose-100 text-rose-700 px-8 py-4 rounded-full shadow-xl flex items-center gap-3 text-sm font-bold border border-rose-200/50">
          <FaShoppingBag className="text-rose-400" /> {toast.message}
        </div>
      </div>

      {/* WHATSAPP FLOATING BUTTON */}
      <a 
        href="https://wa.me/6281234567890?text=Hi%20Luneve!%20I%20need%20help%20🛍️" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-emerald-200 hover:bg-emerald-300 text-emerald-700 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 border border-emerald-300/50"
        title="Chat with us on WhatsApp"
      >
        <FaWhatsapp className="text-2xl" />
      </a>

      {/* PROMO BANNER */}
      <div className="bg-gradient-to-r from-rose-200 to-purple-200 text-rose-800 text-center py-2.5 text-[11px] font-bold tracking-wider uppercase">
        Free Shipping on Orders Over Rp 500K 🛍️ | {currentUser && currentUser.role ? (
          <Link to={currentUser.role === 'admin' ? '/admin' : '/member'} className="underline cursor-pointer hover:text-rose-600 transition-colors">Buka Dashboard Anda</Link>
        ) : (
          <Link to="/register" className="underline cursor-pointer hover:text-rose-600 transition-colors">Gabung Sekarang</Link>
        )}
      </div>

      {/* NAVBAR - Diperbaiki Pakai Link Login & Register */}
      <nav className="bg-white/80 border-b border-rose-50 sticky top-0 z-50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-10">
            <Link to="/" className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-300 tracking-tight">
              LUNEVE
            </Link>
            <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400">
              <a href="#catalogue" className="hover:text-rose-400 transition-colors duration-300">Shop</a>
              <a href="#crm-features" className="hover:text-rose-400 transition-colors duration-300">Features</a>
              <a href="#tiering" className="hover:text-rose-400 transition-colors duration-300">Tiering</a>
              <a href="#reviews" className="hover:text-rose-400 transition-colors duration-300">Reviews</a>
              <a href="#faq" className="hover:text-rose-400 transition-colors duration-300">FAQ</a>
              {currentUser && currentUser.role && (
                <Link to={currentUser.role === 'admin' ? '/admin' : '/member'} className="text-rose-500 font-black hover:text-rose-600 transition-colors duration-300 underline">
                  {currentUser.role === 'admin' ? 'Admin Panel ✨' : 'Member Area ✨'}
                </Link>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:block relative w-64 group">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-300 group-focus-within:text-rose-400 transition-colors text-xs" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search your shade..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-6 py-2.5 rounded-full bg-rose-50/50 border border-rose-100 outline-none text-xs font-medium focus:ring-2 focus:ring-rose-100 focus:border-rose-200 transition-all placeholder:text-rose-300"
              />
            </div>
            
            {/* SMART NAVBAR (PRD v2) */}
            {currentUser && currentUser.role ? (
              <Link
                to={currentUser.role === 'admin' ? '/admin' : '/member'}
                className="bg-gradient-to-r from-rose-400 to-purple-400 text-white px-5 py-2 rounded-full text-[11px] font-bold hover:shadow-md transition-all shadow-sm flex items-center gap-1.5"
              >
                {currentUser.role === 'admin' ? 'Halaman Admin 🛡️' : 'Halaman Member 🎀'}
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-[11px] font-bold text-rose-400 hover:text-rose-600 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-gradient-to-r from-rose-300 to-purple-200 text-rose-700 px-5 py-2 rounded-full text-[11px] font-bold hover:shadow-md transition-all border border-rose-200/50">
                  Register ✨
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* HERO SECTION - PRD v1 */}
      <section id="hero" className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-[#FFF5F7] to-[#F3ECFF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 z-10 py-20">
            <span className="inline-flex items-center gap-2 bg-white text-rose-400 text-[11px] font-bold tracking-[0.2em] uppercase px-5 py-2 rounded-full border border-rose-100 shadow-sm">
               ✨ Butik Kosmetik & Skincare Eksklusif
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-gray-800 tracking-tight leading-[1]">
              Pancarkan Pesona & <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-300">Kilau Alami Anda</span> 💖
            </h2>
            <p className="text-gray-400 text-base md:text-lg font-medium leading-relaxed max-w-md">
              Jelajahi koleksi kosmetik bernutrisi botani, nikmati keuntungan tier member eksklusif, dan dapatkan penawaran spesial di setiap pembelian Anda.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to={currentUser && currentUser.role ? (currentUser.role === 'admin' ? '/admin' : '/member') : '/register'}
                className="bg-gradient-to-r from-rose-400 to-purple-400 text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider hover:shadow-xl hover:shadow-rose-100 transition-all duration-300 inline-flex items-center gap-3 shadow-md"
              >
                {currentUser && currentUser.role ? (currentUser.role === 'admin' ? 'Ke Halaman Admin 🛡️' : 'Ke Halaman Member 🎀') : 'Belanja Sekarang 🛍️'}
              </Link>
              <a
                href="#catalogue"
                className="bg-white text-rose-500 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-rose-50 transition-all duration-300 inline-flex items-center gap-3 border border-rose-200/60 shadow-sm"
              >
                Lihat Koleksi ✨
              </a>
            </div>
          </div>
          
          <div className="relative h-[85vh] hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#FFF5F7] z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Makeup Model" 
              className="absolute right-0 top-0 h-full w-3/4 object-cover rounded-bl-[5rem] border-4 border-white shadow-2xl"
            />
            <div className="absolute bottom-20 left-10 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl z-20 max-w-[220px] border border-rose-100">
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => <FaStar key={i} className="text-amber-300 text-sm" />)}
              </div>
              <p className="text-xs font-bold text-gray-700">"Absolute game changer! Obsessed with the glow 💖"</p>
              <p className="text-[10px] text-rose-400 mt-2 font-bold">— Wonyoung J.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FLASH SALE SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-rose-100 to-violet-100 p-8 md:p-12 rounded-[2.5rem] border border-rose-200/50 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <div>
              <h3 className="text-3xl font-black text-rose-700 tracking-tight flex items-center gap-3">
                ⚡ Flash Sale <span className="text-sm bg-rose-200 text-rose-600 px-3 py-1 rounded-full">Up to 40% Off</span>
              </h3>
              <p className="text-rose-400 text-sm font-medium mt-1">Grab your favorites before they're gone!</p>
            </div>
            <div className="flex gap-3">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Mins", value: timeLeft.minutes },
                { label: "Secs", value: timeLeft.seconds },
              ].map((t, i) => (
                <div key={i} className="bg-white text-rose-700 p-3 rounded-xl text-center shadow-sm border border-rose-100 min-w-[60px]">
                  <div className="text-2xl font-black">{String(t.value).padStart(2, '0')}</div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-rose-300">{t.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProducts.filter(p => p.isFlashSale).map((product) => (
              <div key={product.id} className="group flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden border border-rose-100 shadow-sm hover:shadow-md transition-all">
                <div className="relative h-60 w-full md:w-1/2 bg-[#FFF5F7]">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-red-200 text-red-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    Save {Math.round((1 - parseInt(product.price.replace(/\./g, '')) / parseInt(product.originalPrice.replace(/\./g, ''))) * 100)}%
                  </div>
                </div>
                <div className="p-6 flex flex-col justify-center w-full md:w-1/2">
                  <h4 className="text-lg font-black text-gray-800 mb-1">{product.name}</h4>
                  <p className="text-sm text-gray-400 font-medium mb-4">"{product.desc}"</p>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xl font-black text-rose-600">Rp {product.price}</span>
                    <span className="text-sm text-gray-300 line-through font-bold">Rp {product.originalPrice}</span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-[10px] font-bold text-rose-400 mb-1">
                      <span>🔥 {product.stock} left</span>
                      <span>{product.totalStock} sold</span>
                    </div>
                    <div className="w-full bg-rose-100 rounded-full h-2">
                      <div className="bg-gradient-to-r from-rose-300 to-rose-400 h-2 rounded-full transition-all duration-700" style={{ width: `${((product.totalStock - product.stock) / product.totalStock) * 100}%` }}></div>
                    </div>
                  </div>

                  <button 
                    onClick={handleAddToBag}
                    className="w-full bg-rose-200 hover:bg-rose-300 text-rose-700 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-md border border-rose-300/50 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FaShoppingBag /> {currentUser && currentUser.role ? "Masukkan Keranjang 🛍️" : "Login to Buy"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <h3 className="text-3xl font-black text-gray-800 tracking-tight">Shop by Vibe ✨</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button 
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap border-2 ${activeCategory === cat.name ? 'bg-rose-200 border-rose-300 text-rose-700 shadow-md shadow-rose-100' : 'bg-white border-rose-50 text-gray-400 hover:border-rose-200 hover:text-rose-400'}`}
              >
                {cat.img ? (
                  <img src={cat.img} alt={cat.name} className="w-5 h-5 rounded-full object-cover border border-rose-100" />
                ) : (
                  <span>{cat.emoji}</span>
                )}
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOGUE / BEST SELLERS - Extended Grid */}
      <section id="catalogue" className="bg-white py-20 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(251,207,232,0.3)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group relative bg-[#FFFAFB] rounded-3xl overflow-hidden shadow-sm hover:shadow-rose-100 hover:shadow-xl transition-all duration-500 border border-rose-50/50 flex flex-col">
                
                <div className="relative h-[350px] overflow-hidden bg-[#FFF5F7]">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-rose-900/5 transition-all duration-500"></div>
                  
                  {product.isBestSeller && (
                    <div className="absolute top-5 left-5 bg-amber-200 text-amber-800 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1 border border-amber-300/50">
                      Best Seller ✨
                    </div>
                  )}

                  <button 
                    onClick={() => toggleLike(product.id)} 
                    className="absolute top-5 right-5 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-sm hover:bg-white transition-all hover:scale-110"
                  >
                    {likedProducts[product.id] ? 
                      <FaHeart className="text-rose-400 text-lg" /> : 
                      <FaRegHeart className="text-gray-300 text-lg hover:text-rose-300" />
                    }
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <button 
                      onClick={handleAddToBag}
                      className="w-full bg-rose-200 hover:bg-rose-300 text-rose-700 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-xl border border-rose-300/50 cursor-pointer"
                    >
                      <FaShoppingBag /> {currentUser && currentUser.role ? "Masukkan Keranjang 🛍️" : "Login to Buy"}
                    </button>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-full">{product.category}</span>
                    <div className="flex items-center gap-1 text-amber-300 text-xs font-bold"><FaStar /> {product.rating}</div>
                  </div>
                  
                  <h4 className="text-lg font-black text-gray-800 tracking-tight mb-2">
                    {product.name}
                  </h4>
                  <p className="text-sm text-gray-400 font-medium leading-relaxed mb-4 flex-grow">"{product.desc}"</p>
                  
                  <div className="mb-5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-rose-200 mb-2">
                      Shade: <span className="text-gray-500">{product.shades[selectedShades[product.id] || 0]?.name}</span>
                    </p>
                    <div className="flex gap-2">
                      {product.shades.map((shade, i) => (
                        <button 
                          key={i}
                          title={shade.name}
                          onClick={() => selectShade(product.id, i)}
                          className={`w-7 h-7 rounded-full border-2 transition-all duration-300 hover:scale-110 ${selectedShades[product.id] === i ? 'border-rose-400 scale-110 ring-2 ring-offset-2 ring-rose-200' : 'border-white shadow-sm'}`}
                          style={{ backgroundColor: shade.hex }}
                        ></button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-rose-50 pt-5 mt-auto">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-black text-gray-800">Rp {product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-rose-200 line-through font-bold">Rp {product.originalPrice}</span>
                      )}
                    </div>
                    <button 
                      onClick={handleAddToBag}
                      className="md:hidden bg-rose-200 text-rose-600 p-3 rounded-xl hover:bg-rose-300 transition-all shadow-sm"
                    >
                      <FaShoppingBag className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VOUCHER / DISCOUNT SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-rose-50 to-violet-50 p-8 md:p-12 rounded-[2.5rem] border-2 border-dashed border-rose-200 relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-rose-100/50 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-violet-100/50 rounded-full blur-2xl"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-black text-gray-800 flex items-center gap-2 justify-center md:justify-start">
                Have a Voucher? 💸
              </h3>
              <p className="text-sm text-gray-400 font-medium mt-1">Enter your code below to unlock cute discounts!</p>
              <p className="text-xs text-rose-300 mt-2 font-bold">Try: GLAM20 or LUNEVE50K</p>
            </div>
            <form onSubmit={handleApplyVoucher} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input 
                type="text"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                placeholder="Enter code..."
                className="w-full sm:w-64 px-6 py-3 rounded-xl bg-white border border-rose-200 text-gray-700 placeholder-gray-300 outline-none focus:border-rose-400 transition-all text-sm font-bold uppercase tracking-wider text-center"
              />
              <button type="submit" className="bg-rose-300 text-rose-700 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-rose-400 hover:text-white transition-all shadow-md border border-rose-300/50 whitespace-nowrap">
                Apply
              </button>
            </form>
          </div>
          
          {voucherMsg.text && (
            <div className={`mt-6 text-center text-sm font-bold py-3 rounded-xl transition-all ${voucherMsg.type === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-400'}`}>
              {voucherMsg.text}
            </div>
          )}
        </div>
      </section>

      {/* WHY CHOOSE US / ADVANTAGES */}
      <section id="benefits" className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-black text-gray-800 tracking-tight">Why Choose Luneve? 💖</h3>
          <p className="text-gray-400 font-medium mt-2 text-sm">Beauty that cares for you and the planet.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-rose-50 shadow-sm space-y-3 hover:shadow-md transition-all">
            <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-400 text-xl"><FaLeaf /></div>
            <h4 className="text-sm font-black text-gray-800">Vegan & Botanical</h4>
            <p className="text-gray-400 text-xs font-medium">Infused with natural extracts. No harsh chemicals. 🌿</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-rose-50 shadow-sm space-y-3 hover:shadow-md transition-all">
            <div className="w-14 h-14 bg-rose-50 rounded-full flex items-center justify-center text-rose-300 text-xl"><FaHandSparkles /></div>
            <h4 className="text-sm font-black text-gray-800">Cruelty-Free</h4>
            <p className="text-gray-400 text-xs font-medium">We love animals! 100% never tested on animals. 🐰</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-rose-50 shadow-sm space-y-3 hover:shadow-md transition-all">
            <div className="w-14 h-14 bg-violet-50 rounded-full flex items-center justify-center text-violet-300 text-xl"><FaCertificate /></div>
            <h4 className="text-sm font-black text-gray-800">Halal Certified</h4>
            <p className="text-gray-400 text-xs font-medium">Safe, clean, and certified for your peace of mind. ✨</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-rose-50 shadow-sm space-y-3 hover:shadow-md transition-all">
            <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center text-amber-300 text-xl"><FaShieldAlt /></div>
            <h4 className="text-sm font-black text-gray-800">Dermatologist Tested</h4>
            <p className="text-gray-400 text-xs font-medium">Gentle on sensitive skin. Hypoallergenic formula. 🛡️</p>
          </div>
        </div>
      </section>

      {/* REAL GLOW REVIEWS - Interactive Section */}
      <section id="reviews" className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-black text-gray-800 tracking-tight">Real Glow, Real Reviews 💬</h3>
          <p className="text-gray-400 font-medium mt-2 text-sm">Don't just take our word for it—hear from our Glam Squad!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviewsData.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-3xl border border-rose-50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm ${review.bgAvatar}`}>
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-gray-800">{review.name}</h4>
                    <p className="text-[10px] text-rose-300 font-bold">{review.skinType} Skin</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1 bg-rose-50 px-3 py-1 rounded-full">
                    <FaCheckCircle className="text-emerald-300 text-[10px]" />
                    <span className="text-[9px] font-bold text-emerald-500 uppercase">Verified</span>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <FaStar key={i} className={`${i < review.rating ? 'text-amber-300' : 'text-gray-200'} text-xs`} />)}
                </div>

                <p className="text-sm text-gray-600 font-medium leading-relaxed mb-4">{review.text}</p>
              </div>

              <div className="border-t border-rose-50 pt-4 flex justify-between items-center mt-2">
                <span className="text-xs text-gray-400 font-bold">Purchased: <span className="text-rose-400">{review.product}</span></span>
                <button 
                  onClick={() => handleReviewLike(review.id)}
                  className="flex items-center gap-2 text-gray-400 hover:text-rose-400 transition-colors group"
                >
                  {likedReviews[review.id] ? 
                    <FaThumbsUp className="text-rose-400 text-sm" /> : 
                    <FaRegThumbsUp className="text-sm group-hover:scale-110 transition-transform" />
                  }
                  <span className={`text-xs font-bold ${likedReviews[review.id] ? 'text-rose-400' : ''}`}>{reviewCounts[review.id]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CRM FEATURES SECTION (PRD v1) */}
      <section id="crm-features" className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-rose-50 text-rose-500 text-[11px] font-bold tracking-[0.2em] uppercase px-5 py-2 rounded-full border border-rose-100 shadow-sm mb-4">
            Keunggulan Sistem CRM
          </span>
          <h3 className="text-3xl md:text-4xl font-black text-gray-800 tracking-tight">
            Manajemen Pelanggan & Loyalitas Modern 💖
          </h3>
          <p className="text-gray-400 font-medium mt-2 text-sm max-w-xl mx-auto">
            Platform terpadu untuk mengelola hubungan pelanggan, sistem poin reward, dan pelacakan pesanan secara real-time.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-rose-100 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-500 flex items-center justify-center text-2xl font-bold">
              👥
            </div>
            <h4 className="text-xl font-black text-gray-800">Manajemen Pelanggan</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Pantau profil riwayat belanja member, segmentasi pelanggan, serta pengelompokan VIP secara mudah dan otomatis.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-500 flex items-center justify-center text-2xl font-bold">
              👑
            </div>
            <h4 className="text-xl font-black text-gray-800">Sistem Poin & Tiering</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Tingkatkan loyalitas pelanggan melalui tingkatan member Bronze, Silver, Gold, hingga Platinum dengan diskon eksklusif.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-rose-100 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-500 flex items-center justify-center text-2xl font-bold">
              📦
            </div>
            <h4 className="text-xl font-black text-gray-800">Pantau Pesanan Real-Time</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Integrasi pesanan langsung dengan update status pemesanan, pengiriman, dan konfirmasi barang tiba secara live.
            </p>
          </div>
        </div>
      </section>

      {/* MEMBER TIERING SECTION (PRD v2) */}
      <section id="tiering" className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-purple-50 text-purple-500 text-[11px] font-bold tracking-[0.2em] uppercase px-5 py-2 rounded-full border border-purple-100 shadow-sm mb-4">
            Program Loyalitas
          </span>
          <h3 className="text-3xl md:text-4xl font-black text-gray-800 tracking-tight">
            Tingkat Keanggotaan & Diskon Eksklusif ✨
          </h3>
          <p className="text-gray-400 font-medium mt-2 text-sm max-w-xl mx-auto">
            Semakin banyak Anda berbelanja, semakin tinggi tier keanggotaan Anda dan semakin besar keuntungan yang didapatkan.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { tier: "Bronze", discount: "5%", color: "from-amber-700/80 to-amber-900", border: "border-amber-700/30", bg: "bg-amber-50/50", desc: "Member baru bergabung" },
            { tier: "Silver", discount: "10%", color: "from-slate-400 to-slate-600", border: "border-slate-400/30", bg: "bg-slate-50/50", desc: "Belanja akumulasi > Rp 500k" },
            { tier: "Gold", discount: "15%", color: "from-amber-400 to-amber-600", border: "border-amber-400/30", bg: "bg-amber-50/80", desc: "Belanja akumulasi > Rp 2 Jt" },
            { tier: "Platinum", discount: "20%", color: "from-purple-500 to-indigo-600", border: "border-purple-500/30", bg: "bg-purple-50/80", desc: "Belanja akumulasi > Rp 5 Jt" },
          ].map((t, idx) => (
            <div key={idx} className={`${t.bg} p-6 rounded-3xl border ${t.border} shadow-sm flex flex-col justify-between hover:-translate-y-1 transition-all duration-300`}>
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black text-white bg-gradient-to-r ${t.color} uppercase tracking-wider mb-4 shadow-sm`}>
                  {t.tier} Tier
                </span>
                <h4 className="text-3xl font-black text-gray-800 tracking-tight mb-1">{t.discount} <span className="text-sm font-bold text-gray-500">OFF</span></h4>
                <p className="text-xs text-gray-500 font-medium mb-6">{t.desc}</p>
              </div>
              <ul className="space-y-2 text-xs text-gray-600 font-medium border-t border-gray-200/50 pt-4">
                <li className="flex items-center gap-2"><FaCheckCircle className="text-rose-400 text-xs" /> Diskon semua produk</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-rose-400 text-xs" /> Akses rilis baru prioritas</li>
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT / LEAD GENERATION FORM (PRD v3) */}
      <section id="contact" className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-rose-200/60 shadow-xl relative overflow-hidden">
          <div className="text-center max-w-lg mx-auto mb-8">
            <span className="inline-flex items-center gap-2 bg-rose-50 text-rose-500 text-[11px] font-bold tracking-[0.2em] uppercase px-5 py-2 rounded-full border border-rose-100 mb-3">
              Hubungi Kami
            </span>
            <h3 className="text-3xl font-black text-gray-800 tracking-tight">Dapatkan Konsultasi & Penawaran CRM 💌</h3>
            <p className="text-gray-400 text-sm font-medium mt-2">Tinggalkan nama dan email Anda. Tim konsultan Luneve Boutique akan segera menghubungi Anda!</p>
          </div>
          <form onSubmit={handleLeadSubmit} className="space-y-4 max-w-md mx-auto">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Nama Lengkap</label>
              <input
                type="text"
                required
                placeholder="Masukkan nama Anda..."
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                className="w-full px-5 py-3 rounded-xl bg-rose-50/50 border border-rose-100 outline-none text-sm font-medium focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all text-gray-800 placeholder:text-rose-300"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Alamat Email</label>
              <input
                type="email"
                required
                placeholder="nama@email.com"
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                className="w-full px-5 py-3 rounded-xl bg-rose-50/50 border border-rose-100 outline-none text-sm font-medium focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all text-gray-800 placeholder:text-rose-300"
              />
            </div>
            <button
              type="submit"
              disabled={isLeadSubmitting}
              className="w-full bg-gradient-to-r from-rose-400 to-purple-400 hover:from-rose-500 hover:to-purple-500 text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-sm uppercase tracking-wider disabled:opacity-50 cursor-pointer"
            >
              {isLeadSubmitting ? "Mengirim..." : "Kirim Sekarang 🚀"}
            </button>
          </form>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-black text-gray-800 tracking-tight">Got Questions? 🎀</h3>
          <p className="text-gray-400 font-medium mt-2 text-sm">Everything you need to know about your glam purchases!</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl border border-rose-50 shadow-sm overflow-hidden">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
              >
                <span className="font-black text-sm text-gray-800 pr-4">{faq.q}</span>
                <FaChevronDown className={`text-rose-300 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
              </button>
              <div className={`transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="px-6 pb-6 text-gray-500 text-sm font-medium leading-relaxed">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA - Newsletter (Interactive Subscribe) */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-r from-rose-100 to-violet-100 p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden shadow-xl shadow-rose-50 border border-rose-200/30">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
            {!isSubscribed ? (
              <>
                <h2 className="text-4xl md:text-5xl font-black text-rose-700 tracking-tight leading-tight">
                  Join The Glam Squad 💖
                </h2>
                <p className="text-rose-400 text-base font-medium leading-relaxed">
                  Subscribe to get exclusive access to new drops, beauty tips, and a 15% off welcome code for your first purchase!
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row justify-center gap-3 max-w-lg mx-auto">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email address" 
                    className="w-full px-6 py-4 rounded-xl bg-white/60 border border-rose-200 text-rose-700 placeholder-rose-300 outline-none focus:border-rose-300 focus:bg-white/80 transition-all text-sm font-bold"
                  />
                  <button type="submit" className="bg-rose-300 text-rose-700 px-8 py-4 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-rose-400 hover:text-white transition-all duration-300 shadow-lg whitespace-nowrap border border-rose-300/50">
                    Subscribe
                  </button>
                </form>
              </>
            ) : (
              <div className="py-8">
                <h2 className="text-4xl md:text-5xl font-black text-rose-700 tracking-tight leading-tight mb-4">
                  You're In! 🎉
                </h2>
                <p className="text-rose-400 text-lg font-medium leading-relaxed">
                  Check your inbox for a special 15% off code. Let's get glowing!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#F8E8FF] pt-20 pb-10 text-gray-400">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pb-16 border-b border-violet-200/50">
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-violet-300 tracking-tight mb-4 inline-block">LUNEVE</Link>
              <p className="text-sm font-medium leading-relaxed">Crafted with love for your daily glam routine. 💖</p>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-rose-300 mb-6">Shop</h4>
              <ul className="space-y-3 text-sm font-medium">
                <li><a href="#catalogue" className="hover:text-rose-400 transition-colors">Lips</a></li>
                <li><a href="#catalogue" className="hover:text-rose-400 transition-colors">Eyes</a></li>
                <li><a href="#catalogue" className="hover:text-rose-400 transition-colors">Face</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-rose-300 mb-6">About</h4>
              <ul className="space-y-3 text-sm font-medium">
                <li><a href="#benefits" className="hover:text-rose-400 transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-rose-400 transition-colors">Sustainability</a></li>
                <li><a href="#" className="hover:text-rose-400 transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-rose-300 mb-6">Help</h4>
              <ul className="space-y-3 text-sm font-medium">
                <li><a href="#faq" className="hover:text-rose-400 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-rose-400 transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-rose-400 transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-medium gap-4">
            <p>&copy; 2026 Luneve Boutique. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-rose-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-rose-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}