// Import the Express library
const express = require('express');

// Create a new router object to define genre-related routes
const router = express.Router();

// Import the controller that contains logic for handling genre-related requests
const genresController = require('../controllers/genres');

// Import the `body` function from express-validator 
const { body } = require('express-validator');

// Define a GET route at '/' to get all genres
// When this route is hit, it calls genresController.getAll
router.get('/', genresController.getAll);

// Define a GET route at '/:id' to get a specific genre by its ID
router.get('/:id', genresController.getSingle);

// Define a POST route at '/' to create a new genre
router.post('/', genresController.createGenre);

// Define a PUT route at '/:id' to update a specific genre by its ID
router.put('/:id', genresController.updateGenre);

// Define a DELETE route at '/:id' to delete a specific genre by its ID
router.delete('/:id', genresController.deleteGenre);

// Export the router so it can be used in your main server file
module.exports = router;
