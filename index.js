const express = require("express");
const app = express();
require("express-async-error");
const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");

require("./startup/logging")();
require("./startup/routes")(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  winston.info(`Listening on port ${port}`);
});

const db = config.get("db");
mongoose.connect(db).then(() => winston.info(`connected to ${db}`));
