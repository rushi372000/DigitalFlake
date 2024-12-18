const Role = require("../models/Role");

const createRoleController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Role name is required." });
    }

    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res.status(400).json({ message: "Role already exists." });
    }

    const role = new Role({ name });
    await role.save();

    res.status(201).json(role);
  } catch (error) {
    console.error("Error in createRoleController:", error);
    res.status(500).json({ error: "Error creating role." });
  }
};

const getRolesController = async (req, res) => {
  try {
    const roles = await Role.find();

    const rolesWithIds = roles.map((role, index) => ({
      id: index + 1,
      _id: role._id,
      name: role.name,
      status: role.status,
    }));

    res.json(rolesWithIds);
  } catch (error) {
    console.error("Error in getRolesController:", error);
    res.status(500).json({ error: "Error fetching roles." });
  }
};

const updateRoleController = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { name, status } = req.body;

    if (!name || !status) {
      return res
        .status(400)
        .json({ message: "Please provide both name and status." });
    }

    const role = await Role.findByIdAndUpdate(
      roleId,
      { name, status, updatedAt: Date.now() },
      { new: true }
    );
    if (!role) {
      return res.status(404).json({ message: "Role not found." });
    }

    res.json(role);
  } catch (error) {
    console.error("Error in updateRoleController:", error);
    res.status(500).json({ error: "Error updating role." });
  }
};

const deleteRoleController = async (req, res) => {
  try {
    console.log(req.params);
    const { roleId } = req.params;
    const role = await Role.findByIdAndDelete(roleId);
    if (!role) {
      return res.status(404).json({ message: "Role not found." });
    }

    res.json({ message: "Role deleted successfully." });
  } catch (error) {
    console.error("Error in deleteRoleController:", error);
    res.status(500).json({ error: "Error deleting role." });
  }
};

module.exports = {
  createRoleController,
  getRolesController,
  updateRoleController,
  deleteRoleController,
};
