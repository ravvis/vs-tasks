import express from "express";
require("dotenv-safe").config();

import {
  findUser,
  createUser,
  // updateUser,
  getAllTasks,
} from "./firebase";

import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github";
import jwt from "jsonwebtoken";
import cors from "cors";

// making an async function to use awaits and all
(async () => {

  passport.serializeUser(function(user: any, done) {
    done(null, user.accessToken);
  });

  const app = express()

  app.use(passport.initialize());
  app.use(cors({ origin: "*" }));

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3002/auth/github/callback"
      },
      async (_: any, __: any, profile: any, cb: any) => {
        console.log("poiuy")
        console.log({ profile });
        let user = await findUser({ githubId: profile.id });
        console.log({ user })
        if (user) {
          console.log("inside if");
        }
        else {
          console.log("inside else");
          const payload = {
            name: profile.displayName,
            githubId: profile.id
          }
          console.log({ payload });
          user = await createUser(payload)
        }
        cb(null, {
          accessToken: jwt.sign(
            { githubId: user.githubId },
            process.env.ACCESS_TOKEN,
            { expiresIn: "1y" }
          )
        });
      }
    )
  );
  app.get('/auth/github',
    passport.authenticate('github', {session: false}));

  app.get('/auth/github/callback', 
    passport.authenticate('github', {session: false}),
    (req:any, res) => {
      res.redirect(`http://localhost:54321/auth/${req.user.accessToken}`)
    });
  
  app.get("/me", async (req, res) => {
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

  app.get("/getAllTasks", async (req, res) => {
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

  app.listen(3002, () => {
    console.log("listening on 3002")
  });
})()
