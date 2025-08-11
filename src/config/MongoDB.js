const mongoose = require("mongoose");

const mongoConnect = () => {
  const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/BHTFunnels";
  console.log(DB_URL);
  return mongoose.connect(DB_URL);
};
mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.once("open", () => {
  console.log("Mongoose connected to DB");
});

module.exports = mongoConnect;
