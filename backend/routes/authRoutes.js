const express = require("express");
const {
  loginController,
  logoutController,
} = require("../controllers/authControllers.js");

const router = express.Router();

router.post("/login", loginController);
router.post("/logout", logoutController);

module.exports = router;
