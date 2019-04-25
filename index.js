const express = require("express");
require("express-async-errors");
const cors = require("cors");
const volleyball = require("volleyball");

const { CLIENT } = require("./config/keys");

const users = require("./api/routes/user");
const threads = require("./api/routes/thread");
const posts = require("./api/routes/post");
const auth = require("./api/routes/auth");
const forum = require("./api/routes/forum");
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
