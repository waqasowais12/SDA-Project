const express = require("express");
const Order = require("../Models/orderModel"); // Import Order model
const User = require("../Models/UserModel");   // Import User model
const Product = require("../Models/Product"); // Import Product model

const router = express.Router();

// Get dashboard data
const getDashboardData = async (req, res) => {
    try {
      // Fetch all orders
      const orders = await Order.find();
  
      // Calculate total income
      const totalIncome = orders.reduce((acc, order) => acc + order.totalAmount, 0);
  
      // Fetch total products
      const totalProducts = await Product.countDocuments();
  
      // Fetch active users
      const activeUsers = await User.countDocuments();
  
      res.json({
        orders,
        totalIncome,
        totalProducts,
        activeUsers,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      res.status(500).json({ error: "Failed to fetch dashboard data" });
    }
  };
  
  module.exports = {
    getDashboardData,
  };
