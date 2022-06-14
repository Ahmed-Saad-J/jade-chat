const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const User = require("../models/User");
const argon2 = require("argon2");
const passport = require("passport");

// POST login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/chat",
    failureRedirect: "/",
  })
);

// POST register
router.post("/register", async (req, res) => {
  try {
    let hash = await argon2.hash(req.body.rpassword);
    const newUser = {
      username: req.body.rusername,
      email: req.body.remail,
      password: hash,
    };
    let user = await User.findOne({ email: newUser.email });
    if (user) {
      //console.log("user already exist")
      res.send("email already Exist");
    } else {
      let username = await User.findOne({ username: newUser.username });
      if (username) {
        res.send("this user name already exist");
      } else {
        user = await User.create(newUser);
        res.send("successfull Register");
      }
    }
  } catch (error) {
    console.log(error);
    res.redirect("/register");
  }
});
//@route GET /logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
