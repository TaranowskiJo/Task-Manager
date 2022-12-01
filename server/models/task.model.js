const { default: mongoose } = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, `is required`],
      minlength: [3, `name must be at least 3 characters.`],
    },
    description: {
      type: String,
      required: [true, `is required`],
      minlength: [5, `name must be at least 5 characters.`],
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema); //(table name, instructions)

module.exports = Task;
