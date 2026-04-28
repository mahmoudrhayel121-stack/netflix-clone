import Hero from '@/components/Hero';
import MovieRow from '@/components/MovieRow';

// Disable caching for dynamic data
export const dynamic = 'force-dynamic';

export default async function Home() {
  let movies = [];
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const res = await fetch(`${apiUrl}/movies`, { cache: 'no-store' });
    if (res.ok) {
      movies = await res.json();
    }
  } catch (err) {
    console.error("Failed to fetch movies:", err);
  }

  // Use the first movie as hero, or a fallback if empty
  const heroMovie = movies.length > 0 ? movies[0] : null;
  const trending = movies.slice(0, 8);
  const actionMovies = movies.slice(8, 16);

  return (
    <div className="min-h-screen bg-[#141414]">
      {heroMovie && <Hero movie={heroMovie} />}
      
      <div className="pb-10 -mt-[10%] relative z-10 pl-0">
        <MovieRow title="Trending Now" movies={trending} />
        {movies.length > 8 && <MovieRow title="Action & Adventure" movies={actionMovies} />}
      </div>
    </div>
  );
}
