const express = require('express');
const router = express.Router();

const contactController = require("../controllers/contactController");

router.get("/contacts/", contactController.all);
router.post("/contacts/", contactController.create);

module.exports = router;