const express = require('express');
const router = express.Router();

const contactController = require("../controllers/contactController");

router.get("/contact/", contactController.all);

module.exports = router;