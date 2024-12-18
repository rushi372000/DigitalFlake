const jwt = require("../utils/jwt.js");

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
    const decoded = await jwt.verify(token);
    req.user = decoded; // Attach user information to the request object
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authenticateUser;
