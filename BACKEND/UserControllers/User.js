// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../Models/UserModel");
// const verifyToken = require("../middlewares/verifyToken");
// // Handle Google OAuth Callback
// // Handle Google OAuth Callback (sign up with Google)

// // exports.googleAuthCallback = async (req, res) => {
// //   try {
// //     const { id, email, username } = req.user;
// //     res.redirect(
// //       `http://localhost:3000`
// //     );
// //   } catch (error) {
// //     res.status(500).json({ error: "Error during Google authentication" });
// //   }
// // };

// exports.googleAuthCallback = async (req, res) => {
//     try {
//       const { id, email, username } = req.user;
  
//       // Create JWT token
//       const token = jwt.sign({ userId: id, username: username }, process.env.JWT_SECRET, { expiresIn: '7d' });
  
//       // Send token to the frontend with query params
//       res.redirect(`http://localhost:5173//GoogleCallbackPage?token=${token}&username=${username}&userId=${id}`);
//     } catch (error) {
//       console.error("Error during Google authentication:", error);
//       res.status(500).json({ error: "Error during Google authentication" });
//     }
//   };
  
  

// exports.login = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//       const user = await User.findOne({ email });
  
//       if (!user) {
//         return res.status(404).json({ error: "User not found" });
//       }
  
//       // Check if the password matches
//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       if (!isPasswordValid) {
//         return res.status(401).json({ error: "Invalid credentials" });
//       }
  
//       // Generate JWT token for login
//       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
//       res.status(200).json({ message: "Login successful", token });
//     } catch (error) {
//       res.status(500).json({ error: "Login failed" });
//     }
//   };
  



// controllers/authController.js
const axios = require('axios');
const User = require('../Models/UserModel'); // Import your User model

// Function to handle Google authentication callback
const googleCallback = async (req, res) => {
  const { token } = req.query;

  try {
    // Make a request to Google's tokeninfo endpoint to get user info
    const response = await axios.post(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
    
    const userInfo = response.data;
    const { name, email, sub: googleId } = userInfo;

    // Check if the user already exists in the database
    let user = await User.findOne({ googleId });

    if (!user) {
      // If the user doesn't exist, create a new one
      user = new User({
        googleId,
        username: name,
        email,
      });
      await user.save(); // Save the new user to the database
    }

    // Generate a JWT token for the user (you can use any JWT library)
    const jwtToken = generateJwtToken(user);  // You'll need to create a function for JWT generation

    // Send the response with the JWT token, username, and user ID
    res.json({
      token: jwtToken,
      username: user.username,
      userId: user._id,
    });

  } catch (error) {
    res.status(400).json({ error: "Google authentication failed" });
  }
};

// Example of generating a JWT token (you should install and configure a JWT library like jsonwebtoken)
const generateJwtToken = (user) => {
  const jwt = require('jsonwebtoken');
  const secretKey = 'yourSecretKey'; // You should store this securely (e.g., environment variable)

  return jwt.sign(
    { userId: user._id, username: user.username },
    secretKey,
    { expiresIn: '1h' }  // Expiration time (adjust as needed)
  );
};

module.exports = { googleCallback };


