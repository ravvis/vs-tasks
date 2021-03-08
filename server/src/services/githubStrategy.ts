import { Strategy as GitHubStrategy } from "passport-github";
import jwt from "jsonwebtoken";
import { createUser, findUser } from "../models/user";

const githubStrategy = new GitHubStrategy(
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
export default githubStrategy;