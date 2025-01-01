const express = require("express");
const { getDashboardData } = require("../AdminControllers/DashboardController");

const router = express.Router();

// Dashboard route
router.get("/", getDashboardData);

module.exports = router;
