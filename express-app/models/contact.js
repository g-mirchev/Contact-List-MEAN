const mongoose = require('mongoose');

// Schema for contact model.
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
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

// Defines contact model from contact schema.
let Contact = mongoose.model("Contact", contactSchema);

module.exports = { Contact };