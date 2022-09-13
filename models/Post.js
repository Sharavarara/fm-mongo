const yup = require("yup");
const mongoose = require("mongoose");
const { Schema } = mongoose;


const emailSchema = yup.string().email();
const contentSchema = yup
  .string()
  .matches(/[a-z0-9\s]{5,256}/i)
  .required("Content is required");

const postSchema = new Schema({
  content: {
    type: String,
    required: true,
    validate: {
      validator: (v) => contentSchema.isValidSync(v),
      message: (props) => `${props.value} is not a valid content`,
    },
  },
  author: {
    login: String,
    rate: Number,
    email: {
      type: String,
      required: true,
      validate: {
        validator: (v) => emailSchema.isValidSync(v),
        message: (props) => `${props.value} is not a valid content`,
      },
    },
  },
  isCorrect: { type: Boolean, default: false },
  publishAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;