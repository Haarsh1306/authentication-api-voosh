require("dotenv").config();
const passport = require("./auth");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});
// User related routes\
app.use("/api/user", require("./routes/users"));

// For fetching all profiles
app.use("/api/allprofile", require("./routes/allprofile"));

// For login/signup using google
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  function (req, res) {
    const accessToken = jwt.sign(
      { email: req.user.email, role: req.user.role, userId: req.user.id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.status(200).json({
      status: "Login successful",
      status_code: 200,
      user_id: req.user.id,
      access_token: accessToken,
    });
  }
);

app.use(function (err, req, res, next) {
  res.status(404).json({ error: err });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
