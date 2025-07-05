
const route = require('express').Router();

route.get('/', (req, res) => {res.send('Hello world');});
route.use('/users', require('./users'));

module.exports = route;