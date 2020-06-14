/** Imports */
const express = require('express');
const router = express.Router();

/** Controllers */
const contactController = require('../controllers/contactController');
const userController = require('../controllers/userController');
const jwtHelper = require('../config/jwtHelper');

/** Define the API endpoints */

/** User routes */
router.post("/register/", userController.register);
router.post("/login/", userController.login);

/** Contacts routes */
router.get("/contacts/", jwtHelper.verifyJwt, contactController.all);
router.post("/contacts/", jwtHelper.verifyJwt, contactController.create);
router.put("/contacts/:id", jwtHelper.verifyJwt, contactController.update);
router.delete("/contacts/:id", jwtHelper.verifyJwt, contactController.delete);

/** Exports */
module.exports = router;