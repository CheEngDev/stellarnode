const express = require("express");
const router = express.Router();
const { validateMessage, Message } = require("../models/message");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const message = await Message.find({});

  res.send(message);
});

router.post("/", async (req, res) => {
  const { error } = validateMessage(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let message = new Message({
    name: req.body.name,
    email: req.body.email,
    number: req.body.number,
    notes: req.body.notes,
  });

  await message.save();

  res.send(message);
});

router.delete("/:id", auth, async (req, res) => {
  const message = await Message.findByIdAndRemove(req.params.id);

  if (!message)
    return res.status(404).send("The Message with the given id does not exist");

  res.send(message);
});

module.exports = router;
