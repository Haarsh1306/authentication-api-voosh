const express = require("express");
const router = express.Router();
const { updateProfileSchema } = require("../validation");
const { query } = require("../db");
const authenticateToken = require("../middleware/authenticate");

router.post("", authenticateToken, async (req, res) => {
  const validation = updateProfileSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ msg: "Invalid Input" });
  }

  const { email, name, password, bio, phone, photo, isProfilePublic } = req.body;
  console.log(req.user)
  const userId = req.user.userId;

  try {
    if (email) {
      const existingUser = await query("SELECT * FROM users WHERE email = ? ", [email]);
      if (existingUser.length > 0) {
        return res.status(400).json({ msg: "Email already in use" });
      }
    }

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;
    const updateFields = [];
    const updateValues = [];

    if (name) {
      updateFields.push("name = ?");
      updateValues.push(name);
    }

    if (email) {
      updateFields.push("email = ?");
      updateValues.push(email);
    }

    if (hashedPassword !== undefined) {
      updateFields.push("password = ?");
      updateValues.push(hashedPassword);
    }

    if (bio) {
      updateFields.push("bio = ?");
      updateValues.push(bio);
    }

    if (phone) {
      updateFields.push("phone = ?");
      updateValues.push(phone);
    }

    if (photo) {
      updateFields.push("photo = ?");
      updateValues.push(photo);
    }
    if(isProfilePublic !== undefined) {
        updateFields.push("isProfilePublic = ?");
        updateValues.push(isProfilePublic);
    }
    if (updateFields.length > 0) {
      const updateQuery = `UPDATE users SET ${updateFields.join(
        ", "
      )} WHERE id = ?`;
      updateValues.push(userId);
      console.log(updateQuery);
      console.log(updateValues);
      await query(updateQuery, updateValues);
      res.status(200).json({ msg: "Profile updated successfully" });
    } else {
      res.status(400).json({ msg: "No fields to update" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = router;
