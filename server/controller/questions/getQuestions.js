const express = require("express");
const Question = require("../../models/questionsSchema");

const getQuestions = async (req, res) => {
  try {
    const allQuestions = await Question.find();
    if (allQuestions) {
      res.json({ msg: "success", allQuestions });
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

module.exports = getQuestions;
