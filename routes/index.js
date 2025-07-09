
const route = require('express').Router();

route.use('/', require('./swagger'));

route.get('/', (req, res) => {
    //#swagger.tags=['Hello world']
    res.send('Hello world');});
    
route.use('/users', require('./users'));

module.exports = route;