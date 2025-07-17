const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
router.use('/books-api', swaggerUi.serve);
router.get('/books-api', swaggerUi.setup(swaggerDocument));

module.exports = router;