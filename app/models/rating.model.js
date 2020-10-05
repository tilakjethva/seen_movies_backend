const mongoose = require('mongoose');

const RatingSchema = mongoose.Schema({
    rating: String,
    comment: String,
    user_id: String,
    movie_id: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Rating', RatingSchema);