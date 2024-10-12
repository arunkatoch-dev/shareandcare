const express = require("express");
const Question = require("../../models/questionsSchema");
const Post = require("../../models/postsSchema");

const getUserProfile = async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    if (!userEmail) {
      return res.json({ msg: "error", details: "user Id not Found." });
    }
    const limit = 5; // default limit
    const page = parseInt(req.query.page) || 1; // default page
    const skip = (page - 1) * limit;
    const posts = await Post.find({
      postByUserId: userEmail,
    })
      .skip(skip)
      .limit(limit)
      .exec();
    const questions = await Question.find({
      questionByUserId: userEmail,
    })
      .skip(skip)
      .limit(limit)
      .exec();
    if (!(posts && questions)) {
      return res.json({ msg: "no data found" });
    }
    return res.json({
      msg: "success",
      userProfileFeed: [...questions, ...posts],
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports = getUserProfile;
