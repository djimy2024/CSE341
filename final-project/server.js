const dotenv = require('dotenv').config({ path: __dirname + '/.env' });
// Import the Express framework, used to build the web server
const express = require('express');

// Import body-parser to parse JSON request bodies
const bodyParser = require('body-parser');

// Import the custom MongoDB connection setup from the local file
const mongodb = require('./data/database');

// Create an instance of an Express application
const app = express();

// Import express-session to manage user sessions on the server
const session = require('express-session');

// Import the GitHubStrategy from passport-github2 for GitHub OAuth login
const GitHubStrategy = require('passport-github2').Strategy;

// Import cors to enable Cross-Origin Resource Sharing between frontend and backend
const cors = require('cors');

// Import passport for handling authentication strategies (like GitHub OAuth)
const passport = require('passport');

// Set the server port from environment variable or default to 3000
const port = process.env.PORT || 3000;

// Enable parsing of JSON data in incoming request bodies
app.use(bodyParser.json());



// Middleware
app.use(bodyParser.json());
app.use(session ({
    secret: "secret" ,
    resave: false ,
    saveUninitialized: true ,
}))

app.use(passport.initialize())
app.use(passport.session())
// Middleware to handle Cross-Origin Resource Sharing (CORS)
// This allows requests from any origin and specific headers/methods
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-key'); // Allowed headers
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE, OPTIONS'); // Allowed HTTP methods
    next(); // Move on to the next middleware or route
});


// Configure Passport to use the GitHubStrategy for OAuth login
passport.use(new GitHubStrategy(
  {
    // GitHub OAuth client ID from environment variables
    clientID: process.env.GITHUB_CLIENT_ID,

    // GitHub OAuth client secret from environment variables
    clientSecret: process.env.GITHUB_CLIENT_SECRET,

    // Callback URL GitHub redirects to after authentication
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },

function(accessToken, refreshToken, profile, done) {
    //User.findOrCreate({githubId: profile.id},function(err, user){

        return done(null, profile);
   // })
    
}
));

// Serialize the user object into the session
passport.serializeUser((user, done) => {
    // Store the entire user object (could also store user.id for lighter session)
    done(null, user);
});

// Deserialize the user object from the session
passport.deserializeUser((user, done) => {
    // Retrieve the user object from the session
    done(null, user);
});

// Route for the root path
// Displays user info if logged in, or a "Logged Out" message
app.get('/', (req, res) => {
    res.send(req.session.user !== undefined 
        ? `logged in as ${req.session.user.displayName}` 
        : "Logged Out");
});

// GitHub OAuth callback route
// After GitHub authentication, set session user and redirect to root
app.get('/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/api-docs', // Redirect here if authentication fails
        session: false // Don't use Passport-managed sessions
    }),
    (req, res) => {
        // Save authenticated user to session manually
        req.session.user = req.user;
        res.redirect('/');
    }
);

// Middleware to parse incoming JSON requests
app.use(express.json());

// Use the routes defined in './routes/index.js' for all requests to the root path
app.use('/', require('./routes'));

// Start the Express server and listen on the defined port
app.listen(port);

if (process.env.NODE_ENV !== 'test') {
    mongodb.initDb((err) => {
        if (err) {
            console.error(err);
        } else {
            app.listen(port, () => {
                console.log('web server is listening at port ' + port);
            });
        }
    });
}

module.exports = app;
