const { UserRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error")
const userRepository = new UserRepository();
const { StatusCodes } = require("http-status-codes");
const {auth} = require("../utils/common")


async function create(data) {
    try {
        const user = await userRepository.create(data)
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
            throw new AppError("No user found for the provided email !!" , StatusCodes.BAD_REQUEST);
        }

        const passwordMatch =await auth.checkPassword(data.password , user.password);

        if (!passwordMatch) {
            throw new AppError("Invalid password !!" , StatusCodes.BAD_REQUEST);
        }

        const jwt = await auth.createToken({id: user.id , email : user.email});
        return jwt;

    } catch (error) {
        if (error instanceof AppError) throw error
        throw new AppError("Something went wrong" , StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    create,
    signin
}

