const express = require("express");
const ObjectID = require('mongoose').ObjectID;
const { Contact } = require("../models/contact");

/**
 * Handles generic errors.
 */
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

/**
 * Export CRUD functions to be used by router
 */
module.exports = {

    /**
     * Reads all contacts from database.
     */
    all: function(req, res) {
        Contact.find({}, function(err, docs) {
            if (!err) {
                res.status(200).json(docs);
            } else {
                handleError(res, err.message, "Failed to get contacts.");
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
                handleError(res, err.message, "Failed to create new contact.");    
            }
        });
    },

    /**
     * Reads a contact with specific ID
     */
    getById: function(req, res) {
        if(!ObjectID.isValid(req.params.id)) {
            handleError(res, "Invalid ID", `No contact with given ID: ${req.params.id}`, 400);
        } else {
            Contact.findById(req.params.id, function(err, doc) {
                if(!err) {
                    res.status(200).json(doc);
                } else {
                    handleError(res, err.message, "Failed to get contact");
                }
            });
        }
    },

    /**
     * Updates details for contact with specific ID
     */
    update: function(req, res) {
        if(!ObjectID.isValid(req.params.id)) {
            handleError(res, "Invalid ID", `No contact with given ID: ${req.params.id}`, 400);
        } else {
            let contact = {
                name: req.body.name,
                email: req.body.email,
                location: req.body.location,
                primary: req.body.primary
            };
            Contact.findByIdAndUpdate(req.params.id, { $set: contact}, {new: true}, function(err, doc) {
                if(!err) {
                    res.status(200).json(doc);
                } else {
                    handleError(res, err.message, "Failed to update contact");
                }
            });
        }
    },

    /**
     * Deletes contact with specific ID
     */
    delete: function(req, res) {
        if(!ObjectID.isValid(req.params.id)) {
            handleError(res, "Invalid ID", `No contact with given ID: ${req.params.id}`, 400);
        } else {
            Contact.findByIdAndDelete(req.params.id, function(err, result) {
               if(!err) {
                   res.status(200).json(req.params.id);
               } else {
                   handleError(res, err.message, "Failed to delete contact");
               }
            });
        }
    }
}