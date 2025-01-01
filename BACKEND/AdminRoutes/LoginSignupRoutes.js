const express = require("express");
const { signup, login, logout } = require("../AdminControllers/LoginSignupController");

const router = express.Router();

// Sign-Up Route
router.post("/signup", signup);

// Login Route
router.post("/login", login);

// Logout Route
router.post("/logout", logout);

module.exports = router;
