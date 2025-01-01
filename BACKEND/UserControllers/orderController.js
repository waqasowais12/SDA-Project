// const Stripe = require('stripe');
// const Order = require('../Models/orderModel');

// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
// const createOrder = async (req, res) => {
//   const { cartItems, totalAmount, shippingAddress } = req.body;
//   const userId = req.userId; // Assume user is authenticated and userId is in the request.

//   try {
//     // Step 1: Create an order record in the database
//     const newOrder = new Order({
//       userId,
//       cartItems,
//       totalAmount,
//       shippingAddress,
//     });
//     await newOrder.save();

//     // // Step 2: Create a Stripe payment intent
//     // const paymentIntent = await stripe.paymentIntents.create({
//     //   amount: totalAmount * 100, // Convert to cents
//     //   currency: 'usd', // Adjust the currency based on your location
//     //   metadata: { orderId: newOrder._id.toString() },
//     // });

//     // // Step 3: Return the client secret to the frontend
//     // res.status(201).json({
//     //   clientSecret: paymentIntent.client_secret,
//     //   orderId: newOrder._id,
//     // });
//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: totalAmount * 100, // Convert to cents
//         currency: 'usd',
//         metadata: { orderId: newOrder._id.toString() },
//       });
      
//       res.status(201).json({
//         clientSecret: paymentIntent.client_secret,
//         orderId: newOrder._id.toString(),
//       });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to create order' });
//   }
// };

// module.exports = { createOrder };


// const createOrder = async (req, res) => {
//     const { cartItems, totalAmount, shippingAddress } = req.body;
//     const userId = req.userId; // Assume user is authenticated and userId is in the request.
  
//     try {
//       // Step 1: Create an order record in the database
//       const newOrder = new Order({
//         userId,
//         cartItems,
//         totalAmount,
//         shippingAddress,
//       });
//       await newOrder.save();
  
//       // Step 2: Create a Stripe payment intent
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: totalAmount * 100, // Convert to cents
//         currency: 'usd',
//         metadata: { orderId: newOrder._id.toString() },
//       });
  
//       res.status(201).json({
//         clientSecret: paymentIntent.client_secret,
//         orderId: newOrder._id.toString(),
//       });
//     } catch (error) {
//       console.error("Error creating order:", error);
//       res.status(500).json({ message: 'Failed to create order', error: error.message });
//     }
//   };
  
//   module.exports = { createOrder };

// const Order = require('../Models/orderModel'); // Adjust the path as needed
// const stripe = require('stripe')('sk_test_51QX3SU09MUws2eKTmS6hyLwM8DrOtCtsbigfPtbujx50hjEv5C3oHOzqbhBvRmhil6ssJc6eQqavrWDDgy1n578s00UYhwM4gb'); // Replace with your Stripe secret key

// const createOrder = async (req, res) => {
//     const { cartItems, totalAmount, shippingAddress } = req.body;
//     const userId = req.userId; // Assume user is authenticated and userId is in the request.
//     try {
//         // Step 1: Create an order record in the database
//         const newOrder = new Order({
//             userId,
//             cartItems,
//             totalAmount,
//             shippingAddress,
//         });
//         await newOrder.save();

//         // Step 2: Create a Stripe payment intent
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: totalAmount * 100, // Convert to cents
//             currency: 'usd',
//             metadata: { orderId: newOrder._id.toString() },
//         });

//         res.status(201).json({
//             clientSecret: paymentIntent.client_secret,
//             orderId: newOrder._id.toString(),
//         });
//     } catch (error) {
//         console.error('Error creating order:', error);
//         res.status(500).json({ message: 'Failed to create order', error: error.message });
//     }
// };

// module.exports = { createOrder };



const Order = require('../Models/orderModel'); // Adjust the path as needed
const stripe = require('stripe')('sk_test_51QX3SU09MUws2eKTmS6hyLwM8DrOtCtsbigfPtbujx50hjEv5C3oHOzqbhBvRmhil6ssJc6eQqavrWDDgy1n578s00UYhwM4gb'); // Replace with your Stripe secret key

// const createPaymentIntent = async (req, res) => {
//     const { cartItems, totalAmount, shippingAddress } = req.body;
//     console.log("Received request to create payment intent:", req.body); // Log input data

//     try {
//         // Create a Stripe payment intent
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: totalAmount * 100, // Convert to cents
//             currency: 'usd',
//         });

//         console.log("Payment Intent created:", paymentIntent); // Log payment intent

//         res.status(201).json({
//             clientSecret: paymentIntent.client_secret,
//             paymentIntentId: paymentIntent.id,
//             cartItems,
//             totalAmount,
//             shippingAddress,
//         });
//     } catch (error) {
//         console.error('Error creating payment intent:', error);
//         res.status(500).json({ message: 'Failed to create payment intent', error: error.message });
//     }
// };

// const createPaymentIntent = async (req, res) => {
//     const { cartItems, totalAmount, shippingAddress } = req.body;
//     console.log("Received request to create payment intent:", req.body);

//     try {
//         const conversionRate = 75; // Example conversion rate from INR to USD
//         const amountInUSD = totalAmount / conversionRate;
//         const amountInCents = Math.round(amountInUSD * 100);

//         // Check if the amount is above the minimum allowed amount (e.g., 50 cents for USD)
//         if (amountInCents < 50) {
//             return res.status(400).json({ message: 'Amount is too low for a transaction' });
//         }

//         // Create a Stripe payment intent with the converted amount
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: amountInCents,
//             currency: 'usd',
//         });

//         console.log("Payment Intent created:", paymentIntent);

//         res.status(201).json({
//             clientSecret: paymentIntent.client_secret,
//             paymentIntentId: paymentIntent.id,
//             cartItems,
//             totalAmount: amountInUSD,
//             shippingAddress,
//         });
//     } catch (error) {
//         console.error('Error creating payment intent:', error);
//         res.status(500).json({ message: 'Failed to create payment intent', error: error.message });
//     }
// };

const createPaymentIntent = async (req, res) => {
    const { cartItems, totalAmount, shippingAddress } = req.body;
    console.log("Received request to create payment intent:", req.body);

    try {
        // Make sure the total amount is in USD
        const amountInCents = Math.round(totalAmount * 100); // Convert totalAmount (in dollars) to cents

        // Check if the amount is above the minimum allowed amount (e.g., 50 cents for USD)
        if (amountInCents < 50) {
            return res.status(400).json({ message: 'Amount is too low for a transaction' });
        }

        // Create a Stripe payment intent with the USD amount
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInCents,
            currency: 'usd', // Make sure the currency is set to USD
        });

        console.log("Payment Intent created:", paymentIntent);

        res.status(201).json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
            cartItems,
            totalAmount,
            shippingAddress,
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ message: 'Failed to create payment intent', error: error.message });
    }
};



// const saveOrderAfterPayment = async (req, res) => {
//     const { cartItems, totalAmount, shippingAddress, paymentIntentId } = req.body;
//     console.log("Received request to save order:", req.body); // Log input data

//     try {
//         // Retrieve payment intent to check the status
//         const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
//         console.log("Payment Intent retrieved:", paymentIntent); // Log payment intent status

//         // Check if payment was successful
//         if (paymentIntent.status === 'succeeded') {
//             const newOrder = new Order({
//                 userId: req.userId, // Ensure authentication middleware sets req.userId
//                 cartItems,
//                 totalAmount,
//                 shippingAddress,
//             });

//             await newOrder.save();

//             console.log("Order saved:", newOrder); // Log order details
//             res.status(201).json({ message: 'Order successfully saved', orderId: newOrder._id });
//         } else {
//             res.status(400).json({ message: 'Payment not successful' });
//         }
//     } catch (error) {
//         console.error('Error saving order:', error);
//         res.status(500).json({ message: 'Failed to save order', error: error.message });
//     }
// };

const saveOrderAfterPayment = async (req, res) => {
    const { cartItems, totalAmount, shippingAddress, paymentIntentId } = req.body;
    console.log("Received request to save order:", req.body); // Log input data

    try {
        // Retrieve payment intent to check the status
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        console.log("Payment Intent retrieved:", paymentIntent); // Log payment intent status

        // Check if payment was successful
        if (paymentIntent.status === 'succeeded') {
            // Create the new order with status 'paid'
            const newOrder = new Order({
                userId: req.userId, // Ensure authentication middleware sets req.userId
                cartItems,
                totalAmount,
                shippingAddress,
                paymentStatus: 'paid',  // Explicitly set status to 'paid'
            });

            // Log the order object before saving for debugging
            console.log("Order to be saved:", newOrder);

            // Save the order to the database
            await newOrder.save();

            console.log("Order saved:", newOrder); // Log order details
            res.status(201).json({ message: 'Order successfully saved', orderId: newOrder._id });
        } else {
            res.status(400).json({ message: 'Payment not successful' });
        }
    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ message: 'Failed to save order', error: error.message });
    }
};


const getAllOrders = async (req, res) => {
    try {
        // Fetch all orders from the database
        const orders = await Order.find().populate('cartItems.productId'); // Populate product details if needed

        // Respond with the list of orders
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully',
            orders,
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch orders',
            error: error.message,
        });
    }
};

module.exports = { createPaymentIntent, saveOrderAfterPayment, getAllOrders };