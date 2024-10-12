const express = require("express");
const addQuestion = require("../../controller/questions/addQuestion");
const updateQuestion = require("../../controller/questions/updateQuestion");
const getQuestions = require("../../controller/questions/getQuestions");
const questionsRouter = express.Router();

questionsRouter.get("/question", getQuestions)
questionsRouter.post("/question", addQuestion);
questionsRouter.put("/question", updateQuestion); // Answers can be added by using this API

module.exports = questionsRouter;
