const express = require("express");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hi");
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User Already exist");

  const { name, email, password } = req.body;
  user = new User({ name, email, password });

  await user.save();

  res.status("200").send({
    id: user._id,
    name: user.name,
    email: user.email
  });
});
module.exports = router;
