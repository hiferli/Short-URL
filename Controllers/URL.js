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

    // Returning to the home page once the ShortID is generated
    // Furthermore, rendering the ShortID on the Home page

    return response.render('Home' , {
        shortID: shortID
    })

    // return response.json({
    //     shortID: shortID
    // })
}

async function handleGetAnalytics(request , response) {
    // Getting ShortID from the parameters 
    const shortID = request.params.shortID;

    // Finding the Analytics in the MongoDB Database
    const result = await URL.findOne({shortID});
    
    return response.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics
}