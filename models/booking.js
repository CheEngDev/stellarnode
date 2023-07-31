const mongoose = require("mongoose");
const Joi = require("joi").extend(require("@joi/date"));

const bookingSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ["Dentistry"],
  },
  service: {
    type: String,
    required: true,
    enum: [
      "Orthodontics",
      "Periodontics",
      "Endodontics",
      "Cosmetics",
      "General Dentistry",
      "Oral Surgery",
    ],
  },
  date: {
    type: Date,
    required: true,
  },
  day: {
    type: String,
    required: true,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  },
  from: {
    type: String,
    required: true,
    enum: [
      "8:00AM",
      "9:00AM",
      "10:00AM",
      "11:00AM",
      "1:00PM",
      "2:00PM",
      "3:00PM",
      "4:00PM",
      "5:00PM",
    ],
  },
  to: {
    type: String,
    required: true,
    enum: [
      "8:00AM",
      "9:00AM",
      "10:00AM",
      "11:00AM",
      "1:00PM",
      "2:00PM",
      "3:00PM",
      "4:00PM",
      "5:00PM",
    ],
  },
  fullName: {
    type: String,
    required: true,
    minlength: 5,
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
  booked: {
    type: Boolean,
    default: false,
  },
  notes: {
    type: String,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

const bookingschema = Joi.object({
  category: Joi.string().valid("Dentistry").required(),
  service: Joi.string()
    .valid(
      "Orthodontics",
      "Periodontics",
      "Endodontics",
      "Cosmetics",
      "General Dentistry",
      "Oral Surgery"
    )
    .required(),
  date: Joi.date().format("YYYY-MM-DD").required(),
  day: Joi.string()
    .valid("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")
    .required(),
  from: Joi.string()
    .valid(
      "8:00AM",
      "9:00AM",
      "10:00AM",
      "11:00AM",
      "1:00PM",
      "2:00PM",
      "3:00PM",
      "4:00PM",
      "5:00PM"
    )
    .required(),
  to: Joi.string()
    .valid(
      "8:00AM",
      "9:00AM",
      "10:00AM",
      "11:00AM",
      "1:00PM",
      "2:00PM",
      "3:00PM",
      "4:00PM",
      "5:00PM"
    )
    .required(),
  fullName: Joi.string().min(5).max(50).required(),
  email: Joi.string().min(5).max(50).required().email(),
  number: Joi.number().required(),
  notes: Joi.string(),
  booked: Joi.boolean(),
}).options({ stripUnknown: true });

const validator = (schema) => (req) => schema.validate(req);

exports.Booking = Booking;
exports.validateBooking = validator(bookingschema);
