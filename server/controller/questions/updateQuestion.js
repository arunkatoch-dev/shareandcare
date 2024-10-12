const express = require("express");
const Question = require("../../models/questionsSchema");

const updateQuestion = async (req, res) => {
  try {
    const { answer, answerBy, answerOn, answerByUserId, id } = req.body;

    if (!(id && answer)) {
      return res.json({ msg: "id and answer not found" });
    }
    const findQuestion = await Question.findById(id);

    if (findQuestion) {
      findQuestion.answers.push({ answer, answerBy, answerOn, answerByUserId });
      await findQuestion.save();
      return res.json({ msg: "success" });
    }
  } catch (e) {
    res.json({ e });
  }
};

module.exports = updateQuestion;
