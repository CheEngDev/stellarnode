const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
  },
});

function returnjwtPrivateKey() {
  if (process.env.NODE_ENV === "development") {
    return process.env.jwtPrivateKey;
  } else {
    return process.env.stellarprivate;
  }
}

userSchema.methods.generateToken = function () {
  return (token = jwt.sign(
    {
      _id: this._id,
    },
    returnjwtPrivateKey()
  ));
};

const User = mongoose.model("User", userSchema);

const userschema = Joi.object({
  email: Joi.string().min(5).max(50).required().email(),
  password: Joi.string().min(5).max(50).required(),
});

const validator = (schema) => (req) => schema.validate(req);

exports.User = User;
exports.validateUser = validator(userschema);
