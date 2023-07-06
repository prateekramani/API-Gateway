const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path : path.resolve(__dirname , '../../.env')});

// console.log(process.env) 

module.exports = {
    "PORT" : process.env.PORT,
    "SALT_ROUNDS" : process.env.SALT_ROUNDS
}