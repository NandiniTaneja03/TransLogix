const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { updateOrderStatus } = require("../controllers/orderController");

// ✅ THIS LINE IS IMPORTANT
router.put("/order/:id/status", updateOrderStatus);

module.exports = router;