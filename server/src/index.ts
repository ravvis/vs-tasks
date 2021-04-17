import express from "express";
require("dotenv-safe").config();

import passport from "passport";
import cors from "cors";

//import body parser
let bodyParser = require("body-parser");

//import mongoose
let mongoose = require("mongoose");

// CONTROLLERS
import authRouter from "./controllers/auth";

// ROUTES
import userRouter from "./routes/user_routes";
import tasksRouter from "./routes/task_routes";

// SERVICES
import githubStrategy from "./services/githubStrategy";

const port = process.env.PORT;

//connect to mongoose
const dbPath = process.env.MONGO_DB_PATH;
console.log({ dbPath });
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const mongo = mongoose.connect(dbPath, options);
mongo.then(
  () => {
    console.log("mongo connected");
  },
  (error: any) => {
    console.log(error, "error");
  }
);

// making an async function to use awaits and all
(async () => {
  passport.serializeUser(function (user: any, done) {
    done(null, user.accessToken);
  });

  const app = express();

  app.use(passport.initialize());
  app.use(cors({ origin: "*" }));

  //configure bodyparser to hande the post requests
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());

  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });

  passport.use(githubStrategy);

  app.use("/auth", authRouter);
  app.use("/tasks", tasksRouter);
  app.use("/user", userRouter);
})();
