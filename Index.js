const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

// Importing the Route(s)
const URLRoute = require("./Routes/URL")

app.use('/URL' , URLRoute)

app.listen(port , () => {
    console.log(`App running on PORT ${port}`)
})