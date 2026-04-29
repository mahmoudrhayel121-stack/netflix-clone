"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import MovieRow from '@/components/MovieRow';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) {
        setMovies([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://netflix-backend-api-ks0y.onrender.com/api';
        const res = await fetch(`${apiUrl}/movies?keyword=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setMovies(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Failed to fetch search results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <div className="min-h-screen bg-[#141414] pt-24 px-4 md:px-12">
      <h1 className="text-2xl md:text-3xl text-gray-400 font-semibold mb-8">
        Search results for "{query}"
      </h1>

      {loading ? (
        <div className="flex justify-center mt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      ) : movies.length > 0 ? (
        <MovieRow title="" movies={movies} />
      ) : (
        <div className="text-center mt-20">
          <h2 className="text-2xl text-white mb-2">No results found</h2>
          <p className="text-gray-400">Please try a different keyword or check your spelling.</p>
        </div>
      )}
    </div>
  );
}
