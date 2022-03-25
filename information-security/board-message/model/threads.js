require("dotenv").config();
const mongoose = require("mongoose");
const { replySchema } = require("../model/replies.js");

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });

const threadSchema = new mongoose.Schema({
  board: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    required: true,
    default: "",
  },
  created_on: {
    type: Date,
  },
  bumped_on: {
    type: Date,
  },
  reported: {
    type: Boolean,
    default: false,
  },
  delete_password: {
    type: String,
    default: "",
  },
  replies: [
    {
      type: replySchema,
    },
  ],
  replycount: {
    type: Number,
  },
});

const Thread = mongoose.model("Thread", threadSchema);

module.exports = { Thread, threadSchema };
