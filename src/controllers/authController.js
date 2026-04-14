const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const user = {
    id: 1,
    name: "Nandini",
    email: "nandini@gmail.com",
    role: "vendor"
  };

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET
  );

  res.json({ token });
};

module.exports = { login };