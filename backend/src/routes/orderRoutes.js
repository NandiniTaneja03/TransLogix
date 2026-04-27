const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware"); // 🔥 ADD THIS
const { updateOrderStatus, createOrder } = require("../controllers/orderController");
const Order = require("../models/Order");

// ✅ CREATE ORDER
router.post("/order", protect, createOrder);

// ✅ GET ORDERS (city filter)
router.get("/orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({
      city: req.user.city.toLowerCase()
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ UPDATE STATUS
router.put("/order/:id/status", protect, updateOrderStatus);

module.exports = router;