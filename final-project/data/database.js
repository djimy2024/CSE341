// Load environment variables from a .env file into process.env
const dotenv = require('dotenv');
dotenv.config();

// Import the MongoClient class from the MongoDB library
const { MongoClient } = require('mongodb');

// Declare a variable to hold the connected database client
let database;

/**
 * Initializes the MongoDB connection
 * - If already connected, it logs a message and returns the existing connection via the callback
 * - Otherwise, it attempts to connect to the database using the MONGODB_URL from the .env file
 * - On success, stores the connection in `database` and calls the callback
 * - On error, passes the error to the callback
 */
const initDb = (callback) => {
    if (database) {
        console.log('Db is already initialized!');
        return callback(null, database); // Return the already connected DB
    }

    // Connect to MongoDB using the connection string from environment variables
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client; // Store the MongoClient connection
            callback(null, database); // Return the connection via callback
        })
        .catch((err) => {
            callback(err); // Return the error via callback
        });
};

/**
 * Returns the connected database client
 * - Throws an error if the DB is not initialized yet
 */
const getDatabase = () => {
    if (!database) {
        throw Error('Db is not initialized!'); // Corrected error message
    }
    return database; // Return the MongoDB client
};

// Export the initDb and getDatabase functions so they can be used in other files
module.exports = { initDb, getDatabase };
