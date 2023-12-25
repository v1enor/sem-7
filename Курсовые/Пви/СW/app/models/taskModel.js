const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  projectId: {
    type: String,
    ref: "Project",
  },
  title: {
    type: String,
    default: "Новая задача",
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "active",
  },
  description: {
    type: String,
    default: "Описание задачи",
  },
  assignedTo: {
    type: String,
    ref: "User",
    default: null,
  },
});

module.exports = mongoose.model('Task', taskSchema);