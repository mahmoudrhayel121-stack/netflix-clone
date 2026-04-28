const mongoose = require('mongoose');
const Movie = require('./src/models/Movie');
const Category = require('./src/models/Category');

const TMDB_API_KEY = "3b94f326cb04407eaa15df56063a4c98";
const MONGODB_URI = "mongodb+srv://mahmoudrhayel121:Okgg123321okgg@cluster0.5v9jpkz.mongodb.net/netflixDB?retryWrites=true&w=majority";

const DUMMY_EMBED_URLS = [
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "https://www.youtube.com/embed/tgbNymZ7vqY"
];

async function seedData() {
    try {
        console.log("Connecting to MongoDB Atlas...");
        await mongoose.connect(MONGODB_URI);
        console.log("Connected successfully!");

        console.log("Fetching genres from TMDB...");
        const genreRes = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`);
        const genreData = await genreRes.json();
        
        const categoryMap = {}; // tmdb_id -> mongoose_id

        for (const genre of genreData.genres) {
            const slug = genre.name.toLowerCase().replace(/ /g, '-');
            let category = await Category.findOne({ slug });
            if (!category) {
                category = await Category.create({ name: genre.name, slug });
            }
            categoryMap[genre.id] = category._id;
        }
        console.log("Categories synced.");

        console.log("Fetching popular movies...");
        const movieRes = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
        const movieData = await movieRes.json();

        for (const tmdbMovie of movieData.results) {
            const exists = await Movie.findOne({ title: tmdbMovie.title });
            if (exists) {
                console.log(`Skipping ${tmdbMovie.title}, already exists.`);
                continue;
            }

            const movieGenres = tmdbMovie.genre_ids.map(id => categoryMap[id]).filter(Boolean);

            await Movie.create({
                title: tmdbMovie.title,
                description: tmdbMovie.overview,
                posterUrl: `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}`,
                backdropUrl: `https://image.tmdb.org/t/p/original${tmdbMovie.backdrop_path}`,
                embedUrl: DUMMY_EMBED_URLS[Math.floor(Math.random() * DUMMY_EMBED_URLS.length)],
                rating: tmdbMovie.vote_average,
                releaseDate: tmdbMovie.release_date,
                seoTitle: `Watch ${tmdbMovie.title} Online Full Movie`,
                seoDescription: tmdbMovie.overview.substring(0, 150) + '...',
                isFeatured: Math.random() > 0.7,
                genres: movieGenres
            });
            console.log(`Added: ${tmdbMovie.title}`);
        }

        console.log("Seeding completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error during seeding:", error);
        process.exit(1);
    }
}

seedData();
