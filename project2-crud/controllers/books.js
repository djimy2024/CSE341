const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');


const getAll = async (req, res) => {
  const book = await mongodb.getDatabase().db().collection('books').find();
  book.toArray().then((books) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  });
};

const getSingle = async (req, res) => {
  const bookId = new ObjectId(req.params.id);
  const book = await mongodb.getDatabase().db().collection('books').find({ _id: bookId });
  book.toArray().then((books) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books[0]);
  });
};

const createBook = async (req, res) => {
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
    res.status(500).json(response.error || 'Some error occurred while creating the book.');
  }
};

const updateBook = async (req, res) => {
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
    res.status(500).json(response.error || 'Some error occurred while updating the book.');
  }
};

const deleteBook = async (req, res) => {
  const bookId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('books').deleteOne({ _id: bookId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the book.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createBook,
  updateBook,
  deleteBook
};