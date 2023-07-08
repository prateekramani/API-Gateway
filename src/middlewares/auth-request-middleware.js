


const { StatusCodes } = require("http-status-codes");
const {errorResponse , successResponse} = require("../utils/common");
const AppError = require("../utils/errors/app-error");


function validateRequest(req, res, next) {

    if (req.body.email && req.body.password)
    {
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
        errorResponse.error = new AppError(errorRes , StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse)    
    }
}

module.exports = {
    validateRequest
}