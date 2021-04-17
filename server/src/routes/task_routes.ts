import express from "express";
const router = express.Router();
import tasksController from "../controllers/tasks";

router.route("/").get(tasksController.index).post(tasksController.store);

router.route("/:task_id").get(tasksController.view);

export default router;
