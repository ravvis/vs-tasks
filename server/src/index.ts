import express from "express";
require("dotenv-safe").config();

import passport from "passport";
import cors from "cors";

// CONTROLLERS
import authRouter from "./controllers/auth";
import userRouter from "./controllers/user";
import tasksRouter from "./controllers/tasks";

// SERVICES
import githubStrategy from "./services/githubStrategy";

// making an async function to use awaits and all
(async () => {

  passport.serializeUser(function(user: any, done) {
    done(null, user.accessToken);
  });

  const app = express()

  app.use(passport.initialize());
  app.use(cors({ origin: "*" }));

  passport.use(githubStrategy);

  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/tasks",tasksRouter);
  
  app.listen(3002, () => {
    console.log("listening on 3002")
  });
})()
