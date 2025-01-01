// const express = require('express');
// const { createOrder } = require('../UserControllers/orderController');

// const router = express.Router();

// // POST route to create an order and initiate payment
// router.post('/create-order', createOrder);

// module.exports = router;


const express = require('express');
const { createPaymentIntent, saveOrderAfterPayment, getAllOrders } = require('../UserControllers/orderController');

const router = express.Router();

// POST route to create a payment intent
router.post('/create-payment-intent', createPaymentIntent);

// POST route to save an order after payment confirmation
router.post('/save-order', saveOrderAfterPayment);

router.get('/all-orders', getAllOrders);

module.exports = router;
