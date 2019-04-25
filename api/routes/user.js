const express = require("express");
const router = express.Router();
const isLogged = require("../middlewares/isLogged");
const hasPermission = require("../middlewares/hasPermission");
const controller = require("../controllers/users");

router.post("/", controller.registerUser);

router.get("/:slug", isLogged, controller.getUserInfo);

router.delete("/:slug", isLogged, hasPermission, controller.deleteUser);

router.patch("/:slug", isLogged, hasPermission, controller.updateUser);

module.exports = router;
