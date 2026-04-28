import Link from 'next/link';

const Hero = ({ movie }) => {
  if (!movie) {
    return <div className="h-[70vh] w-full bg-neutral-900 animate-pulse"></div>;
  }

  return (
    <div className="relative h-[70vh] w-full">
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          src={movie.backdropUrl || movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent opacity-80"></div>
      </div>

      <div className="absolute bottom-[20%] left-4 md:left-12 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          {movie.title}
        </h1>
        <p className="text-white text-sm md:text-lg mb-6 line-clamp-3 drop-shadow-md max-w-xl">
          {movie.description}
        </p>
        
        <div className="flex space-x-4">
          <Link href={`/watch/${movie._id}`}>
            <button className="flex items-center px-6 py-2 bg-white text-black font-semibold rounded hover:bg-white/80 transition shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Play
            </button>
          </Link>
          <button className="flex items-center px-6 py-2 bg-gray-500/70 text-white font-semibold rounded hover:bg-gray-500/50 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
