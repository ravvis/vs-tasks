import express from "express";
import { getAllTasks, createTask } from "../models/tasks";
const router = express.Router();

router.get("/all", async (req, res) => {
  const authHeader = req.headers.authorization;

  console.log({ authHeader });
  if (!authHeader) {
    res.status(404).send({ data: "Header not found" });
    return;
  }

  const token = authHeader.split(" ")[1];
  console.log({ token })
  if (!token) {
    res.status(404).send({ data: "User not found" });
    return;
  }

  let githubId = "";

  try {
    const payload: any = jwt.verify(token, process.env.ACCESS_TOKEN);
    console.log({ payload })
    githubId = payload.githubId;
  } catch (err) {
    res.send({ user: null });
    return;
  }
  console.log({ githubId });

  if (!githubId) {
    res.send({ user: null });
    return;
  }

  const tasks = await getAllTasks(githubId);
  console.log({ tasks });
  res.send({ data: tasks });
});

router.get("/create", async (req, res) => {

});

export default router;