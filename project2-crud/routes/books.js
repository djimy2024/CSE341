const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const { body } = require('express-validator');

router.get('/', booksController.getAll);
router.get('/:id', booksController.getSingle);
router.post('/', booksController.createBook);
router.put('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

router.post(
  '/books',
  [
    body('title').notEmpty(),
    body('author').notEmpty(),
    body('genre').notEmpty(),
    body('publishedDate').notEmpty(),
    body('summary').notEmpty()
  ],
  booksController.createBook
);

module.exports = router;
