const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');

const contactController = require('../controllers/contactController');
const userController = require('../controllers/userController');
const jwtHelper = require('../config/jwtHelper');

/**
 * Creates endpoints mapped to appropriate controller functions.
 * 
 * GET      "/contacts/"        returns all contacts
 * POST     "/contacts/"        creates a new contact
 * PUT      "/contacts/:id"     updates contact found by ID
 * DELETE   "/contacts/:id"     deletes contact found by ID
 */
router.get("/contacts/", jwtHelper.verifyJwt, contactController.all);
router.post("/contacts/", contactController.create);
router.put("/contacts/:id", contactController.update);
router.delete("/contacts/:id", contactController.delete);
router.post("/register/", userController.register);
router.post("/login/", userController.login);

module.exports = router;