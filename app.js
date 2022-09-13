const express = require("express");
const PostController = require("./controllers/post.controller");
const CommentController = require("./controllers/comment.controller")

const app = express();
app.use(express.json());

//posts

app.post("/api/post/", PostController.createPost);

app.get("/api/posts/", PostController.getAllPosts);
app.get("/api/post/:postId", PostController.getPost);

app.patch("/api/post/:postId", PostController.updatePost);
app.delete("/api/post/:postId", PostController.deletePost);
app.delete("/api/posts/", PostController.deleteAllPosts);

//comments

app.post("/api/comment/", CommentController.createComment);


app.use((error, req, res, next) => {
  const status = error.status || 500;
  res.status(status).send(error.message||'Server error');
});

module.exports = app;
