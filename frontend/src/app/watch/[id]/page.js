"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import VideoPlayer from '@/components/VideoPlayer';

// Mock data for initial rendering (will be replaced by actual backend data)
const mockMovie = {
  _id: "1",
  title: "Inception",
  description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  videoUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  posterUrl: "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
  subtitles: []
};

export default function WatchPage() {
  const { id } = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${apiUrl}/movies/${id}`);
        if (res.ok) {
          const data = await res.json();
          setMovie(data);
        }
      } catch (err) {
        console.error("Failed to fetch movie", err);
      }
    };
    if (id) fetchMovie();
  }, [id]);

  if (!movie) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-6xl mx-auto px-4">
        <button 
          onClick={() => router.back()}
          className="text-white hover:text-gray-300 mb-6 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Browse
        </button>

        <VideoPlayer 
          videoUrl={movie.videoUrl || movie.embedUrl || "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"} 
          posterUrl={movie.backdropUrl || movie.posterUrl}
          subtitles={movie.subtitles || []}
        />

        <div className="mt-8 text-white">
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-400 max-w-3xl leading-relaxed">
            {movie.description}
          </p>
        </div>
      </div>
    </div>
  );
}
