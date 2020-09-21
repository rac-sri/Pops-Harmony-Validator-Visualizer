var createError = require("http-errors");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var app = express();
const pva = require("./routes/PVAParticipant");
const result = require("./routes/Game");
const mongooose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

console.log(process.env.mongodburl);

mongooose
  .connect(process.env.mongodburl, {
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to db"))
  .catch(() => console.log("connection to db failed"));

app.use(logger());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "build")));
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile("index.html");
});
app.use("/pvauser", pva);
app.use("/result", result);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
});

module.exports = app;
