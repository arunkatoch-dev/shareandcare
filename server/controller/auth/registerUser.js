const express = require("express");
const User = require("../../models/usersModel");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { email, userName, password } = req.body;
    if (!(userName && password && email)) {
      return res
        .status(422)
        .json({ error: "plz fill all the required fields..." });
    }

    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.json({ msg: "failed", details: "Email already exists" });
    } else {
      bcrypt.hash(password, 10, async function (err, hashedPassword) {
        if (err) {
          return res.status(400).json({ msg: err });
        } else {
          const password = hashedPassword;
          const user = new User({
            email,
            userName,
            profilePhoto: "",
            password,
          });
          await user.save();
          res.status(201).json({
            msg: "success",
            details: "user registered successfully...",
          });
        }
      });
    }
  } catch (e) {
    return res.status(400).json({ msg: "some error occured" });
  }
};

module.exports = registerUser;
