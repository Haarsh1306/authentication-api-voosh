const express = require("express");
const router = express.Router();
const { query } = require("../db");
const authenticateToken = require("../middleware/authenticate");

router.get("", authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  const role = req.user.role;
  let users = {};

  try {
    if (role === "user") {
      const publicUsers = await query("SELECT * FROM users WHERE isProfilePublic = ?", [
        "1",
      ]);
      if (publicUsers.length === 0) {
        return res.status(404).json({ msg: "No users found" });
      }
      users.public = publicUsers.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
    }

    if (role === "admin") {
      const publicUsers = await query("SELECT * FROM users WHERE isProfilePublic = ?", [
        "1",
      ]);
      const privateUsers = await query("SELECT * FROM users WHERE isProfilePublic = ?", [
        "0",
      ]);
      if (publicUsers.length === 0 && privateUsers.length === 0) {
        return res.status(404).json({ msg: "No users found" });
      }
      users.public = publicUsers.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      users.private = privateUsers.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = router;
