"use client";

import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import MovieRow from '@/components/MovieRow';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://netflix-backend-api.onrender.com/api';
        const res = await fetch(`${apiUrl}/movies`);
        if (res.ok) {
          const data = await res.json();
          setMovies(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const heroMovie = movies.length > 0 ? movies[0] : null;
  const trending = movies.slice(0, 8);
  const actionMovies = movies.slice(8, 16);

  if (movies.length === 0) {
    return (
      <div className="min-h-screen bg-[#141414] text-white flex flex-col items-center justify-center pt-20 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">No movies found!</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          The backend API might be sleeping or unreachable. If you are using Render free tier, please wait up to 60 seconds and refresh the page.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold transition"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414]">
      {heroMovie && <Hero movie={heroMovie} />}
      
      <div className="pb-10 relative z-10 pl-0" style={{ marginTop: heroMovie ? '-10%' : '5rem' }}>
        <MovieRow title="Trending Now" movies={trending} />
        {movies.length > 8 && <MovieRow title="Action & Adventure" movies={actionMovies} />}
      </div>
    </div>
  );
}
