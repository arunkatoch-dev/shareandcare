const express = require("express");
const Question = require("../../models/questionsSchema");

const getUserProfileQuestions = async (req, res) => {
  try {
    const { userEmail } = req.body;
    if (!userEmail) {
      return res.json({ msg: "error", details: "user Id not Found." });
    }
    const limit = 10; // default limit
    const page = parseInt(req.query.page) || 1; // default page
    const skip = (page - 1) * limit;
    const questions = await Question.find({
      questionByUserId: userEmail,
    })
      .skip(skip)
      .limit(limit)
      .exec();
    if (!questions) {
      return res.json({ msg: "no data found" });
    }
    return res.json({
      msg: "success",
      questionsByUser: [...questions],
    });
  } catch (error) {
    res.json({ msg: "error", error });
  }
};

module.exports = getUserProfileQuestions;
