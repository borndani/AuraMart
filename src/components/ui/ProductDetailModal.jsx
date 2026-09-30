// src/components/ui/ProductDetailModal.jsx
import React, { useState } from 'react';

export default function ProductDetailModal({ product, isOpen, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const SIZES = ['S', 'M', 'L', 'XL'];
  const COLORS = [
    { name: 'Black', class: 'bg-slate-900' },
    { name: 'Beige', class: 'bg-amber-100' },
    { name: 'Navy', class: 'bg-blue-900' }
  ];

  const handleAdd = () => {
    onAddToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-2">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full flex items-center justify-center text-xs font-bold transition"
        >
          ✕
        </button>

        {/* Product Image */}
        <div className="bg-slate-50 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-100">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-72 object-contain hover:scale-105 transition duration-300"
          />
        </div>

        {/* Modal Info Form */}
        <div className="p-6 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
              {product.category}
            </span>
            <h2 className="text-base font-bold text-slate-900 mt-2 leading-snug">
              {product.title}
            </h2>
            <p className="text-xl font-black text-slate-900 mt-2">
              ${product.price?.toFixed(2)}
            </p>
            <p className="text-xs text-slate-500 mt-2 line-clamp-3">
              {product.description}
            </p>
          </div>

          {/* Size Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Select Size</label>
            <div className="flex gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-9 h-9 rounded-lg text-xs font-bold border transition ${
                    selectedSize === size
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'border-slate-200 text-slate-700 hover:border-slate-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Swatch */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Color: {selectedColor}</label>
            <div className="flex gap-2">
              {COLORS.map((col) => (
                <button
                  key={col.name}
                  onClick={() => setSelectedColor(col.name)}
                  className={`w-7 h-7 rounded-full border-2 ${col.class} transition ${
                    selectedColor === col.name ? 'ring-2 ring-amber-500 ring-offset-2' : 'border-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Add To Cart */}
          <button
            onClick={handleAdd}
            className="w-full bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold py-3 rounded-xl transition shadow-lg shadow-amber-500/20 text-xs uppercase tracking-wider"
          >
            Add to Bag (${(product.price * quantity).toFixed(2)})
          </button>
        </div>

      </div>
    </div>
  );
}