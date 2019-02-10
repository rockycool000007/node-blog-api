"use strict";
const express = require("express"),
  //redis = require("redis"),
  redis = require("ioredis"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  helmet = require('helmet'),
  morgan = require('morgan');
 
const config = require("./configuration/env");

// const client = redis.createClient("6379", "http://34.73.145.65");

// client.on("connect", function() {
//   console.log("You are now connected to Redis...");
// });

const app = express();

// better security
app.use(helmet()); 

// better logging
app.use(morgan("combined"));
app.use(cors());

app.set("port", config.PORT);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const blogs = require("./routes/blog.route");

app.use("/", blogs);

app.all("/*", (req, res) => {
  res.status(404).send("404 - Page not found");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Opps something went wrong");
});

app.listen(app.get("port"), () => {
  console.log("Server started on port " + app.get("port"));
});
