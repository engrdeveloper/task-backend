import { Request, Response } from "express";
import Task from "../models/tasks";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Task Name is required." });
    }

    const task = await Task.create({ name });

    return res.json({ task: { name: task.name, id: task._id } });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({
      error: "Internal Server Error",
      reason: (error as Error)?.message,
    });
  }
};

export const listTask = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.aggregate([
      { $project: { id: "$_id", name: 1, _id: 0 } }, // Projecting _id to id
    ]);

    return res.json({ tasks });
  } catch (error) {
    console.error("Error listing tasks:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      reason: (error as Error)?.message,
    });
  }
};
