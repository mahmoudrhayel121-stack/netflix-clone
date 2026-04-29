"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#141414]' : 'bg-transparent bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        <div className="flex items-center space-x-8">
          <Link href="/">
            <span className="text-red-600 font-bold text-3xl cursor-pointer">NETFLIX</span>
          </Link>
          <ul className="hidden md:flex space-x-6 text-sm font-light">
            <li className="cursor-pointer hover:text-gray-300 transition text-white">Home</li>
            <li className="cursor-pointer hover:text-gray-300 transition text-white">TV Shows</li>
            <li className="cursor-pointer hover:text-gray-300 transition text-white">Movies</li>
            <li className="cursor-pointer hover:text-gray-300 transition text-white">New & Popular</li>
            <li className="cursor-pointer hover:text-gray-300 transition text-white">My List</li>
          </ul>
        </div>
        
        <div className="flex items-center space-x-6">
          {/* Search Icon & Input */}
          <div className="hidden sm:flex items-center space-x-2">
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center bg-black/70 border border-white/50 px-2 py-1 rounded transition-all duration-300 w-48 lg:w-64">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => setIsSearchOpen(false)}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Titles, people, genres" 
                  className="bg-transparent text-white text-sm outline-none w-full ml-2 placeholder-gray-400"
                  autoFocus
                />
              </form>
            ) : (
              <div className="cursor-pointer" onClick={() => setIsSearchOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            )}
          </div>
          
          <Link href="/login">
            <button className="bg-red-600 text-white px-4 py-1.5 rounded text-sm hover:bg-red-700 transition">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
