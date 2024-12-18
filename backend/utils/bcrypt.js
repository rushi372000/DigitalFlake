const bcrypt = require("bcrypt");

exports.hash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

exports.compare = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
