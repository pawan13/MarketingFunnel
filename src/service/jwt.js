
const jwt = require("jsonwebtoken");
const { createSession } = require("../models/sessionModel");
const { updateUser } = require("../models/userModel");

const JWT_ACCESS_SECRET = "qwer123ertrwqwe";
const JWT_REFRESH_SECRET = "qeret1234aesrt";

const createAccessJWT = async (UserInfo) => {
  const token = jwt.sign(UserInfo, JWT_ACCESS_SECRET, { expiresIn: "15m" });
  await createSession({ accessToken: token, associate: UserInfo.email });
  return token;
};

const createRefreshJWT = async (UserInfo) => {
  const token = jwt.sign(UserInfo, JWT_REFRESH_SECRET, { expiresIn: "30d" });
  await updateUser({ email: UserInfo.email }, { refreshJWT: token });
  return token;
};

const verfifyAccessJWT = (token) => jwt.verify(token, JWT_ACCESS_SECRET);
const verifyRefreshJWT = (token) => jwt.verify(token, JWT_REFRESH_SECRET);

module.exports = {
  createAccessJWT,
  createRefreshJWT,
  verifyRefreshJWT,
  verfifyAccessJWT,
};
