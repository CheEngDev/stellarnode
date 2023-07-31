const express = require("express");
const app = express();
require("express-async-error");
const mongoose = require("mongoose");
const winston = require("winston");

const port = process.env.PORT || 3000;

require("./startup/logging")();
require("./startup/routes")(app);

app.listen(port, () => {
  winston.info(`Listening on port ${port}`);
});

const db = "mongodb://localhost:27017/stellarsmiles";
mongoose.connect(db).then(() => winston.info(`connected to ${db}`));
