const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');
const { validationResult } = require('express-validator');


const getAll = async (req, res) => {
  //#swagger.tags=['Books']
  try {
    const book = await mongodb.getDatabase().db().collection('books').find();
    const books = await book.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while fetching books.' });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Books']
  try {
    const bookId = new ObjectId(req.params.id);
    const book = await mongodb.getDatabase().db().collection('books').find({ _id: bookId });
    const books = await book.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books[0]);
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while fetching the book.' });
  }
};

const createBook = async (req, res) => {
   //#swagger.tags=['Books']
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const book = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publishedDate: req.body.publishedDate,
      summary: req.body.summary
    };

    const response = await mongodb.getDatabase().db().collection('books').insertOne(book);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      throw new Error('Insert not acknowledged');
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while creating the book.' });
  }
};

const updateBook = async (req, res) => {
   //#swagger.tags=['Books']
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const bookId = new ObjectId(req.params.id);
    const book = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publishedDate: req.body.publishedDate,
      summary: req.body.summary
    };

    const response = await mongodb.getDatabase().db().collection('books').replaceOne({ _id: bookId }, book);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      throw new Error('No documents were modified.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while updating the book.' });
  }
};

const deleteBook = async (req, res) => {
   //#swagger.tags=['Books']
  try {
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('books').deleteOne({ _id: bookId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      throw new Error('No documents were deleted.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while deleting the book.' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createBook,
  updateBook,
  deleteBook
};