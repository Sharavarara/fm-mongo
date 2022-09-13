const yup = require("yup");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const contentSchema = yup
  .string()
  .matches(/[a-z0-9\s]{5,256}/i)
  .required("Content is required");

const commentSchema = new Schema({
  content:{
    type: String,
    required: true,
    validate: {
      validator: (v) => contentSchema.isValidSync(v),
      message: (props) => `${props.value} is not a valid content`,
    },
  },
  author: {
    login: {
      type:String,
      default:'anonymous'
    }
  },
  createdAt: { type: Date, default: Date.now },
}
)

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;