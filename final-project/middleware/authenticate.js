// Middleware to check if the user is authenticated
const isAuthenticate = (req, res, next) => {
    // If there is no user stored in the session, block access
    if (req.session.user == undefined) {
        return res.status(401).json("You don't have access.");
    }
    // If user is authenticated, proceed to the next middleware or route handler
    next();
};

module.exports = { isAuthenticate };
