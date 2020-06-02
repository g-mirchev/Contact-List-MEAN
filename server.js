import express from "express";
import { json } from "body-parser";
import { ObjectID as _ObjectID, MongoClient } from "mongodb";

const CONTACTS_COLLECTION = "contacts";

const app = express();
app.use(json());

let db;

/**
 * Connect to the database before starting application server.
 */ 
MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function(err, client) {
    if(err) {
        console.log(err);
        process.exit(1);
    }

    /**
     * Save the database object from the callback to be reused
     */
    db = client.db();
    console.log("Database connection ready");

    /**
     * Initialize the app
     */
    const server = app.listen(process.env.PORT || 8080, function () {
        const port = server.address().port;
        console.log("App now running on port", port)
    });
});