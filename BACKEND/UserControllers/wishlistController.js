// controllers/wishlistController.js

const Wishlist = require("../Models/Wishlist");

// Add product to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { userId, productId, productName, productPrice } = req.body;
    const wishlistItem = new Wishlist({ userId, productId, productName, productPrice });

    await wishlistItem.save();

    res.status(200).json({ message: "Product added to wishlist", product: wishlistItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user's wishlist
const getWishlist = async (req, res) => {
  try {
    const userId = req.params.userId;
    const wishlist = await Wishlist.find({ userId }).populate("productId");

    res.status(200).json({ wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteFromWishlist = async (req, res) => {
    try {
      const wishlistId = req.params.wishlistId; // Get the wishlist item ID from the request params
  
      // Find and delete the wishlist item
      const deletedItem = await Wishlist.findByIdAndDelete(wishlistId);
  
      if (!deletedItem) {
        return res.status(404).json({ message: "Wishlist item not found" });
      }
  
      res.status(200).json({ message: "Product removed from wishlist", deletedItem });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  module.exports = { addToWishlist, getWishlist, deleteFromWishlist };