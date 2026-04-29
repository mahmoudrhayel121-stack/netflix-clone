const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    posterUrl: {
        type: String,
    },
    backdropUrl: {
        type: String,
    },
    trailerUrl: {
        type: String,
    },
    embedUrl: {
        type: String,
        required: false,
    },
    videoUrl: {
        type: String, // MP4 or HLS link
    },
    subtitles: [{
        kind: { type: String, default: 'subtitles' },
        src: { type: String, required: true },
        srclang: { type: String, required: true },
        label: { type: String, required: true },
        default: { type: Boolean, default: false }
    }],
    genres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    }],
    rating: {
        type: Number,
        default: 0,
    },
    releaseDate: {
        type: Date,
    },
    seoTitle: {
        type: String,
    },
    seoDescription: {
        type: String,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
