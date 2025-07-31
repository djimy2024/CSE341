// Create a new Express router instance
const router = require('express').Router();

// Mount the Swagger documentation routes under '/'
// This means requests to '/' related to Swagger will be handled by './swagger' router
router.use('/', require('./swagger'));

// Define a GET route on '/' (root path)
// When accessed, it sends a simple "Welcome!" message as a response
// Also includes a Swagger tag for documentation purposes
router.get('/', (req, res) => {
    //#swagger.tags=['Hello world']
    res.send('Welcome!');
});

// Mount the genres routes under '/genres'
// Requests starting with '/genres' will be handled by './genres' router
router.use('/genres', require('./genres'));

// Mount the publishers routes under '/publishers'
// Requests starting with '/publishers' will be handled by './publishers' router
router.use('/publishers', require('./publishers'));

// Export the router so it can be imported and used in the main app file
module.exports = router;
