const User = require("../models/User.js");
const bcrypt = require("../utils/bcrypt.js");
const jwt = require("../utils/jwt.js");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = await jwt.sign({ userId: user._id });
    res.json({
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    console.log("Error => ", error);
    res.status(500).json({ error: "Error in loginController " });
  }
};

const logoutController = async (req, res) => {
  try {
    localStorage.removeItem("token");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error in logoutController " });
  }
};

module.exports = { loginController, logoutController };
