require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app=express();
const mongoose = require("mongoose");
require("./db/conn");
const cookieParser = require("cookie-parser");


const products = require("./models/productsSchema");
const DefaultData = require("./defaultdata");

const router = require("./routes/router");

app.use(express.json());
app.use(cookieParser(""));
app.use(cors());
// app.use(cors({
//     origin:"https://amazon-clone-nine-blush.vercel.app/",
//     methods:["GET","POST","PUT","DELETE"],
// }));
app.use(router);

const port=process.env.PORT || 8005;

// for deployment
// if(process.env.NODE_ENV === "production"){
//     app.use(express.static("client/build"))
// }

app.listen(port,()=>{
    console.log(`server is running on port number ${port}`);
});

DefaultData();
