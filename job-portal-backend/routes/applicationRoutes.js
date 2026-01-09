const express = require("express");
const Application = require("../models/Application");

const router = express.Router();

/**
 * CREATE APPLICATION
 */
router.post("/", async (req, res) => {
  try {
    const application = await Application.create({
      job: req.body.jobId,   // ✅ ONLY job reference
      edu: req.body.edu,
      exp: req.body.exp,
      gender: req.body.gender,
      skills: req.body.skills
    });

    res.status(201).json(application);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * GET ALL APPLICATIONS
 */
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("job", "title description")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;





