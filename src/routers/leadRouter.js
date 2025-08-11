const express = require("express");
const leadInfoRouter = express.Router();

const createLeadInfo = require("../controllers/leadController");

leadInfoRouter.post("/", createLeadInfo);

module.exports = leadInfoRouter;
