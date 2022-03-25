const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);
let text;
let delete_password;
let thread_id;
let reply_id;
suite("Functional Tests", function () {
  suite("Routing tests", () => {
    test("POST /api/threads/{boards} => Creating a new thread", (done) => {
      text = "new threads";
      delete_password = "12345";
      chai
        .request(server)
        .post("/api/threads/testing")
        .send({ text, delete_password })
        .end((err, res) => {
          assert.equal(res.status, 200);

          done();
        });
    });

    test("GET /api/threads/{boards} => Viewing the 10 most recent threads with 3 replies each", (done) => {
      chai
        .request(server)
        .get("/api/threads/testing")
        .end((err, res) => {
          thread_id = res.body[0]._id;
          assert.equal(res.status, 200);
          assert.isAtMost(res.body.length, 10, "max threads display 10");
          assert.isAtMost(res.body[0].replies.length, 3, "max replies display 10");
          assert.equal(res.body[0].board, "testing");
          assert.equal(res.body[0].text, "new threads");
          assert.isArray(res.body[0].replies, "replies should be an array");
          done();
        });
    });

    test("POST /api/replies/{boards} => Creating a new reply", (done) => {
      text = "new reply";
      delete_password = "12345";
      chai
        .request(server)
        .post("/api/replies/testing")
        .send({ text, delete_password, thread_id })
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
    });

    test("GET /api/replies/{boards} => Viewing a single thread with all replies", (done) => {
      chai
        .request(server)
        .get("/api/replies/testing")
        .query({ thread_id })
        .end((err, res) => {
          reply_id = res.body.replies[0]._id;
          assert.equal(res.status, 200);
          assert.equal(res.body.board, "testing");
          assert.equal(res.body.text, "new threads");
          assert.isArray(res.body.replies, "replies should be an Array");
          assert.equal(res.body.replycount, res.body.replies.length);
          done();
        });
    });
    test("DELETE /api/replies/{boards} => Deleting a reply with the incorrect password", (done) => {
      delete_password = "awaw";

      chai
        .request(server)
        .delete("/api/replies/testing")
        .send({ thread_id, reply_id, delete_password })
        .end((err, res) => {
          if (err) {
            console.error(err.message);
          } else {
            assert.equal(res.text, "incorrect password");
            done();
          }
        });
    });

    test("DELETE /api/threads/{boards} =>Deleting a thread with the incorrect password", (done) => {
      delete_password = "awaw";
      chai
        .request(server)
        .delete("/api/threads/testing")
        .send({ thread_id, delete_password })
        .end((err, res) => {
          assert.equal(res.text, "incorrect password");
          done();
        });
    });

    test("PUT /api/threads/{boards} =>Reporting a thread", (done) => {
      chai
        .request(server)
        .put("/api/threads/testing")
        .send({ thread_id })
        .end((err, res) => {
          assert.equal(res.text, "reported");
          done();
        });
    });

    test("PUT /api/replies/{boards} =>Reporting a reply", (done) => {
      chai
        .request(server)
        .put("/api/replies/testing")
        .send({ thread_id, reply_id })
        .end((err, res) => {
          if (err) {
            console.error(err.message);
          } else {
            assert.equal(res.text, "reported");
            done();
          }
        });
    });

    test("DELETE /api/replies/{boards} =>Deleting a replies with the correct password", (done) => {
      delete_password = "12345";
      chai
        .request(server)
        .delete("/api/replies/testing")
        .send({ thread_id, reply_id, delete_password })
        .end((err, res) => {
          if (err) {
            console.error(err.message);
          } else {
            assert.equal(res.text, "success");
            done();
          }
        });
    });

    test("DELETE /api/threads/{boards} =>Deleting a thread with the correct password", (done) => {
      delete_password = "12345";
      chai
        .request(server)
        .delete("/api/threads/testing")
        .send({ thread_id, delete_password })
        .end((err, res) => {
          assert.equal(res.text, "success");
          done();
        });
    });
  });
});
