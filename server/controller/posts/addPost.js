const express = require("express");
const Post = require("../../models/postsSchema");

const addPost = async (req, res) => {
  try {
    const { post, postBy, postOn, postByUserId } = req.body;
    if (!(post && postBy && postOn)) {
      return res.json({ msg: "all fields are must" });
    }
    const addPost = new Post({ post, postBy, postOn, postByUserId });
    await addPost.save();
    return res.json({ msg: "post added successfully." });
  } catch (error) {
    res.json(error);
  }
};

module.exports = addPost;
