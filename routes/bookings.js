const express = require("express");
const router = express.Router();
const { Booking, validateBooking } = require("../models/booking");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const booking = await Booking.find({});
  res.send(booking);
});

router.post("/", async (req, res) => {
  const { error } = validateBooking(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let booking = new Booking({
    category: req.body.category,
    service: req.body.service,
    date: req.body.date,
    day: req.body.day,
    from: req.body.from,
    to: req.body.to,
    fullName: req.body.fullName,
    email: req.body.email,
    number: req.body.number,
    notes: req.body.notes,
  });

  await booking.save();

  res.send(booking);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateBooking(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const book = await Booking.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        booked: req.body.booked,
      },
    },
    { new: true }
  );
  res.send(book);
});

router.delete("/:id", auth, async (req, res) => {
  const booking = await Booking.findByIdAndRemove(req.params.id);

  if (!booking)
    return res
      .status(404)
      .send("The Appointment with the given id does not exist");

  res.send(booking);
});

module.exports = router;
