const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

// Getting Models
const URL = require('./Models/URL')

// DOTENV File
require('dotenv').config({ path: __dirname + '/.env' });

// Connection to MongoDB
const { connectToMongoDB } = require('./DatabaseConnection')
connectToMongoDB(`mongodb+srv://Admin_Ishaan:${process.env.MONGODB_PASSWORD}@cluster0.s5eiovj.mongodb.net/?retryWrites=true&w=majority`).then(console.log(`Connection with MongoDB Established`)).catch((e) => console.log("Connection Error: " + e));

// Setting up EJS as View Engine
app.set("view engine" , "ejs")

// Allowing CORS Sharing
app.use(express.json())

// Importing the Route(s)
const URLRoute = require("./Routes/URL")

// Route for Converting to Short URL
app.use('/URL', URLRoute)

app.get("/test", async (request, response) => {
    const allURLs = await URL.find({});
    console.log(allURLs);
    return response.end(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Bootstrap demo</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
      </head>
      <body>
        <h1>Hello, world!</h1>
        
        <ul class="list-group">
            ${allURLs.map((abc) => {
                `<li> ${abc.shortID} </li>`
            }).join('')}
        </ul>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
      </body>
    </html>
    `)
})

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