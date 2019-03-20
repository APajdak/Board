const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const keys = require("./config/keys");

const users = require("./routes/user");
const threads = require("./routes/thread");
const posts = require("./routes/post");

const app = express();

mongoose
  .connect(keys.MONGODB_URL, { useNewUrlParser: true })
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log("Could not connect to DB"));
mongoose.set("useCreateIndex", true);

app.use(express.json());
app.use("/api/users", users);
app.use("/api/threads", threads);
app.use("/api/posts", posts);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
