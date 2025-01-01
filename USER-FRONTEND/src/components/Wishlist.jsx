// // pages/Wishlist.jsx

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Wishlist = () => {
//   const { userId } = useAuth(); // Assuming userId is available in AuthContext
//   const [wishlist, setWishlist] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!userId) {
//       navigate("/login");
//       return;
//     }

//     const fetchWishlist = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/wishlist/${userId}`);
//         setWishlist(response.data.wishlist);
//       } catch (error) {
//         console.error("Error fetching wishlist:", error);
//       }
//     };

//     fetchWishlist();
//   }, [userId, navigate]);

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-3xl font-bold text-gray-800">Your Wishlist</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
//         {wishlist.length === 0 ? (
//           <p>Your wishlist is empty!</p>
//         ) : (
//           wishlist.map((item) => (
//             <div key={item._id} className="bg-white p-4 rounded-lg shadow-md">
//               <img
//                 src={`http://localhost:5000${item.productId.imageURL}`}
//                 alt={item.productName}
//                 className="w-full h-40 object-contain"
//               />
//               <h3 className="text-xl font-semibold mt-2">{item.productName}</h3>
//               <p className="text-lg font-semibold text-gray-600">RS.{item.productPrice}</p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Wishlist;


// src/components/Wishlist.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        if (!userId || !token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/wishlist/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data && Array.isArray(response.data.wishlist)) {
          setWishlistItems(response.data.wishlist);
        } else {
          setError("Invalid wishlist data format.");
        }
      } catch (error) {
        setError("Error fetching wishlist items.");
        console.error("Error fetching wishlist items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlistItems();
  }, [userId, token, navigate]);

  const handleRemoveItem = async (wishlistId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/wishlist/${wishlistId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setWishlistItems((prevItems) =>
          prevItems.filter((item) => item._id !== wishlistId)
        );
        setModalMessage("Wishlist item deleted successfully.");
        setIsModalVisible(true); // Show modal on successful deletion
      }
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); // Close the modal
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (wishlistItems.length === 0) {
    return <div className="text-center mt-10">Your wishlist is empty.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Your Wishlist</h2>
      <div className="grid gap-4">
        {wishlistItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm"
          >
            <div className="flex items-center">
              <img
                src={`http://localhost:5000${item.productId.imageURL}`}
                alt={item.productName}
                className="w-24 h-24 object-contain mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold">{item.productName}</h3>
                <p className="text-gray-600">Price: RS.{item.productPrice}</p>
              </div>
            </div>
            <button
              onClick={() => handleRemoveItem(item._id)}
              className="px-4 py-2 bg-gradient-to-r from-[#8A61F7] to-[#E9499D] text-white rounded-lg shadow-md hover:from-[#BC51DB] hover:to-[#8A61F7] transform transition duration-300 hover:scale-105"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {isModalVisible && (
        <Modal message={modalMessage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Wishlist;
