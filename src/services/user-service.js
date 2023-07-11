const { UserRepository , RoleRepository} = require("../repositories");
const AppError = require("../utils/errors/app-error")
const { StatusCodes } = require("http-status-codes");
const { auth , enums } = require("../utils/common");
const { TokenExpiredError } = require("jsonwebtoken");


const userRepository = new UserRepository();
const roleRepository = new RoleRepository();

async function create(data) {
    try {
        const user = await userRepository.create(data);
        const role = await roleRepository.getRoleByName(enums.USER_ROLES_ENUMS.CUSTOMER);
        user.addRole(role);
        return user;
    } catch (error) {
        if (error.name = "SequelizeValidationError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create a new city object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function signin(data) {
    try {
        const user = await userRepository.getUserByEmail(data.email);
        if (!user) {
            throw new AppError("No user found for the provided email !!", StatusCodes.BAD_REQUEST);
        }

        const passwordMatch = await auth.checkPassword(data.password, user.password);

        if (!passwordMatch) {
            throw new AppError("Invalid password !!", StatusCodes.BAD_REQUEST);
        }

        const jwt = await auth.createToken({ id: user.id, email: user.email });
        return jwt;

    } catch (error) {
        if (error instanceof AppError) throw error
        throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function isAuthenticated(token) {
    try {
        if (!token) {
            throw new AppError("Missing Jwt token", StatusCodes.BAD_REQUEST);
        }
        const response = await auth.verifyToken(token);
        const user = await userRepository.get(response.id);
        if (!user) {
            throw new AppError("No User found", StatusCodes.NOT_FOUND);
        }
        return user.id;
    } catch (error) {
        if (error instanceof AppError) throw error;
        if (error.name == "JsonWebTokenError")
            throw new AppError("Invalid JWT Token", StatusCodes.BAD_REQUEST);
        if (error.name == "TokenExpiredError")
        throw new AppError("JWT Token Expired", StatusCodes.BAD_REQUEST);

        throw new AppError("Something Went Wrong", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    create,
    signin,
    isAuthenticated
}

