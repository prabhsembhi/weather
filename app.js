const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {

  res.sendFile(__dirname + "/index.html");
 
});

app.post("/", function(req,res){
  const query = req.body.cityName;
  const api = "7ec7c4611d5e73a9b3d2060c9261f631";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+api+"&units=metric";
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const iconUrl = "https://openweathermap.org/img/wn/";
      const icon = iconUrl + weatherData.weather[0].icon + "@2x.png";
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;

      res.write("<h1>The Temperature for "+query+" is "+temp+"</h1>");
      res.write("<p>The weather condition is like"+weatherDescription+"</p>")
      res.write("<img src=" + icon + ">")
      res.send();
    });
  });
})

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
