const jwt = require("jsonwebtoken");

exports.sign = async (payload) => {
  return await jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });
};

exports.verify = async (token) => {
  return await jwt.verify(token, process.env.JWT_KEY);
};
