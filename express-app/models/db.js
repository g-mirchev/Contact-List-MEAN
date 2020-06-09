const mongoose = require('mongoose');

// Connect to database
mongoose.connect(process.env.MONGODB_URI, (err) => {
    if(err) {
        console.log(err);
        process.exit(1);
    }
    console.log("MongoDB conection success.");
});

require('./user');