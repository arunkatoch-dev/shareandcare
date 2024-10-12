const express = require("express");
const Post = require("../../models/postsSchema");

const getUserProfilePosts = async (req, res) => {
  try {
    const { userEmail } = req.body;
    if (!userEmail) {
      return res.json({ msg: "error", details: "user Id not Found." });
    }
    const limit = 10; // default limit
    const page = parseInt(req.query.page) || 1; // default page
    const skip = (page - 1) * limit;
    const posts = await Post.find({
      postByUserId: userEmail,
    })
      .skip(skip)
      .limit(limit)
      .exec();

    if (!posts) {
      return res.json({ msg: "no data found" });
    }
    return res.json({
      msg: "success",
      postsByUser: [...posts],
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports = getUserProfilePosts;
