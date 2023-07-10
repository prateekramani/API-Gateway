const express = require("express");
const {ServerConfig , Logger} = require("./config"); 
// this will direclty fetch index.js file
// reason behind creating so many folders (controller , router, config) is that , we can direclty import all the files in respective index file and import it here 
// so that there are less import lines 
const apiRoutes = require("./routes");
const rateLimit  = require("express-rate-limit"); 
const { createProxyMiddleware } = require('http-proxy-middleware');

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	max: 3000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
});

// Apply the rate limiting middleware to all requests


const app = express();

app.use(limiter);
app.use('/flightsService', createProxyMiddleware({ target: ServerConfig.FLIGHT_SERVICE, changeOrigin: true }));
app.use('/bookingService', createProxyMiddleware({ target: ServerConfig.BOOKING_SERVICE, changeOrigin: true }));
app.use(express.json()) //this is going to add a middleware for all the upcoming routes 
app.use(express.urlencoded({extended : true })) // to read url endoded stuff in req body

app.use('/api' , apiRoutes);

app.listen( ServerConfig.PORT , ()=>{
    Logger.info("Successfully started the API gateway server on PORT", {});
    // info is the level , Success....is the message 
    console.log( `Successfully started the API gateway server on PORT : ${ServerConfig.PORT}`)
})