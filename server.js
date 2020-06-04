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