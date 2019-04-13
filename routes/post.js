const express = require("express");
const router = express.Router();
const isLogged = require("../middlewares/isLogged");

const controller = require("../controllers/post");

router.get("/:slug", isLogged, controller.getUserPosts);

router.post("/", isLogged, controller.addNewPost);

router.delete("/:id", isLogged, controller.deletePost);

module.exports = router;
