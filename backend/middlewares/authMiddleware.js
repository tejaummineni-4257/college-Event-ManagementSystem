const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      console.warn("Auth: No Authorization header");
      return res.status(401).json({ message: "No token provided" });
    }
    console.log("Auth header received:", header);

    if (!header.startsWith("Bearer ")) {
      console.warn("Auth: Header not Bearer:", header);
      return res.status(401).json({ message: "Invalid auth header format" });
    }

    const token = header.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    console.error("Auth error:", err && err.message ? err.message : err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") return next();
  return res.status(403).json({ message: "Admin access only" });
};
