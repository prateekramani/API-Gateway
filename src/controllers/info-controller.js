
const { StatusCodes } = require("http-status-codes");

const info = (req, res) => {
    return res.status(StatusCodes.OK).json({
        success : true ,
        msg : "API is live",
        error : {},
        data : {}
    });
    // we can also do return res.status(200).json({}) , since res.status return the same res object.
    // same is for res.json , it returns the same res object.
    // also we can use the http status codes module we installed
}


module.exports = {
    info 
} 

// key value is same , so no need to write info : info at line 15