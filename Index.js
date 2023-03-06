const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

// Connection to MongoDB
const { connectToMongoDB } = require('./DatabaseConnection')
connectToMongoDB("mongodb://localhost:27017/Short-URL").then(console.log(`Connection with MongoDB Established`)).catch((e) => console.log("Connection Error: " + e));

// Importing the Route(s)
const URLRoute = require("./Routes/URL")

app.use('/URL' , URLRoute)

app.listen(port , () => {
    console.log(`App running on PORT ${port}`)
})