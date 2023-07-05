const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf , prettyPrint } = format;

const customFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} : ${level}: ${message}`;
}) 
// printf is for printing a log
// level is the priority - info , error ,warning 
// timestamp - will tells us when the log happened


const logger = createLogger({
    format: combine( // putting format is optional
        timestamp({format : "YYYY-MM-DD HH:mm:ss"}),
        prettyPrint(),
        customFormat
    ),
    transports: [new transports.Console(),
        new transports.File({ filename: "combines.log" })
    ]
});


module.exports = logger;

//transports - we want our logs to printed on console as well as stored in log files , so we mention all the streams 
// wehere we want the logs
// new transports.Console()  - to print on console 
//transports.File -  is storing in separate file 