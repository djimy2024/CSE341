const express = require('express');
//const bodyParser = require('body-parser');

const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

/*app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-key');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE, OPTIONS');
    next();
});
app.use('/', require('./routes'));*/
app.listen( port);


mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else{
        console.log('web server is listening at port' + port);
    }
});
