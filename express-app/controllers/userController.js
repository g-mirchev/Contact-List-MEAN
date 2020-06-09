const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const errorHandler = require('../shared/errorHandler')

// export crud functions for user to be used by router
module.exports = {
    
    /**
     * Handles client's request to register new user,
     * on success returns Json web token.
     */
    register: function(req, res) {
        let user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.setPassword(req.body.password);

        user.save((err, doc) => {
            if(!err) {
                //let token = user.generateJwt();
                res.status(200).json(doc);
            }
            else if(err.code == 11000){
                errorHandler.handleError(res, err.message, 'Email already in use', 422);
            }
            else {
               return next(err);
            }
        });
    },

    /**
     * Handles client's request to authenticate current user
     * if successful return Json web token.
     */
    login: function(req, res) {
        passport.authenticate('local', (err, user, info) => {
            let token;

            // Return if Passport encounters error.
            if(err) {
                errorHandler.handleError(res, err.message, 'Passport error', 404)
                return
            }
            // If the user is found
            if(user){
                token = user.generateJwt();
                res.status(200).json({ "token" : token });
            }
            else {
                res.status(404).json(info)
            }
        })(req, res);
    }
}