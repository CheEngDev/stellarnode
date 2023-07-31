const mongoose = require("mongoose");
const Joi = require("joi");

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlenght: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  number: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

const messageschema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().min(5).max(50).required().email(),
  number: Joi.number().required(),
  notes: Joi.string().required(),
});

const validator = (schema) => (req) => schema.validate(req);

exports.Message = Message;
exports.validateMessage = validator(messageschema);
