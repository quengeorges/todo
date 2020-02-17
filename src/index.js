const express = require("express");
const ejs = require("ejs");
const fs = require("fs");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const Todo = require("./models/todo");
const log = require("./log");

const todoFront = fs.readFileSync("./src/front/todo.ejs", "utf-8");

const app = express();

mongoose.connect(process.env.DB || "mongodb://localhost/todo", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    console.error(err)
    process.exit(1);
  }
  app.emit("db ready");
});


app.use(bodyParser.urlencoded({ extended: false }));

app.post("/add_todo", async (req, res) => {
  log.verbose("/add_todo", {
    route: "/add_todo",
  });
  if(req.body.todo) {
    await Todo.create({ content: req.body.todo });
		res.status(201).redirect("/");
  } else {
    log.error("cannot create empty todo")
    res.json({ error: "cannot create empty todo" });
  }
});

app.post("/delete_todo/:id", async (req, res) => {
	const id = req.params.id;
  log.verbose("/delete_todo", {
    route: "/delete_todo",
    id,
  });
	if (id)
		await Todo.findOneAndDelete({"_id": id})
	res.status(200).redirect("/");
});

app.get("/", async (req, res) => {
  log.verbose("/", {
    route: "/",
  });
  const todos = await Todo.find({}, ["content", "_id"]);
  res.end(ejs.render(todoFront, { todos }));
});


app.on("db ready", () => {
  const PORT = process.env.PORT || 4000;
  log.info("app listening", {PORT});
  app.listen(PORT);
});

module.exports = app;
