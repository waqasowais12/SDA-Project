const Product = require('../Models/Product'); // Assuming you have a Product model

// Search for products based on name or description
const searchProducts = async (req, res) => {
  try {
    const query = req.query.q; // Get the search query from the request
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    // Find products where name or description contains the query (case-insensitive)
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        // { description: { $regex: query, $options: 'i' } },
      ],
    });

    res.status(200).json({ products });
  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { searchProducts };
