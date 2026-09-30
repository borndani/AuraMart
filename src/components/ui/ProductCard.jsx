// src/components/ui/ProductCard.jsx
import React from 'react';

export default function ProductCard({ product, onAddToCart, onQuickView }) {
  if (!product) return null;

  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
      <div>
        <div 
          onClick={() => onQuickView && onQuickView(product)}
          className="cursor-pointer bg-slate-50 p-4 rounded-lg mb-3 flex items-center justify-center h-40 overflow-hidden"
        >
          <img 
            src={product.image || 'https://via.placeholder.com/150'} 
            alt={product.title || 'Product'} 
            className="max-h-full object-contain hover:scale-105 transition"
          />
        </div>
        <h3 className="text-xs font-bold text-slate-800 line-clamp-2 mb-1">
          {product.title}
        </h3>
        <p className="text-xs font-black text-slate-900 mb-3">
          ${product.price ? product.price.toFixed(2) : '0.00'}
        </p>
      </div>

      <button
        onClick={() => onAddToCart && onAddToCart(product)}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2 rounded-lg transition"
      >
        Add to Cart
      </button>
    </div>
  );
}