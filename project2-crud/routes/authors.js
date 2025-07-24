const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors');
const { body } = require('express-validator');
const {isAuthenticate} = require('../middleware/authenticate');


router.get('/', authorsController.getAll);
router.get('/:id', authorsController.getSingle);
router.post('/', isAuthenticate, authorsController.createAuthor);
router.put('/:id', isAuthenticate,authorsController.updateAuthor);
router.delete('/:id', isAuthenticate, authorsController.deleteAuthor);

module.exports = router;
