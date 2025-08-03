// Import the Express library
const express = require('express');
// Create a new router object to define author-related routes
const router = express.Router();
// Import the controller that contains logic for handling author-related requests
const booksController = require('../controllers/books');
// Import the `body` function from express-validator 
const { body } = require('express-validator');
const {isAuthenticate} = require('../middleware/authenticate');

// Define a GET route at '/' to get all books
// When this route is hit, it calls booksController.getAll
router.get('/', booksController.getAll);
// Define a GET route at '/:id' to get a specific book by its ID
router.get('/:id', booksController.getSingle);
// Define a POST route at '/' to create a new book
router.post('/', isAuthenticate, booksController.createBook);
// Define a PUT route at '/:id' to update a specific book by its ID
router.put('/:id', isAuthenticate, booksController.updateBook);
// Define a DELETE route at '/:id' to delete a specific book by its ID
router.delete('/:id', isAuthenticate, booksController.deleteBook);

// Export the router so it can be used in my main server file
module.exports = router;
