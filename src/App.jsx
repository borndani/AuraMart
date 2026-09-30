// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import CategoryNav from './components/layout/CategoryNav';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import CartDrawer from './components/cart/CartDrawer';
import ProductDetailModal from './components/ui/ProductDetailModal';
import AuthModal from './components/auth/AuthModal';
import { fetchCategories } from './services/Api';

export default function App() {
  // Initialize cartItems from localStorage so items persist on page reload
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('auramart_cart');
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (e) {
        localStorage.removeItem('auramart_cart');
      }
    }
    return [];
  });

  const [categories, setCategories] = useState(['electronics', 'jewelery', "men's clothing", "women's clothing"]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Navigation & Authentication State
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'checkout' | 'admin'
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  
  // UI Drawers/Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync cartItems changes to localStorage
  useEffect(() => {
    localStorage.setItem('auramart_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Restore login session on page reload
  useEffect(() => {
    const savedUser = localStorage.getItem('auramart_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('auramart_user');
      }
    }
  }, []);

  useEffect(() => {
    async function getCats() {
      try {
        const cats = await fetchCategories();
        if (Array.isArray(cats) && cats.length > 0) {
          setCategories(cats);
        }
      } catch (err) {
        console.error('Failed to load categories from API, using defaults:', err);
      }
    }
    getCats();
  }, []);

  const triggerToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleAddToCart = (product) => {
    if (!product) return;

    const normalizedProduct = {
      ...product,
      image: product.image || product.imageUrl || product.image_url || 'https://via.placeholder.com/150',
    };

    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === normalizedProduct.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === normalizedProduct.id
            ? { ...item, quantity: item.quantity + (normalizedProduct.quantity || 1) }
            : item
        );
      }
      return [...prevItems, { ...normalizedProduct, quantity: normalizedProduct.quantity || 1 }];
    });

    triggerToast(`"${(normalizedProduct.title || 'Item').slice(0, 20)}..." added to cart!`);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    
    if (!user) {
      triggerToast('Please log in or sign up to proceed to checkout!');
      setIsAuthOpen(true);
      return;
    }

    setCurrentPage('checkout');
  };

  // ADMIN RBAC GUARD: Prevents regular users from navigating to admin page
  const handleNavigateAdmin = () => {
    if (!user) {
      triggerToast('Please log in to access admin features.');
      setIsAuthOpen(true);
      return;
    }

    if (user.role !== 'admin') {
      triggerToast('⛔ Access Denied: Admin privileges required!');
      return;
    }

    setCurrentPage('admin');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans relative">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-bounce">
          <span className="text-amber-400 font-bold">ⓘ</span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateHome={() => setCurrentPage('home')}
        onNavigateAdmin={handleNavigateAdmin}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={() => {
          localStorage.removeItem('auramart_user');
          setUser(null);
          setCurrentPage('home');
          triggerToast('Logged out successfully.');
        }}
      />

      <CategoryNav
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onNavigateShop={() => setCurrentPage('home')}
      />

      {/* Page Routing */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomePage
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            onAddToCart={handleAddToCart}
            onQuickView={(prod) => setSelectedProduct(prod)}
            onNavigateToShop={() => setCurrentPage('home')}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage
            cartItems={cartItems}
            user={user}
            onBackToShop={() => setCurrentPage('home')}
            onOrderComplete={() => {
              setCartItems([]);
              localStorage.removeItem('auramart_cart');
              setCurrentPage('home');
              triggerToast('🎉 Order placed and verified successfully!');
            }}
          />
        )}

        {currentPage === 'admin' && (
          user?.role === 'admin' ? (
            <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-xl shadow-sm border border-slate-200">
              <h1 className="text-xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
              <p className="text-xs text-slate-600">Authorized as: {user.email}</p>
            </div>
          ) : (
            <div className="max-w-md mx-auto my-12 p-6 bg-red-50 text-red-700 rounded-xl text-center font-bold">
              ⛔ 403 Forbidden: Admin Access Denied
            </div>
          )
        )}
      </main>

      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={(id, qty) => {
          if (qty <= 0) setCartItems((prev) => prev.filter((i) => i.id !== id));
          else setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
        }}
        onRemoveItem={(id) => setCartItems((prev) => prev.filter((i) => i.id !== id))}
        onCheckout={handleProceedToCheckout}
      />

      {/* Product Quick-View */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={Boolean(selectedProduct)}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(userData) => {
          setUser(userData);
          localStorage.setItem('auramart_user', JSON.stringify(userData));
          triggerToast(`Welcome back, ${userData.name}!`);
        }}
      />
    </div>
  );
}