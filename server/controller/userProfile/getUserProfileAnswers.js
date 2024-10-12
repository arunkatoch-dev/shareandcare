const express = require("express");
const Question = require("../../models/questionsSchema");

const getUserProfileAnswers = async (req, res) => {
  try {
    const { userEmail } = await req.body;
    if (!userEmail) {
      return res.json({ msg: "error", details: "user Id not Found." });
    }

    const limit = 10; // default limit
    const page = parseInt(req.query.page) || 1; // default page
    const skip = (page - 1) * limit;

    const answersByUser = await Question.find({
      answers: { $elemMatch: { answerByUserId: userEmail } },
    })
      .skip(skip)
      .limit(limit)
      .exec();

    if (!answersByUser) {
      return res.json({ msg: "no data found" });
    }

    return res.json({
      msg: "success",
      answersByUser: answersByUser,
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports = getUserProfileAnswers;
