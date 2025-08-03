// Import the Express library
const express = require('express');
// Create a new router object to define author-related routes
const router = express.Router();
// Import the controller that contains logic for handling author-related requests
const authorsController = require('../controllers/authors');
// Import the `body` function from express-validator 
const { body } = require('express-validator');
const {isAuthenticate} = require('../middleware/authenticate');

// Define a GET route at '/' to get all authors
// When this route is hit, it calls authorsController.getAll
router.get('/', authorsController.getAll);
// Define a GET route at '/:id' to get a specific author by its ID
router.get('/:id', authorsController.getSingle);
// Define a POST route at '/' to create a new author
router.post('/', isAuthenticate, authorsController.createAuthor);
// Define a PUT route at '/:id' to update a specific author by its ID
router.put('/:id', isAuthenticate, authorsController.updateAuthor);
// Define a DELETE route at '/:id' to delete a specific author by its ID
router.delete('/:id', isAuthenticate, authorsController.deleteAuthor);
// Export the router so it can be used in my main server file
module.exports = router;
