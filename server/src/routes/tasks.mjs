import { Router } from "express";
import { User } from "../mongoose/schemas/user.mjs";
import { v4 as uuidv4 } from "uuid";
import { checkSchema, validationResult } from "express-validator";
import { tasksValidationSchema } from "../utils/validationSchemas.mjs";

const router = Router();

router.patch("/api/addNewTask", async (req, res) => {
  try {
    const { task } = req.body;
    const username = req.query.username;
    const newTask = {
      id: uuidv4(),
      ...task,
    };
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { $push: { tasks: newTask } },
      { new: true }
    );
    if (!updatedUser) {
      throw new Error("User not found");
    } else {
      res.status(200).send(updatedUser);
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.get("/api/checkTasks", async (req, res) => {
  try {
    const username = req.query.username;
    const findUser = await User.findOne({ username });
    if (!findUser) {
      throw new Error("User not found");
    } else {
      res.status(200).send(findUser.tasks);
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.patch("/api/updateTasks", async (req, res) => {
  try {
    const { username, taskId } = req.query;
    const updatedTaskData = req.body;
    const findUser = await User.findOne({ username });
    const tasks = findUser.tasks;
    const index = tasks.findIndex((task) => task.id === taskId);
    if (index === -1) {
      return res.status(400).json({ msg: "Task not found" });
    }
    if (updatedTaskData && updatedTaskData.title) {
      tasks[index] = {
        ...tasks[index].toObject(),
        title: updatedTaskData.title,
      };

      const updatedUser = await User.findOneAndUpdate(
        { username },
        { tasks },
        { new: true }
      );

      res.status(200).send(updatedUser);
    } else {
      tasks.splice(index, 1);
      const updatedUser = await User.findOneAndUpdate(
        { username },
        { tasks },
        { new: true }
      );
      res.status(200).send(updatedUser);
    }
  } catch {}
});

export default router;
