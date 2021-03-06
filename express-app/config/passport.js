/** Imports */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const { User } = require('../models/user');

/** Passport local strategy definition. */
passport.use(new LocalStrategy({
    // set the username field to be 'email' instead of the default 'username'
    usernameField: 'email'
},
    (username, password, done) => {
        User.findOne({ email: username }, (err, user) => {
            if(err) {
                return done(err);
            }
            // Return if the user is not found in the database.
            else if(!user) {
                return done(null, false, {
                    message: 'User not found'
                });
            }
            // Return if password is wrong, uses schema defined function for check
            else if(!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Password is wrong'
                });
            }
            // Return the user object if all crecentials are correct.
            else {
                return done(null, user);
            }
        });
    }
));