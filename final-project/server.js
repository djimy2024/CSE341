// Import the Express framework, used to build the web server
const express = require('express');

// Import body-parser to parse JSON request bodies
const bodyParser = require('body-parser');

// Import the custom MongoDB connection setup from the local file
const mongodb = require('./data/database');

// Create an instance of an Express application
const app = express();

// Set the server port from environment variable or default to 3000
const port = process.env.PORT || 3000;

// Enable parsing of JSON data in incoming request bodies
app.use(bodyParser.json());

// Middleware to handle Cross-Origin Resource Sharing (CORS)
// This allows requests from any origin and specific headers/methods
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-key'); // Allowed headers
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE, OPTIONS'); // Allowed HTTP methods
    next(); // Move on to the next middleware or route
});

// Use the routes defined in './routes/index.js' for all requests to the root path
app.use('/', require('./routes'));

// Start the Express server and listen on the defined port
app.listen(port);

// Initialize MongoDB connection before confirming the server is ready
mongodb.initDb((err) => {
    if (err) {
        // If there's an error connecting to MongoDB, log it
        console.log(err);
    } else {
        // If the DB connection is successful, log the server is running
        console.log('web server is listening at port ' + port);
    }
});
