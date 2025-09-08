
const { createUser, getUser, updateUser } = require("../models/userModel");
const { deleteSession } = require("../models/sessionModel");
const { comparePassword, hashPassword } = require("../service/bcrypt");
const { createAccessJWT, createRefreshJWT } = require("../service/jwt");

const createUserRegistrationController = async (req, res, next) => {
  
  try {
    const { password } = req.body;
    req.body.password = hashPassword(password);
    await createUser(req.body);
    res.json({
      status: "SUCCESS",
      message: "You have successfully registered!!",
    });
  } catch (error) {
    next(error, "Not registered");
  }
};

const loginUserController = async (req, res, next) => {
  try {
   
    const { email, password } = req.body;
    const User = await getUser({ email });

    if (User?._id) {
      const isPassValid = comparePassword(password, User?.password);


      if (isPassValid) {
        const accessJWT = await createAccessJWT({ email });
        const refreshJWT = await createRefreshJWT({ email });
        return res.json({
          status: "SUCCESS",
          message: "Login Success",
          token: {
            accessJWT,
            refreshJWT,
          },
        });
      }
    }
    res.status(403).json({
      status: "ERROR",
      message: " Invalid login Details",
    });
  } catch (error) {
    next(error);
  }
};

const getUserInfo = (req, res, next) => {
  try {
    res.json({
      status: "SUCCESS",
      user: req.userInfo,
    });
    console.log(user)
  } catch (e) {
    next(e);
  }
};

const logoutUserController = async (req, res, next) => {
  try {
    const { accessJWT, refreshJWT } = req.header;

    //remove accessJWt from session model
    await deleteSession(accessJWT);
    //remove refershJWT from the model
    await updateUser(
      { refreshJWT },
      {
        refreshJWT: "",
      }
    );
    res.json({
      status: "SUCCESS",
      message: "Logout Success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUserRegistrationController,
  loginUserController,
  getUserInfo,
  logoutUserController,
};
