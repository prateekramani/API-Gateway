const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path : path.resolve(__dirname , '../../.env')});

// console.log(process.env) 

module.exports = {
    "PORT" : process.env.PORT,
    "SALT_ROUNDS" : process.env.SALT_ROUNDS,
    "JWT_SECRET": process.env.JWT_SECRET,
    "JWT_EXPIRY" : process.env.JWT_EXPIRY,
    "FLIGHT_SERVICE" : process.env.FLIGHT_SERVICE,
    "BOOKING_SERVICE" : process.env.BOOKING_SERVICE
}