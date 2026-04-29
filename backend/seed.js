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

        console.log("Inserting High-Quality Demo Movie (Sintel)...");
        const sintelExists = await Movie.findOne({ title: "Sintel (4K Demo)" });
        if (!sintelExists) {
            await Movie.create({
                title: "Sintel (4K Demo)",
                description: "A lonely young woman, Sintel, helps and befriends a dragon, whom she calls Scales. But when he is kidnapped by an adult dragon, Sintel decides to embark on a dangerous quest to find her lost friend Scales.",
                posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Sintel_poster.jpg/800px-Sintel_poster.jpg",
                backdropUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Sintel_poster_2.jpg/1200px-Sintel_poster_2.jpg",
                videoUrl: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
                subtitles: [
                    {
                        kind: 'subtitles',
                        src: 'https://bitdash-a.akamaihd.net/content/sintel/hls/subtitles_en.vtt',
                        srclang: 'en',
                        label: 'English',
                        default: true
                    },
                    {
                        kind: 'subtitles',
                        src: 'https://raw.githubusercontent.com/brenopolanski/html5-video-webvtt-example/master/subtitles_ar.vtt', // Placeholder for Arabic vtt
                        srclang: 'ar',
                        label: 'Arabic',
                        default: false
                    }
                ],
                rating: 9.5,
                releaseDate: new Date('2010-09-27'),
                seoTitle: "Watch Sintel 4K Free",
                seoDescription: "Watch the open source movie Sintel in 4K resolution.",
                isFeatured: true,
                genres: [] // You can map this if needed
            });
            console.log("Added Sintel!");
        } else {
            console.log("Sintel already exists.");
        }

        console.log("Fetching popular movies...");
        const movieRes = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
        const movieData = await movieRes.json();

        for (const tmdbMovie of movieData.results) {
            const exists = await Movie.findOne({ title: tmdbMovie.title });
            if (exists) {
                console.log(`Skipping ${tmdbMovie.title}, already exists.`);
                // Optionally update existing movies to use videoUrl instead of embedUrl
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
