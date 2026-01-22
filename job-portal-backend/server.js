require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS (IMPORTANT)
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3002", // ✅ ADD THIS
      "https://azan-job-portal-6cgc.vercel.app"
    ],
    credentials: false
  })
);


app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// Test
app.get("/", (req, res) => {
  res.send("Backend is working");
});

// DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch(err => console.error(err.message));








