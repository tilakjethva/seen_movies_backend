const mongoose = require('mongoose');

const RatingSchema = mongoose.Schema({
    rating: String,
    commentTitle: String,
    commentContent: String,
    userId: String,
    movieId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Rating', RatingSchema);