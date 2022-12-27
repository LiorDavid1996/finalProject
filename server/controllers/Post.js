const Post = require("../models/Post");
const User = require("../models/User");


exports.createPost = async (req, res) => {
  try {
    const post = await new Post(req.body).save();
    res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("user")
      .sort({ createdAt: -1 });
    console.log(posts);

    res.json(posts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};