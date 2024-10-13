const express = require("express");
const Question = require("../../../models/questionsSchema");

const deleteUserProfileAnswers = async (req, res) => {
  try {
    const { _id, answerId } = req.params;
    if (!(_id && answerId)) {
      return res.json({
        msg: "failed",
        details: "either question Id or answer Id is missing.",
      });
    }

    const deleteAnswer = await Question.updateOne(
      { _id },
      { $pull: { answers: { answerByUserId: answerId } } }
    );
    if (deleteAnswer) {
      res.json({ msg: "success", details: "answer deletion successfull" });
    }
  } catch (err) {
    res.json({ msg: "error", err });
  }
};

module.exports = deleteUserProfileAnswers;
