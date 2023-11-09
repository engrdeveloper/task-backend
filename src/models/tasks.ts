import mongoose, { Document } from "mongoose";

interface Task {
  name: string;
}

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Task = mongoose.model<Task>("Task", taskSchema);

export default Task;
