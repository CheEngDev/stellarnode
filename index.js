const express = require("express");
const app = express();
require("express-async-error");
const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");
require("dotenv").config();

require("./startup/logging")();
require("./startup/routes")(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  winston.info(`Listening on port ${port}`);
});

function returnDb() {
  if (process.env.NODE_ENV === "development") {
    return process.env.db;
  } else {
    return process.env.remotedb;
  }
}

const db = returnDb();
console.log(db);
console.log(process.env.NODE_ENV);

mongoose.connect(db).then(() => winston.info(`connected to ${db}`));
