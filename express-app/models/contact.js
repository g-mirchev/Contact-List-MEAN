const mongoose = require("mongoose");

/**
 * Creates schema for Contact model.
 * 
 * @param {String} name The contact name is required
 * @param {String} email The contact email is required
 * @param {String} location The contact location is required
 * @param {String} primary The contact phone number is required
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