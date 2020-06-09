const mongoose = require('mongoose');

/**
 * Schema for Contact model.
 */
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

/**
 * Builds contact model from contact schema.
 */
let Contact = mongoose.model("Contact", contactSchema);

module.exports = { Contact };