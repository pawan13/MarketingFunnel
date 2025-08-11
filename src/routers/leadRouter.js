const express = require("express");
const leadInfoRouter = express.Router();

const createLeadInfo = require("../controllers/leadController");
const viewLeadInfo = require("../controllers/leadController");

leadInfoRouter.post("/", createLeadInfo);

leadInfoRouter.get("/", viewLeadInfo);

module.exports = leadInfoRouter;
