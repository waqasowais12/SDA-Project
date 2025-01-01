// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Header from './components/Header'
// import Carousel from './components/Carousel'
// import ImageCard from './components/ImageCard'
// import ProductGrid from './components/ImageCard'
// import Footer from './components/Footer'

// function App() {

//   return (
//     <>
//       <Header/>
//       <div className="mt-20">
//         <Carousel />
//       </div>
//       <div className='mt-8'>
//       <ProductGrid/>
//       <Footer/>
//       </div>
//     </>
//   )
// }

// export default App

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './App.css';
// import Header from './components/Header';
// import Carousel from './components/Carousel';
// import ProductGrid from './components/ImageCard'; // Adjust the path accordingly
// import ProductDetail from './components/ProductDetail'; // Import ProductDetail
// import Footer from './components/Footer';

// function App() {
//   return (
//     <Router>
//       <Header />
//       <div className="mt-20">
//         <Routes>
//           <Route path="/" element={
//             <>
//               <Carousel />
//               <ProductGrid />
//             </>
//           } />
//           <Route path="/product/:id" element={<ProductDetail />} /> {/* Route for single product */}
//         </Routes>
//       </div>
//       <Footer />
//     </Router>
//   );
// }

// export default App;


// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './App.css';
// import Header from './components/Header';
// import Carousel from './components/Carousel';
// import ProductGrid from './components/ImageCard'; 
// import ProductDetail from './components/ProductDetail'; 
// import Footer from './components/Footer';
// import Cart from './components/Cart';
// import { useState } from 'react';
// import { AuthProvider } from "./context/AuthContext";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState("");
//   const [userId, setUserId] = useState("");

//   const login = (data) => {
//     setIsLoggedIn(true);
//     setUsername(data.username);
//     setUserId(data.userId);
//     localStorage.setItem("token", data.token);
//     localStorage.setItem("username", data.username);
//     localStorage.setItem("userId", data.userId);
//   };

//   const logout = () => {
//     setIsLoggedIn(false);
//     setUsername("");
//     setUserId("");
//     localStorage.clear();
//   };

//   return (
//     <AuthProvider>
//     <Router>
//       <Header
//         isLoggedIn={isLoggedIn}
//         username={username}
//         logout={logout}
//       />
//       <div className="mt-20">
//         <Routes>
//           <Route path="/" element={
//             <>
//               <Carousel />
//               <ProductGrid />
//             </>
//           } />
//           <Route path="/product/:id" element={<ProductDetail login={login} />} />
//           <Route path="/cart" element={<Cart/>}/>
//         </Routes>
//       </div>
//       <Footer />
//     </Router>
//     </AuthProvider>
//   );
// }

// export default App;


// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './App.css';
// import Header from './components/Header';
// import Carousel from './components/Carousel';
// import ProductGrid from './components/ImageCard'; 
// import ProductDetail from './components/ProductDetail'; 
// import Footer from './components/Footer';
// import Cart from './components/Cart';
// import { useState } from 'react';
// import { AuthProvider } from "./context/AuthContext";
// import { CartProvider } from "./context/CartContext"; // Import CartProvider

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState("");
//   const [userId, setUserId] = useState("");

//   const login = (data) => {
//     setIsLoggedIn(true);
//     setUsername(data.username);
//     setUserId(data.userId);
//     localStorage.setItem("token", data.token);
//     localStorage.setItem("username", data.username);
//     localStorage.setItem("userId", data.userId);
//   };

//   const logout = () => {
//     setIsLoggedIn(false);
//     setUsername("");
//     setUserId("");
//     localStorage.clear();
//   };

//   return (
//       <AuthProvider>
//         {/* <CartProvider>  */}
//         <Router>
//           <Header
//             isLoggedIn={isLoggedIn}
//             username={username}
//             logout={logout}
//           />
//           <div className="mt-20">
//             <Routes>
//               <Route path="/" element={
//                 <>
//                   <Carousel />
//                   <ProductGrid />
//                 </>
//               } />
//               <Route path="/product/:id" element={<ProductDetail login={login} />} />
//               <Route path="/cart" element={<Cart />} />
//             </Routes>
//           </div>
//           <Footer />
//         </Router>
//         {/* </CartProvider> */}
//       </AuthProvider>
//   );
// }

// export default App;



import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Carousel from './components/Carousel';
import ProductGrid from './components/ImageCard'; 
import ProductDetail from './components/ProductDetail'; 
import Footer from './components/Footer';
import Cart from './components/Cart';
import Checkout from './components/Checkout'; // Import the Checkout component
import Payment from './components/Payment';
import { useState } from 'react';
import { AuthProvider } from "./context/AuthContext";
import Wishlist from "./components/Wishlist";
import SearchResults from './components/SearchResults';
import OrderSuccess from './components/OrderSuccess';
import FeedbackPage from "./components/FeebackForm";
import AboutUs from "./components/AboutUs";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  const login = (data) => {
    setIsLoggedIn(true);
    setUsername(data.username);
    setUserId(data.userId);
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("userId", data.userId);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setUserId("");
    localStorage.clear();
  };

  return (
    <AuthProvider>
      <Router>
        <Header
          isLoggedIn={isLoggedIn}
          username={username}
          logout={logout}
        />
        <div className="mt-20">
          <Routes>
            <Route path="/" element={
              <>
                <Carousel />
                <ProductGrid />
              </>
            } />
            <Route path="/product/:id" element={<ProductDetail login={login} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} /> {/* Add the Checkout route here */}
            <Route path="/payment" element={<Payment/>}/>
            <Route path="/search" element={<SearchResults />} />
            <Route path="/order-success" element={<OrderSuccess/>}/>
            <Route path="/feedback" element={<FeedbackPage/>}/>
            <Route path="/about-us" element={<AboutUs/>}/>
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
