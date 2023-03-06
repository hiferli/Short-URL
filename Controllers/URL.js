const shortid = require("shortid")
const URL = require('../Models/URL')

async function handleGenerateNewShortURL(request , response) {
    // Getting the short ID for the given URL (Comes after '<link>/__')
    const shortID = shortid();
    
    // Getting Information from the request:
    const body = request.body;

    // In a case where the user doesn't provide the URL 
    if(!body.URL){
        response.status(400).json({
            "Error": "Please provide the URL"
        })
    }

    // Adding Information to the Database
    await URL.create({
        shortID: shortID,
        redirectURL: body.URL,
        visitHistory: []
    })

    return response.json({
        shortID: shortID
    })
}

module.exports = {
    handleGenerateNewShortURL
}