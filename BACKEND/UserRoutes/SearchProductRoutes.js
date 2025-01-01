const express = require('express');
const { searchProducts } = require('../UserControllers/SearchProductController');

const router = express.Router();

// Define search route
router.get('/search', searchProducts);

module.exports = router;
