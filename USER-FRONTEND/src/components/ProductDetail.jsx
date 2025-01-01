// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { FaShoppingCart, FaHeart } from "react-icons/fa";
// import { GoogleLogin } from "@react-oauth/google"; // Import Google login component
// import Modal from "react-modal"; // For modal functionality

// const ProductDetail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [isHovered, setIsHovered] = useState(false);
//   const [quantity, setQuantity] = useState(1);
//   const [reviews, setReviews] = useState([]);
//   const [message, setMessage] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
//   const [username, setUsername] = useState(""); // Store username

//   useEffect(() => {
//     // Fetch product data
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/products/product/${id}`
//         );
//         setProduct(response.data.product);
//         setReviews(response.data.product.reviews || []);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       }
//     };

//     // Check login status on mount
//     const storedToken = localStorage.getItem("token");
//     const storedUsername = localStorage.getItem("username");
//     if (storedToken && storedUsername) {
//       setIsLoggedIn(true);
//       setUsername(storedUsername);
//     }

//     fetchProduct();
//   }, [id]);

//   // Handle quantity change
//   const handleQuantityChange = (e) => {
//     setQuantity(Math.max(1, e.target.value));
//   };

//   // Handle Add to Cart
//   const handleAddToCart = async () => {
//     const userId = localStorage.getItem("userId");
//     const token = localStorage.getItem("token");

//     if (!userId || !token) {
//       // Show modal if user is not logged in
//       setIsModalOpen(true);
//       return;
//     }

//     try {
//       const cartData = {
//         userId,
//         productId: id,
//         productName: product.name,
//         productPrice: product.price,
//         quantity,
//         total: product.price * quantity,
//       };

//       const response = await axios.post("http://localhost:5000/api/cart/add", cartData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.status === 200) {
//         setMessage("Product added to cart successfully!");
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       setMessage("Failed to add product to cart.");
//     }
//   };

//   // Handle Google Sign-Up
//   const handleGoogleSignUp = async (response) => {
//     try {
//       const res = await fetch(
//         `http://localhost:5000/user/google/callback?token=${response.credential}`
//       );

//       if (!res.ok) {
//         throw new Error("Google authentication failed");
//       }

//       const data = await res.json();

//       // Save data to local storage
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("username", data.username);
//       localStorage.setItem("userId", data.userId);

//       // Update UI state
//       setIsLoggedIn(true);
//       setUsername(data.username);
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Google Sign-Up failed:", error.message);
//     }
//   };

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex flex-col md:flex-row justify-between items-center gap-6">
//         {/* Product Image */}
//         <div
//           className="relative w-full md:w-1/2 h-80 md:h-auto flex justify-center items-center bg-gray-200 rounded-lg overflow-hidden shadow-lg transition-transform duration-500 ease-in-out"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           <img
//             src={`http://localhost:5000${product.imageURL}`}
//             alt={product.name}
//             className={`transform object-contain w-full h-full transition-all duration-300 ease-in-out ${
//               isHovered ? "scale-125" : "scale-100"
//             }`}
//           />
//         </div>

//         {/* Product Details */}
//         <div className="md:w-1/2 flex flex-col gap-4">
//           <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
//           <p className="text-xl font-semibold text-gray-600">RS.{product.price}</p>
//           <p className="text-lg text-gray-800 mt-4">{product.description}</p>

//           {/* Quantity Selector */}
//           <div className="flex items-center gap-4 mt-6">
//             <label className="text-lg font-semibold text-gray-700">Quantity:</label>
//             <input
//               type="number"
//               value={quantity}
//               onChange={handleQuantityChange}
//               min="1"
//               className="w-20 p-2 border-2 border-gray-300 rounded-lg text-center"
//             />
//           </div>

//           {/* Buttons */}
//           <div className="mt-6 flex gap-4">
//             <button
//               className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-[#905FF7] border-2 border-[#C250D2] text-lg rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#C250D2] hover:text-white ease-in-out"
//               onClick={handleAddToCart}
//             >
//               <FaShoppingCart /> Add to Cart
//             </button>
//           </div>

//           {/* Success/Error Message */}
//           {message && (
//             <p
//               className={`mt-4 text-lg ${
//                 message.includes("successfully") ? "text-green-500" : "text-red-500"
//               }`}
//             >
//               {message}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Modal for Login Prompt */}
//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={() => setIsModalOpen(false)}
//         className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto mt-20"
//         overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//       >
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sign Up Required</h2>
//         <p className="text-gray-600 mb-6">
//           Please sign up or log in to add products to your cart.
//         </p>
//         <GoogleLogin
//           onSuccess={handleGoogleSignUp}
//           onError={() => console.error("Google Login failed")}
//         />
//         <button
//           className="mt-4 px-4 py-2 bg-gray-300 rounded-lg text-gray-800"
//           onClick={() => setIsModalOpen(false)}
//         >
//           Cancel
//         </button>
//       </Modal>
//     </div>
//   );
// };

// export default ProductDetail;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaShoppingCart } from "react-icons/fa";
// import { GoogleLogin } from "@react-oauth/google";
// import { useAuth } from "../context/AuthContext"; // Import AuthContext

// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { isLoggedIn, handleGoogleSignUp } = useAuth(); // Use AuthContext
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/products/product/${id}`
//         );
//         setProduct(response.data.product);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleQuantityChange = (e) => {
//     setQuantity(Math.max(1, e.target.value));
//   };

//   const handleAddToCart = async () => {
//     if (!isLoggedIn) {
//       // If user is not logged in, show modal
//       setIsModalOpen(true);
//       return;
//     }

//     // If user is logged in, proceed to add the product to the cart
//     try {
//       const token = localStorage.getItem("token");
//       const userId = localStorage.getItem("userId");

//       const cartData = {
//         userId,
//         productId: id,
//         productName: product.name,
//         productPrice: product.price,
//         quantity,
//         total: product.price * quantity,
//       };

//       const response = await axios.post(
//         "http://localhost:5000/api/cart/add",
//         cartData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.status === 200) {
//         navigate("/cart"); // Redirect to the cart page
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex flex-col md:flex-row justify-between items-center gap-6">
//         <div className="relative w-full md:w-1/2 h-80 md:h-auto flex justify-center items-center bg-gray-200 rounded-lg overflow-hidden shadow-lg">
//           <img
//             src={`http://localhost:5000${product.imageURL}`}
//             alt={product.name}
//             className="object-contain w-full h-full"
//           />
//         </div>

//         <div className="md:w-1/2 flex flex-col gap-4">
//           <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
//           <p className="text-xl font-semibold text-gray-600">RS.{product.price}</p>
//           <p className="text-lg text-gray-800 mt-4">{product.description}</p>

//           <div className="flex items-center gap-4 mt-6">
//             <label className="text-lg font-semibold text-gray-700">Quantity:</label>
//             <input
//               type="number"
//               value={quantity}
//               onChange={handleQuantityChange}
//               min="1"
//               className="w-20 p-2 border-2 border-gray-300 rounded-lg text-center"
//             />
//           </div>

//           <div className="mt-6 flex gap-4">
//             <button
//               className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-[#905FF7] border-2 border-[#C250D2] text-lg rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#C250D2] hover:text-white ease-in-out"
//               onClick={handleAddToCart}
//             >
//               <FaShoppingCart /> Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//             <h2 className="text-2xl font-bold mb-4">Sign Up with Google</h2>
//             <GoogleLogin
//               onSuccess={(response) => {
//                 handleGoogleSignUp(response); // Trigger Google Sign-Up
//                 closeModal(); // Close the modal on success
//               }}
//               onError={() => console.error("Google Login failed")}
//             />
//             <button
//               className="mt-4 px-4 py-2 bg-gray-200 rounded-lg"
//               onClick={closeModal}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetail;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaShoppingCart } from "react-icons/fa";
// import { GoogleLogin } from "@react-oauth/google";
// import { useAuth } from "../context/AuthContext"; // Import AuthContext

// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { isLoggedIn, handleGoogleSignUp } = useAuth(); // Use AuthContext
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [successMessage, setSuccessMessage] = useState(""); // State for success message

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/products/product/${id}`
//         );
//         setProduct(response.data.product);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleQuantityChange = (e) => {
//     setQuantity(Math.max(1, e.target.value));
//   };

//   const handleAddToCart = async () => {
//     if (!isLoggedIn) {
//       // If user is not logged in, show modal
//       setIsModalOpen(true);
//       return;
//     }

//     // If user is logged in, proceed to add the product to the cart
//     try {
//       const token = localStorage.getItem("token");
//       const userId = localStorage.getItem("userId");

//       const cartData = {
//         userId,
//         productId: id,
//         productName: product.name,
//         productPrice: product.price,
//         quantity,
//         total: product.price * quantity,
//       };

//       const response = await axios.post(
//         "http://localhost:5000/api/cart/add",
//         cartData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.status === 200) {
//         setSuccessMessage("Product added to cart successfully!"); // Show success message
//         setTimeout(() => setSuccessMessage(""), 3000); // Hide after 3 seconds
//         navigate("/cart"); // Redirect to the cart page
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };

//   const handleAddToWishlist = async () => {
//     if (!isLoggedIn) {
//       // If user is not logged in, show modal
//       setIsModalOpen(true);
//       return;
//     }

//     // If user is logged in, proceed to add the product to the wishlist
//     try {
//       const token = localStorage.getItem("token");
//       const userId = localStorage.getItem("userId");

//       const wishlistData = {
//         userId,
//         productId: id,
//         productName: product.name,
//         productPrice: product.price,
//       };

//       const response = await axios.post(
//         "http://localhost:5000/api/wishlist/add",
//         wishlistData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.status === 200) {
//         setSuccessMessage("Product added to wishlist successfully!"); // Show success message
//         setTimeout(() => setSuccessMessage(""), 3000); // Hide after 3 seconds
//       }
//     } catch (error) {
//       console.error("Error adding to wishlist:", error);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex flex-col md:flex-row justify-between items-center gap-6">
//         <div className="relative w-full md:w-1/2 h-80 md:h-auto flex justify-center items-center bg-gray-200 rounded-lg overflow-hidden shadow-lg">
//           <img
//             src={`http://localhost:5000${product.imageURL}`}
//             alt={product.name}
//             className="object-contain w-full h-full"
//           />
//         </div>

//         <div className="md:w-1/2 flex flex-col gap-4">
//           <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
//           <p className="text-xl font-semibold text-gray-600">RS.{product.price}</p>
//           <p className="text-lg text-gray-800 mt-4">{product.description}</p>

//           <div className="flex items-center gap-4 mt-6">
//             <label className="text-lg font-semibold text-gray-700">Quantity:</label>
//             <input
//               type="number"
//               value={quantity}
//               onChange={handleQuantityChange}
//               min="1"
//               className="w-20 p-2 border-2 border-gray-300 rounded-lg text-center"
//             />
//           </div>

//           <div className="mt-6 flex gap-4">
//             <button
//               className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-[#905FF7] border-2 border-[#C250D2] text-lg rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#C250D2] hover:text-white ease-in-out"
//               onClick={handleAddToCart}
//             >
//               <FaShoppingCart /> Add to Cart
//             </button>

//             {/* Wishlist Button */}
//             <button
//   className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-[#905FF7] border-2 border-[#C250D2] text-lg rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#C250D2] hover:text-white ease-in-out"
//   onClick={handleAddToWishlist}
// >
//   ♥ Wishlist
// </button>
//           </div>
//         </div>
//       </div>

//       {/* Success Message Toast */}
//       {successMessage && (
//         <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg text-xl z-50">
//           {successMessage}
//         </div>
//       )}

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//             <h2 className="text-2xl font-bold mb-4">Sign Up with Google</h2>
//             <GoogleLogin
//               onSuccess={(response) => {
//                 handleGoogleSignUp(response); // Trigger Google Sign-Up
//                 closeModal(); // Close the modal on success
//               }}
//               onError={() => console.error("Google Login failed")}
//             />
//             <button
//               className="mt-4 px-4 py-2 bg-gray-200 rounded-lg"
//               onClick={closeModal}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetail;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaShoppingCart } from "react-icons/fa";
// import { GoogleLogin } from "@react-oauth/google";
// import { useAuth } from "../context/AuthContext"; // Import AuthContext

// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { isLoggedIn, handleGoogleSignUp } = useAuth(); // Use AuthContext
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [successMessage, setSuccessMessage] = useState(""); // State for success message

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/products/product/${id}`
//         );
//         setProduct(response.data.product);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleQuantityChange = (e) => {
//     setQuantity(Math.max(1, e.target.value));
//   };

//   const handleAddToCart = async () => {
//     if (!isLoggedIn) {
//       // If user is not logged in, show modal
//       setIsModalOpen(true);
//       return;
//     }

//     // If user is logged in, proceed to add the product to the cart
//     try {
//       const token = localStorage.getItem("token");
//       const userId = localStorage.getItem("userId");

//       const cartData = {
//         userId,
//         productId: id,
//         productName: product.name,
//         productPrice: product.price,
//         quantity,
//         total: product.price * quantity,
//       };

//       const response = await axios.post(
//         "http://localhost:5000/api/cart/add",
//         cartData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.status === 200) {
//         setSuccessMessage("Product added to cart successfully!"); // Show success message
//         setTimeout(() => setSuccessMessage(""), 3000); // Hide after 3 seconds
//         navigate("/cart"); // Redirect to the cart page
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };

//   const handleAddToWishlist = async () => {
//     if (!isLoggedIn) {
//       // If user is not logged in, show modal
//       setIsModalOpen(true);
//       return;
//     }

//     // If user is logged in, proceed to add the product to the wishlist
//     try {
//       const token = localStorage.getItem("token");
//       const userId = localStorage.getItem("userId");

//       const wishlistData = {
//         userId,
//         productId: id,
//         productName: product.name,
//         productPrice: product.price,
//       };

//       const response = await axios.post(
//         "http://localhost:5000/api/wishlist/add",
//         wishlistData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.status === 200) {
//         setSuccessMessage("Product added to wishlist successfully!"); // Show success message
//         setTimeout(() => setSuccessMessage(""), 3000); // Hide after 3 seconds
//       }
//     } catch (error) {
//       console.error("Error adding to wishlist:", error);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex flex-col md:flex-row justify-between items-center gap-6">
//         <div className="relative w-full md:w-1/2 h-80 md:h-auto flex justify-center items-center bg-gray-200 rounded-lg overflow-hidden shadow-lg">
//           <img
//             src={`http://localhost:5000${product.imageURL}`}
//             alt={product.name}
//             className="object-contain w-full h-full"
//           />
//         </div>

//         <div className="md:w-1/2 flex flex-col gap-4">
//           <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
//           <p className="text-xl font-semibold text-gray-600">RS.{product.price}</p>
//           <p className="text-lg text-gray-800 mt-4">{product.description}</p>

//           <div className="flex items-center gap-4 mt-6">
//             <label className="text-lg font-semibold text-gray-700">Quantity:</label>
//             <input
//               type="number"
//               value={quantity}
//               onChange={handleQuantityChange}
//               min="1"
//               className="w-20 p-2 border-2 border-gray-300 rounded-lg text-center"
//             />
//           </div>

//           <div className="mt-6 flex gap-4">
//             <button
//               className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-[#905FF7] border-2 border-[#C250D2] text-lg rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#C250D2] hover:text-white ease-in-out"
//               onClick={handleAddToCart}
//             >
//               <FaShoppingCart /> Add to Cart
//             </button>

//             {/* Wishlist Button */}
//             <button
//               className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-[#905FF7] border-2 border-[#C250D2] text-lg rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#C250D2] hover:text-white ease-in-out"
//               onClick={handleAddToWishlist}
//             >
//               ♥ Wishlist
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Success Message Toast */}
//       {successMessage && (
//         <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg text-xl z-50">
//           {successMessage}
//         </div>
//       )}

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//             <h2 className="text-2xl font-bold mb-4">Sign Up with Google</h2>
//             <GoogleLogin
//               onSuccess={(response) => {
//                 handleGoogleSignUp(response); // Trigger Google Sign-Up
//                 closeModal(); // Close the modal on success
//               }}
//               onError={() => console.error("Google Login failed")}
//             />
//             <button
//               className="mt-4 px-4 py-2 bg-gray-200 rounded-lg"
//               onClick={closeModal}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetail;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaShoppingCart } from "react-icons/fa";
// import { GoogleLogin } from "@react-oauth/google";
// import { useAuth } from "../context/AuthContext"; // Import AuthContext

// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { isLoggedIn, handleGoogleSignUp } = useAuth(); // Use AuthContext
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [successMessage, setSuccessMessage] = useState(""); // State for success message

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/products/product/${id}`
//         );
//         setProduct(response.data.product);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleQuantityChange = (e) => {
//     setQuantity(Math.max(1, e.target.value));
//   };

//   const handleAddToCart = async () => {
//     if (!isLoggedIn) {
//       // If user is not logged in, show modal
//       setIsModalOpen(true);
//       return;
//     }
  
//     // If user is logged in, proceed to add the product to the cart
//     try {
//       const token = localStorage.getItem("token");
//       const userId = localStorage.getItem("userId");
  
//       const cartData = {
//         userId,
//         productId: id,
//         productName: product.name,
//         productPrice: product.price,
//         quantity,
//         total: product.price * quantity,
//       };
  
//       const response = await axios.post(
//         "http://localhost:5000/api/cart/add",
//         cartData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
  
//       if (response.status === 200) {
//         console.log("Product added to cart");
//         setSuccessMessage("Product added to cart successfully!");
//         console.log("Success Message: ", "Product added to cart successfully!"); // Log the message
  
//         setTimeout(() => setSuccessMessage(""), 3000); // Hide after 3 seconds
//         navigate("/cart"); // Redirect to the cart page
//       } else {
//         console.log("Failed to add product to cart:", response);
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };
  
  
  

//   const handleAddToWishlist = async () => {
//     if (!isLoggedIn) {
//       // If user is not logged in, show modal
//       setIsModalOpen(true);
//       return;
//     }

//     // If user is logged in, proceed to add the product to the wishlist
//     try {
//       const token = localStorage.getItem("token");
//       const userId = localStorage.getItem("userId");

//       const wishlistData = {
//         userId,
//         productId: id,
//         productName: product.name,
//         productPrice: product.price,
//       };

//       const response = await axios.post(
//         "http://localhost:5000/api/wishlist/add",
//         wishlistData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.status === 200) {
//         setSuccessMessage("Product added to wishlist successfully!"); // Show success message
//         setTimeout(() => setSuccessMessage(""), 3000); // Hide after 3 seconds
//       }
//     } catch (error) {
//       console.error("Error adding to wishlist:", error);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex flex-col md:flex-row justify-between items-center gap-6">
//         <div className="relative w-full md:w-1/2 h-80 md:h-auto flex justify-center items-center bg-gray-200 rounded-lg overflow-hidden shadow-lg">
//           <img
//             src={`http://localhost:5000${product.imageURL}`}
//             alt={product.name}
//             className="object-contain w-full h-full"
//           />
//         </div>

//         <div className="md:w-1/2 flex flex-col gap-4">
//           <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
//           <p className="text-xl font-semibold text-gray-600">RS.{product.price}</p>
//           <p className="text-lg text-gray-800 mt-4">{product.description}</p>

//           <div className="flex items-center gap-4 mt-6">
//             <label className="text-lg font-semibold text-gray-700">Quantity:</label>
//             <input
//               type="number"
//               value={quantity}
//               onChange={handleQuantityChange}
//               min="1"
//               className="w-20 p-2 border-2 border-gray-300 rounded-lg text-center"
//             />
//           </div>

//           <div className="mt-6 flex gap-4">
//             <button
//               className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-[#905FF7] border-2 border-[#C250D2] text-lg rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#C250D2] hover:text-white ease-in-out"
//               onClick={() => {
//                 console.log("Add to Cart button clicked");
//                 handleAddToCart();
//               }}
//             >
//               <FaShoppingCart /> Add to Cart
//             </button>

//             {/* Wishlist Button */}
//             <button
//               className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-[#905FF7] border-2 border-[#C250D2] text-lg rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#C250D2] hover:text-white ease-in-out"
//               onClick={handleAddToWishlist}
//             >
//               ♥ Wishlist
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Success Message Toast */}
//       {successMessage && (
//         <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg text-xl z-50">
//           {successMessage}
//         </div>
//       )}

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//             <h2 className="text-2xl font-bold mb-4">Sign Up with Google</h2>
//             <GoogleLogin
//               onSuccess={(response) => {
//                 handleGoogleSignUp(response); // Trigger Google Sign-Up
//                 closeModal(); // Close the modal on success
//               }}
//               onError={() => console.error("Google Login failed")}
//             />
//             <button
//               className="mt-4 px-4 py-2 bg-gray-200 rounded-lg"
//               onClick={closeModal}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetail;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import ReactImageMagnify from "react-image-magnify"; // Import the react-image-magnify component

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, handleGoogleSignUp } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/product/${id}`
        );
        setProduct(response.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    setQuantity(Math.max(1, e.target.value));
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const cartData = {
        userId,
        productId: id,
        productName: product.name,
        productPrice: product.price,
        quantity,
        total: product.price * quantity,
      };
      const response = await axios.post(
        "http://localhost:5000/api/cart/add",
        cartData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setSuccessMessage("Product added to cart successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
        navigate("/cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleAddToWishlist = async () => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const wishlistData = {
        userId,
        productId: id,
        productName: product.name,
        productPrice: product.price,
      };
      const response = await axios.post(
        "http://localhost:5000/api/wishlist/add",
        wishlistData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setSuccessMessage("Product added to wishlist successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  // const handleBuyNow = async () => {
  //   if (!isLoggedIn) {
  //     setIsModalOpen(true);
  //     return;
  //   }
  //   navigate("/checkout");
  // };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
      return;
    }
    navigate("/checkout", {
      state: {
        productId: id,
        productName: product.name,
        productPrice: product.price,
        quantity,
        total: product.price * quantity,
      },
    });
  };
  

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="relative w-full md:w-1/2 h-80 md:h-auto flex justify-center items-center bg-gray-200 rounded-lg overflow-hidden shadow-lg">
          {/* Image Zoom using ReactImageMagnify */}
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: product.name,
                isFluidWidth: true,
                src: `http://localhost:5000${product.imageURL}`,
              },
              largeImage: {
                src: `http://localhost:5000${product.imageURL}`,
                width: 1200, // Increase the width for a larger zoom effect
                height: 1800, // Increase the height for a larger zoom effect
              },
              lensStyle: {
                backgroundColor: "rgba(0, 0, 0, 0.6)", // Darken the lens
              },
            }}
          />
        </div>

        <div className="md:w-1/2 flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-xl font-semibold text-gray-600">RS.{product.price}</p>
          <p className="text-lg text-gray-800 mt-4">{product.description}</p>

          <div className="flex items-center gap-4 mt-6">
            <label className="text-lg font-semibold text-gray-700">Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              className="w-20 p-2 border-2 border-gray-300 rounded-lg text-center"
            />
          </div>

          <div className="mt-6 flex gap-4">
            <button
              className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-[#905FF7] border-2 border-[#C250D2] text-lg rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#C250D2] hover:text-white ease-in-out"
              onClick={handleAddToCart}
            >
              <FaShoppingCart /> Add to Cart
            </button>

            <button
              className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-[#905FF7] border-2 border-[#C250D2] text-lg rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#C250D2] hover:text-white ease-in-out"
              onClick={handleAddToWishlist}
            >
              ♥ Wishlist
            </button>

            <button
              className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-[#905FF7] border-2 border-[#C250D2] text-lg rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#C250D2] hover:text-white ease-in-out"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg text-xl z-50">
          {successMessage}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Sign Up with Google</h2>
            <GoogleLogin
              onSuccess={(response) => {
                handleGoogleSignUp(response);
                closeModal();
              }}
              onError={() => console.error("Google Login failed")}
            />
            <button
              className="mt-4 px-4 py-2 bg-gray-200 rounded-lg"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
