import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import { findUser } from "../models/user";

router.get("/me", async (req, res) => {
  const authHeader = req.headers.authorization;

  console.log("/////////////////me")
  console.log({ authHeader });
  if (!authHeader) {
    res.send({ user: null });
    return;
  }

  const token = authHeader.split(" ")[1];
  console.log({ token })
  if (!token) {
    res.send({ user: null });
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

  const user = await findUser({ githubId });
  console.log({ user });
  res.send({ user });
});
export default router;