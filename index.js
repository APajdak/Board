const express = require("express");
const mongoose = require("mongoose");

const keys = require("./config/keys");
const users = require("./routes/user");

const app = express();

mongoose
  .connect(keys.MONGODB_URL, { useNewUrlParser: true })
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log("Could not connect to DB"));
mongoose.set("useCreateIndex", true);

app.use(express.json());
app.use("/api/users", users);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
