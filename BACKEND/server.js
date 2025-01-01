const express = require("express");
const dotenv = require("dotenv");
require('dotenv').config();
const morgan = require("morgan");
const session = require("express-session");
const connectDB = require("./config/db"); // Import DB connection
const LoginSignupRoutes = require("./AdminRoutes/LoginSignupRoutes"); // Import routes
const productRoutes = require("./AdminRoutes/ProductRoutes");
const userRoutes = require('./UserRoutes/UserRoutes');
const cors = require('cors');
const path = require('path');
const passportConfig = require("./config/passport")
const passport = require('passport');
const cartRoutes = require('./UserRoutes/carRoutes');
const orderRoutes = require('./UserRoutes/orderRoutes');
const wishlistRoutes = require("./UserRoutes/wishlistRoutes");
const searchRoutes = require('./UserRoutes/SearchProductRoutes');
const feedbackRoutes = require("./UserRoutes/FeedbackRoutes");
const dashboardRoutes = require("./AdminRoutes/DashboardRoutes");
// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express app
const app = express();

app.use(cors({
  origin: ['http://localhost:5174', 'http://localhost:5173'], // Replace with your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow DELETE
  allowedHeaders: ['Content-Type', 'Authorization'], // Add required headers
    credentials: true,
  }));

app.use(session({ secret: "your_secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport
passportConfig(passport)

// Middleware
app.use(express.json()); // Parse JSON request body
app.use(morgan("dev")); // Log HTTP requests (for debugging)

// Routes
app.use("/api/admin", LoginSignupRoutes); // Use auth routes


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/products', productRoutes);

// User Routes
app.use('/user', userRoutes);


app.use('/api/cart', cartRoutes);


app.use('/api/orders', orderRoutes);

app.use("/api/wishlist", wishlistRoutes);

app.use("/api", searchRoutes);


// Routes
app.use("/api/feedback", feedbackRoutes);


app.use("/api/dashboard", dashboardRoutes);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
