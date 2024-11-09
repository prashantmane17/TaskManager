import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  priority: {
    type: String,
    required: true,
  },
  assignee: {
    type: String,
    required: true,
  },
  deadline: Date,
  dateAdded: {
    type: Date,
    default: Date.now, // Automatically set dateAdded to current date when a task is created
  },
  estimatedTime: {
    type: String,
    required: true,
  },
  tags: [String],
});

export default mongoose.models.Tasks || mongoose.model('Tasks', TaskSchema);
