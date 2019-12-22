const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

const port = process.env.PORT || 4000;

// define paths for express config
const filePath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars enggine and views location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

// setup static directoty to serve
app.use(express.static(filePath));

app.get("", (req, res) => {
  res.render("index", { title: "weather", creator: "anthony" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    message: "this is the first time doing node js",
    creator: "anthony"
  });
});
app.get("/help", (req, res) => {
  res.send("hello from help page");
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about me",
    name: "anthony",
    creator: "anthony"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "you must provide an address term" });
  }

  geocode(req.query.address, (error, response) => {
    if (error) {
      return res.send({ error });
    }
    forecast(response.lat, response.long, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location: response.place_name,
        address: req.query.address
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("errorPage", { message: "help article not found" });
});

app.get("*", (req, res) => {
  res.render("errorPage", { message: "404 page" });
});

app.listen(port, () => {
  console.log("server is up on port " + port);
});
