const { UserController } = require("../../controllers");
const express = require("express");

const router = express.Router();

router.post("/", UserController.signup);


module.exports = router;