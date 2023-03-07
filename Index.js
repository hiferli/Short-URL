const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const path = require('path');

// Getting Models
const URL = require('./Models/URL')


// DOTENV File
require('dotenv').config({ path: __dirname + '/.env' });

// Connection to MongoDB
const { connectToMongoDB } = require('./DatabaseConnection')
connectToMongoDB(`mongodb+srv://Admin_Ishaan:${process.env.MONGODB_PASSWORD}@cluster0.s5eiovj.mongodb.net/?retryWrites=true&w=majority`).then(console.log(`Connection with MongoDB Established`)).catch((e) => console.log("Connection Error: " + e));

// Setting up EJS as View Engine
app.set("view engine" , "ejs")

// Using Directory with all EJS Files
app.set("views" , path.resolve("./Views"));

// Allowing CORS Sharing
app.use(express.json())
// Allowing Data from Forms
app.use(express.urlencoded({extended : false}))

// Importing the Route(s)
const URLRoute = require("./Routes/URL")
const staticRoute = require("./Routes/StaticRouter") 

// Route for Converting to Short URL
app.use('/URL', URLRoute)

// Frontend Routes Rendering
app.use("/" , staticRoute);

// Extracting Original Website from ShortID 
// And thereafter updating the clicks option
app.get("/url/:shortID" , async (request , response) => {
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

app.listen(port, () => {
    console.log(`App running on PORT ${port}`)
})