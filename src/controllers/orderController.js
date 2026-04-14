const sendEmail = require("../utils/sendEmail");

const orders = [
  { id: 1, shopkeeperId: 1, status: "pending" }
];

const users = [
  { id: 1, name: "Nandini", email: "yourgmail@gmail.com" }
];

const updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  const order = orders.find(o => o.id == req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.status = status;

  const shopkeeper = users.find(u => u.id === order.shopkeeperId);
await sendEmail(req.user.email, {
  name: req.user.name,
  orderId: order.id,
  status: statusMessage,
  address: order.address,
  driverName: "Rahul",
  vehiclePlate: "WB06F2028"
}); 
 await sendEmail(req.user.email, {
  name: req.user.name,
  orderId: order.id,
  status: statusMessage,
  address: order.address,
  driverName: "Rahul",
  vehiclePlate: "WB06F2028"
});

module.exports = { updateOrderStatus };