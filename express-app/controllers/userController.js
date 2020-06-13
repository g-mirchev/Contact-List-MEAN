/** Imports */
const passport = require('passport');
const { User } = require('../models/user');
const errorHandler = require('../shared/errorHandler')
const _ = require('lodash');

/** Export functions for user to be used by router */
module.exports = {
    
    /** Handles client request to register new user. */
    register: function(req, res, next) {
        let user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;

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
     * Handles client request to authenticate current user
     * using passport authentication
     */
    login: function(req, res) {
        passport.authenticate('local', (err, user, info) => {
            // Return if Passport encounters error.
            if(err) {
                errorHandler.handleError(res, err.message, 'Passport error', 404)
                return
            }
            // If the user is found return token.
            if(user){
                let token = user.generateJwt();
                res.status(200).json({ "token" : token });
            }
            // Returns if credentials are wrong
            else {
                res.status(401).json(info)
            }
        })(req, res);
    },

    /**
     * Returns current user information.
     * (Unused. Uncomment if neeeded.)
     */
    /**
    userProfile: function(req, res, next) {
        User.findOne({ _id: req._id },
            (err, user) => {
                if(!user) {
                    res.status(404).json({ status: false, message: 'User not found.'});
                }
                else {
                    res.status(200).json({ status: true, user : _.pick(user, ['name', 'email']) });
                }
            });
    }*/
}