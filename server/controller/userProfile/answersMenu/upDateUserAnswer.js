const express = require("express");
const Question = require("../../../models/questionsSchema");

const upDateUserAnswer = async (req, res) => {
  try {
    const { questionId, answerId, answer } = req.body;
    if (!(questionId && answerId && answer)) {
      return res.json({
        msg: "failed",
        details: "questionId, answerId or answer not found",
      });
    }

    const updateAnswer = await Question.updateOne(
      { _id: questionId },
      { $set: { "answers.$[elem].answer": answer } },
      { arrayFilters: [{ "elem._id": answerId }] }
    );
    if (updateAnswer) {
      res.json({ msg: "success", details: "answer updation successfully." });
    }
  } catch (error) {
    res.json({ msg: error, error });
  }
};

module.exports = upDateUserAnswer;
