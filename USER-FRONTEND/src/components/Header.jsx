// import React, { useState, useEffect } from "react";
// import { FaHeart, FaShoppingCart, FaBars } from "react-icons/fa";
// import { GoogleLogin } from "@react-oauth/google";
// import { useNavigate } from "react-router-dom";

// const Header = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
//   const [username, setUsername] = useState(""); // Store user's name
//   const [searchQuery, setSearchQuery] = useState(""); // Store search input
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Track mobile menu state
//   const navigate = useNavigate();

//   // Check if user is already logged in on component mount
//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     const storedUsername = localStorage.getItem("username");
//     if (storedToken && storedUsername) {
//       setIsLoggedIn(true);
//       setUsername(storedUsername);
//     }
//   }, []);

//   // Handle Google Sign-Up
//   const handleGoogleSignUp = async (response) => {
//     try {
//       const res = await fetch(`http://localhost:5000/user/google/callback?token=${response.credential}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!res.ok) {
//         throw new Error("Google authentication failed");
//       }

//       const data = await res.json();

//       // Store token and user info in local storage
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("username", data.username);
//       localStorage.setItem("userId", data.userId);

//       // Update UI
//       setIsLoggedIn(true);
//       setUsername(data.username);

//       // Redirect to a dashboard or main page
//       navigate("/");
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     localStorage.clear(); // Clear user data
//     setIsLoggedIn(false); // Update login state
//     setUsername(""); // Clear username
//     navigate("/"); // Redirect to the home page
//   };

//   // Handle search input change
//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   // Handle search submission
//   const handleSearchSubmit = (event) => {
//     event.preventDefault();
//     if (searchQuery) {
//       navigate(`/search?query=${searchQuery}`);
//     }
//   };

//   return (
//     <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
//       <div className="container mx-auto px-4 md:px-6 lg:px-10">
//         <div className="flex items-center justify-between py-4">
//           {/* Logo */}
//           <div className="text-2xl font-bold text-white cursor-pointer" onClick={() => navigate("/")}>
//             MyStore
//           </div>

//           {/* Desktop Navbar */}
//           <nav className="hidden md:flex items-center space-x-6">
//             <a href="#home" className="hover:text-gray-200 transition duration-300">Home</a>
//             <a href="#about" className="hover:text-gray-200 transition duration-300">About Us</a>
//             <a href="#contact" className="hover:text-gray-200 transition duration-300">Contact</a>
//           </nav>

//           {/* Search Bar */}
//           <div className="hidden md:flex items-center space-x-4">
//             <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 placeholder="Search products..."
//                 className="px-4 py-2 border border-gray-300 rounded-lg"
//               />
//               <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
//                 Search
//               </button>
//             </form>
//           </div>

//           {/* Wishlist, Cart, and Auth */}
//           <div className="flex items-center space-x-4">
//             <button className="text-xl">
//               <FaHeart className="hover:text-gray-200 transition duration-300" />
//             </button>
//             <button className="text-xl">
//               <FaShoppingCart className="hover:text-gray-200 transition duration-300" />
//             </button>

//             {/* Conditional Rendering for Login/Logout */}
//             {isLoggedIn ? (
//               <div className="flex items-center space-x-2">
//                 <span className="text-white">Hello, {username}</span>
//                 <button
//                   className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300"
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <GoogleLogin
//                 onSuccess={handleGoogleSignUp}
//                 onError={() => console.error("Google Login failed")}
//                 render={(renderProps) => (
//                   <button
//                     className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
//                     onClick={renderProps.onClick}
//                     disabled={renderProps.disabled}
//                   >
//                     Sign Up with Google
//                   </button>
//                 )}
//               />
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center">
//             <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
//               <FaBars className="text-white text-2xl" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu Modal */}
//       {isMobileMenuOpen && (
//         <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-40">
//           <div className="bg-white w-3/4 max-w-sm mx-auto p-4 mt-20 rounded-lg shadow-lg">
//             <div className="flex justify-end">
//               <button onClick={() => setIsMobileMenuOpen(false)} className="text-xl">
//                 ×
//               </button>
//             </div>
//             <nav className="flex flex-col space-y-4">
//               <a href="#home" className="text-gray-700 hover:text-blue-600">Home</a>
//               <a href="#about" className="text-gray-700 hover:text-blue-600">About Us</a>
//               <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
//             </nav>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;



// import React, { useState } from "react";
// import { FaHeart, FaShoppingCart, FaBars } from "react-icons/fa";
// import { GoogleLogin } from "@react-oauth/google";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext"; // Import the useAuth hook

// const Header = () => {
//   const [searchQuery, setSearchQuery] = useState(""); // Store search input
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Track mobile menu state
//   const navigate = useNavigate();
//   const { isLoggedIn, username, handleGoogleSignUp, handleLogout } = useAuth();

//   // Handle search input change
//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   // Handle search submission
//   const handleSearchSubmit = (event) => {
//     event.preventDefault();
//     if (searchQuery) {
//       navigate(`/search?query=${searchQuery}`);
//     }
//   };

//   return (
//     <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
//       <div className="container mx-auto px-4 md:px-6 lg:px-10">
//         <div className="flex items-center justify-between py-4">
//           {/* Logo */}
//           <div className="text-2xl font-bold text-white cursor-pointer" onClick={() => navigate("/")}>
//             MyStore
//           </div>

//           {/* Desktop Navbar */}
//           <nav className="hidden md:flex items-center space-x-6">
//             <a href="#home" className="hover:text-gray-200 transition duration-300">Home</a>
//             <a href="#about" className="hover:text-gray-200 transition duration-300">About Us</a>
//             <a href="#contact" className="hover:text-gray-200 transition duration-300">Contact</a>
//           </nav>

//           {/* Search Bar */}
//           <div className="hidden md:flex items-center space-x-4">
//             <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 placeholder="Search products..."
//                 className="px-4 py-2 border border-gray-300 rounded-lg"
//               />
//               <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
//                 Search
//               </button>
//             </form>
//           </div>

//           {/* Wishlist, Cart, and Auth */}
//           <div className="flex items-center space-x-4">
//             <button className="text-xl">
//               <FaHeart className="hover:text-gray-200 transition duration-300" />
//             </button>
//             <button className="text-xl">
//               <FaShoppingCart className="hover:text-gray-200 transition duration-300" />
//             </button>

//             {/* Conditional Rendering for Login/Logout */}
//             {isLoggedIn ? (
//               <div className="flex items-center space-x-2">
//                 <span className="text-white">Hello, {username}</span>
//                 <button
//                   className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300"
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <GoogleLogin
//                 onSuccess={handleGoogleSignUp}
//                 onError={() => console.error("Google Login failed")}
//                 render={(renderProps) => (
//                   <button
//                     className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
//                     onClick={renderProps.onClick}
//                     disabled={renderProps.disabled}
//                   >
//                     Sign Up with Google
//                   </button>
//                 )}
//               />
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center">
//             <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
//               <FaBars className="text-white text-2xl" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu Modal */}
//       {isMobileMenuOpen && (
//         <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-40">
//           <div className="bg-white w-3/4 max-w-sm mx-auto p-4 mt-20 rounded-lg shadow-lg">
//             <div className="flex justify-end">
//               <button onClick={() => setIsMobileMenuOpen(false)} className="text-xl">
//                 ×
//               </button>
//             </div>
//             <nav className="flex flex-col space-y-4">
//               <a href="#home" className="text-gray-700 hover:text-blue-600">Home</a>
//               <a href="#about" className="text-gray-700 hover:text-blue-600">About Us</a>
//               <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
//             </nav>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;



import React, { useState, useEffect } from "react";
import { FaHeart, FaShoppingCart, FaBars } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook

const Header = () => {
  const [searchQuery, setSearchQuery] = useState(''); // Store search input
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Track mobile menu state
  const [cartItemsCount, setCartItemsCount] = useState(0); // Track cart items count
  const navigate = useNavigate();
  const { isLoggedIn, username, handleGoogleSignUp, handleLogout } = useAuth();


      const handleFeedback = () => {
          navigate('/feedback');
      };

      const handleAboutUs = () => {
        navigate('/about-us');
    };

    const handleHome = () => {
      navigate('/');
  };

  // Fetch cart items count from backend
  useEffect(() => {
    const fetchCartItems = async () => {
      if (isLoggedIn) {
        try {
          const token = localStorage.getItem("token");
          const userId = localStorage.getItem("userId");
          const response = await axios.get(
            `http://localhost:5000/api/cart/${userId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setCartItemsCount(response.data.cartItems.length);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      }
    };

    fetchCartItems();
  }, [isLoggedIn]); // Run when user logs in

  // Handle search input change
  // const handleSearchChange = (event) => {
  //   setSearchQuery(event.target.value);
  // };

  // // Handle search submission
  // const handleSearchSubmit = (event) => {
  //   event.preventDefault();
  //   if (searchQuery) {
  //     navigate(`/search?query=${searchQuery}`);
  //   }
  // };
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-10">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div
            className="text-2xl font-bold text-white cursor-pointer"
            onClick={handleHome}
          >
            MyStore
          </div>

          {/* Desktop Navbar */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={handleHome}
              className="hover:text-gray-200 transition duration-300"
            >
              Home
            </button>
            <button
              onClick={handleAboutUs}
              className="hover:text-gray-200 transition duration-300"
            >
              About Us
            </button>
            <button
              onClick={handleFeedback}
              className="hover:text-gray-200 transition duration-300"
            >
              Feedback
            </button>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4">
            <form
              onSubmit={handleSearch}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="px-4 py-2 border border-gray-300 rounded-lg text-black"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Search
              </button>
            </form>
          </div>

          {/* Wishlist, Cart, and Auth */}
          <div className="flex items-center space-x-4">
            <button 
            className="text-xl"
            onClick={() => navigate("/wishlist")}
            >
              <FaHeart className="hover:text-gray-200 transition duration-300" />
            </button>
            <button
              className="relative text-xl"
              onClick={() => navigate("/cart")}
            >
              <FaShoppingCart className="hover:text-gray-200 transition duration-300" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Conditional Rendering for Login/Logout */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <span className="text-white">Hello, {username}</span>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <GoogleLogin
                onSuccess={handleGoogleSignUp}
                onError={() => console.error("Google Login failed")}
                render={(renderProps) => (
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    Sign Up with Google
                  </button>
                )}
              />
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <FaBars className="text-white text-2xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Modal */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-40">
          <div className="bg-white w-3/4 max-w-sm mx-auto p-4 mt-20 rounded-lg shadow-lg">
            <div className="flex justify-end">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl"
              >
                ×
              </button>
            </div>
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-700 hover:text-blue-600">
                Home
              </a>
              <a href="#about" className="text-gray-700 hover:text-blue-600">
                About Us
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600">
                Contact
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;


// import React, { useState, useEffect } from "react";
// import { FaHeart, FaShoppingCart, FaBars } from "react-icons/fa";
// import { GoogleLogin } from "@react-oauth/google";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext"; // Import the useAuth hook
// import { useCart } from "../context/CartContext"; // Import CartContext

// const Header = () => {
//   const [searchQuery, setSearchQuery] = useState(""); // Store search input
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Track mobile menu state
//   const navigate = useNavigate();
//   const { isLoggedIn, username, handleGoogleSignUp, handleLogout } = useAuth();
//   const { cart } = useCart(); // Use CartContext

//   // Fetch cart items count from CartContext
//   const cartItemsCount = cart.length; // Count items from CartContext

//   // Handle search input change
//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   // Handle search submission
//   const handleSearchSubmit = (event) => {
//     event.preventDefault();
//     if (searchQuery) {
//       navigate(`/search?query=${searchQuery}`);
//     }
//   };

//   return (
//     <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
//       <div className="container mx-auto px-4 md:px-6 lg:px-10">
//         <div className="flex items-center justify-between py-4">
//           {/* Logo */}
//           <div
//             className="text-2xl font-bold text-white cursor-pointer"
//             onClick={() => navigate("/")}
//           >
//             MyStore
//           </div>

//           {/* Desktop Navbar */}
//           <nav className="hidden md:flex items-center space-x-6">
//             <a
//               href="#home"
//               className="hover:text-gray-200 transition duration-300"
//             >
//               Home
//             </a>
//             <a
//               href="#about"
//               className="hover:text-gray-200 transition duration-300"
//             >
//               About Us
//             </a>
//             <a
//               href="#contact"
//               className="hover:text-gray-200 transition duration-300"
//             >
//               Contact
//             </a>
//           </nav>

//           {/* Search Bar */}
//           <div className="hidden md:flex items-center space-x-4">
//             <form
//               onSubmit={handleSearchSubmit}
//               className="flex items-center space-x-2"
//             >
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 placeholder="Search products..."
//                 className="px-4 py-2 border border-gray-300 rounded-lg"
//               />
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
//               >
//                 Search
//               </button>
//             </form>
//           </div>

//           {/* Wishlist, Cart, and Auth */}
//           <div className="flex items-center space-x-4">
//             <button className="text-xl">
//               <FaHeart className="hover:text-gray-200 transition duration-300" />
//             </button>
//             <button
//               className="relative text-xl"
//               onClick={() => navigate("/cart")}
//             >
//               <FaShoppingCart className="hover:text-gray-200 transition duration-300" />
//               {cartItemsCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm w-5 h-5 flex items-center justify-center rounded-full">
//                   {cartItemsCount}
//                 </span>
//               )}
//             </button>

//             {/* Conditional Rendering for Login/Logout */}
//             {isLoggedIn ? (
//               <div className="flex items-center space-x-2">
//                 <span className="text-white">Hello, {username}</span>
//                 <button
//                   className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300"
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <GoogleLogin
//                 onSuccess={handleGoogleSignUp}
//                 onError={() => console.error("Google Login failed")}
//                 render={(renderProps) => (
//                   <button
//                     className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
//                     onClick={renderProps.onClick}
//                     disabled={renderProps.disabled}
//                   >
//                     Sign Up with Google
//                   </button>
//                 )}
//               />
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center">
//             <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
//               <FaBars className="text-white text-2xl" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu Modal */}
//       {isMobileMenuOpen && (
//         <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-40">
//           <div className="bg-white w-3/4 max-w-sm mx-auto p-4 mt-20 rounded-lg shadow-lg">
//             <div className="flex justify-end">
//               <button
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="text-xl"
//               >
//                 ×
//               </button>
//             </div>
//             <nav className="flex flex-col space-y-4">
//               <a href="#home" className="text-gray-700 hover:text-blue-600">
//                 Home
//               </a>
//               <a href="#about" className="text-gray-700 hover:text-blue-600">
//                 About Us
//               </a>
//               <a href="#contact" className="text-gray-700 hover:text-blue-600">
//                 Contact
//               </a>
//             </nav>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;
