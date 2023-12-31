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


async function signin(req, res) {
    try {
        const user = await UserService.signin({
            email: req.body.email,
            password: req.body.password
        })
        successResponse.msg = "Successfully Sign In";
        successResponse.data = user;
        return res.status(StatusCodes.CREATED).json(successResponse);

    } catch (error) {
        errorResponse.msg = "Something went wrong while signing in";
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
    }

}

async function addRoleToUser(req, res) {
    try {
        const user = await UserService.addRoleToUser({
            role: req.body.role,
            id: req.body.id
        })
        successResponse.msg = "Successfully Added Role to User";
        successResponse.data = user;
        return res.status(StatusCodes.CREATED).json(successResponse);

    } catch (error) {
        errorResponse.msg = "Something went wrong while signing in";
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
    }

}

module.exports = {
    signup,
    signin,
    addRoleToUser
}