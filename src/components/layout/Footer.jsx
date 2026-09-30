// src/components/layout/Footer.jsx
import React, { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 mt-20 font-sans">
      
      {/* 1. Newsletter Subscription Section */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 border-b border-slate-800/80 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1 max-w-xl">
            <h3 className="text-lg font-bold text-white tracking-wide">
              Join the <span className="text-amber-400">AURA Club</span> & Save 15%
            </h3>
            <p className="text-slate-400 text-xs">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals delivered straight to your inbox.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="flex w-full md:w-auto max-w-md gap-2">
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
            />
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-amber-500/20 shrink-0 text-xs uppercase tracking-wider"
            >
              Subscribe
            </button>
          </form>
        </div>
        {subscribed && (
          <p className="max-w-7xl mx-auto text-emerald-400 text-xs font-semibold mt-3 text-center md:text-right">
            ✓ Thank you for subscribing! Check your inbox for your 15% coupon code.
          </p>
        )}
      </div>

      {/* 2. Value Proposition Trust Badges */}
      <div className="border-b border-slate-800/80 py-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="p-3 space-y-1.5 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xl text-amber-400 mb-1">
              🚀
            </div>
            <h4 className="font-bold text-white text-sm">Express Worldwide Delivery</h4>
            <p className="text-[11px] text-slate-500">Free standard shipping on orders over $50</p>
          </div>

          <div className="p-3 space-y-1.5 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xl text-amber-400 mb-1">
              🛡️
            </div>
            <h4 className="font-bold text-white text-sm">Money-Back Guarantee</h4>
            <p className="text-[11px] text-slate-500">30-day hassle-free return policy</p>
          </div>

          <div className="p-3 space-y-1.5 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xl text-amber-400 mb-1">
              🔒
            </div>
            <h4 className="font-bold text-white text-sm">256-Bit SSL Encryption</h4>
            <p className="text-[11px] text-slate-500">Your transactions and data are always secured</p>
          </div>

          <div className="p-3 space-y-1.5 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xl text-amber-400 mb-1">
              🎧
            </div>
            <h4 className="font-bold text-white text-sm">Dedicated 24/7 Support</h4>
            <p className="text-[11px] text-slate-500">Contact our experts anytime via chat or email</p>
          </div>
        </div>
      </div>

      {/* 3. Main Footer Links Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        
        {/* Brand Description Column */}
        <div className="md:col-span-2 space-y-4 pr-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-black text-slate-950 text-lg shadow-lg shadow-amber-500/20">
              A
            </div>
            <span className="text-lg font-black tracking-wider text-white">
              AURA<span className="text-amber-400">.</span> ATELIER
            </span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            AURA Atelier is your destination for premium contemporary fashion, designer footwear, handbags, and tech accessories. Curated with craftsmanship and modern aesthetic in mind.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-3 pt-2">
            {['Instagram', 'Twitter/X', 'Facebook', 'TikTok', 'Pinterest'].map((platform) => (
              <button
                key={platform}
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-amber-400 hover:bg-slate-800 flex items-center justify-center text-xs font-semibold transition"
                title={platform}
              >
                {platform[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Column 1: Shop Departments */}
        <div className="space-y-3">
          <h4 className="text-white text-xs font-bold uppercase tracking-wider border-b border-slate-800 pb-2">
            Shop Categories
          </h4>
          <ul className="space-y-2 text-[11px]">
            <li><button className="hover:text-amber-400 transition">Women's Fashion</button></li>
            <li><button className="hover:text-amber-400 transition">Men's Apparel</button></li>
            <li><button className="hover:text-amber-400 transition">Designer Handbags</button></li>
            <li><button className="hover:text-amber-400 transition">Fine Jewelry & Accessories</button></li>
            <li><button className="hover:text-amber-400 transition">Electronics & Hardware</button></li>
            <li><button className="hover:text-amber-400 text-amber-400 font-semibold transition">⚡ Flash Deals & Sales</button></li>
          </ul>
        </div>

        {/* Column 2: Customer Help & Support */}
        <div className="space-y-3">
          <h4 className="text-white text-xs font-bold uppercase tracking-wider border-b border-slate-800 pb-2">
            Customer Care
          </h4>
          <ul className="space-y-2 text-[11px]">
            <li><button className="hover:text-amber-400 transition">Help Center & FAQs</button></li>
            <li><button className="hover:text-amber-400 transition">Track Your Order</button></li>
            <li><button className="hover:text-amber-400 transition">Shipping & Delivery Rates</button></li>
            <li><button className="hover:text-amber-400 transition">Returns & Exchanges Policy</button></li>
            <li><button className="hover:text-amber-400 transition">Size Guide & Fitting</button></li>
            <li><button className="hover:text-amber-400 transition">Contact Support Team</button></li>
          </ul>
        </div>

        {/* Column 3: Corporate & Legal */}
        <div className="space-y-3">
          <h4 className="text-white text-xs font-bold uppercase tracking-wider border-b border-slate-800 pb-2">
            Company & Policies
          </h4>
          <ul className="space-y-2 text-[11px]">
            <li><button className="hover:text-amber-400 transition">About AURA Atelier</button></li>
            <li><button className="hover:text-amber-400 transition">Careers <span className="bg-amber-500/20 text-amber-400 text-[9px] px-1.5 py-0.5 rounded font-bold ml-1">Hiring</span></button></li>
            <li><button className="hover:text-amber-400 transition">Sustainability & Ethics</button></li>
            <li><button className="hover:text-amber-400 transition">Privacy Policy</button></li>
            <li><button className="hover:text-amber-400 transition">Terms of Service</button></li>
            <li><button className="hover:text-amber-400 transition">Sell on AURA Platform</button></li>
          </ul>
        </div>

      </div>

      {/* 4. Bottom Footer: Payment Methods & Copyright */}
      <div className="border-t border-slate-900 bg-slate-950/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px]">
          
          {/* Copyright Text */}
          <div className="text-slate-500 text-center md:text-left">
            © 2026 AURA Atelier Inc. All rights reserved. Designed for performance, scalability, and seamless online shopping.
          </div>

          {/* Payment Badges */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-[10px] text-slate-500 font-semibold mr-1">Accepted Payments:</span>
            {['VISA', 'MASTERCARD', 'PAYPAL', 'APPLE PAY', 'STRIPE'].map((pay) => (
              <span
                key={pay}
                className="bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded font-bold text-[9px] tracking-wider"
              >
                {pay}
              </span>
            ))}
          </div>

        </div>
      </div>

    </footer>
  );
}