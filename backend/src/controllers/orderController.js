const Order = require("../models/Order");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const order = new Order({
      shopkeeperId: req.user.id,
      address: req.body.address,

      // ✅ FORCE SAME FORMAT
      city: req.user.city.toLowerCase(),

      status: "pending"
    });

    await order.save();

    res.json({ message: "Order created", order });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

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

    const shopkeeper = await User.findById(order.shopkeeperId);

    if (!shopkeeper) {
      return res.status(404).json({ message: "User not found" });
    }

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
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateOrderStatus, createOrder };