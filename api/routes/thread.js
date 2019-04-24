const express = require("express");
const router = express.Router();
const isLogged = require("../middlewares/isLogged");
const isAdmin = require("../middlewares/isAdmin");

const controller = require("../controllers/thread");

router.get("/:slug", controller.getThreadPosts);

router.post("/", isLogged, controller.addNewThread);

router.delete("/:id", isLogged, isAdmin, controller.deleteThread);

router.patch("/:id", isLogged, controller.updateThread);

module.exports = router;
