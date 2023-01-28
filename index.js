/* eslint-disable no-unused-vars */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const request = require("request");
const app = express();

const apikey = "YOUR_API_KEY";

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/getweather/:city", (req, res) => {
  const city = req.params.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

  request(url, (err, response, body) => {
    if (!err) {
      res.send(JSON.parse(body));
    }
  });
});


exports.app = functions.https.onRequest(app);
