const express = require("express");
const router = express.Router();

const controller = require("../controllers/forum");
const isLogged = require("../middlewares/isLogged");

router.get("/:slug", controller.getForumThreads);

router.post("/", isLogged, controller.addNewForum);

module.exports = router;
