const mongoose = require("mongoose");

const mongoConnect = () => {
  const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/BHTFunnels";
  return mongoose.connect(DB_URL);
};

module.exports = mongoConnect;
