const express = require("express");
const router = express.Router();
const { query } = require("../db");
const authenticateToken = require("../middleware/authenticate");
router.get("", authenticateToken, async (req, res) => {
    const userId = req.user.userId;
    const results = await query("SELECT * FROM users WHERE id = ?", [userId]);
    if (results.length === 0) {
        return res.status(404).json({ msg: "User not found" });
    }
    const user = results[0];
    const { password, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
});


module.exports = router;
