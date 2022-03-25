require("dotenv").config();
const mongoose = require("mongoose");
const { threadSchema } = require("../model/threads.js");

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });

const boardSchema = new mongoose.Schema({
  board: {
    type: String,
    default: "",
  },
  thread: [
    {
      type: threadSchema,
    },
  ],
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
