const express = require("express");
const Question = require("../../models/questionsSchema");

const addQuestion = async (req, res) => {
  try {
    const { question, questionBy, dateStamp, questionByUserId } = req.body;
    if (!(question && questionBy && dateStamp)) {
      return res.status(422).json({ msg: "required fields are missing." });
    }

    const questionExist = await Question.findOne({ question });
    if (questionExist) {
      return res.json({
        msg: "same question already exist. Share question with others to get answer.",
      });
    }

    const addQuestion = new Question({
      question,
      questionBy,
      answers: [],
      dateStamp,
      questionByUserId,
    });

    await addQuestion.save();
    res.json({
      status: "ok",
      msg: "question added successfully.",
    });
  } catch (e) {
    return res.json({ msg: "error", e });
  }
};

module.exports = addQuestion;
