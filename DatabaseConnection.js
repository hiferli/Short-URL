const mongoose = require('mongoose');

// Function to connect to specified Mongo URI
async function connectToMongoDB (URL) {
    return mongoose.connect(URL);
}

module.exports = {
    connectToMongoDB
}

