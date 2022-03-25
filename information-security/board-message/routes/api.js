"use strict";
const { getThread, createThread, deleteThread, reportThread } = require("../controllers/thread.js");
const { getReply, createReply, deleteReply, reportReply } = require("../controllers/reply.js");

module.exports = function (app) {
  app
    .route("/api/threads/:board")
    .post(async (req, res) => {
      const { text, delete_password } = req.body;
      let board = req.body.board;
      if (!board) {
        board = req.params.board;
      }
      const threads = await createThread(board, text, delete_password);
      if (!threads) {
        res.json({ error: "cannot create threads " });
        return;
      }

      res.redirect(`/b/${board}`);
    })
    .get(async (req, res) => {
      let board = req.body.board;
      if (!board) {
        board = req.params.board;
      }
      const threads = await getThread(board);
      if (!threads) {
        res.json({ error: "No threads found" });
        return;
      }

      res.json(threads);
    })
    .delete(async (req, res) => {
      const { thread_id, delete_password } = req.body;
      const thread = await deleteThread(thread_id, delete_password);
      if (!thread) {
        res.json({ error: "thread not found" });
      }
      res.send(thread);
    })
    .put(async (req, res) => {
      let { thread_id, report_id } = req.body;
      let report = "";
      if (!thread_id && !report_id) {
        res.json({ error: "no thread found" });
      } else if (thread_id && !report_id) {
        report = await reportThread(thread_id);
      } else {
        report = await reportThread(report_id);
      }

      res.send(report);
    });

  app
    .route("/api/replies/:board")
    .post(async (req, res) => {
      const { text, delete_password, thread_id } = req.body;
      let board = req.body.board;
      if (!board) {
        board = req.params.board;
      }
      const replies = await createReply(text, delete_password, thread_id);
      if (!replies) {
        res.json({ error: "cannot create reply" });
        return;
      }
      res.redirect(`/b/${board}/${thread_id}`);
    })
    .get(async (req, res) => {
      let thread_id = req.query.thread_id;

      if (!thread_id) {
        res.json({ error: "cannot get ID" });
        return;
      }
      const thread = await getReply(thread_id);

      if (!thread) {
        res.json({ error: "No replies found" });
        return;
      }

      res.json(thread);
    })
    .delete(async (req, res) => {
      const { thread_id, reply_id, delete_password } = req.body;

      const reply = await deleteReply(thread_id, reply_id, delete_password);

      if (!reply) {
        res.json({ error: "No reply to delete" });
      }

      res.send(reply);
    })
    .put(async (req, res) => {
      const { thread_id, reply_id } = req.body;
      if (!thread_id && reply_id) {
        res.json({ error: "no thread found" });
      }
      const report = await reportReply(thread_id, reply_id);
      if (!report) {
        res.json({ error: "no reply to report" });
      }
      res.send(report);
    });
};
