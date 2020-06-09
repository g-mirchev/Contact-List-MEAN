const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

/**
 * Schema for user model
 */
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});

/**
 * Generates a salt(string of unique characters) then
 * creates a hash with the given password and hash to avoid
 * saving actual plaintext password to database.
 */
userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

/**
 * Creates a hash with the passed password and the saved salt then
 * compares the new hash to the old one. Returns the hash if they match.
 */
userSchema.methods.validPassword = function(password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

/**
 * Generates a Jason Web Token signed with the 
 * current user info, expiration time, and secret key.
 */
userSchema.methods.generateJwt = function() {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, process.env.JWT_SECRET);
};

/**
 * Builds user model from user schema.
 */
let User = mongoose.model("User", userSchema);

module.exports = { User };