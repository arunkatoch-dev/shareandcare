const express = require("express");
const jwt = require("jsonwebtoken");

const userAuthMiddleware = (req, res, next) => {
  try {
    const loginToken = req.cookies.UID;
    const verifyUser = jwt.verify(loginToken, process.env.SECRET_KEY);
    if (verifyUser) {
      next();
    } else {
      return res.json({ msg: "user not authenticated" });
    }
  } catch (err) {
    return res.json({ msg: "user not authenticated" });
  }
};

module.exports = userAuthMiddleware;
