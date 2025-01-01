const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'User' },
  cartItems: [{ 
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    productName: String,
    productPrice: Number,
    quantity: Number,
    total: Number,
  }],
  totalAmount: { type: Number, required: true },
  shippingAddress: {
    name: String,
    phoneNumber: String,
    address: String,
    city: String,
  },
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  paymentIntentId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
