import express from "express";
import { json } from "body-parser";
import { ObjectID as _ObjectID, MongoClient } from "mongodb";
import contactController from "./express-app/controllers/contactController.js";
import {mongoose} from ("./config/database.js");

const app = express();
app.use(json());

const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log("App now running on port", port);
});
app.use("/contacts", contactController)