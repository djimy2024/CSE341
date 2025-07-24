const dotenv = require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const mongodb = require('./data/database');
const passport = require('passport');
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(session ({
    secret: "secret" ,
    resave: false ,
    saveUninitialized: true ,
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-key, Authorization');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE, PATCH, OPTIONS');
    next();
});

app.use(cors({methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
app.use(cors({origin: '*'}))

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    //User.findOrCreate({githubId: profile.id},function(err, user){

        return done(null, profile);
   // })
    
}
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => {res.send(req.session.user !== undefined ? `logged in as ${req.session.user.displayName}`: "Logged Out")});
app.get('/github/callback',passport.authenticate('github',{
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
});

app.use(express.json()); 

// Routes
app.use('/', require('./routes'));
app.listen( port);

// Start server
mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else{
        console.log('web server is listening at port' + port);
    }
});