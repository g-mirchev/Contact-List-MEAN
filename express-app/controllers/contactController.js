/** Imports */
const ObjectId = require('mongoose').Types.ObjectId;
const { Contact } = require('../models/contact');
const errorHandler = require('../shared/errorHandler');

/** Export CRUD functions for contact to be used by router. */
module.exports = {

    /** Reads all contacts marked with current user ID from db */
    all: function(req, res) {
        Contact.find({user_id: req._id}, (err, docs) => {
            if (!err) {
                res.status(200).json(docs);
            } else {
                errorHandler.handleError(res, err.message, "Failed to get contacts.");
            }
        });
    },

    /** Creates a new contact for current user and saves to database. */
    create: function(req, res) {
        let contact = new Contact({
            name: req.body.name,
            email: req.body.email,
            location: req.body.location,
            primary: req.body.primary,
            user_id: req._id
        });
        contact.save((err, doc) => {
            if (!err) {
                res.status(201).json(doc);
            } else {
                errorHandler.handleError(res, err.message, "Failed to create new contact.");    
            }
        });
    },

    /** 
     * Reads a contact with specific ID 
     * (This function is not used by the API yet so it's commented
     * for security reasons. Uncomment if needed.).
     */
    /**
    getById: function(req, res) {
        if(!ObjectId.isValid(req.params.id)) {
            handleError(res, "Invalid ID", `No contact with given ID: ${req.params.id}`, 400);
        } else {
            Contact.findById(req.params.id, (err, doc) => {
                if(!err) {
                    res.status(200).json(doc);
                } else {
                    errorHandler.handleError(res, err.message, "Failed to get contact");
                }
            });
        }
    },*/

    /** Updates details for contact with specific ID. */
    update: function(req, res) {
        if(!ObjectId.isValid(req.params.id)) {
            handleError(res, "Invalid ID", `No contact with given ID: ${req.params.id}`, 400);
        } else {
            let contact = {
                name: req.body.name,
                email: req.body.email,
                location: req.body.location,
                primary: req.body.primary
            };
            Contact.findByIdAndUpdate(req.params.id, { $set: contact}, {new: true}, (err, doc) => {
                if(!err) {
                    res.status(200).json(doc);
                } else {
                    errorHandler.handleError(res, err.message, "Failed to update contact");
                }
            });
        }
    },

    /** Deletes contact with specific ID. */
    delete: function(req, res) {
        if(!ObjectId.isValid(req.params.id)) {
            handleError(res, "Invalid ID", `No contact with given ID: ${req.params.id}`, 400);
        } else {
            Contact.findByIdAndDelete(req.params.id, (err, result) => {
               if(!err) {
                   res.status(200).json(req.params.id);
               } else {
                    errorHandler.handleError(res, err.message, "Failed to delete contact");
               }
            });
        }
    }
}