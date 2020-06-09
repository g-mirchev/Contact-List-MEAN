const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

// Passport local strategy definition.
passport.use(new LocalStrategy({
    // set the username field to be 'email' instead of the default 'username'
    usernameField: 'email'
},
    function(username, password, done) {
        User.findOne({ email: username }, function (err, user) {
            if(err) {
                return done(err);
            }
            // Return if the user isnot found in the database.
            if(!user) {
                return done(null, false, {
                    message: 'User not found'
                });
            }
            // Return if password is wrong, uses schema defined function for check
            if(!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Password is wrong'
                });
            }
            // Return the user object if all crecentials are correct.
            return done(null, user);
        });
    }
));