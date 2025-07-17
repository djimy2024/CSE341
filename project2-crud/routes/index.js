const router = require('express').Router();
router.use('/', require('./swagger'));

router.get('/', (req, res) => {
     //#swagger.tags=['Hello world']
    res.send('Welcome to the bookstore');});
    
router.use('/books', require('./books'));

module.exports = router;







