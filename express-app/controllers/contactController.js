const express = require("express");
const { Contact } = require("../models/contact");

/**
 * Handles generic errors.
 */
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

/**
 * Export functions to be used by router.
 */
module.exports = {

    /**
     * Returns all contacts from database.
     */
    all: function(req, res) {
        Contact.find({}, function(err, docs) {
            if (!err) {
                res.status(200).json(docs);
            } else {
                handleError(res, err.message, "Failed to get contacts.")
            }
        });
    },

    /**
     * Creates a new contact and adds to database.
     */
    create: function(req, res) {
        let contact = new Contact({
            name: req.body.name,
            email: req.body.email,
            location: req.body.location,
            primary: req.body.primary
        });
        contact.save(function(err, doc) {
            if (!err) {
                res.status(201).json(doc);
            } else {
                handleError(res, err.message, "Failed to get contacts.");    
            }
        });
    }
}