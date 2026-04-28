import Hero from '@/components/Hero';
import MovieRow from '@/components/MovieRow';

// Mock data for initial rendering until backend is seeded
const mockMovie = {
  _id: "1",
  title: "Inception",
  description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  backdropUrl: "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
  posterUrl: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg"
};

const mockMoviesList = [
  { ...mockMovie, _id: "1" },
  { ...mockMovie, _id: "2", title: "Interstellar", backdropUrl: "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg", posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
  { ...mockMovie, _id: "3", title: "The Dark Knight", backdropUrl: "https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg", posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
  { ...mockMovie, _id: "4", title: "Dunkirk", backdropUrl: "https://image.tmdb.org/t/p/original/cWCziT1wS4Zz3oE3Q6m2W3D0Xn.jpg", posterUrl: "https://image.tmdb.org/t/p/w500/ebSnODcjuFJu71XyYyVp6OAMxS2.jpg" },
  { ...mockMovie, _id: "5", title: "Tenet", backdropUrl: "https://image.tmdb.org/t/p/original/wzJRB4MKi3yK138bJyuL9nx47y6.jpg", posterUrl: "https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg" }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#141414]">
      <Hero movie={mockMovie} />
      
      <div className="pb-10 -mt-[10%] relative z-10 pl-0">
        <MovieRow title="Trending Now" movies={mockMoviesList} />
        <MovieRow title="Top Rated" movies={[...mockMoviesList].reverse()} />
        <MovieRow title="Action Movies" movies={mockMoviesList} />
      </div>
    </div>
  );
}
