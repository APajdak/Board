const express = require("express");

const router = express.Router();
const controller = require("../controllers/forum");

router.get("/:slug", controller.getForumThreads);

router.post("/", controller.addNewForum);

module.exports = router;
