// src/components/home/FlashDeals.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from '../ui/ProductCard';

export default function FlashDeals({ products, onAddToCart, onQuickView }) {
  // 12-hour countdown timer
  const [timeLeft, setTimeLeft] = useState({ hours: 11, minutes: 59, seconds: 59 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-red-50/50 border border-red-100 rounded-2xl p-6 my-8">
      {/* Header with Countdown */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="bg-red-600 text-white font-black text-xs uppercase tracking-wider px-3 py-1 rounded-md">
            ⚡ Flash Sales
          </span>
          <h2 className="text-xl font-bold text-slate-900">Limited Time Deals</h2>
        </div>

        {/* Countdown Counter */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <span className="text-slate-500">Ends In:</span>
          <span className="bg-slate-900 text-white px-2.5 py-1 rounded-md font-mono">
            {String(timeLeft.hours).padStart(2, '0')}h
          </span>
          :
          <span className="bg-slate-900 text-white px-2.5 py-1 rounded-md font-mono">
            {String(timeLeft.minutes).padStart(2, '0')}m
          </span>
          :
          <span className="bg-red-600 text-white px-2.5 py-1 rounded-md font-mono animate-pulse">
            {String(timeLeft.seconds).padStart(2, '0')}s
          </span>
        </div>
      </div>

      {/* Grid of Flash Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
          />
        ))}
      </div>
    </section>
  );
}