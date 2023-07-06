const { UserService } = require("../services/index");
const { successResponse, errorResponse } = require("../utils/common");
const { StatusCodes } = require("http-status-codes");



// POST : /signup
// req-body {email : "abc@g.com" , password : "1234"}
async function signup(req, res) {
    try {
        const user = await UserService.create({
            email: req.body.email,
            password: req.body.password
        })
        successResponse.msg = "Successfully created an User";
        successResponse.data = user;
        return res.status(StatusCodes.CREATED).json(successResponse);

    } catch (error) {
        errorResponse.msg = "Something went wrong while creating User";
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
    }

}

module.exports = {
    signup
}