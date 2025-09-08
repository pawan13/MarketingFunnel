const express = require("express");
const leadInfoRouter = express.Router();

const {
  createLeadInfo,
  viewLeadInfo,
} = require("../controllers/leadController");
const { auth } = require("../middleware/auth");

leadInfoRouter.post("/", createLeadInfo);

leadInfoRouter.get("/", auth, viewLeadInfo);

module.exports = leadInfoRouter;
