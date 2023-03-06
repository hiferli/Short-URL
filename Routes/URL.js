const express = require("express")
const router = express.Router(); 

// Importing Shorten URL Function from Controllers/URL.js
const { handleGenerateNewShortURL } = require("../Controllers/URL")

// POST Request for Handling Shorten URL
router.post('/' , handleGenerateNewShortURL);

module.exports = router;

