const express = require('express');
const route = express.Router();
const usersController = require('../controllers/users');
const {isAuthenticate} = require('../middleware/authenticate');

route.get('/', usersController.getAll);
route.get('/:id', usersController.getSingle);

route.post('/', usersController.createUser);
route.put('/:id', isAuthenticate, usersController.updateUser);
route.delete('/:id', isAuthenticate, usersController.deleteUser);

module.exports = route