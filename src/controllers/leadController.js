const { createLead, viewLead } = require("../models/leadModel");
const {sendEbookDownloadEmail} = require("../service/nodemailer.js")

const createLeadInfo = async (req, res, next) => {
  try {
    // Logic to create lead information
    const data = req.body; // Assuming lead data is sent in the request body

    const {email, fullName} = data
  
    const Lead = await createLead(data);
    console.log("Lead created:", Lead);
    if (Lead) {
      sendEbookDownloadEmail({email, fullName})
      return res.json({
        status: "SUCCESS",
        message: "New Lead is created!",
      });
    }
    return res.status(500).json({
      status: "ERROR",
      message: `Error: Lead is not created.Please try again later.`,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const viewLeadInfo = async (req, res, next) => {
  try {
    // Logic to view lead information
    const leads = await viewLead({}); // Fetch all leads
    if (leads.length > 0) {
      return res.json({
        status: "SUCCESS",
        data: leads,
      });
    }
    return res.status(404).json({
      status: "ERROR",
      message: "No leads found.",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports = { createLeadInfo, viewLeadInfo };
