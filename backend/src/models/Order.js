const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shopkeeperId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  status: {
    type: String,
    default: "pending"
  },

  address: {
    type: String,
    required: true
  },

  city: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);