const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  getDashboardStats,
} = require("../controllers/adminDashboardController");

// Admin dashboard
router.get("/dashboard", verifyToken, getDashboardStats);

module.exports = router;
