const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  city: {
    type: String,
    required: true
  }
});

// 🔥 THIS LINE IS THE FIX
module.exports = mongoose.model("User", userSchema);