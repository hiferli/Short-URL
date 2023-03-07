const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

// Getting Models
const URL = require('./Models/URL')

// DOTENV File
require('dotenv').config({path: __dirname + '/.env'});

// Connection to MongoDB
const { connectToMongoDB } = require('./DatabaseConnection')
connectToMongoDB(`mongodb+srv://Admin_Ishaan:${process.env.MONGODB_PASSWORD}@cluster0.s5eiovj.mongodb.net/?retryWrites=true&w=majority`).then(console.log(`Connection with MongoDB Established`)).catch((e) => console.log("Connection Error: " + e));

app.use(express.json())

// Importing the Route(s)
const URLRoute = require("./Routes/URL")

// Route for Converting to Short URL
app.use('/URL' , URLRoute)

app.get("/test" , (request , response) => {
    response.end("<h1>Welcome to the testing sight of the app</h1>")
})
// Extracting Original Website from ShortID 
// And thereafter updating the clicks option
app.get("/:shortID" , async (request , response) => {
    const shortID = request.params.shortID;
    
    const entry = await URL.findOneAndUpdate({
        // Thing needed to find
        shortID
    } , {
        // Thing needed to Update
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            }
        }
    })

    // Whenever the user hits the ShortID, he is redirected to the page
    response.redirect(entry.redirectURL)
})

app.listen(port , () => {
    console.log(`App running on PORT ${port}`)
})