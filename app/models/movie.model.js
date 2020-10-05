const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    title: String,
    releaseDate: String,
    category: String,
    movieDirector: String,
    img: String,
    rating: String,
    description: String,
    written_by: String,
    produce_by: String,
    cast: String,
    comments: Array
}, {
    timestamps: true
});

module.exports = mongoose.model('Movie', MovieSchema);

