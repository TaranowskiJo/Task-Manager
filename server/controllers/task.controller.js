const { response, request } = require("express");

const Task = require("../models/task.model");

module.exports.getAllTasks = (req, res) => {
  Task.find()
    .then((allTasks) => {
      res.json({ results: allTasks });
    })
    .catch((err) => {
      res.json(err);
    });
};
//params hold id
module.exports.getTaskById = (req, res) => {
  Task.findById(req.params.id)
    .then((aTask) => {
      console.log(res);
      res.json({ results: aTask });
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.createTask = (req, res) => {
  Task.create(req.body)
    .then((newTask) => {
      res.json({ results: newTask });
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.updateTaskById = (req, res) => {
  Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedTask) => {
      res.json({ results: updatedTask });
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.deleteTaskById = (req, res) => {
  Task.deleteOne({ _id: req.params.id })
    .then((task) => {
      res.json({ results: task });
    })
    .catch((err) => {
      res.json(err);
    });
};
