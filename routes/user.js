const express = require("express");
const { User, validate } = require("../models/user");
const router = express.Router();
const isLogged = require("../middlewares/isLogged");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send({ errorMessage: "User already exist" });

  const { name, email, password } = req.body;
  user = new User({ name, email, password });

  await user.save();

  const token = user.createToken();
  res.status("200").send({
    name: user.name,
    token
  });
});

router.get("/:slug", isLogged, async (req, res) => {
  const user = await User.findOne({ slug: req.params.slug }).select(
    "-password"
  );
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.send(user);
});

router.delete("/:id", [isLogged], async (req, res) => {
  if (req.user._id === req.params.id || req.user.role === "admin") {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User with the given ID was not found.");
    }
    await user.remove();
    res.send(user);
  } else {
    return res.status(403).send("Access denied.");
  }
});

module.exports = router;
