// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// // Load your Stripe public key
// const stripePromise = loadStripe("pk_test_51QX3SU09MUws2eKTg1P1k7NYmNU91IhS1ko92RmqbK5RUShdQ0X8OhpxHTIVWTMeD7d6peiSDUXlSF57D3VHVj6G00N8QbEpKf");

// const Payment = () => {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [shippingDetails, setShippingDetails] = useState({});
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [isProcessing, setIsProcessing] = useState(false);

//   useEffect(() => {
//     // Get cart items and shipping details from localStorage
//     const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
//     const storedShippingDetails = JSON.parse(localStorage.getItem("shippingDetails"));

//     if (storedCartItems) {
//       setCartItems(storedCartItems);
//       setTotalAmount(storedCartItems.reduce((total, item) => total + item.total, 0));
//     }

//     if (storedShippingDetails) {
//       setShippingDetails(storedShippingDetails);
//     }
//   }, []);

//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) return;

//     setIsProcessing(true);

//     const cardElement = elements.getElement(CardElement);
//     const { error, paymentIntent } = await stripe.confirmCardPayment(
//       "your_client_secret_here", // This should be dynamically fetched from backend
//       {
//         payment_method: {
//           card: cardElement,
//         },
//       }
//     );

//     setIsProcessing(false);

//     if (error) {
//       console.error("Error processing payment", error);
//     } else {
//       // Payment successful, save order and redirect
//       handlePaymentSuccess(paymentIntent);
//     }
//   };

//   const handlePaymentSuccess = async (paymentIntent) => {
//     try {
//       // Send order details to backend
//       const response = await fetch("http://localhost:5000/api/orders/complete-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartItems,
//           shippingDetails,
//           totalAmount,
//           paymentIntent,
//         }),
//       });

//       const { orderId } = await response.json();
//       navigate(`/order-confirmation/${orderId}`);
//     } catch (error) {
//       console.error("Error completing order", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 max-w-2xl shadow-lg rounded-lg bg-white mt-10">
//       <h2 className="text-3xl font-bold text-center mb-6">Payment</h2>

//       <div className="mb-8">
//         <h3 className="text-2xl font-semibold mb-4">Shipping Details</h3>
//         <p>{shippingDetails.name}</p>
//         <p>{shippingDetails.address}</p>
//         <p>{shippingDetails.city}</p>
//         <p>{shippingDetails.phoneNumber}</p>
//       </div>

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
//           <h3>Total: RS.{totalAmount}</h3>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <CardElement />
//         </div>
//         <button
//           type="submit"
//           disabled={isProcessing}
//           className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
//         >
//           {isProcessing ? "Processing..." : "Pay Now"}
//         </button>
//       </form>
//     </div>
//   );
// };

// const StripePaymentPage = () => (
//   <Elements stripe={stripePromise}>
//     <Payment />
//   </Elements>
// );

// export default StripePaymentPage;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// // Load your Stripe public key
// const stripePromise = loadStripe("pk_test_51QX3SU09MUws2eKTg1P1k7NYmNU91IhS1ko92RmqbK5RUShdQ0X8OhpxHTIVWTMeD7d6peiSDUXlSF57D3VHVj6G00N8QbEpKf");

// const Payment = () => {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [shippingDetails, setShippingDetails] = useState({});
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [clientSecret, setClientSecret] = useState(null);
//   const [orderId, setOrderId] = useState(null);
//   const [isProcessing, setIsProcessing] = useState(false);

//   const stripe = useStripe();
//   const elements = useElements();

//   useEffect(() => {
//     // Get cart items and shipping details from localStorage
//     const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
//     const storedShippingDetails = JSON.parse(localStorage.getItem("shippingDetails"));

//     if (storedCartItems) {  
//       setCartItems(storedCartItems);
//       setTotalAmount(storedCartItems.reduce((total, item) => total + item.total, 0));
//     }

//     if (storedShippingDetails) {
//       setShippingDetails(storedShippingDetails);
//     }
//   }, []);

// //   useEffect(() => {
// //     // Fetch clientSecret from the backend
// //     const fetchClientSecret = async () => {
// //       if (!cartItems.length || !shippingDetails.name) return;

// //       try {
// //         const response = await fetch("http://localhost:5000/api/orders/create-order", {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({
// //             cartItems,
// //             totalAmount,
// //             shippingAddress: shippingDetails,
// //           }),
// //         });

// //         const data = await response.json();

// //         if (response.ok) {
// //           setClientSecret(data.clientSecret); // Save clientSecret for Stripe Payment
// //           setOrderId(data.orderId); // Save orderId for order completion
// //         } else {
// //           console.error("Failed to fetch client secret:", data.message);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching client secret:", error);
// //       }
// //     };

// //     fetchClientSecret();
// //   }, [cartItems, shippingDetails, totalAmount]);

// useEffect(() => {
//     // const fetchClientSecret = async () => {
//     //   if (!cartItems.length || !shippingDetails.name) return;
  
//     //   try {
//     //     const response = await fetch("http://localhost:5000/api/orders/create-order", {
//     //       method: "POST",
//     //       headers: { "Content-Type": "application/json" },
//     //       body: JSON.stringify({
//     //         cartItems,
//     //         totalAmount,
//     //         shippingAddress: shippingDetails,
//     //       }),
//     //     });
  
//     //     const data = await response.json();
//     //     console.log(data); // Log the response to check clientSecret
//     //     if (response.ok) {
//     //       setClientSecret(data.clientSecret);  // Set clientSecret
//     //       setOrderId(data.orderId);
//     //     } else {
//     //       console.error("Failed to fetch client secret:", data.message);
//     //     }
//     //   } catch (error) {
//     //     console.error("Error fetching client secret:", error);
//     //   }
//     // };
//     const fetchClientSecret = async () => {
//         try {
//           const response = await fetch('http://localhost:5000/api/orders/create-order', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${token}`, // Ensure the user is authenticated
//             },
//             body: JSON.stringify({
//               cartItems: [/* cart item data */],
//               totalAmount: 100, // Example total amount
//               shippingAddress: {/* shipping address data */},
//             }),
//           });
      
//           if (!response.ok) {
//             throw new Error('Failed to create order');
//           }
      
//           const data = await response.json();
//           console.log(data);
//           // Use data.clientSecret to handle the Stripe payment
//         } catch (error) {
//           console.error('Failed to fetch client secret:', error);
//         }
//       };
      
      
//     fetchClientSecret();
//   }, [cartItems, shippingDetails, totalAmount]);
  
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!stripe || !elements || !clientSecret) {
// //       console.error("Stripe.js not loaded or clientSecret not available.");
// //       return;
// //     }

// //     setIsProcessing(true);

// //     const cardElement = elements.getElement(CardElement);

// //     try {
// //       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
// //         payment_method: {
// //           card: cardElement,
// //         },
// //       });

// //       if (error) {
// //         console.error("Error processing payment:", error);
// //       } else {
// //         // Payment successful, complete the order
// //         await handlePaymentSuccess(paymentIntent);
// //       }
// //     } catch (error) {
// //       console.error("Error confirming payment:", error);
// //     } finally {
// //       setIsProcessing(false);
// //     }
// //   };
// const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!stripe || !elements || !clientSecret) {
//       console.error("Stripe.js not loaded or clientSecret not available.");
//       return;
//     }
  
//     setIsProcessing(true);
  
//     const cardElement = elements.getElement(CardElement);
  
//     try {
//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: cardElement,
//         },
//       });
  
//       if (error) {
//         console.error("Error processing payment:", error);
//       } else {
//         // Payment successful, complete the order
//         await handlePaymentSuccess(paymentIntent);
//       }
//     } catch (error) {
//       console.error("Error confirming payment:", error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };
  
//   const handlePaymentSuccess = async (paymentIntent) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/orders/complete-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           orderId, // Use the saved orderId from /create-order
//           paymentIntent,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Redirect to order confirmation page
//         navigate(`/order-confirmation/${orderId}`);
//       } else {
//         console.error("Error completing order:", data.message);
//       }
//     } catch (error) {
//       console.error("Error completing order:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 max-w-2xl shadow-lg rounded-lg bg-white mt-10">
//       <h2 className="text-3xl font-bold text-center mb-6">Payment</h2>

//       <div className="mb-8">
//         <h3 className="text-2xl font-semibold mb-4">Shipping Details</h3>
//         <p>{shippingDetails.name}</p>
//         <p>{shippingDetails.address}</p>
//         <p>{shippingDetails.city}</p>
//         <p>{shippingDetails.phoneNumber}</p>
//       </div>

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
//           <h3>Total: RS.{totalAmount}</h3>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <CardElement />
//         </div>
//         <button
//           type="submit"
//           disabled={isProcessing}
//           className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
//         >
//           {isProcessing ? "Processing..." : "Pay Now"}
//         </button>
//       </form>
//     </div>
//   );
// };

// const StripePaymentPage = () => (
//   <Elements stripe={stripePromise}>
//     <Payment />
//   </Elements>
// );

// export default StripePaymentPage;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// const stripePromise = loadStripe("pk_test_51QX3SU09MUws2eKTg1P1k7NYmNU91IhS1ko92RmqbK5RUShdQ0X8OhpxHTIVWTMeD7d6peiSDUXlSF57D3VHVj6G00N8QbEpKf");

// const Payment = () => {
//     const navigate = useNavigate();
//     const [cartItems, setCartItems] = useState([]);
//     const [shippingDetails, setShippingDetails] = useState({});
//     const [totalAmount, setTotalAmount] = useState(0);
//     const [clientSecret, setClientSecret] = useState(null);
//     const [paymentIntentId, setPaymentIntentId] = useState(null);
//     const [isProcessing, setIsProcessing] = useState(false);

//     const stripe = useStripe();
//     const elements = useElements();

//     useEffect(() => {
//       const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
//       const storedShippingDetails = JSON.parse(localStorage.getItem("shippingDetails"));
  
//       if (storedCartItems && storedCartItems.length > 0) {
//           setCartItems(storedCartItems);
//           setTotalAmount(storedCartItems.reduce((total, item) => total + item.total, 0)); // Ensure correct totalAmount
//       }
  
//       if (storedShippingDetails) {
//           setShippingDetails(storedShippingDetails);
//       }
  
//       if (storedCartItems && storedCartItems.length > 0 && storedShippingDetails) {
//           createPaymentIntent(); // Create payment intent only when data is available
//       } else {
//           console.error("Cart items or shipping details are missing.");
//       }
//   }, []);
  

//   const createPaymentIntent = async () => {
//     try {
//         console.log("Creating payment intent with:", {
//             cartItems,
//             totalAmount,
//             shippingAddress: shippingDetails,
//         });
        
//         const response = await fetch("http://localhost:5000/api/orders/create-payment-intent", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 cartItems,
//                 totalAmount,
//                 shippingAddress: shippingDetails,
//             }),
//         });

//         const data = await response.json();
//         if (response.ok && data.clientSecret) {
//             setClientSecret(data.clientSecret);
//             setPaymentIntentId(data.paymentIntentId);
//         } else {
//             console.error("Failed to create payment intent:", data.message || "No clientSecret returned.");
//         }
//     } catch (error) {
//         console.error("Error creating payment intent:", error);
//     }
// };


//     const saveOrder = async () => {
//         try {
//             const response = await fetch("http://localhost:5000/api/orders/save-order", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     cartItems,
//                     totalAmount,
//                     shippingAddress: shippingDetails,
//                     paymentIntentId,
//                 }),
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 return data.orderId;
//             } else {
//                 console.error("Failed to save order:", data.message);
//                 return null;
//             }
//         } catch (error) {
//             console.error("Error saving order:", error);
//             return null;
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!stripe || !elements || !clientSecret) {
//             console.error("Stripe.js not loaded or clientSecret not available.");
//             return;
//         }

//         setIsProcessing(true);
//         const cardElement = elements.getElement(CardElement);

//         try {
//             const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//                 payment_method: {
//                     card: cardElement,
//                 },
//             });

//             if (error) {
//                 console.error("Error processing payment:", error);
//             } else {
//                 console.log("Payment successful:", paymentIntent);
//                 const orderId = await saveOrder();
//                 if (orderId) {
//                     navigate("/order-success", { state: { orderId } });
//                 }
//             }
//         } catch (error) {
//             console.error("Error confirming payment:", error);
//         } finally {
//             setIsProcessing(false);
//         }
//     };

//     return (
//         <div className="container mx-auto p-6 max-w-2xl shadow-lg rounded-lg bg-white mt-10">
//             <h2 className="text-3xl font-bold text-center mb-6">Payment</h2>
//             <form onSubmit={handleSubmit} className="space-y-6">
//                 <CardElement
//                     options={{
//                         style: {
//                             base: {
//                                 fontSize: "16px",
//                                 color: "#424770",
//                                 "::placeholder": { color: "#aab7c4" },
//                             },
//                             invalid: { color: "#9e2146" },
//                         },
//                     }}
//                 />
//                 <button
//                     type="submit"
//                     disabled={!stripe || isProcessing}
//                     className="w-full mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                     {isProcessing ? "Processing..." : "Pay Now"}
//                 </button>
//             </form>
//         </div>
//     );
// };

// const PaymentWrapper = () => (
//     <Elements stripe={stripePromise}>
//         <Payment />
//     </Elements>
// );

// export default PaymentWrapper;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51QX3SU09MUws2eKTg1P1k7NYmNU91IhS1ko92RmqbK5RUShdQ0X8OhpxHTIVWTMeD7d6peiSDUXlSF57D3VHVj6G00N8QbEpKf");

const Payment = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [shippingDetails, setShippingDetails] = useState({});
    const [totalAmount, setTotalAmount] = useState(0);
    const [clientSecret, setClientSecret] = useState(null);
    const [paymentIntentId, setPaymentIntentId] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    // useEffect(() => {
    //     const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    //     const storedShippingDetails = JSON.parse(localStorage.getItem("shippingDetails"));

    //     if (storedCartItems) {
    //         setCartItems(storedCartItems);
    //         setTotalAmount(storedCartItems.reduce((total, item) => total + item.total, 0));
    //     }

    //     if (storedShippingDetails) {
    //         setShippingDetails(storedShippingDetails);
    //     }

    //     // Log cartItems and shippingDetails for debugging
    //     console.log("Stored Cart Items:", storedCartItems);
    //     console.log("Stored Shipping Details:", storedShippingDetails);

    //     // Create payment intent once cart items and shipping details are set
    //     if (storedCartItems && storedShippingDetails) {
    //         createPaymentIntent(storedCartItems, storedShippingDetails);
    //     }
    // }, []);

    // const createPaymentIntent = async (cartItems, shippingDetails) => {
    //     console.log("Creating payment intent with:", {
    //         cartItems,
    //         totalAmount,
    //         shippingAddress: shippingDetails,
    //     });

    //     try {
    //         const response = await fetch("http://localhost:5000/api/orders/create-payment-intent", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //                 cartItems,
    //                 totalAmount,
    //                 shippingAddress: shippingDetails,
    //             }),
    //         });

    //         const data = await response.json();
    //         if (response.ok && data.clientSecret) {
    //             setClientSecret(data.clientSecret);
    //             setPaymentIntentId(data.paymentIntentId); // Set payment intent ID
    //         } else {
    //             console.error("Failed to create payment intent:", data.message || "No clientSecret returned.");
    //         }
    //     } catch (error) {
    //         console.error("Error creating payment intent:", error);
    //     }
    // };

    useEffect(() => {
      const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
      const storedShippingDetails = JSON.parse(localStorage.getItem("shippingDetails"));
  
      if (storedCartItems) {
          setCartItems(storedCartItems);
          const calculatedTotalAmount = storedCartItems.reduce((total, item) => total + item.total, 0);
          setTotalAmount(calculatedTotalAmount);  // Set total amount after calculation
      }
  
      if (storedShippingDetails) {
          setShippingDetails(storedShippingDetails);
      }
  
      // Log cartItems and shippingDetails for debugging
      console.log("Stored Cart Items:", storedCartItems);
      console.log("Stored Shipping Details:", storedShippingDetails);
  
      // Create payment intent once cart items and shipping details are set
      if (storedCartItems && storedShippingDetails && totalAmount > 0) {
          createPaymentIntent(storedCartItems, storedShippingDetails);
      }
  }, [totalAmount]);  // Trigger this effect when totalAmount changes
  
  const createPaymentIntent = async (cartItems, shippingDetails) => {
      console.log("Creating payment intent with:", {
          cartItems,
          totalAmount,
          shippingAddress: shippingDetails,
      });
  
      try {
          const response = await fetch("http://localhost:5000/api/orders/create-payment-intent", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                  cartItems,
                  totalAmount,
                  shippingAddress: shippingDetails,
              }),
          });
  
          const data = await response.json();
          if (response.ok && data.clientSecret) {
              setClientSecret(data.clientSecret);
              setPaymentIntentId(data.paymentIntentId); // Set payment intent ID
          } else {
              console.error("Failed to create payment intent:", data.message || "No clientSecret returned.");
          }
      } catch (error) {
          console.error("Error creating payment intent:", error);
      }
  };
  
    const saveOrder = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/orders/save-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cartItems,
                    totalAmount,
                    shippingAddress: shippingDetails,
                    paymentIntentId,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                return data.orderId;
            } else {
                console.error("Failed to save order:", data.message);
                return null;
            }
        } catch (error) {
            console.error("Error saving order:", error);
            return null;
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (!stripe || !elements || !clientSecret) {
    //         console.error("Stripe.js not loaded or clientSecret not available.");
    //         return;
    //     }

    //     setIsProcessing(true);
    //     const cardElement = elements.getElement(CardElement);

    //     try {
    //         const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
    //             payment_method: {
    //                 card: cardElement,
    //             },
    //         });

    //         if (error) {
    //             console.error("Error processing payment:", error);
    //         } else {
    //             console.log("Payment successful:", paymentIntent);
    //             const orderId = await saveOrder();
    //             if (orderId) {
    //                 navigate("/order-success", { state: { orderId } });
    //             }
    //         }
    //     } catch (error) {
    //         console.error("Error confirming payment:", error);
    //     } finally {
    //         setIsProcessing(false);
    //     }
    // };
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!stripe || !elements || !clientSecret) {
          console.error("Stripe.js not loaded or clientSecret not available.");
          return;
      }
  
      setIsProcessing(true);
      const cardElement = elements.getElement(CardElement);
  
      try {
          const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
              payment_method: {
                  card: cardElement,
              },
          });
  
          if (error) {
              console.error("Error processing payment:", error);
          } else {
              console.log("Payment successful:", paymentIntent);
              const orderId = await saveOrder(); // Save order after payment confirmation
              if (orderId) {
                  navigate("/order-success", { 
                    state: { 
                      orderId,
                      cartItems,
                      totalAmount,
                      shippingDetails 
                  } 
                   });
              }
          }
      } catch (error) {
          console.error("Error confirming payment:", error);
      } finally {
          setIsProcessing(false);
      }
  };
  


    return (
        <div className="container mx-auto p-6 max-w-2xl shadow-lg rounded-lg bg-white mt-10">
            <h2 className="text-3xl font-bold text-center mb-6">Payment</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": { color: "#aab7c4" },
                            },
                            invalid: { color: "#9e2146" },
                        },
                    }}
                />
                <button
                    type="submit"
                    disabled={!stripe || isProcessing}
                      className="w-full mt-6 px-6 py-3 text-white rounded-lg bg-gradient-to-r from-[#EA499D] via-[#BA52DE] to-[#7E66F6] transform transition-all duration-300 hover:scale-105 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#EA499D]"
                >
                    {isProcessing ? "Processing..." : "Pay Now"}
                </button>
            </form>
        </div>
    );
};

const PaymentWrapper = () => (
    <Elements stripe={stripePromise}>
        <Payment />
    </Elements>
);

export default PaymentWrapper;
