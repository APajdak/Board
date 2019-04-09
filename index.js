const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const cors = require("cors");
const volleyball = require("volleyball");

const keys = require("./config/keys");

const users = require("./routes/user");
const threads = require("./routes/thread");
const posts = require("./routes/post");
const auth = require("./routes/auth");
const forum = require("./routes/forum");

const app = express();

mongoose
  .connect(keys.MONGODB_URL, { useNewUrlParser: true })
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log("Could not connect to DB"));
mongoose.set("useCreateIndex", true);

app.use(express.json());
app.use(cors({ origin: keys.CLIENT, exposedHeaders: "x-access-token" }));
app.use(volleyball);
app.use("/api/users", users);
app.use("/api/threads", threads);
app.use("/api/posts", posts);
app.use("/api/forums", forum);
app.use("/api/auth", auth);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
