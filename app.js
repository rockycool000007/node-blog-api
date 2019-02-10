"use strict";
const express = require("express"),
  redis = require("redis"),
  bodyParser = require("body-parser"),
  cors = require("cors");

const config = require("./app_config/env");

const client = redis.createClient();

client.on("connect", function() {
  console.log("You are now connected to Redis...");
});

const app = express();
app.use(cors());

app.set("port", config.PORT);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const blogs = require("./routers/blog.route");

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
