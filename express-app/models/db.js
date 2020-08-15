/** Imports */
const mongoose = require('mongoose');

/** Connect to database */
mongoose.connect(process.env.MONGODB_URI, { autoReconnect: true });

/** Events */

mongoose.connection.on('connected', () => {
    console.log('MongoDB connection success.');
});

mongoose.connection.on('error', (err) => {
    console.log(err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB connection lost.');
});