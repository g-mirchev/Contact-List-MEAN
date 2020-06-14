/** Imports */
const express = require('express');
const router = express.Router();
const path = require('path');

/** Controllers */
const contactController = require('../controllers/contactController');
const userController = require('../controllers/userController');
const jwtHelper = require('../config/jwtHelper');

/** Define the API routes */
router.post("/register/", userController.register);
router.post("/login/", userController.login);
router.get("/contacts/", jwtHelper.verifyJwt, contactController.all);
router.post("/contacts/", jwtHelper.verifyJwt, contactController.create);
router.put("/contacts/:id", jwtHelper.verifyJwt, contactController.update);
router.delete("/contacts/:id", jwtHelper.verifyJwt, contactController.delete);

/** Redirects to Angular app if no API routes are hit. */
// router.use(function(req, res) {
//     res.sendFile(path.join(__dirname, '/dist/index.html'));
// });

/** Exports */
module.exports = router;