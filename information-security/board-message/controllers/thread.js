const Board = require("../model/boards.js");
const { Thread } = require("../model/threads.js");

const createBoard = async (board, texts) => {
  const threads = await Board.create({ board, thread: texts });

  return threads.thread;
};

const createThread = async (board, text, delete_password) => {
  const date = new Date();
  const boards = await Board.find({ board });
  const texts = await Thread.create({ board, text, created_on: date, bumped_on: date, delete_password });

  let thread = {};
  if (boards.length === 0) {
    thread = await createBoard(board, texts);
  } else {
    thread = await Board.findOneAndUpdate({ board }, { $push: { thread: texts } }, { new: true });
    return thread.thread;
  }

  return thread;
};

const getThread = async (board) => {
  const threads = await Thread.find({ board }).sort({ bumped_on: "desc" }).limit(10);

  if (!threads) {
    return undefined;
  }
  threads.forEach((th) => {
    th.delete_password = undefined;
    th.reported = undefined;
    th.replycount = th.replies.length;
    th.replies.sort((th1, th2) => {
      return th2.created_on - th1.created_on;
    });
    th.replies = th.replies.slice(0, 3);
    th.replies.forEach((reply) => {
      reply.delete_password = undefined;
      reply.reported = undefined;
    });
  });
  return threads;
};

const deleteThread = async (thread_id, delete_password) => {
  const thread = await Thread.findById({ _id: thread_id });
  if (!thread) {
    return undefined;
  }
  if (thread.delete_password !== delete_password) {
    return "incorrect password";
  }
  thread.deleteOne({ _id: thread_id });
  return "success";
};

const reportThread = async (thread_id) => {
  const thread = await Thread.findOneAndUpdate({ _id: thread_id }, { reported: true });

  if (!thread) {
    return undefined;
  }
  if (thread.reported === true) {
    return "already reported";
  }

  return "reported";
};

module.exports = { getThread, createThread, deleteThread, reportThread };
