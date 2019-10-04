/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;
var mongoose = require("mongoose");
var objectId = mongoose.Types.ObjectId;

var bookController = require("../controllers/bookController");

module.exports = function(app) {
  app
    .route("/api/books")
    .get(bookController.booksGet)
    .post(bookController.booksPost)
    .delete(bookController.booksDelete);

  app
    .route("/api/books/:id")
    .get(bookController.bookGet)
    .post(bookController.bookPost)
    .delete(bookController.bookDelete);
};
