// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import HeroCarousel from '../components/home/HeroCarousel';
import FlashDeals from '../components/home/FlashDeals';
import ProductCard from '../components/ui/ProductCard';
import { fetchProducts } from '../services/Api';

export default function HomePage({ selectedCategory = 'all', searchQuery = '', onAddToCart, onQuickView, onNavigateToShop }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-slate-600">Loading Catalogue...</p>
      </div>
    );
  }

  // 1. Filter products based on search query AND active category selection
  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      item.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim();

    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // 2. Separate strictly by category for organized section display when on "all"
  const electronicsProducts = filteredProducts.filter(
    (item) => item.category.toLowerCase() === 'electronics'
  );

  const womensClothing = filteredProducts.filter(
    (item) => item.category.toLowerCase() === "women's clothing"
  );

  const mensClothing = filteredProducts.filter(
    (item) => item.category.toLowerCase() === "men's clothing"
  );

  const jeweleryProducts = filteredProducts.filter(
    (item) => item.category.toLowerCase() === 'jewelery'
  );

  // If a specific category or search is active, show a single filtered grid!
  if (selectedCategory !== 'all' || searchQuery !== '') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-bold text-slate-900 capitalize">
            {searchQuery ? `Search Results for "${searchQuery}"` : selectedCategory}
          </h2>
          <span className="text-xs font-bold bg-amber-500 text-slate-950 px-3 py-1 rounded-full">
            {filteredProducts.length} Products Found
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 space-y-2">
            <span className="text-4xl">🔍</span>
            <p className="font-bold text-slate-700">No items found</p>
            <p className="text-xs text-slate-400">Try adjusting your category or search filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Default Homepage Layout when "All" is active
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      {/* Hero Banner */}
      <HeroCarousel onShopClick={onNavigateToShop} />

      {/* Mixed Limited Tisme Deals */}
      <FlashDeals 
        products={products} 
        onAddToCart={onAddToCart} 
        onQuickView={onQuickView} 
      />

      {/* Electronics Section Only */}
      {electronicsProducts.length > 0 && (
        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                💻 Electronics & Tech
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Top-rated gadgets and hardware</p>
            </div>
            <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
              {electronicsProducts.length} Items
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {electronicsProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        </section>
      )}

      {/* Women's Fashion Section Only */}
      {womensClothing.length > 0 && (
        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                👗 Women's Apparel & Fashion
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Jackets, coats, and tops</p>
            </div>
            <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
              {womensClothing.length} Items
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {womensClothing.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        </section>
      )}

      {/* Men's Fashion Section Only */}
      {mensClothing.length > 0 && (
        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                👔 Men's Clothing
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Casual shirts and outerwear</p>
            </div>
            <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
              {mensClothing.length} Items
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mensClothing.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        </section>
      )}

      {/* Jewelry Section Only */}
      {jeweleryProducts.length > 0 && (
        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                💍 Jewelry & Accessories
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Rings, bracelets, and luxury pieces</p>
            </div>
            <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
              {jeweleryProducts.length} Items
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {jeweleryProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        </section>
      )}
    
    </div>
  );
}