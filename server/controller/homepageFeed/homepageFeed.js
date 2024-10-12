const express = require("express");
const Post = require("../../models/postsSchema");
const Question = require("../../models/questionsSchema");

const homepageFeed = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5; // default limit
    const page = parseInt(req.query.page) || 1; // default page
    const skip = (page - 1) * limit;
    const posts = await Post.find().skip(skip).limit(limit).exec();
    const questions = await Question.find().skip(skip).limit(limit).exec();
    if (!(posts && questions)) {
      return res.json({ msg: "nothing to show" });
    }
    return res.json({
      msg: "success",
      feedData: [...questions, ...posts],
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports = homepageFeed;
