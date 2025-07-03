const express = require('express');
const app = express();
//const lesson1controller = require('./controllers/lesson1');

//app.get('/', lesson1controller.velaroute);

/*app.get('/', (req, res) => {
    res.send('Vela Sanon');
});*/

//app.get('/djimy', lesson1controller.djimyroute);

/*app.get('/Djimy', (req, res) => {
    res.send('Djimy Francillon');
});*/

const port = 3000;

app.use('/', require('./routes'));
app.listen(process.env.port || port);
console.log('web server is listening at port' + (process.env.port || port));