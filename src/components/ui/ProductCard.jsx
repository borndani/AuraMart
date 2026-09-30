// src/components/ui/ProductCard.jsx
import React from 'react';

export default function ProductCard({ product, onAddToCart, onQuickView }) {
  const { title, price, image, rating, category } = product;

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-slate-100 flex flex-col h-full overflow-hidden relative">
      {/* Category Pill */}
      <span className="absolute top-3 left-3 z-10 bg-black/70 backdrop-blur-md text-white text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full">
        {category}
      </span>

      {/* Image Container with Hover Scale */}
      <div className="relative w-full pt-[100%] bg-slate-50 overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-contain p-6 group-hover:scale-105 transition duration-500"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 
          className="text-sm font-medium text-slate-800 line-clamp-2 hover:text-amber-600 transition cursor-pointer mb-2"
          onClick={() => onQuickView(product)}
        >
          {title}
        </h3>

        {/* Rating Stars */}
        <div className="flex items-center gap-1 text-amber-500 text-xs mb-3 mt-auto">
          <span>★</span>
          <span className="font-semibold text-slate-700">{rating?.rate || '4.5'}</span>
          <span className="text-slate-400">({rating?.count || 120})</span>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div>
            <span className="text-xs text-slate-400 block line-through">
              ${(price * 1.25).toFixed(2)}
            </span>
            <span className="text-lg font-bold text-slate-900">
              ${price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-semibold text-xs px-3 py-2 rounded-lg transition duration-200"
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}