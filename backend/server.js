const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const connectDB = require("./src/config/db");
const logger = require("./src/middleware/loggerMiddleware");
const errorHandler = require("./src/middleware/errorHandler");
const orderRoutes = require("./src/routes/orderRoutes");
const User = require("./src/models/User");

dotenv.config();

// ✅ CONNECT DB
connectDB();

const app = express();

// ✅ MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(logger);

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server Running 🚀");
});


// ==============================
// 🔐 LOGIN ROUTE (FINAL FIXED)
// ==============================
app.post("/api/login", async (req, res) => {
  try {
    const { email, role } = req.body;

    // 🔍 find user in DB
    let user = await User.findOne({ email });

    // ➕ create if not exists
    if (!user) {
      user = await User.create({
        name: email.split("@")[0], // simple name
        email,
        role: role || "vendor",
        city: "panipat" // 🔥 keep lowercase for matching
      });
    }

    // 🎟️ create JWT token
    const token = jwt.sign(
      {
        id: user._id,           // ✅ REAL Mongo ObjectId
        email: user.email,
        role: user.role,
        city: user.city
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }      // optional but good
    );

    res.json({
      token,
      user
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});


// ==============================
// 📦 ORDER ROUTES
// ==============================
app.use("/api", orderRoutes);


// ==============================
// ❌ ERROR HANDLER
// ==============================
app.use(errorHandler);


// ==============================
// 🚀 START SERVER
// ==============================
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});