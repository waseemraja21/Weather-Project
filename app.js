const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {

  const query = req.body.cityName;
  const apiKey = "cd6b155f6764e06c9884bb566d41f502";
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=" + query + "&units=" + unit;
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p>The weather is currently " + weatherDescription + "<p>");
      res.write("<h1>the temprature in "+query+ "is " + temp + " degree Celcius.</h1>");
      res.write("<img src=" + imgURL + ">");
      res.send()
      //console.log(weatherData);
      // const object = {
      //   name: "Waseem",
      //   favouriteFood:"Salin"
      // }
      // console.log(JSON.stringify(object));
    })
  })


})

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
