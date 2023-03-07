const express = require("express");
const URL = require("../Models/URL");
const router = express.Router();

router.get("/" , async (request , response) => {
    const allURLs = await URL.find({});
    return response.render("Home" , {
        URLs: allURLs
    })
})

module.exports = router;