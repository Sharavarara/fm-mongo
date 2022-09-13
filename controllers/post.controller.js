const createError = require("http-errors");
const Post = require("../models/Post");

module.exports.createPost =  async (req, res, next) => {
  try {
    const { body } = req;
    await Post.create(body,(err,post)=>{
      if (err) {
        next(createError(400), 'bad request');
      }
      res.status(201).send(post);
    });
  } catch (error) {
    next(error);
  }
}

module.exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
}

module.exports.updatePost = async (req,res,next)=>{
  try {
    const {body, params:{postId}} = req;
    await Post.findByIdAndUpdate(postId, body, {new:true}, (err,post)=>{
      if(err){
        next(createError(400, 'Bad request, try again'))
      }
      res.status(200).send(post);
    });
  } catch (error) {
    next(error)
  }
}

module.exports.deletePost = async (req,res,next)=>{
  try {
    const {params:{postId}} = req;
    const post = await Post.findByIdAndDelete(postId);
    if(!post){
      next(createError(400, 'Bad request'))
    };
    res.status(200).send(post);
  } catch (error) {
    next(error)
  }
}

module.exports.deleteAllPosts = async (req,res,next)=>{
  try {
    const posts = await Post.deleteMany();
    res.status(200).send(posts)
  } catch (error) {
    next(error)
  }
}

module.exports.getPost = async (req,res,next)=>{
  try {
    const {params:{postId}} = req;
    const posts = await Post.findById(postId);
    res.status(200).send(posts);
  } catch (error) {
    next(error)
  }
}