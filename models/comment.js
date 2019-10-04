const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Comment = mongoose.Schema;

const CommentSchema = new Comment({
  title: { type: String, required: true, max: 50 },
  book: { type: Schema.Types.ObjectId, ref: "Book" }
});

module.exports = mongoose.model("Comment", CommentSchema);
