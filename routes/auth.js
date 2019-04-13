const express = require("express");
const router = express.Router();

const controller = require("../controllers/auth");

router.post("/", controller.logIn);

module.exports = router;
