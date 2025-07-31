const router = require('express').Router();

router.get('/', (req, res) => {
     //#swagger.tags=['Hello world']
    res.send('Welcome!');});



    module.exports = router;