const express = require("express")
const router = express.Router(); 

// Importing Shorten URL Function from Controllers/URL.js
const { handleGenerateNewShortURL , handleGetAnalytics } = require("../Controllers/URL")

// POST Request for Handling Shorten URL
router.post('/' , handleGenerateNewShortURL);

// Getting Clickalytics
router.get('/analytics/:shortID' , handleGetAnalytics);

module.exports = router;

