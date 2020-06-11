/** Imports */
const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');

const contactController = require('../controllers/contactController');
const userController = require('../controllers/userController');
const jwtHelper = require('../config/jwtHelper');

/**
 * Creates endpoints mapped to appropriate controller functions.
 * 
 * -- Public routes:
 * POST     "/register/"        creates a new user
 * POST     "/login/"           authenticates a user and generates JWT on success
 * 
 * -- Protected routes:
 * GET      "/contacts/"        reads all contacts for current user
 * POST     "/contacts/"        creates a new contact for current user
 * PUT      "/contacts/:id"     updates contact found by ID
 * DELETE   "/contacts/:id"     deletes contact found by ID
 */
router.post("/register/", userController.register);
router.post("/login/", userController.login);
router.get("/contacts/", jwtHelper.verifyJwt, contactController.all);
router.post("/contacts/", jwtHelper.verifyJwt, contactController.create);
router.put("/contacts/:id", jwtHelper.verifyJwt, contactController.update);
router.delete("/contacts/:id", jwtHelper.verifyJwt, contactController.delete);

/** Exports */
module.exports = router;