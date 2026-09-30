// src/components/layout/Header.jsx
import React, { useState } from 'react';

export default function Header({
  cartCount = 0,
  wishlistCount = 0,
  categories = [],
  selectedCategory = 'all',
  onSelectCategory,
  searchQuery = '',
  onSearchChange,
  onOpenCart,
  onOpenWishlist,
  onNavigateHome,
  onNavigateShop,
  // Auth & Admin Props
  user = null,
  onOpenAuth,
  onLogout,
  onNavigateAdmin,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900 text-white shadow-md">
      {/* 1. Top Announcement Bar */}
      <div className="bg-slate-950 border-b border-slate-800 text-[11px] font-medium py-1.5 px-4 text-slate-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-amber-400">
              ⚡ <span>Free Express Delivery on orders over $50</span>
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-400">24/7 Customer Support</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button className="hover:text-white transition">Sell on AURA</button>
            <button className="hover:text-white transition">Track Order</button>
          </div>
        </div>
      </div>

      {/* 2. Main Search & Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={onNavigateHome}
          className="flex items-center gap-2 cursor-pointer select-none group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition">
            A
          </div>
          <div>
            <span className="text-xl font-black tracking-wider text-white block leading-none">
              AURA<span className="text-amber-400">.</span>
            </span>
            <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-bold">
              ATELIER
            </span>
          </div>
        </div>

        {/* Integrated Search Bar */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-4">
          <div className="flex w-full rounded-xl overflow-hidden bg-slate-800 border border-slate-700 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/20 transition duration-200">
            
            {/* Embedded Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => onSelectCategory(e.target.value)}
              className="bg-slate-800 text-slate-300 text-xs font-semibold px-3 py-2.5 outline-none border-r border-slate-700 cursor-pointer hover:text-white transition"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>

            {/* Input Search Field */}
            <input
              type="text"
              placeholder="Search clothes, bags, shoes, accessories..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-transparent text-white placeholder-slate-400 text-xs px-3 py-2 outline-none"
            />

            {/* Search Button Icon */}
            <button 
              onClick={onNavigateShop}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 flex items-center justify-center font-bold text-sm transition"
            >
              🔍
            </button>
          </div>
        </div>

        {/* User Quick Actions (Auth, Wishlist & Cart) */}
        <div className="flex items-center gap-3 sm:gap-4">

          {/* Admin Badge (Only visible if logged-in user has role === 'admin') */}
          {user?.role === 'admin' && (
            <button
              onClick={onNavigateAdmin}
              className="hidden sm:flex text-xs font-bold text-amber-400 bg-amber-400/10 hover:bg-amber-400/20 px-3 py-2 rounded-xl border border-amber-400/30 transition items-center gap-1"
            >
              👑 <span>Admin</span>
            </button>
          )}

          {/* Login / User Session Control */}
          {user ? (
            <div className="flex items-center gap-2 bg-slate-800 px-3 py-2 rounded-xl border border-slate-700">
              <span className="text-xs font-medium text-slate-300 hidden sm:inline">
                Hi, <strong className="text-amber-400">{user.name}</strong>
              </span>
              <button
                onClick={onLogout}
                className="text-xs font-bold text-red-400 hover:text-red-300 transition"
                title="Log Out"
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white px-3.5 py-2.5 rounded-xl border border-slate-700 transition"
            >
              Log In / Sign Up
            </button>
          )}
          
          {/* Wishlist Button */}
          <button 
            onClick={onOpenWishlist}
            className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition flex items-center gap-1.5"
            title="Wishlist"
          >
            <span className="text-lg">❤️</span>
            <span className="hidden lg:inline text-xs font-semibold">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl transition duration-200 flex items-center gap-2 shadow-lg shadow-amber-500/10"
          >
            <span className="text-base">🛍️</span>
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="bg-slate-950 text-amber-400 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full min-w-[18px]">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Input */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex w-full rounded-lg overflow-hidden bg-slate-800 border border-slate-700">
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-transparent text-white placeholder-slate-400 text-xs px-3 py-2 outline-none"
          />
          <button 
            onClick={onNavigateShop}
            className="bg-amber-500 text-slate-950 px-4 font-bold text-xs"
          >
            Search
          </button>
        </div>
      </div>
    </header>
  );
}