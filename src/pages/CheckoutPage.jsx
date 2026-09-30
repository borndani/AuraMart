// src/pages/CheckoutPage.jsx
import React, { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';

export default function CheckoutPage({
  cartItems = [],
  user = null,
  onBackToShop,
  onOrderComplete,
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Use environment variable for deployment (falls back to local FastAPI backend)
  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );
  const shipping = subtotal > 0 ? 10.0 : 0.0;
  const grandTotal = subtotal + shipping;

  // Paystack config (Amount must be in kobo/lowest unit, so multiply by 100)
  const paystackConfig = {
    reference: `AM_${new Date().getTime()}`,
    email: user?.email || '',
    amount: Math.round(grandTotal * 100),
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_07c44939fd450d9897044b5d1857fea6d4bd5dad',
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  // Send transaction reference to FastAPI for verification
  const handleVerifyOnBackend = async (reference) => {
    setIsProcessing(true);
    setErrorMessage('');

    try {
      const response = await fetch(`${API_URL}/api/checkout/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reference: reference,
          user_email: user?.email || '',
          cart_items: cartItems,
          total_amount: grandTotal,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Payment verification failed.');
      }

      setIsProcessing(false);
      if (onOrderComplete) onOrderComplete(data);
    } catch (err) {
      setIsProcessing(false);
      setErrorMessage('Verification Error: ' + err.message);
    }
  };

  const onSuccess = (referenceObj) => {
    // Called when Paystack popup completes successfully
    handleVerifyOnBackend(referenceObj.reference);
  };

  const onClose = () => {
    setIsProcessing(false);
    setErrorMessage('Payment popup was closed without completing purchase.');
  };

  const handlePayNow = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!user || !user.email) {
      setErrorMessage('Please log in before completing your purchase.');
      return;
    }

    if (cartItems.length === 0) {
      setErrorMessage('Your cart is empty.');
      return;
    }

    setIsProcessing(true);
    initializePayment(onSuccess, onClose);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white my-8 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <h1 className="text-2xl font-bold text-slate-900">Checkout</h1>
        <button
          onClick={onBackToShop}
          className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 px-3 py-2 rounded-lg transition"
        >
          ← Back to Shop
        </button>
      </div>

      {errorMessage && (
        <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl mb-6 font-semibold border border-red-100">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handlePayNow} className="space-y-6">
        {/* User details */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
            Account Email
          </label>
          <input
            type="email"
            value={user?.email || ''}
            disabled
            placeholder="Log in to complete purchase"
            className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg p-3"
          />
        </div>

        {/* Order Summary */}
        <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-sm text-slate-700">
          <div className="flex justify-between">
            <span>Items Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-slate-900 text-base pt-2 border-t border-slate-200">
            <span>Grand Total:</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Pay Button */}
        <button
          type="submit"
          disabled={isProcessing || cartItems.length === 0}
          className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 rounded-xl shadow-md transition disabled:opacity-50"
        >
          {isProcessing ? 'Processing Payment...' : `Pay $${grandTotal.toFixed(2)} with Paystack`}
        </button>
      </form>
    </div>
  );
}