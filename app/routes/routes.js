module.exports = (app) => {
    const movies = require('../controllers/movie.controller.js');

    // Create a new movie
    app.post('/movies', movies.create);

    // Retrieve all movies
    app.get('/movies', movies.findAll);

    // Retrieve a single movie with movieId
    app.get('/movies/:movieId', movies.findOne);

    // Update a movie with movieId
    app.put('/movies/:movieId', movies.update);

    // Delete a movie with movieId
    app.delete('/movies/:movieId', movies.delete);

    const rating = require('../controllers/rating.controller.js');

    // Create a new rating
    app.post('/rating', rating.create);

    // Retrieve all rating
    app.get('/rating', rating.findAll);

    // Retrieve a single rating with ratingId
    app.get('/rating/:ratingId', rating.findOne);

    // Update a rating with ratingId
    app.put('/rating/:ratingId', rating.update);

    // Delete a rating with ratingId
    app.delete('/rating/:ratingId', rating.delete);

    // Retrive ratings with movieId
    app.get('/rating/movie/:movieId', rating.findByMovieId);
}