const User = require("../models/User.js");
const bcrypt = require("../utils/bcrypt.js");
const Role = require("../models/Role");
const multer = require("multer");

// Multer configuration for image upload
const upload = multer({ dest: "uploads/" });

const createUserController = async (req, res) => {
  try {
    upload.single("uploadImage")(req, res, async (err) => {
      if (err) return res.status(500).json({ message: "File upload failed." });
      const { name, mobile, email, password, roleName } = req.body;

      // Validate required fields
      if (!name || !mobile || !email || !password || !roleName) {
        return res.status(400).json({ message: "Please fill all the fields." });
      }

      const role = await Role.findOne({ name: roleName });
      if (!role) {
        return res
          .status(400)
          .json({ message: `Role with name '${roleName}' not found.` });
      }
      const roleId = role._id;

      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists." });
      }

      const hashedPassword = await bcrypt.hash(password);

      const user = new User({
        name,
        mobile,
        email,
        password: hashedPassword,
        role: roleId,
        uploadImage: req.file ? req.file.path : null,
      });

      await user.save();
      res.status(201).json(user);
    });
  } catch (error) {
    console.error("Error in createUserController:", error);
    res.status(500).json({ error: "Error creating user." });
  }
};

const getUsersController = async (req, res) => {
  try {
    const users = await User.find().populate("role", "name"); // Populate role name

    const usersWithIds = users.map((user, index) => ({
      _id: user._id,
      id: index + 1,
      name: user.name,
      mobile: user.mobile,
      email: user.email,
      role: user.role ? user.role.name : "N/A",
      status: user.status,
      uploadImage: user.uploadImage,
    }));

    res.json(usersWithIds);
  } catch (error) {
    console.error("Error in getUsersController:", error);
    res.status(500).json({ error: "Error fetching users." });
  }
};

const getUserByIdController = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("role", "name");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Error fetching user data." });
  }
};

const updateUserController = async (req, res) => {
  try {
    upload.single("uploadImage")(req, res, async (err) => {
      if (err) return res.status(500).json({ message: "File upload failed." });

      const { userId } = req.params;
      console.log("Received userId:", userId);
      console.log("Request body:", req.body);

      const { name, mobile, email, password, roleName, status } = req.body;

      if (!name || !mobile || !email || !roleName) {
        return res.status(400).json({
          message: "Please provide all required fields, including a role name.",
        });
      }

      const role = await Role.findOne({ name: roleName });
      if (!role) {
        return res
          .status(400)
          .json({ message: `Role with name '${roleName}' not found.` });
      }
      const roleId = role._id;
      console.log("Resolved roleId:", roleId);

      const updateData = { name, mobile, email, role: roleId, status };

      // Hash password if provided
      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }

      // Add uploadImage if provided
      if (req.file) {
        updateData.uploadImage = req.file.path;
      }

      // Update user in the database
      const user = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
      });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      res.json(user);
    });
  } catch (error) {
    console.error("Error in updateUserController:", error);
    res.status(500).json({ error: "Error updating user." });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};

module.exports = {
  createUserController,
  getUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
};
