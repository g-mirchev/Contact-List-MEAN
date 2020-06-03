import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    email: { 
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    primary: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Contact", contactSchema);