const { UserController } = require("../../controllers");
const express = require("express");

const router = express.Router();

router.post("/signup", UserController.signup);


router.post("/signin", UserController.signin);


module.exports = router;