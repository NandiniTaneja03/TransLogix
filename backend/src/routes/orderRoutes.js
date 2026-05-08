const express = require("express");
const router = express.Router();

const { createOrder, updateOrderStatus } = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");
const Order = require("../models/Order");

// ✅ CREATE ORDER
router.post("/order", protect, createOrder);

// ✅ GET ORDERS
router.get("/orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({
      city: { $regex: new RegExp(`^${req.user.city}$`, "i") } // 🔥 CASE INSENSITIVE
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ UPDATE STATUS
router.put("/order/:id/status", protect, updateOrderStatus);

module.exports = router;