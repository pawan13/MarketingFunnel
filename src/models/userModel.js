const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshJWT: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userModel);
const createUser = (obj) => User.create(obj);
const getUser = (filter) => User.findOne(filter);
const updateUser = (filter, updateObj) =>
  User.findOneAndUpdate(filter, updateObj);

module.exports = {
  createUser,
  getUser,
  updateUser,
};