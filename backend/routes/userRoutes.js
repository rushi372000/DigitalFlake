const express = require("express");
const {
  createUserController,
  getUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} = require("../controllers/userController.js");
const router = express.Router();
const authenticateUser = require("../middleware/auth.js");

router.post("/", authenticateUser, createUserController);
router.get("/", authenticateUser, getUsersController);
router.get("/:userId", authenticateUser, getUserByIdController);
router.put("/:userId", authenticateUser, updateUserController);
router.delete("/:userId", authenticateUser, deleteUserController);

module.exports = router;
