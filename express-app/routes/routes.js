const express = require('express');
const router = express.Router();

const contactController = require("../controllers/contactController");

/**
 * Creates endpoints mapped to appropriate controller functions.
 * 
 * GET "/contacts/"     returns all contacts
 * POST "/contact/"     creates a new contact
 */
router.get("/contacts/", contactController.all);
router.post("/contacts/", contactController.create);

module.exports = router;