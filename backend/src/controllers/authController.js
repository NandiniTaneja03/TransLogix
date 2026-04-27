const jwt = require("jsonwebtoken");
const User = require("../models/User");

const login = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({
  id: user._id,
  email: user.email,
  role: user.role,
  city: user.city   // 🔥 MUST
}, process.env.JWT_SECRET);


    res.json({ token });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login };