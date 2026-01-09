const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },
    edu: {
      type: String,
      required: true
    },
    exp: {
      type: String,
      required: true
    },
    gender: String,
    skills: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);


