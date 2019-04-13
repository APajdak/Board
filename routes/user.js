const express = require("express");
const router = express.Router();
const isLogged = require("../middlewares/isLogged");
const controller = require("../controllers/users");

router.post("/", controller.registerUser);

router.get("/:slug", isLogged, controller.getUserInfo);

router.delete("/:slug", isLogged, controller.deleteUser);

module.exports = router;
