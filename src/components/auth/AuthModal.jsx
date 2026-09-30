// src/components/auth/AuthModal.jsx
import React, { useState } from 'react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isSignup
      ? 'http://127.0.0.1:8000/api/auth/signup'
      : 'http://127.0.0.1:8000/api/auth/login';

    // Construct precise payload depending on mode
    const payload = isSignup
      ? {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone || '',
        }
      : {
          email: formData.email,
          password: formData.password,
        };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Authentication failed');
      }

      onLoginSuccess(data.user);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-sm font-bold"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-slate-900 mb-1">
          {isSignup ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          {isSignup ? 'Fill in your information to register' : 'Log in to manage orders and checkout'}
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg mb-4 border border-red-100 font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-xs outline-none focus:border-amber-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-xs outline-none focus:border-amber-500 text-slate-900"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="user@example.com"
              className="w-full border border-slate-200 rounded-lg p-2.5 text-xs outline-none focus:border-amber-500 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border border-slate-200 rounded-lg p-2.5 text-xs outline-none focus:border-amber-500 text-slate-900"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs transition disabled:opacity-50"
          >
            {loading ? 'Processing...' : isSignup ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => {
              setIsSignup(!isSignup);
              setError('');
            }}
            className="text-xs text-amber-600 font-bold hover:underline"
          >
            {isSignup ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}