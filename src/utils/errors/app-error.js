
// there is error class in JS 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error



class AppError extends Error {
    constructor (message , statusCode){
        super(message);
        this.statusCode = statusCode ;
        this.explanation = message;
    }
}

module.exports = AppError;