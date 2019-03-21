const express = require("express");
const { User, validate } = require("../models/user");
const router = express.Router();
const isLogged = require("../middlewares/isLogged");

router.get("/me", isLogged, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exist");

  const { name, email, password } = req.body;
  user = new User({ name, email, password });

  await user.save();

  const token = user.createToken();
  res
    .status("200")
    .header("x-access-token", `Bearer ${token}`)
    .send({
      id: user._id,
      name: user.name,
      email: user.email
    });
});

router.get("/:id", isLogged, async (req, res) => {
  const user = await User.findById(req.params.id);
  const { role, _id, name, email, registeredAt } = user;
  res.send({ role, _id, name, email, registeredAt });
});

router.delete("/:id", [isLogged], async (req, res) => {
  if (req.user._id === req.params.id || req.user.role === "admin") {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send("User with the given ID was not found.");
    }
    res.send(user);
  } else {
    return res.status(403).send("Access denied.");
  }
});

module.exports = router;
