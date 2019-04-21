const express = require("express");
require("express-async-errors");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const cors = require("cors");
const volleyball = require("volleyball");

const { CLIENT } = require("./config/keys");

const users = require("./routes/user");
const threads = require("./routes/thread");
const posts = require("./routes/post");
const auth = require("./routes/auth");
const forum = require("./routes/forum");
const errorHandler = require("./errors/errorHandler");
require("./config/mongoose");

const app = express();

app.use(express.json());
app.use(cors({ origin: CLIENT, exposedHeaders: "x-access-token" }));
app.use(volleyball);
app.use("/api/users", users);
app.use("/api/threads", threads);
app.use("/api/posts", posts);
app.use("/api/forums", forum);
app.use("/api/auth", auth);

app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
