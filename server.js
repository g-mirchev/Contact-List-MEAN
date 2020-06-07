const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./express-app/routes/routes");

/**
 * Create new Express application.
 */
const app = express();

/**
 * Mount bodyParses and router to app.
 */
app.use(bodyParser.json());
// Add cors headers for debugging
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    res.setHeader('Access-Control-Allow-Credential', true);
    next();
});
app.use("/api", routes);

/**
 * Connect to database and launch server.
 */
mongoose.connect(process.env.MONGODB_URI, (err) => {
    if(err) {
        console.log(err);
        process.exit(1);
    }

    console.log("MongoDB conection success.");

    const server = app.listen(process.env.PORT || 8080, () => {
        const port = server.address().port;
        console.log("App now running on port", port);
    });
});