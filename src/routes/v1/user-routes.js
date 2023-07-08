const { UserController } = require("../../controllers");
const express = require("express");
const {authMiddleware} = require("../../middlewares")

const router = express.Router();

router.post("/signup", UserController.signup);


router.post("/signin", authMiddleware.validateRequest ,UserController.signin);


module.exports = router;