import { TasksCollection } from "../firebase";
import dayjs from "dayjs";

export const getAllTasks = async (githubId: string) => {
  let tasks = await TasksCollection.where("user", "==", githubId).get()
  return tasks.docs.map((doc) => doc.data());
}

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
}