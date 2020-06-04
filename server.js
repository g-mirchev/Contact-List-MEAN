const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const contactController = require("./express-app/controllers/contactController.js");
const routes = require("./express-app/routes/routes.js");

const app = express();

app.use(bodyParser.json());
//app.use("/api/contacts", contactController);
app.use("/api", routes);

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