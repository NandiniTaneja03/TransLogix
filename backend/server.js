const cors = require("cors"); // ✅ ADD THIS
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const logger = require("./src/middleware/loggerMiddleware");
const errorHandler = require("./src/middleware/errorHandler");
const sendEmail = require("./src/utils/sendEmail");
const orderRoutes = require("./src/routes/orderRoutes"); // ✅ FIXED


const jwt = require("jsonwebtoken");

dotenv.config();

// ✅ CONNECT DB
connectDB();

const app = express();
app.use(cors()); // ✅ ADD THIS

// middleware
app.use(express.json());
app.use(logger);

// test route
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

// login (for token)
app.post("/api/login", (req, res) => {
  const { email, password, role } = req.body;

  const user = {
    id: "123",
    name: "Nandini",
    email,
    role,
    city: "Panipat" // 🔥 IMPORTANT for your project
  };

  const token = jwt.sign(user, process.env.JWT_SECRET);

  res.json({ token, user });
});

// API routes
app.use("/api", orderRoutes);

// error handler
app.use(errorHandler);

// start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});