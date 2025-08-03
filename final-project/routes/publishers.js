// Import the Express library
const express = require('express');

// Create a new router instance using Express Router
const router = express.Router();

// Import the controller which contains logic for handling requests related to publishers
const publishersController = require('../controllers/publishers');

// Import the `body` function from express-validator 
const { body } = require('express-validator');
const {isAuthenticate} = require('../middleware/authenticate');

// Define a GET route for '/'
// This will retrieve and return all publisher records
router.get('/', publishersController.getAll);

// Define a GET route for '/:id'
// This will retrieve and return a single publisher by its ID
router.get('/:id', publishersController.getSingle);

// Define a POST route for '/'
// This will create a new publisher using data sent in the request body
router.post('/', isAuthenticate, publishersController.createPublisher);

// Define a PUT route for '/:id'
// This will update an existing publisher identified by its ID
router.put('/:id', isAuthenticate, publishersController.updatePublisher);

// Define a DELETE route for '/:id'
// This will delete a publisher identified by its ID
router.delete('/:id', isAuthenticate, publishersController.deletePublisher);

// Export the router so it can be used in the main application file
module.exports = router;
