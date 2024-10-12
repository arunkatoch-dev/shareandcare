const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/usersModel");

const loginUser = async (req, res) => {
  try {
    const { email, password } = await req.body;
    if (!(email && password)) {
      return res.json({
        msg: "failed",
        details: "email or password not found.",
      });
    }
    const findUser = await User.findOne({ email });
    if (findUser) {
      const checkPass = await bcrypt.compare(password, findUser.password);
      if (checkPass) {
        const token = jwt.sign({ UID: findUser._id }, process.env.SECRET_KEY);
        return res
          .cookie("UID", token, {
            expires: new Date(Date.now() + 258920000),
            sameSite: "none",
            secure: true,
          })
          .cookie("userId", findUser._id, {
            expires: new Date(Date.now() + 258920000),
            sameSite: "none",
            secure: true,
          })
          .json({ msg: "success", details: "login successfull" });
      } else {
        return res.json({
          msg: "failed",
          details: "user email or password mismatch.",
        });
      }
    } else {
      return res.json({
        msg: "failed",
        details: "user email or password mismatch.",
      });
    }
  } catch (err) {
    res.json({ msg: "error", errorDetails: err });
  }
};

module.exports = loginUser;
