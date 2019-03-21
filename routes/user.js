const express = require("express");
const { User, validate } = require("../models/user");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hi");
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exist");

  const { name, email, password } = req.body;
  user = new User({ name, email, password });

  await user.save();

  res.status("200").send({
    id: user._id,
    name: user.name,
    email: user.email
  });
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  const { role, _id, name, email, registeredAt } = user;
  res.send({ role, _id, name, email, registeredAt });
});

module.exports = router;
