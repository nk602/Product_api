const express = require("express");
const app = express();


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  next();
});

const bodyparser = require("body-parser");

const product = require("./api/routes/product");

// database connection //
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://Shailesh:d1zjPHekhyhgKIzS@cluster0.ine2i.mongodb.net/?retryWrites=true&w=majority"
);

mongoose.connection.on("err", (err) => {
  console.log("database is not connected");
});
mongoose.connection.on("connected", (conncted) => {
  console.log("database is connected");
});

//data convart json form
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//user request//
app.use("/products", product);


app.use((req, res, next) => {
  res.status(404).json({
    error: "bad request",
  });
});
module.exports = app;
