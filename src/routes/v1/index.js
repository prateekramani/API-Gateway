

const express = require('express')

const router = express.Router();

const { InfoController } = require("../../controllers");

const userRoutes = require("./user-routes");

const { authMiddleware } = require("../../middlewares")

router.get("/info",authMiddleware.checkAuth ,InfoController.info)
// since above line is a last middleware to be called , so it becomes a controller , so we will 
// call the controller from here

router.use("/user", userRoutes);



module.exports = router;