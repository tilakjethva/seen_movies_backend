const express = require('express');
const bodyParser = require('body-parser');



// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
}); 

// Configuring the database
const dbConfig = require('./config/database.mongodb.js');
const mongoose = require('mongoose');
const db = require('./config/database.postgres.js')

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database - MongoDB");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users/register', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)
app.post('/users/login', db.getUserByIdPwd)

app.get('/seenmovie_user/:id',db.getByUserId)
app.get('/seenmovie_movie/:id',db.getByMovieId)
app.post('/seenmovie_movie/',db.createSeenMovie)

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to movies application. Organize and keep track of all your seen movies."});
});

// Require movies routes
require('./app/routes/routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});