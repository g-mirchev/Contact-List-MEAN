/**
 * Logs the error in backend then creates and sends
 * and appropriate response to client.
 * 
 * @param {*} res       The response
 * @param {*} reason    Reason for the error logged on server side
 * @param {*} message   Error message sent to client
 * @param {*} code      Status code (default: 500)
 */
module.exports.handleError = function(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}