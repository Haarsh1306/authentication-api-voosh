const passport = require('passport');
const {query} = require('./db');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile,cb) {
    const email = profile.emails[0].value;
    const name = profile.displayName;
    const result = await query("SELECT * FROM users WHERE email = ?", [email]);
    if(result.length === 0) {
        await query("INSERT INTO users (email, name) VALUES (?, ?)", [email, name]);
    }
    const user = await query("SELECT * FROM users WHERE email = ?", [email]);
    cb(null, user[0])
  }
));

module.exports = passport;