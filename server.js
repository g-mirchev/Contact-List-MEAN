import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import contactController from "./express-app/controllers/contactController.js";

const app = express();
app.use(json());

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if(err) {
        console.log("DB connection error: ", err);
        
    }
    
    console.log("MongoDB conection success.");

    const server = app.listen(process.env.PORT || 8080, () => {
        const port = server.address().port;
        console.log("App now running on port", port);
    });
});

const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log("App now running on port", port);
});

app.use("/contacts", contactController)