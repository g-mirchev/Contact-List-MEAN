const mongoose = require("mongoose");

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

let Contact = mongoose.model("Contact", contactSchema);

module.exports = { Contact };