// 1- require mongoose
const mongoose = require("mongoose");
//2- connect to DB
const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(console.log("the database is connected..."))
    .catch((err) => {});
};
module.exports = connectDB;
