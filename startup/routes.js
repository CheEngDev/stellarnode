const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const messages = require("../routes/messages");
const bookings = require("../routes/bookings");
const user = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(cors());
  app.use(helmet());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use("/api/messages", messages);
  app.use("/api/bookings", bookings);
  app.use("/api/users", user);
  app.use("/api/auth", auth);
  app.use(error);
};
