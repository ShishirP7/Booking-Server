const Post = require("../models/Post");
const { z } = require("zod");

const postSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1)
});

exports.listPosts = async (_req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (e) { next(e); }
};

exports.createPost = async (req, res, next) => {
  try {
    const data = postSchema.parse(req.body);
    const post = await Post.create(data);
    res.status(201).json(post);
  } catch (e) { next(e); }
};

exports.deletePost = async (req, res, next) => {
  try {
    const out = await Post.findByIdAndDelete(req.params.id);
    if (!out) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  } catch (e) { next(e); }
};
