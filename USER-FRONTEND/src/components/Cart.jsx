// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("userId"); // Assume user ID is stored in localStorage
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/cart/${userId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setCartItems(response.data);
//       } catch (error) {
//         console.error("Error fetching cart items:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCartItems();
//   }, [userId, token]);

//   const handleRemoveItem = async (cartId) => {
//     try {
//       const response = await axios.delete(
//         `http://localhost:5000/api/cart/${cartId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       if (response.status === 200) {
//         // Remove the item from the cart in the frontend
//         setCartItems((prevItems) =>
//           prevItems.filter((item) => item._id !== cartId)
//         );
//       }
//     } catch (error) {
//       console.error("Error removing item from cart:", error);
//     }
//   };

//   const handleCheckout = () => {
//     navigate("/checkout");
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (cartItems.length === 0) {
//     return <div className="text-center mt-10">Your cart is empty.</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
//       <div className="grid gap-4">
//         {cartItems.map((item) => (
//           <div
//             key={item._id}
//             className="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm"
//           >
//             <div>
//               <h3 className="text-xl font-semibold">{item.productName}</h3>
//               <p className="text-gray-600">Price: RS.{item.productPrice}</p>
//               <p className="text-gray-600">Quantity: {item.quantity}</p>
//               <p className="text-gray-600">Total: RS.{item.total}</p>
//             </div>
//             <button
//               onClick={() => handleRemoveItem(item._id)}
//               className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//       </div>
//       <div className="mt-6 flex justify-end">
//         <button
//           onClick={handleCheckout}
//           className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
//         >
//           Proceed to Checkout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Cart;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/cart/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, [userId, token]);

  const handleRemoveItem = async (cartId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/cart/${cartId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item._id !== cartId)
        );
        setModalMessage("Cart item deleted successfully.");
        setIsModalVisible(true);
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleCheckout = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    navigate("/checkout");
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (cartItems.length === 0) {
    return <div className="text-center mt-10">Your cart is empty.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
      <div className="grid gap-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm"
          >
            <div>
              <h3 className="text-xl font-semibold">{item.productName}</h3>
              <p className="text-gray-600">Price: RS.{item.productPrice}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
              <p className="text-gray-600">Total: RS.{item.total}</p>
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

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleCheckout}
          className="px-6 py-2 bg-gradient-to-r from-[#8A61F7] to-[#E9499D] text-white rounded-lg shadow-md hover:from-[#BC51DB] hover:to-[#8A61F7] transform transition duration-300 hover:scale-105"
        >
          Proceed to Checkout
        </button>
      </div>

      {isModalVisible && (
        <Modal message={modalMessage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Cart;
