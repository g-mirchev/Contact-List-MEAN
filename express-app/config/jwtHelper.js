const jwt = require('jsonwebtoken');

/**
 * Calls jsonwebtoken.verify if the current request has an 
 * 'authorization' header. If the token passes verification
 * req._id is given the value of the user._id.
 */
module.exports.verifyJwt = function(req, res, next) {
    let token;
    if('authorization' in req.headers) {
        token = req.headers['authorization'].split(' ')[1];
    }
    if(!token) {
        return res.status(403).send({auth: false, message: 'Missing token.'});
    }
    else {
        jwt.verify(token, process.env.JWT_SECRET,
            (err, decoded) => {
                if(err) {
                    return res.status(500).send({auth: false, message: 'Token authorization failed.'});
                }
                else {
                    req._id = decoded._id;
                    next();
                }
            });
    }
}