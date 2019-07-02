const express = require("express");
const router = express.Router();

const controller = require("../controllers/forum");
const isLogged = require("../middlewares/isLogged");
const isAdmin = require("../middlewares/isAdmin");

router.get("/", controller.getForums);

router.get("/:slug", controller.getForumThreads);

router.post("/", isLogged, controller.addNewForum);

router.patch("/:slug", isLogged, isAdmin, controller.updateForum);

module.exports = router;
