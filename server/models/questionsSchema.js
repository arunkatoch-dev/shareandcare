const mongoose = require("mongoose");

const questionsModel = new mongoose.Schema({
  question: {
    type: String,
    trim: true,
    required: true,
  },
  answers: {
    type: [
      {
        answer: String,
        answerBy: String,
        answerOn: String,
        answerByUserId: String,
      },
    ],
    default: undefined,
  },
  questionBy: {
    type: String,
    trim: true,
  },
  questionByUserId: {
    type: String,
    trim: true,
    required: true,
  },
  dateStamp: {
    type: String,
    required: true,
  },
});

const Question = mongoose.model("QUESTION", questionsModel);
module.exports = Question;
