require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });

const replySchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    default: "",
  },
  created_on: {
    type: Date,
  },
  delete_password: {
    type: String,
    default: "",
  },
  reported: {
    type: Boolean,
    default: false,
  },
});

const Reply = mongoose.model("Reply", replySchema);
module.exports = { Reply, replySchema };
