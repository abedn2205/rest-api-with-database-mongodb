// filename server.js

//import express
const express = require("express");
//import morgan
const morgan = require("morgan");
//import bodyParser
const bodyParser = express;

// import connection to mongodb
const connectDB = require("./server/database/connection");

//connection start
connectDB();

//inisialisasi app
const app = express();

//setup port
const PORT = 8080;

//log request
app.use(morgan("tiny"));

//setup bodyParser
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//load router
app.use("/", require("./server/routes/router"));

// running server
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
