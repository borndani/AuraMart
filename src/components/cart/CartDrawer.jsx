// src/components/cart/CartDrawer.jsx
import React, { useState } from 'react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  // Calculate pricing metrics
  const FREE_SHIPPING_THRESHOLD = 100;
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 9.99;
  const grandTotal = subtotal - discountAmount + shippingFee;

  // Free shipping progress percentage
  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  // Promo code handler
  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    if (promoCode.trim().toUpperCase() === 'AURA20') {
      setDiscountPercent(20);
      setPromoSuccess('20% discount applied!');
    } else {
      setPromoError('Invalid promo code. Try AURA20');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xl">🛍️</span>
              <h2 className="text-lg font-bold">Shopping Cart ({cartItems.length})</h2>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              ✕
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-amber-50 p-4 border-b border-amber-100">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-800 mb-1.5">
              <span>
                {subtotal >= FREE_SHIPPING_THRESHOLD
                  ? '🎉 You unlocked FREE Shipping!'
                  : `Add $${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} more for FREE Shipping`}
              </span>
              <span>{shippingProgress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-amber-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-slate-100">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
                <span className="text-5xl opacity-40">🛒</span>
                <p className="font-semibold text-slate-700">Your cart is empty</p>
                <p className="text-xs text-slate-400 max-w-xs">
                  Looks like you haven't added any garments or bags to your bag yet.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-center">
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain bg-slate-50 p-2 rounded-lg border border-slate-100 shrink-0"
                  />

                  {/* Product Metadata & Controls */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-slate-800 truncate mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs font-bold text-slate-900 mb-2">
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs font-bold hover:bg-slate-200 transition"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs font-bold hover:bg-slate-200 transition"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-xs text-rose-500 hover:text-rose-700 font-medium transition ml-auto"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 space-y-4">
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (Try AURA20)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs uppercase outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition"
                >
                  Apply
                </button>
              </form>
              {promoError && <p className="text-[11px] text-rose-500 font-medium">{promoError}</p>}
              {promoSuccess && <p className="text-[11px] text-emerald-600 font-medium">{promoSuccess}</p>}

              {/* Price Calculations Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount (20%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-slate-900">
                    {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 border-t border-slate-200 pt-2 mt-1">
                  <span>Total</span>
                  <span className="text-amber-600">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={onCheckout}
                className="w-full bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black py-3 rounded-xl shadow-lg shadow-amber-500/20 text-sm tracking-wide transition duration-200"
              >
                Proceed to Checkout →
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}