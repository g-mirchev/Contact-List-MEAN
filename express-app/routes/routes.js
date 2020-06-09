const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
let auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

const contactController = require("../controllers/contactController");
const userController = require("../controllers/userController");

/**
 * Creates endpoints mapped to appropriate controller functions.
 * 
 * GET      "/contacts/"        returns all contacts
 * POST     "/contacts/"        creates a new contact
 * GET      "/contacts/:id"     returns contact by ID
 * PUT      "/contacts/:id"     updates contact found by ID
 * DELETE   "/contacts/:id"     deletes contact found by ID
 */
router.get("/contacts/", contactController.all);
router.post("/contacts/", contactController.create);
router.get("/contacts/:id", contactController.getById);
router.put("/contacts/:id", contactController.update);
router.delete("/contacts/:id", contactController.delete);
router.post("/register/", userController.register);
router.post("/login/", userController.login);

module.exports = router;