// src/components/home/HeroCarousel.jsx
import React, { useState, useEffect } from 'react';

const BANNERS = [
  {
    id: 1,
    title: "New Season Handbags & Tote Collection",
    subtitle: "Up to 40% off top fashion brands & designer bags.",
    tag: "SPRING / SUMMER 2026",
    bg: "from-slate-900 via-purple-950 to-slate-900",
    cta: "Shop Bags",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Premium Men & Women Apparels",
    subtitle: "Elevate your wardrobe with everyday luxury essentials.",
    tag: "TRENDING NOW",
    bg: "from-slate-900 via-amber-950 to-slate-900",
    cta: "Explore Apparel",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=800"
  }
];

export default function HeroCarousel({ onShopClick }) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = BANNERS[activeSlide];

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden bg-gradient-to-r ${slide.bg} text-white transition-all duration-700 min-h-[380px] flex items-center`}>
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        
        {/* Left Copy */}
        <div className="space-y-4">
          <span className="inline-block bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            {slide.tag}
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            {slide.title}
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-md">
            {slide.subtitle}
          </p>
          <div>
            <button
              onClick={onShopClick}
              className="mt-2 bg-amber-500 hover:bg-amber-400 cursor-pointer text-slate-950 font-bold px-6 py-3 rounded-xl transition duration-300 shadow-lg hover:shadow-amber-500/25"
            >
              {slide.cta} →
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="hidden md:flex justify-end">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-80 h-80 object-cover rounded-2xl shadow-2xl border-2 border-white/10 transform rotate-2 hover:rotate-0 transition duration-500"
          />
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {BANNERS.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeSlide === index ? 'w-8 bg-amber-500' : 'w-2 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}