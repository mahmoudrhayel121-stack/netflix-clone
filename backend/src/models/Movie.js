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
        required: true,
    },
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
