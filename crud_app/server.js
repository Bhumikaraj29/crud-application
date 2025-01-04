const express=require('express');
const dotenv=require('dotenv');
const morgan=require('morgan');
const bodyparser=require("body-parser");
const path=require('path');

const connectDB=require('./server/database/connection');

const app=express();

// Load environment variables
dotenv.config({ path:'config.env' })
const PORT = process.env.PORT || 8080; // Use the environment PORT variable or fallback to 8080

// Log requests
app.use(morgan('tiny'));

// MongodB connection
connectDB(); // Ensure this function handles connection logic properly

// Parse request to bodyparser
app.use(bodyparser.urlencoded({extended:true}))

// Set view engine 
app.set("view engine","ejs");
// app.set("views",path.resolve(__dirname,"views/ejs"));

// load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))



// Load routers
app.use('/',require('./server/routes/router'))

app.listen(3000,()=>{console.log('Server is running on http://localhost:3000')});