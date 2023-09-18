/** @format */

const mongoose = require("mongoose");

const connectionUrl = "mongodb://127.0.0.1:27017/";
const databaseName = "phddunia-api";

mongoose.connect(connectionUrl + databaseName, {
  useNewUrlParser: true,
});
