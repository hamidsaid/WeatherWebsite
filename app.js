const express = require("express");
const bodyParser = require("body-parser");
const https = require ("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");
});



app.post("/", function(req, res) {

    const city = req.body.placeName;

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=3c18cf10e88b82b17534dd38a4efe286&units=metric";

     https.get( url , function(response) {
    console.log(response.statusCode);

    response.on("data" , function(data) {

        const weatherData = JSON.parse(data);

        const temp = weatherData.main.temp;
        const discription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

        res.write("<p>The weather is " + discription + "</p>");
        res.write("<h1>The Temperature of " + city + " is " + temp + " celcius </h1>");
        res.write("<img src= " + imageUrl + " >");
        res.send();

    })
    });
})


app.listen(3000, function () {

    console.log("Server is running on port 3000");
});