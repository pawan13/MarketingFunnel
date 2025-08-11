const { createLead } = require("../models/leadModel");

const createLeadInfo = async (req, res, next) => {
  try {
    // Logic to create lead information
    const data = req.body; // Assuming lead data is sent in the request body
    const Lead = await createLead(data);
    if (Lead) {
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
module.exports = createLeadInfo;
