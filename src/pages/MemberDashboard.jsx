import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaSearch, FaShoppingBag, FaStar, FaHeart, FaRegHeart, FaTimes, FaTrash, FaWhatsapp, FaSignOutAlt, FaCrown, FaGem, FaChevronRight } from "react-icons/fa";

export default function MemberDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [likedProducts, setLikedProducts] = useState({});
  const [toast, setToast] = useState({ show: false, message: "" });
  const [selectedProduct, setSelectedProduct] = useState(null); // State untuk modal detail

  useEffect(() => {
    const userData = localStorage.getItem('luneve_user');
    if (!userData || userData === 'null' || userData === 'undefined' || userData === '{}') {
      navigate('/login');
    } else {
      try {
        const parsedUser = JSON.parse(userData);
        if (!parsedUser || (!parsedUser.id && !parsedUser.email)) {
          navigate('/login');
          return;
        }
        if (!parsedUser.points) parsedUser.points = 1250;
        if (!parsedUser.tier) parsedUser.tier = 'Rose';
        setUser(parsedUser);
      } catch (e) {
        navigate('/login');
      }
    }
  }, [navigate]);

  const products = [
    { id: "P1", name: "Velvet Matte Lip", price: 185000, image: "https://romandbeauty.com/cdn/shop/files/01_POMELOCO_1.jpg?v=1771900266&width=700", desc: "Plush velvet finish.", fullDesc: "Experience the ultimate velvet matte lipstick that glides on smoothly and stays all day. Infused with vitamin E for hydration.", shades: [{name: "Devil Red", hex: "#B6252E"}, {name: "Nude Blush", hex: "#D4775C"}, {name: "Plum Wine", hex: "#8C1E3D"}] },
    { id: "P2", name: "Dewy Tinted Gloss", price: 145000, image: "https://romandbeauty.com/cdn/shop/files/06_grape_fig_1.jpg?v=1779126384&width=700", desc: "Perfect glass lip look.", fullDesc: "Achieve that perfect glass lip look with our non-sticky, high-shine tinted gloss. Enriched with cherry blossom extract.", shades: [{name: "Berry Crush", hex: "#8B5FBF"}, {name: "Peach Fuzz", hex: "#F5C6AA"}, {name: "Clear Ice", hex: "#F0E6D2"}] },
    { id: "P3", name: "Silk Glow Cushion", price: 310000, image: "https://romandbeauty.com/cdn/shop/files/ZO_UZH01_cloudwhite1.jpg?v=1768171273&width=1000", desc: "Instant glass skin.", fullDesc: "Super flawless dew finish cushion for that instant glass skin. SPF 50+ PA+++ to protect your skin from UV rays.", shades: [{name: "Porcelain", hex: "#F5E0D0"}, {name: "Natural", hex: "#E0C8A8"}, {name: "Honey", hex: "#C8A882"}] },
    { id: "P4", name: "Peach Blush Duo", price: 210000, image: "https://romandbeauty.com/cdn/shop/files/01_RARE_APPLE_1.jpg?v=1770657185&width=1000", desc: "Sun-kissed glow.", fullDesc: "A matte and shimmer blush combo for a sun-kissed glow. The perfect duo for contouring and highlighting.", shades: [{name: "Coral Sun", hex: "#F08080"}, {name: "Rose Bud", hex: "#D4A2C2"}] },
    { id: "P5", name: "Nude Eyeshadow", price: 420000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv-Z0sfNp3KVt7KsKJgZqHognovBrclYxc9Xr0w_vEjrhjlpuCKhu65B8&s=10", desc: "Zero fallouts.", fullDesc: "High pigmentation eyeshadow palette with zero fallouts. Blend effortlessly for day or night looks.", shades: [{name: "Champagne", hex: "#D4C1A1"}, {name: "Smoky", hex: "#6B4E3D"}, {name: "Midnight", hex: "#2C2421"}] },
    { id: "P6", name: "Highlighter Duo", price: 250000, image: "https://romandbeauty.com/cdn/shop/files/4_f44a2503-1c2d-485f-8435-8d13d713d898.jpg?v=1775022478&width=1000", desc: "Blinding glow.", fullDesc: "An intense highlighter duo that gives you that blinding, ethereal glow from within.", shades: [{name: "Champagne Toast", hex: "#D4C1A1"}, {name: "Moonbeam", hex: "#E6E6FA"}] },
    { id: "P7", name: "Setting Spray", price: 165000, image: "https://www.sociolla.com/cdn-cgi/image/w=500,format=auto,dpr=1.45/https://images.soco.id/8b0412d9-b331-42b5-aef7-ca91aa52ea17-image-0-1770108179482", desc: "Lock your makeup all day.", fullDesc: "A micro-fine setting mist that locks your makeup all day without feeling sticky. Aloe vera infused.", shades: [] },
    { id: "P8", name: "Brow Definer", price: 135000, image: "https://www.sociolla.com/cdn-cgi/image/w=500,format=auto,dpr=1.45/https://images.soco.id/e17be138-98ec-4fd2-8ec7-0e8f45ce1453-image-0-1733826412593", desc: "Fluffy natural brows.", fullDesc: "Micro-precision brow definer for fluffy, natural-looking brows that last through sweat and humidity.", shades: [{name: "Taupe", hex: "#6B4E3D"}, {name: "Espresso", hex: "#3C2415"}] },
    { id: "P9", name: "Hydra Cream", price: 275000, image: "https://images.soco.id/62d63776-8956-47de-929a-7a8a52ddd47d-.jpg", desc: "Deep hydration boost.", fullDesc: "A lightweight hydra cream for a deep hydration boost. Perfect pre-makeup skincare step.", shades: [] },
  ];

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...product, qty: 1 }];
    });
    const pointsEarned = Math.floor(product.price / 10000);
    setUser(prev => prev ? { ...prev, points: prev.points + pointsEarned } : null);
    setToast({ show: true, message: `${product.name} ditambahkan! +${pointsEarned} Poin ⭐` });
  };

  const removeFromCart = (id) => setCartItems(prev => prev.filter(item => item.id !== id));
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const cartPointsEarned = Math.floor(cartTotal / 10000);
  
  const currentPoints = user?.points || 0;
  const nextTier = currentPoints >= 5000 ? 'Diamond' : currentPoints >= 2500 ? 'Gold' : 'Rose';
  const tierProgress = nextTier === 'Diamond' ? 100 : (currentPoints / (nextTier === 'Gold' ? 2500 : 5000)) * 100;

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => setToast({ show: false, message: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleLogout = () => {
    localStorage.removeItem('luneve_user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="bg-[#FFFAFB] min-h-screen font-sans text-gray-800 relative">
      
      {/* Toast */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ${toast.show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="bg-rose-100 text-rose-700 px-8 py-4 rounded-full shadow-xl flex items-center gap-3 text-sm font-bold border border-rose-200/50">
          {toast.message}
        </div>
      </div>

      {/* WA Float */}
      <a href="https://wa.me/6281234567890" target="_blank" className="fixed bottom-8 right-8 z-40 bg-emerald-200 hover:bg-emerald-300 text-emerald-700 p-4 rounded-full shadow-lg transition-all hover:scale-110 border border-emerald-300/50">
        <FaWhatsapp className="text-2xl" />
      </a>

      {/* NAVBAR MEMBER */}
      <nav className="bg-white/80 border-b border-rose-50 sticky top-0 z-50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-300 tracking-tight hover:opacity-80 transition-opacity">LUNEVE</Link>
            <Link to="/" className="bg-rose-50 hover:bg-rose-100 text-rose-600 px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all border border-rose-200/50 flex items-center gap-1.5 shadow-sm">
              🏠 Ke Landing Page
            </Link>
          </div>
          <div className="hidden md:block relative w-64 group">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-300 text-xs" />
            <input type="text" placeholder="Cari produk..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-6 py-2 rounded-full bg-rose-50/50 border border-rose-100 outline-none text-xs font-medium focus:ring-2 focus:ring-rose-100 transition-all" />
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
              <FaGem className="text-amber-500 text-xs" />
              <span className="text-xs font-bold text-amber-700">{currentPoints} Poin</span>
            </div>
            <button onClick={() => setIsCartOpen(true)} className="relative text-rose-400 hover:text-rose-500 transition-colors p-2">
              <FaShoppingBag className="text-xl" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-300 text-purple-800 w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold">{cartItems.length}</span>
              )}
            </button>
            <button onClick={handleLogout} className="text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-rose-500 transition-all flex items-center gap-1">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">
        
        {/* PROFILE & LOYALTY CARD SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-rose-50 shadow-sm flex items-center gap-5">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-200 to-violet-200 rounded-full flex items-center justify-center text-2xl font-black text-rose-600 shadow-inner">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-800">{user.name}</h3>
              <p className="text-xs text-gray-400 font-medium">{user.email}</p>
              <span className="mt-1 inline-flex items-center gap-1 bg-rose-50 text-rose-500 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                <FaCrown className="text-[8px]" /> {nextTier} Tier
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-rose-50 to-violet-50 p-6 rounded-3xl border border-rose-100 shadow-sm col-span-1 md:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-black text-gray-800 uppercase tracking-wider flex items-center gap-2"><FaGem className="text-fuchsia-500" /> Luneve Rewards</h4>
              <span className="text-2xl font-black text-fuchsia-600">{currentPoints} <span className="text-sm font-semibold text-gray-400">Poin</span></span>
            </div>
            <div className="w-full bg-white rounded-full h-3 border border-rose-100">
              <div className="bg-gradient-to-r from-rose-400 to-fuchsia-400 h-full rounded-full transition-all duration-700" style={{ width: `${tierProgress}%` }}></div>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              {nextTier === 'Diamond' ? "You've reached the highest tier! 💎" : `Earn ${nextTier === 'Gold' ? 2500 - currentPoints : 5000 - currentPoints} more points to reach ${nextTier === 'Gold' ? 'Gold 👑' : 'Diamond 💎'}`}
            </p>
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight mb-8">Koleksi Lengkap 🛍️</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                onClick={() => setSelectedProduct(product)} 
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-rose-50/50 flex flex-col cursor-pointer"
              >
                <div className="relative h-[220px] md:h-[280px] overflow-hidden bg-[#FFF5F7]">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <button 
                    onClick={(e) => { e.stopPropagation(); setLikedProducts(prev => ({...prev, [product.id]: !prev[product.id]})) }} 
                    className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-sm hover:bg-white transition-all hover:scale-110"
                  >
                    {likedProducts[product.id] ? <FaHeart className="text-rose-500 text-sm" /> : <FaRegHeart className="text-gray-300 text-sm" />}
                  </button>
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <FaGem className="text-amber-400 text-[9px]" />
                    <span className="text-[10px] font-bold text-gray-700">+{Math.floor(product.price / 10000)} pts</span>
                  </div>
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <h4 className="text-sm md:text-base font-black text-gray-800 mb-1">{product.name}</h4>
                  <p className="text-[11px] text-gray-400 font-medium mb-3 flex-grow">"{product.desc}"</p>
                  <div className="flex items-center justify-between pt-3 border-t border-rose-50/50" onClick={(e) => e.stopPropagation()}>
                    <span className="text-sm md:text-lg font-black text-gray-800">Rp {product.price.toLocaleString('id-ID')}</span>
                    <button onClick={() => addToCart(product)} className="bg-gradient-to-r from-rose-300 to-purple-200 text-rose-700 p-2.5 rounded-xl hover:shadow-md transition-all border border-rose-200/50">
                      <FaShoppingBag className="text-xs" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
          <div onClick={() => setSelectedProduct(null)} className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"></div>
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden z-10 max-h-[90vh]">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white hover:scale-110 transition-all z-20">
              <FaTimes className="text-gray-500" />
            </button>
            
            <div className="h-64 md:h-auto bg-[#FFF5F7]">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="p-8 flex flex-col overflow-y-auto">
              <span className="text-xs font-bold text-fuchsia-500 uppercase tracking-wider">Luneve Original</span>
              <h2 className="text-2xl font-black text-gray-800 mt-2">{selectedProduct.name}</h2>
              <div className="flex items-center gap-2 mt-2">
                <FaStar className="text-amber-400 text-sm" />
                <span className="text-sm font-bold text-gray-600">4.9 <span className="text-gray-400 font-medium">(1.2k reviews)</span></span>
              </div>
              <p className="text-gray-500 font-medium text-sm leading-relaxed mt-4">"{selectedProduct.fullDesc || selectedProduct.desc}"</p>
              
              {selectedProduct.shades && selectedProduct.shades.length > 0 && (
                <div className="mt-6">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Shades</p>
                  <div className="flex gap-2">
                    {selectedProduct.shades.map((shade, i) => (
                      <button key={i} title={shade.name} className="w-8 h-8 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform" style={{ backgroundColor: shade.hex }}></button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-auto pt-6 border-t border-rose-50 mt-6">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <span className="text-3xl font-black text-gray-800">Rp {selectedProduct.price.toLocaleString('id-ID')}</span>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mt-1"><FaGem className="text-xs" /> +{Math.floor(selectedProduct.price / 10000)} Points</div>
                  </div>
                </div>
                <button 
                  onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }} 
                  className="w-full py-4 bg-gradient-to-r from-rose-300 to-violet-200 text-rose-700 rounded-2xl font-bold text-sm tracking-wide shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-rose-200/50 flex items-center justify-center gap-2"
                >
                  <FaShoppingBag /> Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CART SLIDE-OVER */}
      <div className={`fixed inset-0 z-[90] transition-all duration-300 ${isCartOpen ? 'visible' : 'invisible'}`}>
        <div onClick={() => setIsCartOpen(false)} className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-rose-50 flex justify-between items-center">
              <h3 className="text-xl font-black text-gray-800">Shopping Bag 💖</h3>
              <button onClick={() => setIsCartOpen(false)} className="text-rose-300 hover:text-rose-500 p-2"><FaTimes className="text-xl" /></button>
            </div>
            <div className="flex-grow p-6 overflow-y-auto space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-20 text-rose-300">
                  <FaShoppingBag className="text-5xl mx-auto mb-4 opacity-50" />
                  <p className="font-bold">Bag masih kosong nih!</p>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="flex gap-4 bg-rose-50/30 p-3 rounded-2xl border border-rose-100/50">
                    <img src={item.image} className="w-20 h-20 object-cover rounded-xl" alt={item.name} />
                    <div className="flex-grow flex flex-col justify-center">
                      <h4 className="font-bold text-sm text-gray-800">{item.name}</h4>
                      <p className="text-xs text-rose-400 font-bold mt-1">Qty: {item.qty}</p>
                      <p className="text-sm font-black text-gray-800 mt-1">Rp {(item.price * item.qty).toLocaleString('id-ID')}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-rose-300 hover:text-red-400 transition-colors self-center p-2"><FaTrash /></button>
                  </div>
                ))
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-rose-100 bg-rose-50/50 space-y-4">
                <div className="bg-amber-50 px-4 py-3 rounded-xl border border-amber-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-700 flex items-center gap-2"><FaGem /> Poin yang didapat:</span>
                  <span className="text-sm font-black text-amber-600">+{cartPointsEarned} Poin</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-500">Total</span>
                  <span className="text-2xl font-black text-gray-800">Rp {cartTotal.toLocaleString('id-ID')}</span>
                </div>
                <button className="w-full py-4 bg-gradient-to-r from-rose-300 to-violet-200 text-rose-700 rounded-2xl font-bold text-sm tracking-wide shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-rose-200/50">
                  Checkout Sekarang ✨
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}