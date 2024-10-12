const express = require("express");
const Question = require("../../../models/questionsSchema");

const upDateUserQuestion = async (req, res) => {
  try {
    const { question, questionId } = req.body;
    if (!(question && questionId)) {
      return res.json({
        msg: "failed",
        details: "Question Id is missing or invalid input found",
      });
    }
    const findQuestion = await Question.findByIdAndUpdate(
      { _id: questionId },
      {
        question,
      }
    );
    if (findQuestion) {
      return res.json({
        msg: "success",
        details: "question updation successfully.",
      });
    } else {
      return res.json({
        msg: "failed",
        details: "some error occured while updating question. Plz try later.",
      });
    }
  } catch (err) {
    res.json({ msg: "error", err });
  }
};

module.exports = upDateUserQuestion;
