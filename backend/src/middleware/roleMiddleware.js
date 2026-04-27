const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

const driverOnly = (req, res, next) => {
  if (req.user.role !== "driver") {
    return res.status(403).json({ message: "Driver access required" });
  }
  next();
};

const vendorOnly = (req, res, next) => {
  if (req.user.role !== "vendor") {
    return res.status(403).json({ message: "Vendor access required" });
  }
  next();
};

module.exports = { adminOnly, driverOnly, vendorOnly };