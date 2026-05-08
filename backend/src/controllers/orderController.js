const Order = require("../models/Order");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

// ==============================
// 📦 CREATE ORDER
// ==============================
const createOrder = async (req, res) => {
  try {
    console.log("🔥 BODY:", req.body);
    console.log("🔥 USER:", req.user);

    // ❌ safety check
    if (!req.user) {
      return res.status(401).json({ message: "User not authorized" });
    }

    if (!req.body.address) {
      return res.status(400).json({ message: "Address required" });
    }

    const order = new Order({
      shopkeeperId: req.user.id, // ✅ real Mongo ObjectId from token
      address: req.body.address,
      city: req.user.city.toLowerCase(), // 🔥 normalize
      status: "pending"
    });

    await order.save();

    console.log("✅ ORDER SAVED:", order);

    res.status(201).json({
      message: "Order created successfully",
      order
    });

  } catch (error) {
    console.error("❌ ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// 🚚 UPDATE ORDER STATUS
// ==============================
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    // 🧠 status message
    let statusMessage = "";

    if (status === "Picked") {
      statusMessage = "Your order has been picked up 🚚";
    } else if (status === "Reached") {
      statusMessage = "Driver has reached your location 📍";
    } else if (status === "Delivered") {
      statusMessage = "Your order has been delivered ✅";
    } else {
      statusMessage = status;
    }

    // 👤 find shopkeeper
    const shopkeeper = await User.findById(order.shopkeeperId);

    if (!shopkeeper) {
      return res.status(404).json({ message: "User not found" });
    }

    // 📧 send email
    await sendEmail(shopkeeper.email, {
      name: shopkeeper.name,
      orderId: order._id,
      status: statusMessage,
      address: order.address,
      driverName: "Rahul",
      vehiclePlate: "WB06F2028"
    });

    res.json({ message: "Status updated & email sent 🚀" });

  } catch (error) {
    console.error("❌ ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// EXPORT
// ==============================
module.exports = {
  createOrder,
  updateOrderStatus
};