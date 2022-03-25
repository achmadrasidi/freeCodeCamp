const { Thread } = require("../model/threads.js");
const { Reply } = require("../model/replies.js");

const createReply = async (text, delete_password, thread_id) => {
  const date = new Date();
  const thread = await Thread.findById({ _id: thread_id });
  const replies = await Reply.create({ text, created_on: date, delete_password });

  let reply = {};
  if (!thread) {
    reply = undefined;
  } else {
    reply = await Thread.findByIdAndUpdate({ _id: thread_id }, { $push: { replies }, bumped_on: replies.created_on }, { new: true });
  }
  return reply;
};

const getReply = async (thread_id) => {
  const threads = await Thread.findById({ _id: thread_id }).sort({ bumped_on: "desc" });
  if (!threads) {
    return undefined;
  }

  threads.delete_password = undefined;
  threads.reported = undefined;
  threads.replycount = threads.replies.length;
  threads.replies.sort((th1, th2) => {
    return th2.created_on - th1.created_on;
  });
  threads.replies.forEach((reply) => {
    reply.delete_password = undefined;
    reply.reported = undefined;
  });

  return threads;
};

const deleteReply = async (thread_id, reply_id, delete_password) => {
  const thread = await Thread.findById({ _id: thread_id });
  const reply = thread.replies;
  if (!thread) {
    return undefined;
  }
  let str = "";
  reply.forEach((val) => {
    if (val._id.toString() === reply_id) {
      if (val.delete_password !== delete_password) {
        str += "incorrect password";
      } else {
        str += "success";
      }
    }
  });
  if (str === "success") {
    await Thread.updateOne({ _id: thread_id, "replies._id": reply_id }, { $set: { "replies.$.text": "[deleted]" } });
  }

  return str;
};

const reportReply = async (thread_id, reply_id) => {
  const thread = await Thread.findOneAndUpdate(
    {
      thread_id,
      "replies._id": reply_id,
    },
    { $set: { "replies.$.reported": true } }
  );
  const reply = thread.replies;
  if (!thread) {
    return undefined;
  }
  let str = "";
  reply.forEach((val) => {
    if (val.reported === true) {
      str += "already reported";
    } else {
      str += "reported";
    }
  });

  return str;
};

module.exports = { createReply, getReply, deleteReply, reportReply };
