const createError = require("http-errors");
const Comment = require("../models/Comment");

module.exports.createComment =  async (req, res, next) => {
  try {
    const { body } = req;
    await Comment.create(body,(err,comment)=>{
      if (err) {
        next(createError(400), 'bad request');
      }
      res.status(201).send(comment);
    });
  } catch (error) {
    next(error);
  }
}