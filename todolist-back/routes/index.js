const express = require("express");
const router = express.Router();
let Task = require("../models/Task");

router.post("/newTask", (req, res, next) => {
  Task.create({
    name: req.body.name
  }).then(() => {
    res.redirect("/tasks");
  });
});

router.get("/task/:id/done/:done", (req, res, next) => {
  let payload;

  if (req.params.done === "false") {
    payload = { done: false };
  } else {
    payload = { done: true };
  }

  Task.findByIdAndUpdate(req.params.id, payload).then(() => {
    res.redirect("/tasks");
  });
});

router.get("/tasks", (req, res, next) => {
  Task.find()
    .select({
      __v: 0
    })
    .sort({
      createdAt: -1
    })
    .then(allTasks => res.json(allTasks));
});

router.get("/tasks/done/:done", (req, res, next) => {
  Task.find({ done: req.params.done })
    .select({
      __v: 0
    })
    .sort({
      createdAt: -1
    })
    .then(allTasks => res.json(allTasks));
});

module.exports = router;
