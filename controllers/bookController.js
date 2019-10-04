const mongoose = require("mongoose");
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Book = require("../models/book");
const Comment = require("../models/comment");

exports.booksGet = (req, res) => {
  const query = Book.find();
  query.select("_id title comments");
  query.exec(function(err, books) {
    if (err) return res.send("error");
    books = books.map(book => {
      const { _id, title, comments } = book;
      return { _id, title, commentcount: comments.length };
    });
    return res.json(books);
  });
};

exports.booksPost = function(req, res) {
  if (!req.body.title) {
    return res.send("no title was send");
  }
  Book.create(req.body, function(err, book) {
    if (err) return res.send("error");
    const { _id, title } = book;
    return res.json({ _id, title });
  });
};

exports.booksDelete = function(req, res) {
  Book.deleteMany({}, function(err) {
    if (err) return res.send("error");
    return res.send("complete delete successful");
  });
};

exports.bookGet = function(req, res) {
  Book.findOne({ _id: req.params.id })
    .populate("comments")
    .exec(function(err, book) {
      if (err) return res.send("error");
      const { _id, title, comments } = book;
      return res.json({
        _id,
        title,
        comments: comments.map(comment => comment.title)
      });
    });
};

exports.bookPost = function(req, res) {
  const bookId = req.params.id;
  Book.findOne({ _id: bookId })
    .populate("comments")
    .exec(function(err, book) {
      if (err) return res.send("error");
      const comment = new Comment({
        title: req.body.comment,
        book: bookId
      });
      comment.save(function(err, comment) {
        if (err) return res.send("error");
        book.comments.push(comment);
        book.save(function(err, book) {
          if (err) return res.send("error");
          const { _id, title, comments } = book;
          return res.json({
            _id,
            title,
            comments: comments.map(comment => comment.title)
          });
        });
      });
    });
};

exports.bookDelete = function(req, res) {
  Book.deleteOne({ _id: req.params.id }, function(err) {
    if (err) return res.send("error");
    return res.send("delete successful");
  });
};
