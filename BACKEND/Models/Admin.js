const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true,},
  phone: { type: Number, required: true, },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Admin", userSchema);








