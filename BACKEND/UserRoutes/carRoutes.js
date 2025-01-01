// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const { addToCart, getCartItems, removeFromCart } = require('../UserControllers/cartController');

// Add item to cart
router.post('/add', addToCart);

// Get cart items for a user
router.get('/:userId', getCartItems);

// Remove item from cart    
router.delete('/:cartId', removeFromCart);

module.exports = router;
