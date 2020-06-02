import express from "express";
const router = express.Router();

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

router.get("/", function(req, res) {

});

router.post("/", function(req, res) {
    
});

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

module.exports = router;