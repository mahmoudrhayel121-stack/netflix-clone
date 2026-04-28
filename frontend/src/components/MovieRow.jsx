import Link from 'next/link';

const MovieRow = ({ title, movies }) => {
  return (
    <div className="py-4">
      <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 px-4 md:px-12">
        {title}
      </h2>
      <div className="relative group">
        <div className="flex overflow-x-auto space-x-4 px-4 md:px-12 pb-4 scrollbar-hide">
          {movies.map((movie) => (
            <div key={movie._id} className="flex-none w-[160px] md:w-[240px] h-[240px] md:h-[360px] relative transition-transform duration-300 hover:scale-105 hover:z-10 cursor-pointer">
              <Link href={`/watch/${movie._id}`}>
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover rounded-md shadow-md"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 rounded-md">
                   <p className="text-white text-sm font-semibold text-center px-2">{movie.title}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
