const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

// DOTENV File
require('dotenv').config({path: __dirname + '/.env'});

// Connection to MongoDB
const { connectToMongoDB } = require('./DatabaseConnection')
connectToMongoDB(`mongodb+srv://Admin_Ishaan:${process.env.MONGODB_PASSWORD}@cluster0.s5eiovj.mongodb.net/?retryWrites=true&w=majority`).then(console.log(`Connection with MongoDB Established`)).catch((e) => console.log("Connection Error: " + e));

app.use(express.json())

// Importing the Route(s)
const URLRoute = require("./Routes/URL")

app.use('/URL' , URLRoute)

app.listen(port , () => {
    console.log(`App running on PORT ${port}`)
})