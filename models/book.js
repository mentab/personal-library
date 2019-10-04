const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Book = mongoose.Schema;

const BookSchema = new Book({
  title: { type: String, required: true, max: 50 },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
});

module.exports = mongoose.model("Book", BookSchema);
