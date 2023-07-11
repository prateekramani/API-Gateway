


const { StatusCodes } = require("http-status-codes");
const { errorResponse, successResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { UserService } = require("../services")


function validateRequest(req, res, next) {
    if (req.body.email && req.body.password) {
        next();
    }
    else {
        let errorRes = []
        errorResponse.msg = "Something went wrong while authenticating User !!";
        if (!req.body.email) {
            errorRes.push("Email not found.");
        }
        if (!req.body.password) {
            errorRes.push("Password not found.");
        }
        errorResponse.error = new AppError(errorRes, StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse)
    }
}


async function checkAuth(req, res, next) {
    try {
        const response = await UserService.isAuthenticated(req.headers[`x-access-token`]);
        if (response) {
            req.user = response; // setting the user id in the req object
            next();
        }
    } catch (error) {
        return res.status(error.statusCode).json(error)
    }
}


async function checkAdmin(req , res , next) {
    try {
        const isAdmin =await UserService.isAdmin(req.user);
        if (isAdmin) {
            next();
        }
        else {
            return res.status(StatusCodes.UNAUTHORIZED).json({message : "User not Authorized for this action"});
        }
       
    } catch (error) {
        throw new AppError("Something went wrong !!" , StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    validateRequest,
    checkAuth,
    checkAdmin
}