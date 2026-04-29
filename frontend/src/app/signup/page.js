"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://netflix-backend-api-ks0y.onrender.com/api';
      const res = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save token to localStorage
        localStorage.setItem('userInfo', JSON.stringify(data));
        router.push('/');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-black md:bg-transparent">
      {/* Background Image (visible on desktop) */}
      <div className="hidden md:block absolute inset-0 z-0">
        <img 
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="background"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 p-4 md:p-8 z-20">
        <Link href="/">
          <span className="text-red-600 font-bold text-4xl cursor-pointer">NETFLIX</span>
        </Link>
      </div>

      {/* Signup Form */}
      <div className="relative z-10 flex justify-center items-center min-h-screen pt-20 pb-10">
        <div className="bg-black/80 md:p-16 p-8 rounded w-full max-w-[450px]">
          <h1 className="text-white text-3xl font-bold mb-8">Sign Up</h1>
          
          {error && (
            <div className="bg-[#e87c03] text-white p-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#333] text-white px-4 py-3 rounded outline-none focus:bg-[#454545] transition"
              required
            />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#333] text-white px-4 py-3 rounded outline-none focus:bg-[#454545] transition"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#333] text-white px-4 py-3 rounded outline-none focus:bg-[#454545] transition"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-red-600 text-white font-bold py-3 rounded mt-6 hover:bg-red-700 transition"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-16 text-[#737373]">
            Already have an account? <Link href="/login" className="text-white hover:underline">Sign in now</Link>.
          </div>
        </div>
      </div>
    </div>
  );
}
