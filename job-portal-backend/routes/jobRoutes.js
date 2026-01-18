const express = require("express");
const Job = require("../models/Job");
const auth = require("../middleware/auth");
const router = express.Router();
888
// Create job
router.post("/", auth, async (req, res) => {
  try {
    const job = await Job.create({ ...req.body, user: req.user._id });
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});                   

// Get all jobs
router.get("/", async (req, res) => {
  const jobs = await Job.find().populate("user", "username email").sort({ createdAt: -1 });
  res.json(jobs);
});

// Get logged-in user jobs
router.get("/my", auth, async (req, res) => {
  const jobs = await Job.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(jobs);
});

// Update job
router.put("/:id", auth, async (req, res) => {
  const job = await Job.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true });
  if (!job) return res.status(403).json({ message: "Not authorized" });
  res.json(job);
});

// Delete job
router.delete("/:id", auth, async (req, res) => {
  const job = await Job.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!job) return res.status(403).json({ message: "Not authorized" });
  res.json({ message: "Job deleted" });
});

module.exports = router;


