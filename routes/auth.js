const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const _ = require("lodash");
const { User } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email or PW");

  const validpw = await bcrypt.compare(req.body.password, user.password);
  if (!validpw) return res.status(400).send("Invalid Email or PW");

  const token = user.generateToken();

  res.send(token);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(100),
  });

  return schema.validate(req);
}

module.exports = router;
