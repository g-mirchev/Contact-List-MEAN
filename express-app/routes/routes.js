const express = require('express');
const router = express.Router();

const contactController = require("../controllers/contactController");

router.get("/contacts/", contactController.all);

module.exports = router;