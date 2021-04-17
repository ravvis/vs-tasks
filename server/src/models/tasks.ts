import { TasksCollection } from "../firebase";
import dayjs from "dayjs";

export const getAllTasks = async (githubId: string) => {
  let tasks = await TasksCollection.where("user", "==", githubId).get();
  return tasks.docs.map((doc) => doc.data());
};

export const createTask = async (githubId: string, payload: {}) => {
  TasksCollection.add({
    task_id: "",
    title: "",
    user_id: githubId,
    created_at: dayjs().date(),
  })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

// import {UsersCollection} from "../firebase";
import mongoose from "mongoose";

// Schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  labels: {
    type: Array,
    default: [],
  },
  user_id: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

// Export Bio Model
const Task = mongoose.model("task", taskSchema);
exports.get = function (callback: any, limit: any) {
  Task.find(callback).limit(limit);
};
export default Task;
