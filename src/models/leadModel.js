const mongoose = require("mongoose");
const leadSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
}, { timestamps: true });
const Lead = mongoose.model("Lead", leadSchema);

const createLead = (leadInfo) => Lead.create(leadInfo);

const viewLead = (filter) => Lead.find(filter);
module.exports = { createLead, viewLead };
