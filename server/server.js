// ESM is needed to run import export commands on the node server, otherwirse you will need to use require and module.exports
import express from 'express';
// comes with node js by default, stand for file system
import {readdirSync} from 'fs';
// morgan is a middleware that logs the request in the console
const morgan = require ('morgan');
// cors is a middleware that allows the server to accept requests from different origins
import cors from 'cors';

// import mongoose
const mongoose = require("mongoose");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

// database connection
mongoose
    .connect("mongodb+srv://btraumuller:Korra19882@hotelapp.njrnx.mongodb.net/", {})
    .then(()=> console.log('DB connected'))
    .catch((err) => console.log('DB connection error', err))

//middleware - running morgan in development mode
app.use(cors());
app.use(morgan('dev'));

// use express to parse the request body into a json object
app.use(express.json());

// route middleware - runs in the middle of the request and the response. Runs all the routes in the routes folder
readdirSync('./routes').map((name)=> 
    app.use('/api', require(`./routes/${name}`))
);

app.listen(port, () =>{console.log(`Server is running on port ${port}`)}); 