const express = require('express');
const router = express.Router();

//For user registration 
router.use("/register", require("./register"));

//For user login
router.use("/login", require("./login"));

//For user profile
router.use("/myprofile", require("./profile"));

//For updating user profile
router.use("/update", require("./update"));
module.exports = router;