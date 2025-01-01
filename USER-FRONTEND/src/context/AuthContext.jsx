// // // src/context/AuthContext.js
// // import React, { createContext, useState, useEffect } from "react";

// // export const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [username, setUsername] = useState("");
// //   const [token, setToken] = useState("");

// //   useEffect(() => {
// //     const storedToken = localStorage.getItem("token");
// //     const storedUsername = localStorage.getItem("username");
// //     if (storedToken && storedUsername) {
// //       setIsLoggedIn(true);
// //       setUsername(storedUsername);
// //       setToken(storedToken);
// //     }
// //   }, []);

// //   const handleGoogleSignUp = async (response) => {
// //     try {
// //       const res = await fetch(`http://localhost:5000/user/google/callback?token=${response.credential}`, {
// //         method: "GET",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //       });

// //       if (!res.ok) {
// //         throw new Error("Google authentication failed");
// //       }

// //       const data = await res.json();

// //       localStorage.setItem("token", data.token);
// //       localStorage.setItem("username", data.username);
// //       localStorage.setItem("userId", data.userId);

// //       setIsLoggedIn(true);
// //       setUsername(data.username);
// //       setToken(data.token);
// //     } catch (error) {
// //       console.error(error.message);
// //     }
// //   };

// //   const handleLogout = () => {
// //     localStorage.clear();
// //     setIsLoggedIn(false);
// //     setUsername("");
// //     setToken("");
// //   };

// //   return (
// //     <AuthContext.Provider value={{ isLoggedIn, username, token, handleGoogleSignUp, handleLogout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };


// // AuthContext.js
// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState('');

//   // Handle Google Sign-Up and Login
//   const handleGoogleSignUp = async (response) => {
//     try {
//       const res = await fetch(`http://localhost:5000/user/google/callback?token=${response.credential}`);
//       if (!res.ok) {
//         throw new Error('Google authentication failed');
//       }
//       const data = await res.json();
      
//       // Store token and user data in localStorage
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('username', data.username);
//       setUsername(data.username);
//       setIsLoggedIn(true); // Set login state to true
//     } catch (error) {
//       console.error('Google Sign-Up failed:', error.message);
//     }
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('username');
//     setIsLoggedIn(false);
//     setUsername('');
//   };

//   // On app load, check if there's a valid token
//   React.useEffect(() => {
//     const token = localStorage.getItem('token');
//     const user = localStorage.getItem('username');
//     if (token && user) {
//       setIsLoggedIn(true);
//       setUsername(user);
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, username, handleGoogleSignUp, handleLogout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // Handle Google Sign-Up and Login
  const handleGoogleSignUp = async (response) => {
    try {
      const res = await fetch(`http://localhost:5000/user/google/callback?token=${response.credential}`);
      if (!res.ok) {
        throw new Error('Google authentication failed');
      }
      const data = await res.json();

      // Store token, username, and userId in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('userId', data.userId); // Save userId

      setUsername(data.username);
      setIsLoggedIn(true); // Set login state to true
    } catch (error) {
      console.error('Google Sign-Up failed:', error.message);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId'); // Clear userId from localStorage
    setIsLoggedIn(false);
    setUsername('');
  };

  // On app load, check if there's a valid token
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    if (token && user) {
      setIsLoggedIn(true);
      setUsername(user);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, handleGoogleSignUp, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
