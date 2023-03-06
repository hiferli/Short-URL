const mongoose = require("mongoose");

const URLSchema = new mongoose.Schema({
    // New Shortened URL
    shortID: {
        type: String,
        required: true,
        unique: true
    },

    // Original URL
    redirectURL: {
        type: String,
        required: true
    },

    // Click History
    visitHistory: [
        {
            // A collection of the number of times link is clicked
            timestamp : {
                type: Number
            }
        }
    ], 
} , 
// Stores Timestamp of every entry
{timestamps: true})

const URL = mongoose.model("URL" , URLSchema);
module.exports = URL;