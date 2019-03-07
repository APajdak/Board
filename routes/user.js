const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hi");
});

router.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User Already exist");

  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);

  const cryptedPassword = await bcrypt.hash(password, salt);
  user = new User({ name, email, password: cryptedPassword });

  await user.save();

  console.log(user);

  res.status("200").send("ok");
});
module.exports = router;
