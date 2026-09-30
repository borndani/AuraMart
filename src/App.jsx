// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import CategoryNav from './components/layout/CategoryNav';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CartDrawer from './components/cart/CartDrawer';
import ProductDetailModal from './components/ui/ProductDetailModal';
import { fetchCategories } from './services/Api';

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // UI Modal & Toast State Controls
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null); // Toast alert state

  // Load Categories on Initial Render
  useEffect(() => {
    async function getCats() {
      const cats = await fetchCategories();
      setCategories(cats);
    }
    getCats();
  }, []);

  // Show dynamic toast banner
  const triggerToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Cart Operations
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: product.quantity || 1 }];
    });

    // Trigger feedback notification banner
    triggerToast(`"${product.title.slice(0, 25)}..." added to cart!`);
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans relative">
      {/* 1. Floating Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-bounce">
          <span className="text-emerald-400 font-bold text-base">✓</span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* 2. Sticky Navigation Header */}
      <Header
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistItems.length}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => alert('Wishlist feature coming next!')}
        onNavigateHome={() => {}}
        onNavigateShop={() => {}}
      />

      {/* 3. Secondary Sub-Category Bar */}
      <CategoryNav
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onNavigateShop={() => {}}
      />

      {/* 4. Main Page Content */}
     {/* Inside src/App.jsx */}

<main className="flex-grow">
  <HomePage
    selectedCategory={selectedCategory}
    searchQuery={searchQuery}
    onAddToCart={handleAddToCart}
    onQuickView={(prod) => setSelectedProduct(prod)}
    onNavigateToShop={() => {}}
  />
</main>

      {/* 5. Global Footer */}
      <Footer />

      {/* 6. Drawers and Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => alert('Redirecting to secure payment checkout...')}
      />

      <ProductDetailModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}