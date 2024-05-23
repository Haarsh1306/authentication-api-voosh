const express = require("express");
const router = express.Router();
const { userSchema} = require("../validation");
const bcrypt = require("bcrypt");
const { query } = require("../db");

router.post("", async (req, res) => {
  const validation = userSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ msg: "Invalid Input"});
  }
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const defaultRole = "user";
  try {
    const result = await query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role || defaultRole]
    );

    res.status(200).json({
      status: "Account successfully created",
      status_code: 200,
      user_id: result.insertId,
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Email already registered" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});


module.exports = router;
