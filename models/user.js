const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

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

userSchema.methods.generateToken = function () {
  return (token = jwt.sign(
    {
      _id: this._id,
    },
    config.get("jwtPrivateKey")
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
