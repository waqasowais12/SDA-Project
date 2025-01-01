// routes/wishlistRoutes.js

const express = require("express");
const router = express.Router();
const wishlistController = require("../UserControllers/wishlistController");

router.post("/add", wishlistController.addToWishlist);
router.get("/:userId", wishlistController.getWishlist);
router.delete("/:wishlistId", wishlistController.deleteFromWishlist);

module.exports = router;
