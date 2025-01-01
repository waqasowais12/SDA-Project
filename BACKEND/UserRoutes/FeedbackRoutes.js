const express = require("express");
const { addFeedback, getAllFeedback, getFeedbackById } = require("../UserControllers/FeedbackController");
const router = express.Router();

// Route to submit feedback
router.post("/add", addFeedback);

// Route to get all feedback
router.get("/", getAllFeedback);

// Route to get feedback by ID
router.get("/:id", getFeedbackById);

module.exports = router;
