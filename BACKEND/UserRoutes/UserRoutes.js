// const express = require("express");
// const passport = require("passport");
// const { googleAuthCallback, login } = require("../UserControllers/User");
// const router = express.Router();

// // Google OAuth Route
// router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// // Google OAuth callback route
// // Corrected route for Google callback
// router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), googleAuthCallback);

// router.post("/login", login);

// module.exports = router;



// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { googleCallback } = require('../UserControllers/User');

// Google callback route
router.get('/google/callback', googleCallback);

module.exports = router;
