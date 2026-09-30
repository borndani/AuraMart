// src/pages/CheckoutPage.jsx
import React, { useState } from 'react';

export default function CheckoutPage({ cartItems, user, onBackToShop, onOrderComplete }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const totalAmount = calculateSubtotal();

  const handleCheckout = async (e) => {
    e.preventDefault();
    setError('');

    if (!user || !user.email) {
      setError('Please log in to complete your checkout.');
      return;
    }

    if (cartItems.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    setLoading(true);

    const payload = {
      user_email: user.email,
      cart_items: cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
      total_amount: totalAmount,
      payment_method: paymentMethod,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Checkout failed. Please try again.');
      }

      // Triggers setCartItems([]) and setCurrentPage('home') in App.jsx
      onOrderComplete();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={onBackToShop}
        className="text-xs font-bold text-slate-500 hover:text-slate-900 mb-6 flex items-center gap-1"
      >
        ← Continue Shopping
      </button>

      <h1 className="text-2xl font-bold text-slate-900 mb-6">Complete Your Order</h1>

      {error && (
        <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl mb-6 font-semibold border border-red-100">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Order Details & Payment Method */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">
              1. Customer Information
            </h2>
            <div className="text-xs text-slate-600 space-y-1">
              <p><span className="font-semibold text-slate-800">Name:</span> {user?.name}</p>
              <p><span className="font-semibold text-slate-800">Email:</span> {user?.email}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">
              2. Select Payment Method
            </h2>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-xl border font-bold transition flex flex-col items-center gap-2 ${
                  paymentMethod === 'card'
                    ? 'border-amber-500 bg-amber-50 text-amber-900'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <span className="text-lg">💳</span>
                Credit / Debit Card
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('transfer')}
                className={`p-4 rounded-xl border font-bold transition flex flex-col items-center gap-2 ${
                  paymentMethod === 'transfer'
                    ? 'border-amber-500 bg-amber-50 text-amber-900'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <span className="text-lg">🏦</span>
                Bank Transfer
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide pb-3 border-b border-slate-100">
            Order Summary
          </h2>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-xs text-slate-600">
                <div className="truncate max-w-[140px]">
                  <p className="font-semibold text-slate-800 truncate">{item.title}</p>
                  <p className="text-[10px] text-slate-400">Qty: {item.quantity}</p>
                </div>
                <span className="font-bold text-slate-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Shipping</span>
              <span className="text-emerald-600 font-semibold">FREE</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-100">
              <span>Total Amount</span>
              <span className="text-amber-600">${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading || cartItems.length === 0}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl text-xs transition disabled:opacity-50"
          >
            {loading ? 'Processing Payment...' : `Pay $${totalAmount.toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
}