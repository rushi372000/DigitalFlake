const express = require("express");
const {
  createRoleController,
  getRolesController,
  updateRoleController,
  deleteRoleController,
} = require("../controllers/roleControllers.js");
const authenticateUser = require("../middleware/auth.js");

const router = express.Router();

router.post("/", authenticateUser, createRoleController);
router.get("/", authenticateUser, getRolesController);
router.put("/:roleId", authenticateUser, updateRoleController);
router.delete("/:roleId", authenticateUser, deleteRoleController);

module.exports = router;
