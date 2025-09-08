const express = require("express");
const {
  createUserRegistrationController,
  loginUserController,
  logoutUserController,
  getUserInfo,
} = require("../controllers/userController");
const { auth, refreshAuth } = require("../middleware/auth");
const UserRouter = express.Router();

UserRouter.post("/", createUserRegistrationController);
UserRouter.get("/get-accessjwt", refreshAuth);
UserRouter.post("/login", loginUserController);
UserRouter.get("/info",  getUserInfo);
UserRouter.post("/logout", logoutUserController);

module.exports = UserRouter
