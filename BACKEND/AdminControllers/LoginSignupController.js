const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../Models/Admin");

const SECRET_KEY = "your_secret_key"; // Replace with a secure key

// Sign-Up Controller
exports.signup = async (req, res) => {
  const { username, email, address, phone, password } = req.body;

  try {
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Admin({ username, email, address, phone, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};

// Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });


    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };

    res.status(200).json({ message: "Login successful", user: userData, token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

// Logout (Handled on the frontend)
exports.logout = (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};
