// 1-require express
const express = require("express");
// 2- instance of express
app = express();
//3- port
const port = 5000;
// 4- create server
app.listen(port, (error) =>
  error
    ? console.log("Can not run server!!!")
    : console.log(`Server is running on port ${port}`)
);
// 5- require and config dotenv
require("dotenv").config();
// 6- connect the DB
const connectDB = require("./config/connectDB");
connectDB();
// 7- bodyparser middleware
app.use(express.json());
// 8- require routes
app.use("/api/user", require("./routes/auth"));
