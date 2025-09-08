const { getUser } = require("../models/userModel");
const {
  verfifyAccessJWT,
  verifyRefreshJWT,
  createAccessJWT,
} = require("../service/jwt");

const auth = async (req, res, next) => {
  try {
    // 1. Get the authorization from header
    // Decode / verify the jwt token
    // there is email in auth token, extract it
    // Make DB call, get user info, attach it on req

    const { authorization } = req.headers;
    const decoded = verfifyAccessJWT(authorization);
    if (decoded?.email) {
      const admin = await getAdmin({ email: decoded?.email });
      // check if a user has logged out
      if (!admin?.refreshJWT) {
        return res.status(401).json({
          status: "ERROR",
          message: "Unauthorized",
        });
      }
      if (admin?._id) {
        const { refreshJWT, password, ...rest } = admin.toJSON();
        // user.refreshJWT = undefined;
        // user.password = undefined;
        req.adminInfo = rest;
        return next();
      }
    }

    res.status(401).json({
      status: "ERROR",
      message: "Unauthorized",
    });
  } catch (e) {
    next(e);
  }
};

const refreshAuth = async (req, res, next) => {
  try {
    // 1. Get the authorization from header
    // Decode / verify the jwt token
    // there is email in auth token, extract it
    // Make DB call, get user info, attach it on req
    // refresh Token
    const { authorization } = req.headers;
    const decoded = verifyRefreshJWT(authorization);
    if (decoded?.email) {
      const admin = await getAdmin({
        email: decoded?.email,
        refreshJWT: authorization,
      });
      if (admin?._id) {
        // create a new accessJWT and send em back
        const accessJWT = await createAccessJWT({ email: decoded?.email });
        return res.json({
          status: "SUCCESS",
          accessJWT,
        });
      }
    }

    res.status(401).json({
      status: "ERROR",
      message: "Unauthorized",
    });
  } catch (e) {
    next(e);
  }
};
module.exports = {
  auth,
  refreshAuth,
};