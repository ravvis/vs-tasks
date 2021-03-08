import { TasksCollection } from "../firebase";

const getAllTasks = async (githubId: string) => {
  let tasks = await TasksCollection.where("user", "==", githubId).get()
  return tasks.docs.map((doc) => doc.data());
}

export {
  getAllTasks
}