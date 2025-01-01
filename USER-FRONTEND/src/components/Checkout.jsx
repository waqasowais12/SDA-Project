// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe("pk_test_51QX3SU09MUws2eKTg1P1k7NYmNU91IhS1ko92RmqbK5RUShdQ0X8OhpxHTIVWTMeD7d6peiSDUXlSF57D3VHVj6G00N8QbEpKf"); // Replace with your Stripe publishable key

// const Checkout = () => {
//   const navigate = useNavigate();
//   const cartItems = JSON.parse(localStorage.getItem("cartItems"));
//   const [shippingDetails, setShippingDetails] = useState({
//     name: "",
//     address: "",
//     city: "",
//     phoneNumber: "",
//   });
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setShippingDetails((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsProcessing(true);

//     // Here you should handle the order creation on the backend (create the order in your DB)
//     try {
//       const totalAmount = cartItems.reduce((total, item) => total + item.total, 0); // Sum of all items in the cart

//       const response = await fetch("http://localhost:5000/api/orders/create-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartItems,
//           totalAmount,
//           shippingAddress: shippingDetails,
//         }),
//       });
      
//       const { clientSecret, orderId } = await response.json();

//       // Step 1: Load Stripe and confirm the payment
//       const stripe = await stripePromise;
//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: cardElement, // Assuming you have integrated Stripe Elements here
//         },
//       });

//       if (error) {
//         console.error("Payment failed:", error);
//         setIsProcessing(false);
//       } else {
//         if (paymentIntent.status === "succeeded") {
//           alert("Payment successful!");
//           navigate(`/order-confirmation/${orderId}`); // Redirect to an order confirmation page
//         }
//       }
//     } catch (error) {
//       console.error("Error processing payment", error);
//       setIsProcessing(false);
//     }
//   };

//   if (!cartItems || cartItems.length === 0) {
//     return <div>Your cart is empty. Please add items to your cart.</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-3xl font-bold mb-6">Checkout</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name</label>
//           <input
//             type="text"
//             name="name"
//             value={shippingDetails.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Address</label>
//           <input
//             type="text"
//             name="address"
//             value={shippingDetails.address}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>City</label>
//           <input
//             type="text"
//             name="city"
//             value={shippingDetails.city}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Phone Number</label>
//           <input
//             type="text"
//             name="phoneNumber"
//             value={shippingDetails.phoneNumber}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <h3 className="text-xl font-semibold mt-6">Cart Summary</h3>
//         <div>
//           {cartItems.map((item) => (
//             <div key={item._id} className="flex justify-between">
//               <p>{item.productName}</p>
//               <p>RS.{item.total}</p>
//             </div>
//           ))}
//         </div>
//         <div className="mt-4 flex justify-between">
//           <h3>Total: RS.{cartItems.reduce((total, item) => total + item.total, 0)}</h3>
//         </div>

//         <button
//           type="submit"
//           className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
//           disabled={isProcessing}
//         >
//           {isProcessing ? "Processing..." : "Complete Payment"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Checkout;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Checkout = () => {
//   const navigate = useNavigate();
//   const cartItems = JSON.parse(localStorage.getItem("cartItems"));
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [shippingDetails, setShippingDetails] = useState({
//     name: "",
//     address: "",
//     city: "",
//     phoneNumber: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setShippingDetails((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsProcessing(true);

//     try {
//       const totalAmount = cartItems.reduce((total, item) => total + item.total, 0);

//       const response = await fetch("http://localhost:5000/api/orders/create-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartItems,
//           totalAmount,
//           shippingAddress: shippingDetails,
//         }),
//       });

//       const { orderId } = await response.json();

//       // Simulate successful order placement
//       alert("Order placed successfully!");
//       navigate(`/order-confirmation/${orderId}`);
//     } catch (error) {
//       console.error("Error processing order", error);
//       setIsProcessing(false);
//     }
//   };

//   if (!cartItems || cartItems.length === 0) {
//     return <div className="text-center text-xl mt-10">Your cart is empty. Please add items to your cart.</div>;
//   }

//   return (
//     <div className="container mx-auto p-6 max-w-2xl shadow-lg rounded-lg bg-white mt-10">
//       <h2 className="text-3xl font-bold text-center mb-6">Checkout</h2>
      
//       {/* Shipping Details Section */}
//       <div className="mb-8">
//         <h3 className="text-2xl font-semibold mb-4">Shipping Details</h3>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-semibold">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={shippingDetails.name}
//               onChange={handleChange}
//               required
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-semibold">Address</label>
//             <input
//               type="text"
//               name="address"
//               value={shippingDetails.address}
//               onChange={handleChange}
//               required
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold">City</label>
//               <input
//                 type="text"
//                 name="city"
//                 value={shippingDetails.city}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold">Phone Number</label>
//               <input
//                 type="text"
//                 name="phoneNumber"
//                 value={shippingDetails.phoneNumber}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>
//         </form>
//       </div>

//       {/* Cart Summary Section */}
//       <div className="mb-8">
//         <h3 className="text-xl font-semibold mb-4">Cart Summary</h3>
//         <div className="space-y-4">
//           {cartItems.map((item) => (
//             <div key={item._id} className="flex justify-between">
//               <p>{item.productName}</p>
//               <p>RS.{item.total}</p>
//             </div>
//           ))}
//         </div>
//         <div className="mt-4 flex justify-between font-semibold">
//           <h3>Total: RS.{cartItems.reduce((total, item) => total + item.total, 0)}</h3>
//         </div>
//       </div>

//       <button
//         type="submit"
//         className="w-full mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         disabled={isProcessing}
//       >
//         {isProcessing ? "Processing..." : "Complete Order"}
//       </button>
//     </div>
//   );
// };

// export default Checkout;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Checkout = () => {
//   const navigate = useNavigate();
//   const cartItems = JSON.parse(localStorage.getItem("cartItems"));
//   const [shippingDetails, setShippingDetails] = useState({
//     name: "",
//     address: "",
//     city: "",
//     phoneNumber: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setShippingDetails((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Save shipping details in localStorage
//     localStorage.setItem("shippingDetails", JSON.stringify(shippingDetails));

//     // Redirect to payment page
//     navigate("/payment");
//   };

//   if (!cartItems || cartItems.length === 0) {
//     return <div className="text-center text-xl mt-10">Your cart is empty. Please add items to your cart.</div>;
//   }

//   return (
//     <div className="container mx-auto p-6 max-w-2xl shadow-lg rounded-lg bg-white mt-10">
//       <h2 className="text-3xl font-bold text-center mb-6">Checkout</h2>
      
//       {/* Shipping Details Section */}
//       <div className="mb-8">
//         <h3 className="text-2xl font-semibold mb-4">Shipping Details</h3>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-semibold">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={shippingDetails.name}
//               onChange={handleChange}
//               required
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-semibold">Address</label>
//             <input
//               type="text"
//               name="address"
//               value={shippingDetails.address}
//               onChange={handleChange}
//               required
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold">City</label>
//               <input
//                 type="text"
//                 name="city"
//                 value={shippingDetails.city}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold">Phone Number</label>
//               <input
//                 type="text"
//                 name="phoneNumber"
//                 value={shippingDetails.phoneNumber}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>
//         </form>
//       </div>

//       {/* Cart Summary Section */}
//       <div className="mb-8">
//         <h3 className="text-xl font-semibold mb-4">Cart Summary</h3>
//         <div className="space-y-4">
//           {cartItems.map((item) => (
//             <div key={item._id} className="flex justify-between">
//               <p>{item.productName}</p>
//               <p>RS.{item.total}</p>
//             </div>
//           ))}
//         </div>
//         <div className="mt-4 flex justify-between font-semibold">
//           <h3>Total: RS.{cartItems.reduce((total, item) => total + item.total, 0)}</h3>
//         </div>
//       </div>

//       <button
//         type="submit"
//         className="w-full mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         Proceed to Payment
//       </button>
//     </div>
//   );
// };

// export default Checkout;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Checkout = () => {
//   const navigate = useNavigate();
//   const cartItems = JSON.parse(localStorage.getItem("cartItems"));
//   const [shippingDetails, setShippingDetails] = useState({
//     name: "",
//     address: "",
//     city: "",
//     phoneNumber: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setShippingDetails((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Save shipping details in localStorage
//     localStorage.setItem("shippingDetails", JSON.stringify(shippingDetails));

//     // Redirect to payment page
//     navigate("/payment");
//   };

//   if (!cartItems || cartItems.length === 0) {
//     return <div className="text-center text-xl mt-10">Your cart is empty. Please add items to your cart.</div>;
//   }

//   return (
//     <div className="container mx-auto p-6 max-w-2xl shadow-lg rounded-lg bg-white mt-10">
//       <h2 className="text-3xl font-bold text-center mb-6">Checkout</h2>

//       {/* Shipping Details Section */}
//       <div className="mb-8">
//         <h3 className="text-2xl font-semibold mb-4">Shipping Details</h3>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-semibold">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={shippingDetails.name}
//               onChange={handleChange}
//               required
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-semibold">Address</label>
//             <input
//               type="text"
//               name="address"
//               value={shippingDetails.address}
//               onChange={handleChange}
//               required
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold">City</label>
//               <input
//                 type="text"
//                 name="city"
//                 value={shippingDetails.city}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold">Phone Number</label>
//               <input
//                 type="text"
//                 name="phoneNumber"
//                 value={shippingDetails.phoneNumber}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full mt-6 px-6 py-3 text-white rounded-lg bg-gradient-to-r from-[#EA499D] via-[#BA52DE] to-[#7E66F6] transform transition-all duration-300 hover:scale-105 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#EA499D]"
//           >
//             Proceed to Payment
//           </button>
//         </form>
//       </div>

//       {/* Cart Summary Section */}
//       <div className="mb-8">
//         <h3 className="text-xl font-semibold mb-4">Cart Summary</h3>
//         <div className="space-y-4">
//           {cartItems.map((item) => (
//             <div key={item._id} className="flex justify-between">
//               <p>{item.productName}</p>
//               <p>RS.{item.total}</p>
//             </div>
//           ))}
//         </div>
//         <div className="mt-4 flex justify-between font-semibold">
//           <h3>Total: RS.{cartItems.reduce((total, item) => total + item.total, 0)}</h3>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;




import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [isBuyNow, setIsBuyNow] = useState(false); // To differentiate between "Buy Now" and cart checkout
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    city: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (location.state) {
      // If product is passed via state (Buy Now)
      const product = location.state;
      setCartItems([
        {
          _id: product.productId,
          productName: product.productName,
          total: product.total,
        },
      ]);
      setIsBuyNow(true);
    } else {
      // Use cart items from localStorage
      setCartItems(cart);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Save shipping details in localStorage
    localStorage.setItem("shippingDetails", JSON.stringify(shippingDetails));

    // Redirect to payment page
    navigate("/payment");
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="text-center text-xl mt-10">
        {isBuyNow
          ? "No product selected for Buy Now."
          : "Your cart is empty. Please add items to your cart."}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl shadow-lg rounded-lg bg-white mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">Checkout</h2>

      {/* Shipping Details Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Shipping Details</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={shippingDetails.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Address</label>
            <input
              type="text"
              name="address"
              value={shippingDetails.address}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold">City</label>
              <input
                type="text"
                name="city"
                value={shippingDetails.city}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={shippingDetails.phoneNumber}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 px-6 py-3 text-white rounded-lg bg-gradient-to-r from-[#EA499D] via-[#BA52DE] to-[#7E66F6] transform transition-all duration-300 hover:scale-105 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#EA499D]"
          >
            Proceed to Payment
          </button>
        </form>
      </div>

      {/* Cart Summary Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Cart Summary</h3>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between">
              <p>{item.productName}</p>
              <p>RS.{item.total}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between font-semibold">
          <h3>Total: RS.{cartItems.reduce((total, item) => total + item.total, 0)}</h3>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
