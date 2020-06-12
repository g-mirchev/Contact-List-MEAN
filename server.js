/** Imports and configuration */
require('dotenv').config();
require('./express-app/models/db');
require('./express-app/config/passport');

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./express-app/routes/routes');
const passport = require('passport')
let distDir = __dirname + "/dist";

/** Create new Express application.*/
const app = express();

/** Middleware */
app.use(bodyParser.json());
app.use(express.static(distDir));
app.use(passport.initialize());

/** CORS headers for debugging. */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, noauth, Authorization');
    res.setHeader('Access-Control-Allow-Credential', true);
    next();
});
app.use("/api", routes);

/** Error Handlers*/
app.use((err, req, res, next) => {
    if(err.name ==='ValidationError') {
        let vallidationErrors = [];
        Object.keys(err.errors).forEach(key => vallidationErrors.push(err.errors[key].message));
        res.status(422).send(vallidationErrors);
    }
});

app.use((err, req, res, next) => {
    if(err.name === 'UnauthorisedError') {
        res.status(401).json({"message" : err.name + ": " + err.message});
    }
});

/** Launch the server. */
const server = app.listen(process.env.PORT, () => {
    const port = server.address().port;
    console.log("App now running on port", port);
});