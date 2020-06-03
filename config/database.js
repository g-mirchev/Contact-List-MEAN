import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if(!err) {
        console.log("MongoDB conection success.");
    }
    else {
        console.log("DB connection error: ", err);
    }
});

module.exports = mongoose;