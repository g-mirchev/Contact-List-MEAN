/** Imports */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/** Schema for the user model. */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    email: {
        type: String,
        unique: true,
        required: 'Email is required'
    },
    password: {
        type: String,
        reqired: 'Password is required',
        minlength: [8, 'Password must be atleast 8 characters long']
    }, 
    saltSecret: String
});

/** Email validation using regular expression. */ 
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail');

/**
 * Encrypt the password using bcryptjs upon calling
 * user.save() and store the hashed password and salt secret.
 */
userSchema.pre('save', function(next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

/**
 * Creates a hash with the passed password and the saved salt then
 * compares the new hash to the old one. Returns the hash if they match.
 */
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

/**
 * Generates a Jason Web Token signed with the 
 * current user ID, name, email, expiration time, and secret key.
 */
userSchema.methods.generateJwt = function() {
    return jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email
    }, process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXP
        });
};

/** Defines User model from userSchema */
mongoose.model('User', userSchema);