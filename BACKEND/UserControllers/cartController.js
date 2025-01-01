// controllers/cartController.js
const Cart = require('../Models/Cart');
const Product = require('../Models/Product');

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Calculate total price
    const total = product.price * quantity;

    // Check if the item already exists in the cart
    let cartItem = await Cart.findOne({ userId, productId });
    if (cartItem) {
      // Update quantity and total if item exists
      cartItem.quantity += quantity;
      cartItem.total = cartItem.quantity * product.price;
      await cartItem.save();
    } else {
      // Add new item to the cart
      cartItem = new Cart({
        userId,
        productId,
        productName: product.name,
        productPrice: product.price,
        quantity,
        total
      });
      await cartItem.save();
    }

    res.status(201).json({ message: 'Item added to cart', cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get cart items for a user
exports.getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await Cart.find({ userId }).populate('productId', 'name price');
    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    await Cart.findByIdAndDelete(cartId);
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
