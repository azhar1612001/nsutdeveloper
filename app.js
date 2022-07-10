const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

dotenv.config({path: "./config.env"});
require("./db/conn");

app.use(express.json());

app.use(require("./router/auth"));

const PORT = process.env.PORT || 5000;

//3 step of deployment
if(process.env.NODE_ENV == "production"){
    app.use(express.static("myapp/build"));
}

app.listen(PORT, () => {
    console.log(`server is running at port number ${PORT}`);
});