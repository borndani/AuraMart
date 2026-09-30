// src/components/layout/CategoryNav.jsx
import React from 'react';

export default function CategoryNav({ 
  categories = [], 
  selectedCategory = 'all', 
  onSelectCategory, 
  onNavigateShop 
}) {
  return (
    <nav className="bg-slate-800 border-b border-slate-700/60 text-slate-300 text-xs font-semibold py-2 px-4 shadow-inner">
      <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar gap-6">
        
        {/* Navigation Category Pills */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              onSelectCategory('all');
              onNavigateShop();
            }}
            className={`px-3 py-1.5 rounded-lg transition ${
              selectedCategory === 'all'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'hover:bg-slate-700 hover:text-white'
            }`}
          >
            All Products
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                onSelectCategory(cat);
                onNavigateShop();
              }}
              className={`px-3 py-1.5 rounded-lg capitalize whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'hover:bg-slate-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Jumia/Amazon Style Quick Promo Badges */}
        <div className="hidden lg:flex items-center gap-4 shrink-0 text-[11px] font-bold">
          <span className="text-amber-400 flex items-center gap-1 cursor-pointer hover:underline">
            ⚡ Flash Deals
          </span>
          <span className="text-emerald-400 flex items-center gap-1 cursor-pointer hover:underline">
            📦 Express Shipping
          </span>
          <span className="text-slate-400 hover:text-white cursor-pointer">
            Clearance Sale
          </span>
        </div>

      </div>
    </nav>
  );
}