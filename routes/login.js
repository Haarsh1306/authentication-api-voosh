const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { query } = require("../db");
const { loginSchema } = require("../validation");


router.post("", async (req, res) => {
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors });
    }
    const { email, password } = req.body;
  
    const results = await query("SELECT * FROM users WHERE email = ?", [email]);
    const user = results[0];
  
    if (!user) {
      return res.status(401).json({
        status: "Incorrect username/password provided. Please retry",
        status_code: 401,
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "Incorrect username/password provided. Please retry",
        status_code: 401,
      });
    }
    const accessToken = jwt.sign(
      { email: user.email, role: user.role, userId: user.id },
      process.env.ACCESS_TOKEN_SECRET,
    );

    res.status(200).json({
        status: "Login successful",
        status_code: 200,
        user_id: user.id,
        access_token: accessToken,
    });
  
});

module.exports = router;