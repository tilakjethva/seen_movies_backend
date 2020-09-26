const Rating = require('../models/rating.model.js');

// Create and Save a new rating
exports.create = (req, res) => {
    // Validate request
    if(!req.body.rating || !req.body.userId || !req.body.movieId) {
        return res.status(400).send({
            message: "rating content can not be empty"
        });
    }

    // Create a rating
    const rating = new Rating({
        rating: req.body.rating,
        commentTitle: req.body.commentTitle || "",
        commentContent: req.body.commentContent || "",
        userId: req.body.userId,
        movieId: req.body.movieId
    });

    // Save rating in the database
    rating.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the rating."
        });
    });
};

// Retrieve and return all rating from the database.
exports.findAll = (req, res) => {
    Rating.find()
    .then(rating => {
        res.send(rating);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving rating."
        });
    });
};

// Find a single rating with a ratingId
exports.findOne = (req, res) => {
    Rating.findById(req.params.ratingId)
    .then(rating => {
        if(!rating) {
            return res.status(404).send({
                message: "Rating not found with id " + req.params.ratingId
            });            
        }
        res.send(rating);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Rating not found with id " + req.params.ratingId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving rating with id " + req.params.ratingId
        });
    });
};

// Find a single rating with a movieId
exports.findByMovieId = (req, res) => {
    Rating.find({movieId: req.params.movieId})
    .then(rating => {
        if(!rating) {
            return res.status(404).send({
                message: "Rating not found with id " + req.params.movieId
            });            
        }
        res.send(rating);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Rating not found with id " + req.params.movieId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving rating with id " + req.params.movieId
        });
    });
};

// Update a rating identified by the ratingId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.rating || !req.body.userId || !req.body.movieId) {
        return res.status(400).send({
            message: "Rating content can not be empty"
        });
    }

    // Find rating and update it with the request body
    Rating.findByIdAndUpdate(req.params.ratingId, {
        rating: req.body.rating,
        commentTitle: req.body.commentTitle || "",
        commentContent: req.body.commentContent || "",
        userId: req.body.userId,
        movieId: req.body.movieId
    }, {new: true})
    .then(rating => {
        if(!rating) {
            return res.status(404).send({
                message: "Rating not found with id " + req.params.ratingId
            });
        }
        res.send(rating);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Rating not found with id " + req.params.ratingId
            });                
        }
        return res.status(500).send({
            message: "Error updating rating with id " + req.params.ratingId
        });
    });
};

// Delete a rating with the specified ratingId in the request
exports.delete = (req, res) => {
    Rating.findByIdAndRemove(req.params.ratingId)
    .then(rating => {
        if(!rating) {
            return res.status(404).send({
                message: "Rating not found with id " + req.params.ratingId
            });
        }
        res.send({message: "Rating deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Rating not found with id " + req.params.ratingId
            });                
        }
        return res.status(500).send({
            message: "Could not delete rating with id " + req.params.ratingId
        });
    });
};