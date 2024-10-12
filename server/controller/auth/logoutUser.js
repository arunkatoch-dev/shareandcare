const express = require("express");

const logoutUser = async (req, res) => {
  try {
    await res
      .clearCookie("UID", {
        sameSite: "none",
        secure: true,
      })
      .clearCookie("userId", {
        sameSite: "none",
        secure: true,
      })
      .json({ msg: "logged out" });
  } catch (err) {
    res.json({ msg: "error", err });
  }
};
module.exports = logoutUser;
