const express = require("express");
const Question = require("../../../models/questionsSchema");

const deleteUserProfileQuestions = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.json({ msg: "error", details: "id not found." });
    }
    const findQuestion = await Question.findOneAndDelete({ _id });
    if (!findQuestion) {
      return res.json({
        msg: "error",
        details: "no data found with respect to the given ID.",
      });
    }
    return res.json({
      msg: "success",
      details: "question deleted successfully.",
    });
  } catch (error) {
    res.json({ msg: "error Occured", error });
  }
};

module.exports = deleteUserProfileQuestions;
