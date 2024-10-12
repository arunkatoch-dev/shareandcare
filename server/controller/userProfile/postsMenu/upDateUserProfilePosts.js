const express = require("express");
const Post = require("../../../models/postsSchema");

const upDateUserProfilePosts = async (req, res) => {
  try {
    const { _id, post } = req.body;
    if (!(_id, post)) {
      return res.json({
        msg: "failed",
        details: "post Id and post to update not found.",
      });
    }
    const updatePost = await Post.findOneAndUpdate({ _id }, { post });
    if (updatePost) {
      return res.json({
        msg: "success",
        details: "post updation successfully.",
      });
    }
  } catch (err) {
    res.json({ msg: "error", error: err });
  }
};

module.exports = upDateUserProfilePosts;