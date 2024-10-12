const express = require("express");
const getUserProfile = require("../../controller/userProfile/getUserProfile");
const getUserProfileQuestions = require("../../controller/userProfile/getUserProfileQuestions");
const getUserProfilePosts = require("../../controller/userProfile/getUserProfilePosts");
const getUserProfileAnswers = require("../../controller/userProfile/getUserProfileAnswers");
const deleteUserProfileQuestions = require("../../controller/userProfile/questionsMenu/deleteUserProfileQuestions");
const upDateUserQuestion = require("../../controller/userProfile/questionsMenu/upDateUserQuestion");
const deleteUserProfileAnswers = require("../../controller/userProfile/answersMenu/deleteUserProfileAnswers");
const upDateUserAnswer = require("../../controller/userProfile/answersMenu/upDateUserAnswer");
const deleteUserProfilePosts = require("../../controller/userProfile/postsMenu/deleteUserProfilePosts");
const upDateUserProfilePosts = require("../../controller/userProfile/postsMenu/upDateUserProfilePosts");
const userProfileRouter = express.Router();

// All endpoints sends user specific data
userProfileRouter.post("/userProfile", getUserProfile); // sends all questions and posts created by user
// Questions Routes;
userProfileRouter.post("/userProfileQuestions", getUserProfileQuestions);
userProfileRouter.patch("/userProfileQuestions", upDateUserQuestion);
userProfileRouter.delete(
  "/userProfileQuestions/:_id",
  deleteUserProfileQuestions
);

// Answers Routes:
userProfileRouter.post("/userProfileAnswers", getUserProfileAnswers);
userProfileRouter.patch("/userProfileAnswers", upDateUserAnswer);
userProfileRouter.delete(
  "/userProfileAnswers/:_id/:answerId",
  deleteUserProfileAnswers
);
// Posts Routes:
userProfileRouter.post("/userProfilePosts", getUserProfilePosts);
userProfileRouter.patch("/userProfilePosts", upDateUserProfilePosts);
userProfileRouter.delete("/userProfilePosts/:_id", deleteUserProfilePosts);

module.exports = userProfileRouter;
