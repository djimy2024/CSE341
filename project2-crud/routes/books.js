const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const { body } = require('express-validator');
const {isAuthenticate} = require('../middleware/authenticate');

router.get('/', booksController.getAll);
router.get('/:id', booksController.getSingle);
router.post('/', isAuthenticate, booksController.createBook);
router.put('/:id', isAuthenticate, booksController.updateBook);
router.delete('/:id', isAuthenticate, booksController.deleteBook);

module.exports = router;
