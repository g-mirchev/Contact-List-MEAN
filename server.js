require('dotenv').config();
require('./express-app/models/db');
require('./express-app/config/passport');

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./express-app/routes/routes');
const passport = require('passport')

/**
 * Create new Express application.
 */
const app = express();

// Mount body parser.
app.use(bodyParser.json());
// Mount passport module.
app.use(passport.initialize());
// Add cors headers for debugging.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    res.setHeader('Access-Control-Allow-Credential', true);
    next();
});
app.use("/api", routes);

/**
 * Error Handlers
 */
app.use()

app.use((err, req, res, next) => {
    if(err.name === "UnauthorisedError") {
        res.status(401).json({"message" : err.name + ": " + err.message});
    }
});

// Launch the server.
const server = app.listen(process.env.PORT, () => {
    const port = server.address().port;
    console.log("App now running on port", port);
});