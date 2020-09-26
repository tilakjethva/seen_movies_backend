const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    title: String,
    releaseDate: String,
    category: String,
    movieDirector: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Movie', MovieSchema);

