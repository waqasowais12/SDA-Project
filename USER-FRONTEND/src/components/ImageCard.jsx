// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom"; // Import Link for navigation

// // Product Card Component
// const ProductCard = ({ product }) => {
//   const cardRef = useRef(null); // Create a reference for each card
//   const [inView, setInView] = useState(false); // State to track if card is in view

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setInView(true); // Set to true when card enters the viewport
//           } else {
//             setInView(false); // Reset to false when card is out of view
//           }
//         });
//       },
//       { threshold: 0.5 } // Trigger when 50% of the card is in view
//     );
//     if (cardRef.current) {
//       observer.observe(cardRef.current); // Start observing the product card
//     }

//     return () => {
//       if (cardRef.current) {
//         observer.unobserve(cardRef.current); // Clean up when component unmounts
//       }
//     };
//   }, []);

//   return (
//     <div
//       ref={cardRef}
//       className={`group relative max-w-xs w-full bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 ease-in-out ${
//         inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//       }`} // Animation based on whether the card is in view
//     >
//       <Link to={`/product/${product._id}`}> {/* Link to the single product page */}
//         <img
//           src={`http://localhost:5000${product.imageURL}`}
//           alt={product.title}
//           className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
//         />
//       </Link>
//       <div className="p-4">
//         <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
//         <p className="text-lg font-bold text-gray-600">{product.price}</p>
//       </div>
//       {/* Overlay for Animation Effect */}
//       <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center">
//         <button className="text-white text-lg font-semibold py-2 px-4 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// const ProductGrid = () => {
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 8; // Number of products per page
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/products/all");
//         setProducts(response.data.products);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const totalPages = Math.ceil(products.length / productsPerPage);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//         Featured Products
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {currentProducts.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>

//       <div className="flex justify-center mt-6">
//         <button
//           onClick={() => paginate(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="px-4 py-2 mx-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
//         >
//           Previous
//         </button>
//         <span className="px-4 py-2 text-lg">{currentPage}</span>
//         <button
//           onClick={() => paginate(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="px-4 py-2 mx-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductGrid;


import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation

// Product Card Component
const ProductCard = ({ product }) => {
  const cardRef = useRef(null); // Create a reference for each card
  const [inView, setInView] = useState(false); // State to track if card is in view

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true); // Set to true when card enters the viewport
          } else {
            setInView(false); // Reset to false when card is out of view
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the card is in view
    );
    if (cardRef.current) {
      observer.observe(cardRef.current); // Start observing the product card
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current); // Clean up when component unmounts
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative max-w-xs w-full bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 ease-in-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`} // Animation based on whether the card is in view
    >
      <div>
        {/* Linking button added here */}
        <Link to={`/product/${product._id}`}>
          <button className="absolute top-2 left-2 px-4 py-2 bg-blue-600 text-white text-lg rounded-md">
            View Product
          </button>
        </Link>
      </div>
      <Link to={`/product/${product._id}`}> {/* Link to the single product page */}
        <img
          src={`http://localhost:5000${product.imageURL}`}
          alt={product.name}
          className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
        <p className="text-lg font-bold text-gray-600">{product.price}</p>
      </div>
      {/* Overlay for Animation Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center">
      <Link to={`/product/${product._id}`}>
        <button className="text-white text-lg font-semibold py-2 px-4 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          Add to Cart
        </button>
        </Link>
      </div>
    </div>
  );
};

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Number of products per page
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products/all");
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(products.length / productsPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product._id} product={product} /> 
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-lg">{currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductGrid;
