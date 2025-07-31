// Create a new Express router instance
const router = require('express').Router();

// Import swagger-ui-express, which serves Swagger UI to visualize API docs
const swaggerUi = require('swagger-ui-express');

// Import the generated Swagger JSON documentation file
const swaggerDocument = require('../swagger.json');

// Serve Swagger UI static assets on the '/docs-api' route
router.use('/docs-api', swaggerUi.serve);

// When a GET request hits '/docs-api', display the Swagger UI page
// The Swagger UI is configured with the Swagger JSON document
router.get('/docs-api', swaggerUi.setup(swaggerDocument));

// Export this router so it can be mounted in the main Express app
module.exports = router;
