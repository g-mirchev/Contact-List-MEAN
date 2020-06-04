const express = require("express");
const router = express.Router();
const { Contact } = require("../models/contact");

/**
 * Generic error handling
 */
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

/**
 *  "/contacts/"
 * 
 *  GET: returns all contacts
 *  POST: creates a new contact
 */

// router.get("/", function(req, res) {
//     Contact.find((err, docs) => {
//         if (!err) {
//             res.status(200).json(docs);
//         } else {
//             handleError(res, err.message, "Failed to get contacts.")
//         }
//     });
// });

module.exports = {
    all: function(req, res) {
        Contact.find({}, function(err, docs) {
            if (!err) {
                res.status(200).json(docs);
            } else {
                handleError(res, err.message, "Failed to get contacts.")
            }
        });
    },
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

// router.post("/", function(req, res) {
//     let contact = new Contact({
//         name: req.body.name,
//         email: req.body.email,
//         location: req.body.location,
//         primary: req.body.primary
//     });
//     contact.save((err, doc) => {
//         if (!err) {
//             res.status(201).json(doc);
//         } else {
//             handleError(res, err.message, "Failed to get contacts.");    
//         }
//     });
// });

/**
 *  "/api/contacts/:id"
 * 
 *  GET: returns a contact by ID
 *  PUT: updates contact by ID
 *  DELETE: deletes contact by ID
 */
router.get("/:id", function (req, res) {

});

router.put("/:id", function (req, res) {

});

router.delete("/:id", function (req, res) {

});