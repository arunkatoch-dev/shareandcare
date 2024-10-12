const express = require("express");
const registerUser = require("../../controller/auth/registerUser");
const userAuthMiddleware = require("../../middlewares/userAuthMiddleware");
const User = require("../../models/usersModel");
const logoutUser = require("../../controller/auth/logoutUser");
const loginUser = require("../../controller/auth/loginUser");
const router = express.Router();

// User Auth Routes ------ >>>>>>>
router.get("/", userAuthMiddleware, async (req, res) => {
  try {
    const _id = await req.cookies.userId;
    let user = await User.findOne({ _id });
    if (user) {
      const { _id, email, userName, profilePhoto } = user
      res.json({ msg: "verified user", user: { _id, email, userName, profilePhoto } });
    } else {
      res.json({ msg: "user not authenticated", details: "UserId is missing" })
    }
  } catch (e) {
    res.json({ msg: "user not authenticated", e });
  }
});
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/logout", logoutUser);

module.exports = router;
