const express = require("express");
const dotenv = require("dotenv");

const logger = require("./src/middleware/loggerMiddleware");
const errorHandler = require("./src/middleware/errorHandler");
const sendEmail = require("./src/utils/sendEmail");
const orderRoutes = require("./src/routes/orderRoutes");

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(logger);

// routes
app.get("/", (req, res) => {
  res.send("Server Running 🚀");
});

// test email
app.get("/send-email", async (req, res) => {
  await sendEmail(process.env.EMAIL_USER, {
    name: "Nandini",
    orderId: "ORD123",
    amount: 499,
  });

  res.send("Email Sent!");
});
const jwt = require("jsonwebtoken");

app.get("/login", (req, res) => {
  const user = {
    id: 1,
    email: "yourgmail@gmail.com",
    role: "vendor"
  };

  const token = jwt.sign(user, process.env.JWT_SECRET);

  res.json({ token });
});
// API routes
app.use("/api", orderRoutes);

// error handler (always last)
app.use(errorHandler);

// server start
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});