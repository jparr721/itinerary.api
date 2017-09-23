// Get dependencies
let express = require('express');
let path = require('path');
let http = require('http');
let bodyParser = require('body-parser');
let cors = require('cors');
let helmet = require('helmet');
let compression = require('compression');

let api_trip = require('./routes/api_trip');
let api_users = require('./routes/api_users');

// Declare express server
const app = express();

// Security and compression middleware.
app.use(compression());
app.use(helmet());

// Parsers for POST data (if we ever use it)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/****  API ROUTES GO HERE ****/
app.use('/trip', api_trip);
app.use('/users', api_users);
app.use("/api", (req, res) => {
    res.send("HELLO WORLD");
   return;
});

// Get port from process arguments or default to 8080
let port = process.env.PORT || '8080';
app.set('port', port);

// Create HTTP server
http.createServer(app).listen(port, () => console.log(`Itinerary API running on localhost:${port}`));