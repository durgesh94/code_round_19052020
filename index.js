const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv/config");

//** Import Routes */
const weatherRoutes = require("./routes/weatherApproach1");
const weatherApproach2Routes = require("./routes/weatherApproach2");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());

app.use('/api/weather', weatherRoutes);
app.use('/api/weatherApproach2', weatherApproach2Routes);

//** Routes */
app.get('/', (req, res) => {
    res.send(`RESTful API is running...
    \n1. http://localhost:5000/api/weather 
    \n2. http://localhost:5000/api/weatherApproach2`);
});

//** Connect to DB */
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Database is connected...");
});

//** Start listening to the server */
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));