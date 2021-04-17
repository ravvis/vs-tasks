import express from "express";
const router = express.Router();
import userController from "../controllers/user";

router.route("/").get(userController.view).post(userController.store);

export default router;
