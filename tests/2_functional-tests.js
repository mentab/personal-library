/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *
 */

var chaiHttp = require("chai-http");
var chai = require("chai");
var assert = chai.assert;
var server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function() {
  /*
   * ----[EXAMPLE TEST]----
   * Each test should completely test the response of the API end-point including response status code!
   */
  test("#example Test GET /api/books", function(done) {
    chai
      .request(server)
      .get("/api/books")
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        assert.property(res.body[0], "commentcount");
        assert.property(res.body[0], "title");
        assert.property(res.body[0], "_id");
        done();
      });
  });
  /*
   * ----[END of EXAMPLE TEST]----
   */

  let _id;

  suite("Routing tests", function() {
    suite(
      "POST /api/books with title => create book object/expect book object",
      function() {
        test("Test POST /api/books with title", function(done) {
          chai
            .request(server)
            .post("/api/books")
            .send({
              title: "Title"
            })
            .end(function(err, res) {
              assert.equal(res.status, 200);
              assert.isObject(res.body);
              assert.property(res.body, "_id");
              assert.equal(res.body.title, "Title");

              _id = res.body._id;

              done();
            });
        });

        test("Test POST /api/books with no title given", function(done) {
          chai
            .request(server)
            .post("/api/books")
            .send({
              title: ""
            })
            .end(function(err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.text, "no title was send");
              done();
            });
        });
      }
    );

    suite("GET /api/books => array of books", function() {
      test("Test GET /api/books", function(done) {
        chai
          .request(server)
          .get("/api/books")
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.property(res.body[0], "commentcount");
            assert.property(res.body[0], "title");
            assert.property(res.body[0], "_id");
            done();
          });
      });
    });

    // TODO
    suite("GET /api/books/[id] => book object with [id]", function() {
      test("Test GET /api/books/[id] with id not in db", function(done) {
        chai
          .request(server)
          .get("/api/books/novalididmothafucka")
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'error');
            done();
          });
      });

      test("Test GET /api/books/[id] with valid id in db", function(done) {
        chai
          .request(server)
          .get("/api/books/" + _id)
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body);
            assert.equal(res.body._id, _id);
            assert.equal(res.body.title, "Title");
            assert.isArray(res.body.comments);
            assert.isEmpty(res.body.comments);
            done();
          });
      });
    });

    suite(
      "POST /api/books/[id] => add comment/expect book object with id",
      function() {
        test("Test POST /api/books/[id] with comment", function(done) {
          chai
            .request(server)
            .post("/api/books/" + _id)
            .send({
              comment: "Comment"
            })
            .end(function(err, res) {
              assert.equal(res.status, 200);
              assert.isObject(res.body);
              assert.equal(res.body._id, _id);
              assert.equal(res.body.title, "Title");
              assert.equal(res.body.comments[0], "Comment");
              done();
            });
        });
      }
    );
  });
});
