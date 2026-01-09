const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  jobTitle: { type: String, required: true },
  jobDesc: { type: String, required: true },
  jobSalary: String,
  jobWh: String,
  jobLocation: String
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);




