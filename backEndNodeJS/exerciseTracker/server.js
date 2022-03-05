const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  log: [
    {
      description: {
        type: String,
      },
      duration: {
        type: Number,
        default: 0,
      },
      date: {
        type: Date,
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/users", async (req, res) => {
  const user = await User.create({ username: req.body.username });
  res.json({ username: user.username, _id: user._id });
});

app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("/api/users/:id/exercises", async (req, res) => {
  const id = req.params.id;
  const description = req.body.description;
  const duration = req.body.duration;
  let date = req.body.date;

  if (date === "" || date === undefined) {
    date = new Date().toDateString();
  } else {
    date = new Date(date).toDateString();
  }
  try {
    const exercises = await User.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          log: {
            description,
            duration,
            date,
          },
        },
      },
      { new: true, upsert: true }
    );
    const username = exercises.username;
    res.json({ _id: id, username, date, duration, description });
  } catch (error) {
    res.json({ error: "invalid value" });
  }
});

app.get("/api/users/:id/logs", async (req, res) => {
  const id = req.params.id;
  const from = req.query.from;
  const to = req.query.to;
  const limit = +req.query.limit;

  try {
    const user = await User.findById({ _id: id });
    const logs = user.log;

    let log = logs.map((item) => {
      return {
        description: item.description,
        duration: item.duration,
        date: new Date(item.date).toDateString(),
      };
    });
    const count = log.length;
    let obj = { _id: id, username: user.username, from, to, count, log };

    if (from) {
      const fromDate = new Date(from).toDateString();
      const newFromDate = new Date(fromDate);
      obj.log = log.filter((exp) => new Date(exp.date) >= newFromDate);
      obj.from = new Date(from).toDateString();
      obj.count = obj.log.length;
    }

    if (to) {
      if (to < from) {
        throw new Error();
      }
      const toDate = new Date(to).toDateString();
      const newToDate = new Date(toDate);
      obj.log = log.filter((exe) => new Date(exe.date) <= newToDate);
      obj.to = new Date(to).toDateString();
      obj.count = obj.log.length;
    }

    if (limit) {
      obj.log = log.slice(0, limit);
      obj.count = obj.log.length;
    }

    res.json(obj);
  } catch (error) {
    res.json({ error: "somethings wrong" });
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
